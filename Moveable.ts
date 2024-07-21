namespace EisDealer {
    export abstract class Moveable extends Drawable {
        constructor(public x: number, public y: number) {
            super();
        }
    
        move(): void {
            // Movement logic (placeholder)
            this.x += 1;
            this.y += 0;
        }
    }
}