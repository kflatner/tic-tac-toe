import { Component } from '@angular/core';
import { GameLogic } from '../services/gamelogic';
import { GameStatus } from '../enums/gamestatus'; // Adjust the path based on your project structure

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  game: GameLogic = new GameLogic();
  currentPlayerMessage = '';
  playerOneScore = 0;
  playerTwoScore = 0;
  resultMessage = '';

  playerOneName = 'Player 1';
  playerTwoName = 'Player 2';

  GameStatus = GameStatus;  // Add this line to make GameStatus accessible in the template

  startGame(): void {
    this.game.gameStart();
    this.updateCurrentPlayerMessage();
  }

  clickSubfield(position: number): void {
    if (this.game.gameStatus === GameStatus.PLAYING) {
      this.game.setField(position, this.game.currentTurn);
      this.updateCurrentPlayerMessage();

      this.game.checkGameEndWinner().then((end: boolean) => {
        if (this.game.gameStatus === GameStatus.STOP && end) {
          this.resultMessage = `The Winner is ${this.game.currentTurn === 1 ? this.playerOneName : this.playerTwoName}`;
          if (this.game.currentTurn === 1) {
            this.playerOneScore++;
          } else {
            this.playerTwoScore++;
          }
        } else if (this.game.gameStatus === GameStatus.DRAW) {
          this.resultMessage = 'It\'s a Draw!';
        }
      });
    }
  }

  updateCurrentPlayerMessage(): void {
    this.currentPlayerMessage = `Current turn: ${this.game.currentTurn === 1 ? this.playerOneName : this.playerTwoName}`;
  }

  playAgain(): void {
    this.game = new GameLogic(); // Reset the game instance
    this.updateCurrentPlayerMessage();
    const subfields = document.querySelectorAll('.subfield');
    subfields.forEach((subfield: Element) => {
      subfield.classList.remove('player-one', 'player-two');
    });
    this.resultMessage = '';
  }
}
