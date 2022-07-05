import {Base} from '@abstracts';
import {createImage} from '@helpers/common';

const bgImage = require('/assets/images/background.svg');

class Background extends Base {
  image: HTMLImageElement;

  constructor(ctx: typeof Base.prototype.ctx) {
    super(ctx);

    this.image = createImage(bgImage);
  }

  render = () => {
    if (!this.ctx) {
      throw new Error('Need to set context before rendering!');
    }

    this.ctx.drawImage(this.image, this.x, this.y);
  };
}

export default Background;
