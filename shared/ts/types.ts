export type EventType = keyof GlobalEventHandlersEventMap;
export type SpecificEventListener<K extends EventType> = (evt: GlobalEventHandlersEventMap[K]) => void;
export type CustomEventListener<E extends Event> = (evt: E) => void;
export type WindowEventType = keyof WindowEventMap;
export type SpecificWindowEventListener<K extends WindowEventType> =
    (evt: WindowEventMap[K]) => void;

// `any` is required for mixin constructors
// tslint:disable:no-any
/**
 * A generic type for the constructor of an instance type. Note that this type
 * does not preserve accurate constructor parameters.
 *
 * @template T The instance type.
 */
export type Constructor<T = any> = {
  new (...args: any[]): T;
};
// tslint:enable:no-any
