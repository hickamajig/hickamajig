import { Type } from '@dendritic/common'

import { Message } from './message.interface'

/**
 * Resolves {@link Message} handler method parameter values.
 *
 * @typeParam TParameter Parameter type
 */
export interface ParameterResolver<TParameter> {

  /**
   * Resolves the parameter value to use when handling a given {@code message}, 
   * or {@code undefined} if no suitable parameter value can be resolved.
   *
   * @param message The message to resolve the value for.
   * @return the parameter value for the handler.
   */
  resolveParameterValue(message: Message<any>): TParameter | undefined

  /**
   * Indicates whether this resolver is capable of providing a value for a given {@code message}.
   *
   * @param message The message to evaluate
   * @return {@code true} if this resolver can provide a value for the message, otherwise {@code false}
   */
  matches(message: Message<any>): boolean;

  /**
   * The message payload type supported by this resolver. 
   */
  readonly supportedPayloadType: Type<any>;
}