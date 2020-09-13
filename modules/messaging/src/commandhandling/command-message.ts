import { Message } from '../messaging/message';

/**
 * Represents a Message carrying a command as its payload. 
 * A command represents an intention to change application or system state.
 */
export interface CommandMessage<TPayload> extends Message<TPayload> {
  /**
   * Name of command to execute.
   * This field indicates what is to be done by the command handler.
   */
  readonly commandName: string;
}