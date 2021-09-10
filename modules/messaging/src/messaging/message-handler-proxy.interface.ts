import { Type } from '@dendritic/common';

import { Message } from './message.interface';

/**
 * Proxy through which messsage handling is dispatched which targets a specifed object instance. 
 * 
 * @typeParam T Type of target to which to message handling is dispatched/.    
 */
export interface MessageHandlerProxy<T> {
  /**
   * The payload type of messages that can be processed by this handler.
   */
  readonly payloadType: Type<T>;
  
  /**
   * A number representing the priority of this handler over other handlers capable of processing the same message.
   * 
   * In general, a handler with a higher priority will receive the message before (or instead of) handlers with a
   * lower priority. However, the priority value may not be the only indicator that is used to determine the order of
   * invocation. For instance, a message processor may decide to ignore the priority value if one message handler is a
   * more specific handler of the message than another handler.
   */
  readonly priority: number;

  /**
   * Checks if this handler is capable of handling the given {@code message}.
   *
   * @param message The message to be handled
   * @return {@code true} if the handler is capable of handling the message, {@code false} otherwise
   */
  canHandle(message: Message<any>): boolean;

  /**
   * Checks if this handler is capable of handling messages with the given {@code payloadType}.
   *
   * @param payloadType The payload type of a message to be handled.
   * @return {@code true} if the handler is capable of handling the message with given payload type, {@code false} otherwise
   */
  canHandleType(payloadType: Type<any>): boolean;

  /**
   * Handles the given {@code message} by invoking the appropriate method on the given {@code target}. 
   * This may result in an Error if the given target is not capable of handling the message or if an 
   * Error is thrown during invocation of the method.
   *
   * @param message The message to handle.
   * @param target The target to handle the message.
   * @return The message handling result.
   */
  handle(message: Message<any>, target: T): any
}


// export class DecoratedMessageHandlingProxy<T>  implements MessageHandlerProxy<T> {

//   public readonly payloadType: Type<T>;

//   public constructor(
//     targetType: Type<T>, 
//     propertyKey: string | Symbol, 
//     public readonly priority: number) 
//   {
//     targetType.prototype


    


//     //handler (...any: any[])
    
//     /**
//      * Type constructor.
//      */
//     // new (...args: any[]): T;
//   }

  
//   canHandle(message: Message<any>): boolean {
//     throw new Error('Method not implemented.');
//   }
 
//   canHandleType(payloadType: Type<any>): boolean {
//     throw new Error('Method not implemented.');
//   }
 
//   handle(message: Message<any>, target: T) {
//     throw new Error('Method not implemented.');
//   }
// }