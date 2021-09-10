import { Type } from '@dendritic/common';

/**
 * 
 * @typeParam TAggregateRoot The aggregate root type.
 */
export interface EntityModel<TEntity> {

  /**
   * Returns the identifier of the given {@code target} entity.
   *
   * @param target Entity instance.
   * @return The identifier of the given target entity.
   */
  getIdentifier(target: TEntity): any;

  /**
   * The name of the routing key property on commands and events that provides 
   * the identifier that should be used to target entities of the the modelled type.
   */
  readonly routingKey: string

  /**
   * Returns the entity type this model describes
   */
  readonly entityType: Type<TEntity>;
}