namespace EisDealer {
    export class Special extends Drawable {
        constructor(public name: string, public price: number, public drawFunction: (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => void) {
            super();
        }

        draw(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
            this.drawFunction(ctx, x, y, width, height);
        }

        static drawSpecials(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, specials: Special[]): void {
            const menuWidth = canvasWidth / 3;
            const columnWidth = menuWidth / 4;
            const rowHeight = canvasHeight / 5;
            const margin = 10;
            const extraBottomMargin = 40;

            // Startindex anpassen, damit die Specials in der zweiten Zeile und dritten Spalte beginnen
            let currentCol = 2; // dritte Spalte
            let currentRow = 1; // zweite Zeile

            specials.forEach((special) => {
                const x = currentCol * columnWidth + margin;
                const y = currentRow * rowHeight + margin;
                const width = columnWidth - 2 * margin;
                const height = rowHeight - margin - extraBottomMargin;

                special.draw(ctx, x, y, width, height);

                ctx.fillStyle = 'white';
                ctx.font = '16px Arial';
                ctx.textAlign = 'center';
                const textX = x + width / 2;
                const textY = y + height + 20;
                ctx.fillText(special.name, textX, textY);

                // Spalte erhöhen und prüfen, ob wir zur nächsten Zeile springen müssen
                currentCol++;
                if (currentCol > 3) { // Da wir 4 Spalten haben, zurück zur ersten Spalte und nächste Zeile
                    currentCol = 0;
                    currentRow++;
                }
            });
        }

        isClicked(x: number, y: number, index: number, canvasWidth: number, canvasHeight: number): boolean {
            const menuWidth = canvasWidth / 3;
            const columnWidth = menuWidth / 4;
            const rowHeight = canvasHeight / 5;
            const margin = 10;

            let currentCol = (index + 2) % 4; // Berechnung der Spalte basierend auf der Beschreibung
            let currentRow = 1 + Math.floor((index + 2) / 4); // Berechnung der Zeile basierend auf der Beschreibung

            const boxX = currentCol * columnWidth + margin;
            const boxY = currentRow * rowHeight + margin;
            const boxWidth = columnWidth - 2 * margin;
            const boxHeight = rowHeight - margin;

            return x > boxX && x < boxX + boxWidth && y > boxY && y < boxY + boxHeight;
        }
    }
}