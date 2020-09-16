import { CommandMessage } from '@goldsam/eventi-messaging';
import 'reflect-metadata';

import { CommandTargetAggregateResolver, VersionedAggregateIdentifier } from './interfaces';

const COMMAND_TARGET_AGGREGATE_METADATA_KEY = Symbol("CommandTargetAggregateMetadata");

/*
 * Command target reflection metadata.
 */
interface CommandTargetAggregateReflectionMetadata {
  /**
   * Property of command representing the aggregate identifier the command targets.
   */
  aggregateIdentifierPropertyKey: string | symbol;

  /**
   * Property of command representing the aggregate version the command targets.
   */
  aggregateVersionPropertyKey: string | symbol;
}

/**
 * @interal
 *  
 * Factory which creates command target metadata decorators including 
 * {@link TargetAggregateIdentifier} and {@link TargetAggregateVersion}
 * 
 * @param updater Reflection metadata updater callback.
 */
function CommandTargetAggregateMetadataDecoratorFactory(updater: (commandTargetAggregateMetadata: CommandTargetAggregateReflectionMetadata, propertyKey: string | symbol) => void): () => (target: any, propertyKey: string | symbol) => void {
  return () => {
    return (target: any, propertyKey: string | symbol): void => {
      const commandTargetAggregateMetadata: CommandTargetAggregateReflectionMetadata = Reflect.getMetadata(COMMAND_TARGET_AGGREGATE_METADATA_KEY, target) || {}; 
      updater(commandTargetAggregateMetadata, propertyKey);
      Reflect.defineMetadata(COMMAND_TARGET_AGGREGATE_METADATA_KEY, commandTargetAggregateMetadata, target);
    }
  }
}

/**
 * Property decorator that marks a property of a command representing the identifier of 
 * the aggregate that the command targets.
 */
export const TargetAggregateIdentifier = CommandTargetAggregateMetadataDecoratorFactory((commandTargetAggregateMetadata, propertyKey) => {
  commandTargetAggregateMetadata.aggregateIdentifierPropertyKey = propertyKey; 
});

/**
 * Property decorator that marks a property of a command representing the expected version of 
 * the aggregate that the command targets.
 */
export const TargetAggregateVersion = CommandTargetAggregateMetadataDecoratorFactory((commandTargetAggregateMetadata, propertyKey) => {
  commandTargetAggregateMetadata.aggregateVersionPropertyKey = propertyKey; 
});

/**
 * {@link CommandTargetAggregateResolver} which resolved a command type's target aggregate
 * metadata using reflection metadata specified using the {@link TargetAggregateIdentifier} 
 * and {@link TargetAggregateVersion} decorators.
 */
export const decoratorCommandTargetAggregateResolver: CommandTargetAggregateResolver = {

  resolveTarget<TPayload>(command: CommandMessage<TPayload>): VersionedAggregateIdentifier {  
    const payload = command.payload;
    const commandPrototype = Object.getPrototypeOf(payload);
    const commandTargetAggregateMetadata: CommandTargetAggregateReflectionMetadata = Reflect.getMetadata(COMMAND_TARGET_AGGREGATE_METADATA_KEY, commandPrototype);     
    if (!commandTargetAggregateMetadata) {
      throw new Error("Unable to resolve command target aggregate metadata.");
    }
    if (!commandTargetAggregateMetadata.aggregateIdentifierPropertyKey) {
      throw new Error("Unable to resolve command target aggregate identifier property.");
    }

    return {
      identifier: payload[commandTargetAggregateMetadata.aggregateIdentifierPropertyKey],
      version: commandTargetAggregateMetadata.aggregateVersionPropertyKey 
        ? payload[commandTargetAggregateMetadata.aggregateVersionPropertyKey]
        : undefined
    }
  }
};