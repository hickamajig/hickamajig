import { Type } from '@dendritic/common';
import 'reflect-metadata';
import { HANDLER_METADATA_KEY } from './constants';

import { HandlerMetadata } from './handler-metadata';

/**
 * Decorator used to decorate methods which can handle events. The parameters of the decorated method are 
 * resolved using parameter resolvers.
 * 
 * @param eventHandler decorator parameters.
 */
export function makeHandlerDecorator(handlerType: symbol) {
  return (handler: { payloadType: Type<any> }): (target: any, propertyKey: string | symbol) => void => {
    return (target: any, propertyKey: string | symbol): void => {
      const handlersMetadata: HandlerMetadata[] = Reflect.getMetadata(HANDLER_METADATA_KEY, target) || []; 
      handlersMetadata.push({
        propertyKey: propertyKey,
        payloadType: handler.payloadType,
        handlerType
      });
      
      Reflect.defineMetadata(HANDLER_METADATA_KEY, handlersMetadata, target);
    } 
  }
}

// function getEventHandlerMetadata(target: any, propertyKey: string | symbol): EventHandlerMetadata | undefined {
//   const handlersMetadata: EventHandlerMetadata[] = Reflect.getMetadata(EVENT_SOURCING_HANLDERS_METADATA_KEY, target); 
//   return handlersMetadata && handlersMetadata.find(handlerMetadata => handlerMetadata.handlerPropertyKey === propertyKey);
// }
