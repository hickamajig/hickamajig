import { DomainEventMessage } from '@dendritic/messaging';
import { Type } from '@dendritic/common';

export interface AggregateFactory<TAggreateRoot> {

  /**
   * Instantiate the aggregate root using the given aggregate identifier and 
   * first event. The first event of the event stream is passed to allow the 
   * factory to identify the actual implementation type of the aggregate to
   * create. The first event can be either the event that created the 
   * aggregate or, when using event sourcing, a snapshot event. In either 
   * case, the event should be designed, such that these events contain 
   * enough information to deduct the actual aggregate type.
   *
   * @param aggregateIdentifier the aggregate identifier of the aggregate to instantiate
   * @param firstEvent          The first event in the event stream. This is either the event generated during
   *                            creation of the aggregate, or a snapshot event
   * @return an aggregate root ready for initialization using a DomainEventStream.
   */
  createAggregateRoot(aggregateIdentifier: string, firstEvent: DomainEventMessage<any>): TAggreateRoot;
    
  /**
   * The type of aggregate this factory creates. All instances created by this factory must be of this type.
   */
  readonly aggregateType: Type<TAggreateRoot>;
}