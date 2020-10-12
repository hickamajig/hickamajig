import { Type } from '@goldsam/eventi-common';

import { Message } from './message.interface';
import { ParameterResolver } from './parameter-resolver.interface';

export class PayloadParameterResolverFactory<TPayload> implements ParameterResolver<TPayload> {
  constructor(public readonly supportedPayloadType: Type<TPayload>) {}

  resolveParameterValue(message: Message<any>): TPayload | undefined {
    return message.payload;
  }

  matches(message: Message<any>): boolean {
    return !!message.payload && message.payload instanceof this.supportedPayloadType;
  }
}

