import {Base} from '@abstracts';
import {Cell} from '@interfaces';
import BoardCell from './BoardCell';
import {random} from '@helpers/common';
import Snake from '@components/Snake/Snake';

class Board extends Base {
  rows: number;
  cols: number;

  cells: BoardCell[];
  snake: Snake | null;

  constructor(ctx: typeof Base.prototype.ctx) {
    super(ctx);

    this.rows = 15;
    this.cols = 15;

    this.cells = [];
    this.snake = null;

    // Setup cells
    if (this.ctx) {
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          const cell = new BoardCell(this.ctx);

          const cellWidth = cell.width + 1;
          const cellHeight = cell.height + 1;
          const offsetX = (this.ctx.canvas.width - cellWidth * this.cols) / 2;
          const offsetY = (this.ctx.canvas.height - cellHeight * this.rows) / 2;

          cell.setRow(row);
          cell.setCol(col);
          cell.setX(col * cellWidth + offsetX);
          cell.setY(row * cellHeight + offsetY);

          this.cells.push(cell);
        }
      }
    }
  }

  setSnake = (snake: Snake) => {
    this.snake = snake;
  };

  getBombCells = () => {
    return this.cells.filter((cell) => {
      return cell.bomb;
    });
  };

  getAvailableCells = () => {
    if (!this.snake) {
      throw new Error('Need to set snake before creating food!');
    }

    return this.cells.filter((cell) => {
      const hasFood = cell.food;
      const hasBomb = cell.bomb;
      const hasSnakeCell = (this.snake as Snake).hasCell(cell);

      return !hasFood && !hasBomb && !hasSnakeCell;
    });
  };

  createFood = () => {
    const pool = this.getAvailableCells();
    const randomIdx = random(0, pool.length - 1);
    const randomCell = pool[randomIdx];

    randomCell.createFood();
  };

  removeAllBombs = () => {
    for (const cell of this.getBombCells()) {
      cell.removeBomb();
    }
  };

  createBomb = () => {
    const pool = this.getAvailableCells();
    const randomIdx = random(0, pool.length - 1);
    const randomCell = pool[randomIdx];

    randomCell.createBomb();
  };

  getCell = ({row, col}: Cell) => {
    return this.cells.find((cell) => {
      return cell.row === row && cell.col === col;
    });
  };

  render = () => {
    if (!this.ctx) {
      throw new Error('Need to set context before rendering!');
    }

    for (let i = 0; i < this.cells.length; i++) {
      const cell = this.cells[i];
      cell.render();
    }
  };
}

export default Board;
