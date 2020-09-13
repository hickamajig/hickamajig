import { TargetAggregateIdentifier, TargetAggregateVersion, DecoratorCommandTargetAggregateResolver } from './target-aggregate-identifier.decorator';
import { CommandMessage } from '@goldsam/eventi-messaging';

class MyCommandPayload {

  constructor(initializer?: Partial<MyCommandPayload>) {
    Object.assign(this, initializer);
  }

  @TargetAggregateIdentifier()
  public aggregateIdentifier: string = '';

  @TargetAggregateVersion()
  public aggregateVersion: number = 0;
}

const expectedAggregateIdentifier = 'aggregate-123';
const expectedAggregateVersion = 7;

describe('TargetAggregateIdentifier', () => {

  describe('given an intance of a command type with fields decorated with TargetAggregateIdentifier and TargetAggregateVersion', () => {
    const command: CommandMessage<MyCommandPayload> = {
      commandName: '',
      identifier: 'my-message',
      metadata: {},
      payload: new MyCommandPayload({
        aggregateIdentifier: expectedAggregateIdentifier,
        aggregateVersion: expectedAggregateVersion
      })
    };

    describe('when DecoratorCommandTargetAggregateResolver.resolveTarget is invoked on that command', () => {
      const versionedAggregateId = DecoratorCommandTargetAggregateResolver.instance.resolveTarget(command);
      it('then the result should contain the expected aggregate identifier', () => {
        expect(versionedAggregateId.identifier).toBe(expectedAggregateIdentifier);
      });

      it('then the result should contain the expected aggregate version', () => {
        expect(versionedAggregateId.version).toBe(expectedAggregateVersion);
      });
    });
  });
});
