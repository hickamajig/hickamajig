import { Type } from '@dendritic/common';

/**
 * Handler method reflection metadata.
 */
export interface HandlerMetadata {
  
  /**
   * Property name of event handler method.
   */
  readonly propertyKey: string | symbol;

  /**
   * Event payload type.
   */
  readonly payloadType: Type<any>;

  /**
   * symbol indicating the handler type (e.g. Command, Query, Event, or DomainEvent). 
   */
  readonly handlerType: symbol;
}

