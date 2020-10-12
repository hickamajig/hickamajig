import { DomainEventMessage } from '@goldsam/eventi-messaging';

export interface DomainEventStream extends AsyncIterator<DomainEventMessage<any>> {
  
}