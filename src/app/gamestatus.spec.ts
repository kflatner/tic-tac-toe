import { gameStatus } from './game/enums/gamestatus';

describe('Gamestatus', () => {
  it('should create an instance', () => {
    expect(new gameStatus()).toBeTruthy();
  });
});
