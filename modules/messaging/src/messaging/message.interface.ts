
/**
 * {@link MessageMetadata Message metadata} value type.
 * 
 * @see {@link MessageMetadata}
 */
export type MessageMetadataValue = string | number | Date | boolean | null;

/**
 * Message key-value pair collection that is passed along with a 
 * {@link Message.payload `Message`'s payload'} in a {@link Message `Message`}. Typically, metadata 
 * contains information about the message payload that isn't 
 * "domain-specific" such originating IP-address or executing User ID.
 */
export interface MessageMetadata {
  /**
   * Metadata key-value pairs.
   */
  [key: string]: MessageMetadataValue;
}

/**
 * Represents a message consisting of a payload and metadata.
 * Typical examples of messages are commands and events.
 * 
 * @typeParam TPayload Message payload type
 */
export interface Message<TPayload> {

  /**
   * Uniquely identifies this message. 
   * Two messages with the same identifier are to be considered equivalent up to payload;
   * they may have differing metadata.
   */
  readonly identifier: string;

  /**
   * Message key-value metadata.
   */
  readonly metadata: MessageMetadata 

  /**
   * Message payload.
   */
  readonly payload: TPayload;
}
