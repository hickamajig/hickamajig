import { Message } from '@dendritic/messaging';
import { Type } from '@dendritic/common';

/**
 * Represents an aggreate root. 
 * Implementations of this interface defer the actual handling of commands 
 * to a wrapped instance of type {@code TAggregateRoot} or one of its entities.
 * 
 * When a command is dispatched to an aggregate, the aggregate instance is loaded and 
 * the related command handler method is invoked. 
 *
 * @typeParam TAggregateRoot The aggregate root type
 */
export interface Aggregate<TAggregateRoot> {

    /**
     * The string representation of this aggregate's type. 
     */
    readonly type: string 

    /**
     * The unique identifier of this aggregate, represented as a string.
     */
    readonly identifier: any;

    // /**
    //  * Get the unique identifier of this aggregate
    //  *
    //  * @return The aggregate's identifier
    //  */
    // Object identifier();

    /**
     * This aggregate's version.
     * For event sourced aggregates, this is identical to the sequence number of the last applied event.
     */
    readonly version: number;

    /**
     * Handle the given {@code message} on the aggregate root or one of its child entities.
     *
     * @param message The message to be handled by the aggregate
     * @return The result of message handling. Might returns {@code null} if for example handling a
     * {@link CommandMessage} yields no results
     *
     * @throws Exception in case one is triggered during message processing
     */
    handle<TMessagePayload>(message: Message<TMessagePayload> ): any | null;

    // /**
    //  * Invoke a method on the underlying aggregate root or one of its instances. Use this over {@link
    //  * #execute(Consumer)} to obtain an invocation result, for instance in order to query the aggregate.
    //  * <p>
    //  * Note that the use of this method is not recommended as aggregates are not meant to be queried. Relying on this
    //  * method is commonly a sign of design smell.
    //  *
    //  * @param invocation The function that performs the actual invocation
    //  * @param <R>        The type of the result produced by the given invocation
    //  * @return The invocation result
    //  */
    // <R> R invoke(Function<T, R> invocation);

    /**
     * Execute a method on the underlying aggregate or one of its instances.
     *
     * Note that the use of this method is not recommended as the wrapped aggre
     * gate instance is not meant to be exposed. Relying on this method is 
     * commonly a sign of design smell.
     *
     * @param invocationCallback The function that performs the invocation
     */
    execute(invocationCallback: (aggregateRoot: TAggregateRoot) => void): void 

    /**
     * Check if this aggregate has been deleted. 
     * This is checked by aggregate repositories when an aggregate is loaded.
     * In case the repository is asked to load a deleted aggregate the repository 
     * will refuse by throwing an {@link AggregateDeletedError}.
     *
     * @return {@code true} in case the aggregate was deleted, {@code false} otherwise
     */
    readonly isDeleted: boolean;

    /**
     * The type of the wrapped aggregate root that this {@link Aggregate} defers to for command handling.
     */
    rootType: Type<TAggregateRoot>;
}
