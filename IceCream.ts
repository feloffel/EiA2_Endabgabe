namespace EisDealer {
    export class IceCream extends Drawable {
        constructor(public name: string, public price: number, public color: string) {
            super();
        }

        draw(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
            let radius = Math.min(width, height) / 2;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        static drawIceCreamColors(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, iceCreams: IceCream[]): void {
            let columnWidth = canvasWidth / 3 / 4;
            let rowHeight = canvasHeight / 5;
            let margin = 10;
            let extraBottomMargin = 40;

            for (let row = 1; row < 5; row++) {
                for (let col = 0; col < 4; col++) {
                    if (row > 2) {
                        let x = col * columnWidth + margin;
                        let y = row * rowHeight + margin;
                        let width = columnWidth - 2 * margin;
                        let height = rowHeight - margin - extraBottomMargin;

                        let colorIndex = (row - 3) * 4 + col;
                        if (colorIndex < iceCreams.length) {
                            ctx.fillStyle = iceCreams[colorIndex].color;
                        } else {
                            ctx.fillStyle = 'white';
                        }
                        ctx.fillRect(x, y, width, height);

                        if (colorIndex < iceCreams.length) {
                            ctx.fillStyle = 'white';
                            ctx.font = '16px Arial';
                            ctx.textAlign = 'center';
                            let textX = x + width / 2;
                            let textY = y + height + 20;
                            ctx.fillText(iceCreams[colorIndex].name, textX, textY);
                        }
                    }
                }
            }
        }

        isClicked(x: number, y: number, index: number, canvasWidth: number, canvasHeight: number): boolean {
            let menuWidth = canvasWidth / 3;
            let rowHeight = canvasHeight / 5;
            let col = index % 4;
            let row = 3 + Math.floor(index / 4);
            let boxX = col * (menuWidth / 4);
            let boxY = row * rowHeight;
            let boxWidth = menuWidth / 4;
            let boxHeight = rowHeight;

            return x > boxX && x < boxX + boxWidth && y > boxY && y < boxY + boxHeight;
        }
    }
}