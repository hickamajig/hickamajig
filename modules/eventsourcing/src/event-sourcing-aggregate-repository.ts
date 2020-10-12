import { Aggregate, AggregateRepository } from '@goldsam/eventi-modelling';

import { AggregateFactory } from './aggregate-factory.interface';
import { EventStore } from './event-store.interface'; 

export class EventSourcingAggregateRepository<TAggreateRoot> implements AggregateRepository<TAggreateRoot> {

  public constructor(
    private _eventStore: EventStore, 
    private _aggregateFactory: AggregateFactory<TAggreateRoot>) 
  {}

  load(aggregateIdentifier: string, expectedVersion?: number): Aggregate<TAggreateRoot> {
    throw new Error('Method not implemented.');
  }
}