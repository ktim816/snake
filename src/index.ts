import Background from '@components/Background';
import Board from '@components/Board/Board';
import Snake from '@components/Snake/Snake';

class Game {
  isPaused: boolean;
  frame: number | null;

  snake: Snake;
  board: Board;
  background: Background;

  ctx: CanvasRenderingContext2D | null;

  constructor(public canvas: HTMLCanvasElement) {
    this.frame = null;
    this.isPaused = false;

    this.ctx = this.canvas.getContext('2d');

    this.board = new Board(this.ctx);
    this.snake = new Snake(this.ctx);
    this.background = new Background(this.ctx);

    // Board setups
    this.board.setSnake(this.snake);
    this.board.createFood();
    this.board.createBomb();

    setInterval(() => {
      if (this.snake.isMoving) {
        this.board.removeAllBombs();
        this.board.createBomb();
      }
    }, 3000);

    // Snake setups
    this.snake.syncWithBoard(this.board);

    setInterval(() => {
      this.snake.start(this.failed);
    }, 300);

    // Setup font
    if (this.ctx) {
      this.ctx.font = '28px Cactus';
      this.ctx.fillStyle = '#fff';
    }

    // Setup listeners
    window.addEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        this.snake.move('up');
        break;

      case 'ArrowDown':
        this.snake.move('down');
        break;

      case 'ArrowLeft':
        this.snake.move('left');
        break;

      case 'ArrowRight':
        this.snake.move('right');
        break;
    }
  };

  clearRect = () => {
    if (!this.ctx) {
      throw new Error('Need to set context before clear canvas!');
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  render = () => {
    if (!this.ctx) {
      throw new Error('Need to set context before rendering!');
    }

    // Clear canvas
    this.clearRect();

    // Background
    this.background.render();

    // Board
    this.board.render();

    // Snake
    this.snake.render();

    // Text
    this.ctx.fillText(`Score: ${this.snake.score}`, 30, 50);
  };

  start = () => {
    if (this.isPaused) {
      return cancelAnimationFrame(this.frame as number);
    }

    this.render();
    this.frame = requestAnimationFrame(this.start);
  };

  end = (message: string) => {
    this.isPaused = true;
    window.location.reload();
    alert(message);
  };

  win = () => {
    this.end('Вы выйграли!');
  };

  failed = () => {
    this.end('Вы проиграли!');
  };
}

const canvas = document.getElementById('game') as HTMLCanvasElement;
const game = new Game(canvas);

game.start();
