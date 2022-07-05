import {Base} from '@abstracts';
import SnakeCell from './SnakeCell';
import Board from '@components/Board/Board';
import BoardCell from '@components/Board/BoardCell';
import {Cell, Direction, Directions} from '@interfaces';

const ANGLE: Directions = {
  up: 0,
  down: 180,
  left: 270,
  right: 90,
};

const DIRECTION: Directions<[number, number]> = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
};

const themeAudio = require('/assets/sounds/theme.mp3');

class Snake extends Base {
  score: number;
  isMoving: boolean;
  direction: Direction;

  cells: SnakeCell[];
  board: Board | null;

  theme: HTMLAudioElement;

  constructor(ctx: typeof Base.prototype.ctx) {
    super(ctx);

    this.score = 0;
    this.isMoving = false;
    this.direction = 'up';

    this.board = null;
    this.cells = [];

    this.theme = new Audio(themeAudio);
  }

  playTheme = () => {
    this.theme.loop = true;
    this.theme.currentTime = 0;
    this.theme.play();
  };

  stopTheme = () => {
    this.theme.currentTime = 0;
    this.theme.pause();
  };

  hasCell = ({row, col}: BoardCell) => {
    return Boolean(
      this.cells.find((cell) => {
        return cell.row === row && cell.col === col;
      })
    );
  };

  syncWithBoard = (board: Board) => {
    this.board = board;

    const startCells: Cell[] = [
      {row: 7, col: 7},
      {row: 8, col: 7},
      {row: 9, col: 7},
    ];

    for (let i = 0; i < startCells.length; i++) {
      const startCell = startCells[i];
      const boardCell = this.board.getCell(startCell);

      if (boardCell) {
        const snakeCell = this.createCell(boardCell);
        this.cells.push(snakeCell);
      }
    }
  };

  move = (direction: Direction) => {
    if (!this.isMoving) {
      this.playTheme();
    }

    this.isMoving = true;

    if (
      (this.direction === 'left' && direction === 'right') ||
      (this.direction === 'right' && direction === 'left') ||
      (this.direction === 'up' && direction === 'down') ||
      (this.direction === 'down' && direction === 'up')
    ) {
      return;
    }

    this.direction = direction;
  };

  start = (failedCallback: () => void) => {
    if (!this.board) {
      throw new Error('Need to set board before starting!');
    }

    if (!this.isMoving) return;

    const nextCell = this.getNextCell();

    if (!nextCell || this.hasCell(nextCell)) {
      this.stopTheme();
      return failedCallback();
    }

    if (nextCell.bomb) {
      this.stopTheme();
      nextCell.bomb.playSound();
      return failedCallback();
    }

    const snakeCell = this.createCell(nextCell);

    this.cells.unshift(snakeCell);

    if (nextCell.food) {
      nextCell.food.playSound();
      nextCell.removeFood();

      this.board.createFood();

      this.score++;
    } else {
      this.cells.pop();
    }
  };

  createCell = (boardCell: BoardCell) => {
    const snakeCell = new SnakeCell(this.ctx);

    snakeCell.setX(boardCell.x);
    snakeCell.setY(boardCell.y);
    snakeCell.setRow(boardCell.row);
    snakeCell.setCol(boardCell.col);

    return snakeCell;
  };

  getNextCell = () => {
    if (!this.board) {
      throw new Error('Need to set board before getting next cell!');
    }

    const [rowOffset, colOffset] = DIRECTION[this.direction];

    const cell = this.cells[0];
    const row = cell.row + rowOffset;
    const col = cell.col + colOffset;

    return this.board.getCell({row, col});
  };

  render = () => {
    if (!this.ctx) {
      throw new Error('Need to set context before rendering!');
    }

    // Render head cell
    const snakeHead = this.cells[0];
    const angle = ANGLE[this.direction];

    snakeHead.renderHead(angle);

    // Render body cells
    for (let i = 1; i < this.cells.length; i++) {
      const snakeCell = this.cells[i];
      snakeCell.renderBody();
    }
  };
}

export default Snake;
