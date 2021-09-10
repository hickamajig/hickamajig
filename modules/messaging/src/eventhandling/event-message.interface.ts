import { Message } from '../messaging/message.interface';

/**
 * A message representing an event consisting of an event payload and metadata.
 * An event represents the occurance of an action or process and contains relevant 
 * data required for compontns that need act in response to the event.   
 * 
 * @typeParam TPayload Message payload type
 */
export interface EventMessage<TPayload> extends Message<TPayload> {
  
  /**
   * Timestamp indicating the date and time at which the event was reported. 
   */
  readonly timestamp: Date;
}

export const EventMessage = Symbol('EventMessage');