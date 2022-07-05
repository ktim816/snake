import {Base} from '@abstracts';
import {createImage} from '@helpers/common';

const headImage = require('/assets/images/head.svg');
const bodyImage = require('/assets/images/body.svg');

class SnakeCell extends Base {
  row: number;
  col: number;

  head: HTMLImageElement;
  body: HTMLImageElement;

  constructor(ctx: typeof Base.prototype.ctx) {
    super(ctx);

    this.row = 0;
    this.col = 0;
    this.width = 28;
    this.height = 28;

    this.head = createImage(headImage);
    this.body = createImage(bodyImage);
  }

  setRow = (row: number) => {
    this.row = row;
  };

  setCol = (col: number) => {
    this.col = col;
  };

  renderHead = (degree: number) => {
    this.drawImage(this.head, degree);
  };

  renderBody = () => {
    if (!this.ctx) {
      throw new Error('Need to set context before rendering!');
    }

    this.ctx.drawImage(this.body, this.x, this.y);
  };

  /**
   * @deprecated The method should not be used
   */
  render = (image: HTMLImageElement) => {
    if (!this.ctx) {
      throw new Error('Need to set context before rendering!');
    }

    this.ctx.drawImage(image, this.x, this.y);
  };
}

export default SnakeCell;
