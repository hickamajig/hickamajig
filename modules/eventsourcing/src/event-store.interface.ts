import { DomainEventStream } from './domain-event-stream.interface';

export interface EventStore {

   /**
     * Returns a stream containing all domain events belonging to the given `aggregateIdentifier`.
     * 
     * The returned stream is <em>finite</em>, ending with the last known event of the aggregate. 
     * If the event store holds no events of the given aggregate an empty stream is returned.
     *
     * @param aggregateIdentifier the identifier of the aggregate whose events to fetch.
     * @param firstSequenceNumber the expected sequence number of the first event in the returned stream.
     * @return a stream of all currently stored events of the aggregate
     */
  loadEvents(aggregateIdentifier: string, firstSequenceNumber?: number): DomainEventStream;
}