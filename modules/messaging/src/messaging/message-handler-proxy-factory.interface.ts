import { Type } from '@dendritic/common';

import { MessageHandlerProxy } from './message-handler-proxy.interface';
import { ParameterResolverFactory } from './parameter-resolver-factory.interface';

/**
 * Factory for creating a {@link MessageHandlerProxy} instance (if possible) 
 * that proxy message handler method invocations. If a specified method is 
 * suitable, the factory returns a {@link MessageHandlerProxy} which invokes 
 * the method on a given target object of the {@code declaringType}.
 */
export interface MessageHandlerProxyFactory {
  /**
   * Creates a {@link MessageHandlerProxy} for a handler method with a given 
   * {@code propertyKey} on a given {@code declaringType}. The returned proxy 
   * will use the given {@code parameterResolverFactory} to resolve the handler 
   * method's parameters.
   *
   * @typeParam TParameter The type of the declaring object
   *
   * @param declaringType            The type of object declaring the handler method
   * @param handlerPropertyKey       Property key of the handler method to insepct.
   * @param parameterResolverFactory Factory for creating {@link ParameterResolver} instances 
   *                                 for resolving the parameters of proxied method invocations
   * @return A {@link MessageHandlerProxy} instance if the specified method is suitable, 
   *         or {@code undefined} otherwise. 
   */
  createHandler<TParameter>(
    declaringType: Type<TParameter>, 
    handlerPropertyKey: string | symbol, 
    parameterResolverFactory: ParameterResolverFactory
  ): MessageHandlerProxy<TParameter> | undefined;
}
