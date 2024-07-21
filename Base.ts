namespace EisDealer {
    export class Base extends Drawable {
        constructor(public name: string, public price: number, public drawFunction: (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => void) {
            super();
        }

        draw(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
            this.drawFunction(ctx, x, y, width, height);
        }

        static drawBases(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, bases: Base[]): void {
            const columnWidth = canvasWidth / 3 / 4;
            const rowHeight = canvasHeight / 5;
            const margin = 10;
            const extraBottomMargin = 40;

            bases.forEach((base, index) => {
                const col = index % 2;
                const row = 1; // Bases befinden sich in der zweiten Zeile
                const x = col * columnWidth + margin;
                const y = row * rowHeight + margin;
                const width = columnWidth - 2 * margin;
                const height = rowHeight - margin - extraBottomMargin;
    
                base.draw(ctx, x, y, width, height);
    
                ctx.fillStyle = 'white';
                ctx.font = '16px Arial';
                ctx.textAlign = 'center';
                const textX = x + width / 2;
                const textY = y + height + 20;
                ctx.fillText(base.name, textX, textY);
            });
        }
    
        isClicked(x: number, y: number, index: number, canvasWidth: number, canvasHeight: number): boolean {
            const menuWidth = canvasWidth / 3;
            const columnWidth = menuWidth / 4;
            const rowHeight = canvasHeight / 5;
            const margin = 10;
    
            const col = index % 2;
            const row = 1; // Bases befinden sich in der zweiten Zeile
    
            const boxX = col * columnWidth + margin;
            const boxY = row * rowHeight + margin;
            const boxWidth = columnWidth - 2 * margin;
            const boxHeight = rowHeight - margin;
    
            return x > boxX && x < boxX + boxWidth && y > boxY && y < boxY + boxHeight;
        }
    }
}