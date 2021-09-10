import { CommandMessage } from '@dendritic/messaging';

import { VersionedAggregateIdentifier } from './versioned-aggregate-identifier.interface';

/**
 * Interface for resolving an aggregate identifier and expected version from a command that 
 * identifies the aggregate instance the command should be invoked on.
 */
export interface CommandTargetAggregateResolver {
  /**
   * Returns the Aggregate Identifier and optionally the expected version of the aggregate on which the given {@code
   * command} should be executed. The version may be {@code null} if no specific version is required.
   *
   * @param command The command from which to extract the identifier and version
   * @return a {@link VersionedAggregateIdentifier} instance reflecting the aggregate to execute the command on
   *
   * @throws IllegalArgumentException if the command is not formatted correctly to extract this information
   */
   resolveTarget<TPayload>(command: CommandMessage<TPayload>): VersionedAggregateIdentifier;
}
