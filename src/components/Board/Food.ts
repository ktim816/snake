import {Base} from '@abstracts';
import {createImage} from '@helpers/common';

const foodSound = require('/assets/sounds/food.mp3');
const foodImage = require('/assets/images/food.svg');

class Food extends Base {
  audio: HTMLAudioElement;
  image: HTMLImageElement;

  constructor(ctx: typeof Base.prototype.ctx) {
    super(ctx);

    this.width = 28;
    this.height = 28;

    this.audio = new Audio(foodSound);
    this.audio.volume = 0.75;

    this.image = createImage(foodImage);
  }

  playSound = () => {
    this.audio.currentTime = 0;
    this.audio.play();
  };

  render = () => {
    if (!this.ctx) {
      throw new Error('Need to set context before rendering!');
    }

    this.ctx.drawImage(this.image, this.x, this.y);
  };
}

export default Food;
