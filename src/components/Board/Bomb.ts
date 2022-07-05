import {Base} from '@abstracts';
import {createImage} from '@helpers/common';

const bombSound = require('/assets/sounds/bomb.mp3');
const bombImage = require('/assets/images/bomb.svg');

class Bomb extends Base {
  audio: HTMLAudioElement;
  image: HTMLImageElement;

  constructor(ctx: typeof Base.prototype.ctx) {
    super(ctx);

    this.width = 28;
    this.height = 28;

    this.audio = new Audio(bombSound);
    this.audio.volume = 0.5;

    this.image = createImage(bombImage);
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

export default Bomb;
