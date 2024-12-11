import { GameStatus } from '../enums/gamestatus'; // Adjust the path as necessary

export class GameLogic {
  gamefield: number[] = Array(9).fill(0); // 0 = empty, 1 = player 1, 2 = player 2
  currentTurn: number = 1;
  gameStatus: GameStatus = GameStatus.START;

  // Start the game
  gameStart(): void {
    this.gamefield = Array(9).fill(0);
    this.currentTurn = 1;
    this.gameStatus = GameStatus.PLAYING;
  }

  // Set the field value
  setField(position: number, value: number): void {
    if (this.gamefield[position] === 0) {
      this.gamefield[position] = value;
      this.checkGameEndWinner();
      if (this.gameStatus === GameStatus.PLAYING) {
        this.changePlayer();
      }
    }
  }

  // Change the current player
  changePlayer(): void {
    this.currentTurn = this.currentTurn === 1 ? 2 : 1;
  }

  // Check if there is a winner or if the game is a draw
  async checkGameEndWinner(): Promise<boolean> {
    const winningCombinations = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal from top-left to bottom-right
      [2, 4, 6]  // Diagonal from top-right to bottom-left
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (this.gamefield[a] && this.gamefield[a] === this.gamefield[b] && this.gamefield[a] === this.gamefield[c]) {
        this.gameStatus = GameStatus.STOP;
        return true;
      }
    }

    if (!this.gamefield.includes(0)) {
      this.gameStatus = GameStatus.DRAW;
      return false;
    }

    return false;
  }
}

