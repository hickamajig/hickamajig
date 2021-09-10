import { Type } from '@dendritic/common';
import 'reflect-metadata';

import { ParameterResolverFactory } from '../parameter-resolver-factory.interface';
import { HANDLER_METADATA_KEY } from './constants';
import { MessageHandlerProxy } from '../message-handler-proxy.interface';
import { MessageHandlerProxyFactory } from '../message-handler-proxy-factory.interface';

const FUNCTION_PROTOTYPE = Object.getPrototypeOf(Function);

export class DecoratedHandlerInspector {
  
  constructor(
    private readonly inspectedType: Type<any>, 
    private readonly parent: DecoratedHandlerInspector | undefined, 
    private readonly parameterResolverFactory: ParameterResolverFactory) {
  }

  public static inspectType(handlerType: Type<any>, parameterResolverFactory: ParameterResolverFactory, messageHandlerProxyFactory: MessageHandlerProxyFactory): DecoratedHandlerInspector {
    return DecoratedHandlerInspector._createInspector(handlerType, parameterResolverFactory, new Map<Type<any>, DecoratedHandlerInspector>(), messageHandlerProxyFactory);
  }

  private static _createInspector(inspectedType: Type<any>, parameterResolverFactory: ParameterResolverFactory, registry: Map<Type<any>, DecoratedHandlerInspector>, messageHandlerProxyFactory: MessageHandlerProxyFactory): DecoratedHandlerInspector {
    let inspector = registry.get(inspectedType);
    if (!inspector) {
      inspector = DecoratedHandlerInspector._initialize(inspectedType, parameterResolverFactory, registry, messageHandlerProxyFactory);
      registry.set(inspectedType, inspector);
    }

    return inspector;
  }

  private static _initialize(inspectedType: Type<any>, parameterResolverFactory: ParameterResolverFactory, registry: Map<Type<any>, DecoratedHandlerInspector>, messageHandlerProxyFactory: MessageHandlerProxyFactory): DecoratedHandlerInspector {
    
    const parentType = Object.getPrototypeOf(inspectedType)
    var parentInspector = (parentType !== FUNCTION_PROTOTYPE) 
      ? DecoratedHandlerInspector._createInspector(parentType, parameterResolverFactory, registry, messageHandlerProxyFactory)
      : undefined;

    const inspector = new DecoratedHandlerInspector(inspectedType, parentInspector, parameterResolverFactory);
    inspector._initializeMessageHandlers(parameterResolverFactory, messageHandlerProxyFactory);
    return inspector;
  }

  
  /**
   * Returns a list of detected members of the inspected entity that are capable of handling certain messages.
   *
   * @return a list of detected message handlers
   * @deprecated use {@link #getAllHandlers()} or {@link #getHandlers(Class)} instead
   */
  public get handlers(): MessageHandlerProxy<any>[] {
    throw Error('Not implemented');
  }

  private _initializeMessageHandlers(parameterResolverFactory: ParameterResolverFactory, messageHandlerProxyFactory: MessageHandlerProxyFactory) {
    
  }
} 