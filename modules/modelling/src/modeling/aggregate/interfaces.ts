import { CommandMessage } from '@goldsam/eventi-messaging';

export interface VersionedAggregateIdentifier {
  /**
   * Identifier of the targeted Aggregate. 
   */
  identifier: string;

  /**
   * Version of the targeted Aggregate, or {@code undefined} if the version is irrelevant.
   */
  version: number | undefined;
}

/**
 * Resolve an aggregate identifier and version from a command that identifies the aggregate
 * instance the command should be invoked on.
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
