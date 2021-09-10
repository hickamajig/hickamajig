import { EventMessage } from './event-message.interface';
import { makeHandlerDecorator } from '../messaging/decorator';

export const EventHandler = makeHandlerDecorator(EventMessage);
