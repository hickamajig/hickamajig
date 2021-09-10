import { DomainEventMessage } from '@dendritic/messaging';

export interface DomainEventStream extends AsyncIterator<DomainEventMessage<any>> {
  
}