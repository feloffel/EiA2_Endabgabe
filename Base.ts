namespace EisDealer {
    export class Base extends Drawable {
        constructor(public name: string, public price: number, public drawFunction: (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => void) {
            super();
        }

        draw(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
            this.drawFunction(ctx, x, y, width, height);
        }

        static drawBases(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, bases: Base[]): void {
            let columnWidth = canvasWidth / 3 / 4;
            let rowHeight = canvasHeight / 5;
            let margin = 10;
            let extraBottomMargin = 40;

            bases.forEach((base, index) => {
                let col = index % 2;
                let row = 1;
                let x = col * columnWidth + margin;
                let y = row * rowHeight + margin;
                let width = columnWidth - 2 * margin;
                let height = rowHeight - margin - extraBottomMargin;

                base.draw(ctx, x, y, width, height);

                ctx.fillStyle = 'white';
                ctx.font = '16px Arial';
                ctx.textAlign = 'center';
                let textX = x + width / 2;
                let textY = y + height + 20;
                ctx.fillText(base.name, textX, textY);
            });
        }

        isClicked(x: number, y: number, index: number, canvasWidth: number, canvasHeight: number): boolean {
            let menuWidth = canvasWidth / 3;
            let columnWidth = menuWidth / 4;
            let rowHeight = canvasHeight / 5;
            let margin = 10;

            let col = index % 2;
            let row = 1;

            let boxX = col * columnWidth + margin;
            let boxY = row * rowHeight + margin;
            let boxWidth = columnWidth - 2 * margin;
            let boxHeight = rowHeight - margin;

            return x > boxX && x < boxX + boxWidth && y > boxY && y < boxY + boxHeight;
        }
    }
}