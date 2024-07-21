namespace EisDealer {
    export abstract class Drawable {
        abstract draw(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void;
    }
}