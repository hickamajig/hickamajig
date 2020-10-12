import { Aggregate } from './aggregate-interface';

/**
 * Aggregate storage abstraction.
 *
 * @typeParam T The type of aggregate this repository stores.
 */
export interface AggregateRepository<T> {

  /**
   * Load the aggregate with the given unique identifier. No version checks are done when loading an aggregate,
   * meaning that concurrent access will not be checked for.
   *
   * @param aggregateIdentifier The identifier of the aggregate to load
   * @param expectedVersion     The expected version of the loaded aggregate
   * @return The aggregate root with the given identifier.
   *
   * @throws AggregateNotFoundException if aggregate with given id cannot be found
   */
  load(aggregateIdentifier: string, expectedVersion?: number): Aggregate<T>;
}