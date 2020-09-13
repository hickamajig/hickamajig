/**
 * Represents a constructable type.
 */
export interface Type<T> extends Function {
  /**
   * Type constructor.
   */
  new (...args: any[]): T;
}