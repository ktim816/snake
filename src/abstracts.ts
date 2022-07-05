export abstract class Base {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(public ctx: CanvasRenderingContext2D | null) {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
  }

  setX = (x: number) => {
    this.x = x;
  };

  setY = (y: number) => {
    this.y = y;
  };

  render = (...args: any) => {};

  drawImage = (image: HTMLImageElement, degree: number) => {
    if (!this.ctx) return;

    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;

    // Save the original state of the context
    this.ctx.save();

    // Move the origin of coordinates to the center of the head
    this.ctx.translate(this.x + halfWidth, this.y + halfHeight);

    // Rotate the context around the center of the snake head sprite
    this.ctx.rotate((degree * Math.PI) / 180);

    // Draw the head taking into account the rotation of the context
    this.ctx.drawImage(image, -halfWidth, -halfHeight);

    // Restore the original state of the context
    this.ctx.restore();
  };
}
