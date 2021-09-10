import { Type } from '@dendritic/common';
import { Message } from '@dendritic/messaging';
import { Aggregate } from './aggregate-interface';

// export class DecoratedAggregate<TAggregateRoot> implements Aggregate<TAggregateRoot> {
//   type: string;
//   identifier: any;
//   version: number;
  
//   handle<TMessagePayload>(message: Message<TMessagePayload>) {
//     throw new Error('Method not implemented.');
//   }
  
//   execute(invocationCallback: (aggregateRoot: TAggregateRoot) => void): void {
//     throw new Error('Method not implemented.');
//   }
  
//   isDeleted: boolean;
//   rootType: Type<TAggregateRoot>;

// }