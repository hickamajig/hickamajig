import { Type } from '@goldsam/eventi-common';

/*
 * Event sourcing handler reflection metadata.
 */
export interface EventHandlerMetadata {
  /**
   * Property name of event handler method.
   */
  handlerPropertyKey: string | symbol;

  /**
   * Event payload type.
   */
  payloadType: Type<any>;

  /**
   * Parameter type list.
   */
  // paramterTypes: Type<any>[]; 
}
