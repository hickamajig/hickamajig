import { Type } from '@goldsam/eventi-common';
import { ParameterResolver } from './parameter-resolver.interface';

/**
 * 
 */
export interface ParameterResolverFactory {
  /**
   * If available, creates a {@link ParameterResolver} instance that can provide a parameter 
   * to a handler method.
   * for a given message.
   * <p>
   * If the ParameterResolverFactory cannot provide a suitable ParameterResolver, returns {@code null}.
   *
   * @param targetType Target type defining event handler methods to inspect.
   * @param handlerPropertyKey Property name of event handler method on {@code targetType}s.
   * @param parameters     The parameters on the executable to inspect
   * @param parameterIndex The index of the parameter to return a ParameterResolver for
   * 
   * @return a suitable {@link ParameterResolver}, or {@code undefined} if none is found.
   */
  createInstance(targetType: Type<any>, handlerPropertyKey: string | symbol,  parameters: any[], parameterIndex: number): ParameterResolver<any>;
}