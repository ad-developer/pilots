import {CustomEventListener, EventType, SpecificEventListener} from './types';
/** Class representing a base ADComponent. */

/**
 * ADComponent
 */
export class ADComponent {
  
  /**
   * attachTo
   * @param {Element}root 
   * @param {Array} args 
   * @returns {ADComponent}
   */
  static attachTo(root: Element, ...args: unknown[]): ADComponent {
      return  new ADComponent(root, ...args);
  }

  /**
   * constructor
   * @param root 
   * @param args 
   */
  constructor(public root: Element, ...args: unknown[]) {
    this.init(...args);
    this.initSyncWithDOM();
  }

  /**
   * @param {...?} args
   */
  init(...args: any[]) {
    // Subclasses can override this to do any additional setup work that would be considered part of a
    // "constructor". Essentially, it is a hook into the parent constructor before the component is
    // initialized. Any additional arguments besides root will be passed in here.
  }

  initSyncWithDOM() {
    // Subclasses should override this method if they need to perform work to synchronize with a host DOM
    // object. An example of this would be a form control wrapper that needs to synchronize its internal state
    // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
    // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
  }

  destroy() {
    // Subclasses may implement this method to release any resources / deregister any listeners they have
    // attached. An example of this might be deregistering a resize event from the window object.
  }

  /**
   * Wrapper method to add an event listener to the component's root element. This is most useful when
   * listening for custom events.
   */
  listen<K extends EventType>(
    evtType: K, handler: SpecificEventListener<K>, options?: AddEventListenerOptions | boolean): void;
  listen<E extends Event>(
    evtType: string, handler: CustomEventListener<E>, options?: AddEventListenerOptions | boolean): void;
  listen(evtType: string, handler: EventListener, options?: AddEventListenerOptions | boolean) {
    this.root.addEventListener(evtType, handler, options);
  }

 /**
   * Wrapper method to remove an event listener to the component's root element. This is most useful when
   * unlistening for custom events.
   */
 unlisten<K extends EventType>(
  evtType: K, handler: SpecificEventListener<K>, options?: AddEventListenerOptions | boolean): void;
unlisten<E extends Event>(
  evtType: string, handler: CustomEventListener<E>, options?: AddEventListenerOptions | boolean): void;
unlisten(evtType: string, handler: EventListener, options?: AddEventListenerOptions | boolean) {
  this.root.removeEventListener(evtType, handler, options);
}

 /**
   * Fires a cross-browser-compatible custom event from the component root 
   * or specified element of the given type, with the given data.
   * @param {!string} evtType
   * @param {Object?} evtData
   * @param {boolean=} shouldBubble
   * @param {!Element=} element
   */
  emit(evtType: string, evtData: object | null, shouldBubble: boolean | undefined = false, element: Element | undefined = undefined) {
    const  evt = new CustomEvent(evtType, {
       detail: evtData,
       bubbles: shouldBubble,
     });
   if(element){
     element.dispatchEvent(evt);
   } else {
     this.root.dispatchEvent(evt);
   }
 }

  /**
   * Create html element
   * @param {!string} html
   */
  createElement(html: string) {
    const el = document.createElement('div');
    el.innerHTML = html;
    return el.firstChild;
  }
}