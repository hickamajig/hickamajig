import { EventMessage } from '../eventhandling/event-message.interface';

/**
 * A message representing an domain event consisting of an event payload and metadata.
 * In contrast to a simple {@link EventMessage}, a {@link DomainEventMessage} contains the 
 * {@link DomainEventMessage#aggregateIdentifier identifier of the aggregate} from which it originated
 * as well as a {@link DomainEventMessage#sequenceNumber sequenceNumber} inducing an ordering
 * over all domain events originating from the same aggreate.
 * 
 * @typeParam TPayload Message payload type
 */
export interface DomainEventMessage<TPayload> extends EventMessage<TPayload> {
  
  /**
   * Sequence number inducing an ordering over all domain events originating from the same aggreate.
   */
  readonly sequenceNumber: number;

  /**
   * Identifier of the aggregate that generated this domain event. 
   */
   readonly aggregateIdentifier: string
}