import { Type } from '@goldsam/eventi-common';
import 'reflect-metadata';

import { EventHandlerMetadata } from './event-handler-metadata.interface';

const EVENT_SOURCING_HANLDERS_METADATA_KEY = Symbol("EventSourcingHandlerMetadata");

/**
 * {@link EventHandler} decorator parameters.
 */
export interface EventHandler {
  /**
   * Event payload type.
   */
  payloadType: Type<any>;
}

/**
 * Decorator used to decorate methods which can handle events. The parameters of the decorated method are 
 * resolved using parameter resolvers.
 * 
 * @param eventHandler decorator parameters.
 */
export function EventHandler(eventHandler: EventHandler): (target: any, propertyKey: string | symbol) => void {
  return (target: any, propertyKey: string | symbol): void => {
    const eventSourcingHandlersMetadata: EventHandlerMetadata[] = Reflect.getMetadata(EVENT_SOURCING_HANLDERS_METADATA_KEY, target) || []; 
    eventSourcingHandlersMetadata.push({
      handlerPropertyKey: propertyKey,
      payloadType: eventHandler.payloadType,
    });
    
    Reflect.defineMetadata(EVENT_SOURCING_HANLDERS_METADATA_KEY, eventSourcingHandlersMetadata, target);
  } 
}

function getEventHandlerMetadata(target: any, propertyKey: string | symbol): EventHandlerMetadata | undefined {
  const handlersMetadata: EventHandlerMetadata[] = Reflect.getMetadata(EVENT_SOURCING_HANLDERS_METADATA_KEY, target); 
  return handlersMetadata && handlersMetadata.find(handlerMetadata => handlerMetadata.handlerPropertyKey === propertyKey);
}
