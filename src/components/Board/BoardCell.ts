import Food from './Food';
import {Base} from '@abstracts';
import {createImage} from '@helpers/common';
import Bomb from './Bomb';

const cellImage = require('/assets/images/cell.svg');

class BoardCell extends Base {
  row: number;
  col: number;

  food: Food | null;
  bomb: Bomb | null;
  image: HTMLImageElement;

  constructor(ctx: typeof Base.prototype.ctx) {
    super(ctx);

    this.row = 0;
    this.col = 0;
    this.width = 28;
    this.height = 28;

    this.food = null;
    this.bomb = null;
    this.image = createImage(cellImage);
  }

  createFood = () => {
    this.food = new Food(this.ctx);

    this.food.setX(this.x);
    this.food.setY(this.y);
  };

  createBomb = () => {
    this.bomb = new Bomb(this.ctx);

    this.bomb.setX(this.x);
    this.bomb.setY(this.y);
  };

  removeFood = () => {
    this.food = null;
  };

  removeBomb = () => {
    this.bomb = null;
  };

  setRow = (row: number) => {
    this.row = row;
  };

  setCol = (col: number) => {
    this.col = col;
  };

  render = () => {
    if (!this.ctx) {
      throw new Error('Need to set context before rendering!');
    }

    // Cell
    this.ctx.drawImage(this.image, this.x, this.y);

    // Food
    if (this.food) {
      this.food.render();
    }

    // Bomb
    if (this.bomb) {
      this.bomb.render();
    }
  };
}

export default BoardCell;
