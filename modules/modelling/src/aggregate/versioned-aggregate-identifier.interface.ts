/**
 * Specfies an aggregate identifier and an expected aggregate version.
 */
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
