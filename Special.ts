namespace EisDealer {
    export class Special extends Drawable {
        constructor(public name: string, public price: number, public drawFunction: (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => void) {
            super();
        }

        draw(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
            this.drawFunction(ctx, x, y, width, height);
        }

        static drawSpecials(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, specials: Special[]): void {
            let menuWidth = canvasWidth / 3;
            let columnWidth = menuWidth / 4;
            let rowHeight = canvasHeight / 5;
            let margin = 10;
            let extraBottomMargin = 40;

            let currentCol = 2;
            let currentRow = 1;

            specials.forEach((special) => {
                let x = currentCol * columnWidth + margin;
                let y = currentRow * rowHeight + margin;
                let width = columnWidth - 2 * margin;
                let height = rowHeight - margin - extraBottomMargin;

                special.draw(ctx, x, y, width, height);

                ctx.fillStyle = 'white';
                ctx.font = '16px Arial';
                ctx.textAlign = 'center';
                let textX = x + width / 2;
                let textY = y + height + 20;
                ctx.fillText(special.name, textX, textY);

                currentCol++;
                if (currentCol > 3) {
                    currentCol = 0;
                    currentRow++;
                }
            });
        }

        isClicked(x: number, y: number, index: number, canvasWidth: number, canvasHeight: number): boolean {
            let menuWidth = canvasWidth / 3;
            let columnWidth = menuWidth / 4;
            let rowHeight = canvasHeight / 5;
            let margin = 10;

            let currentCol = (index + 2) % 4;
            let currentRow = 1 + Math.floor((index + 2) / 4);

            let boxX = currentCol * columnWidth + margin;
            let boxY = currentRow * rowHeight + margin;
            let boxWidth = columnWidth - 2 * margin;
            let boxHeight = rowHeight - margin;

            return x > boxX && x < boxX + boxWidth && y > boxY && y < boxY + boxHeight;
        }
    }
}