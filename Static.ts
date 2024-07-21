namespace EisDealer {
    export class Static {
        createTilePattern(ctx: CanvasRenderingContext2D | null, width: number, height: number): void {
            let tileSize = 35;
            let tileColor1 = '#ffffff';
            let tileColor2 = '#d3d3d3';

            for (let y = 0; y < height; y += tileSize) {
                for (let x = 0; x < width; x += tileSize) {
                    ctx!.fillStyle = ((x / tileSize + y / tileSize) % 2 === 0) ? tileColor1 : tileColor2;
                    ctx!.fillRect(x, y, tileSize, tileSize);
                }
            }
        }

        createMenu(ctx: CanvasRenderingContext2D | null, width: number, height: number, parlourName: string | null): void {
            let MenuWidth = width / 3;
            let gradient = ctx!.createLinearGradient(0, height, 0, 0);
            gradient.addColorStop(0, '#a90952');
            gradient.addColorStop(1, '#f486b1');
            ctx!.fillStyle = gradient;
            ctx!.fillRect(0, 0, MenuWidth, height);

            ctx!.strokeStyle = 'black';
            ctx!.lineWidth = 1;

            let columnWidth = MenuWidth / 4;
            let rowHeight = height / 5;

            for (let i = 1; i < 4; i++) {
                let x = i * columnWidth;
                ctx!.beginPath();
                if (i !== 1) {
                    ctx!.moveTo(x, rowHeight);
                } else {
                    ctx!.moveTo(x, 0);
                }
                ctx!.lineTo(x, height);
                ctx!.stroke();
            }

            for (let i = 1; i < 5; i++) {
                let y = i * rowHeight;
                ctx!.beginPath();
                ctx!.moveTo(0, y);
                ctx!.lineTo(MenuWidth, y);
                ctx!.stroke();
            }

            if (parlourName) {
                ctx!.fillStyle = 'white';
                ctx!.font = '24px Arial';
                ctx!.textAlign = 'center';
                let textX = 2.5 * columnWidth;
                let textY = rowHeight / 3;
                ctx!.fillText(parlourName, textX, textY);
            }
        }

        createSidewalk(ctx: CanvasRenderingContext2D | null, width: number, MenuWidth: number, rowHeight: number): void {
            let lineStartX = width;
            let lineEndX = MenuWidth + (width - MenuWidth) * 0.8 / 3;
            let lineY = rowHeight;

            ctx!.fillStyle = '#B4ACA9';
            let startX = MenuWidth;
            let endX = width;
            let upperPartHeight = rowHeight;
            ctx!.fillRect(startX, 0, endX - startX, upperPartHeight);

            let tileWidth = 30;
            let tileHeight = 16;
            ctx!.strokeStyle = '#5D5F5B';
            ctx!.lineWidth = 2;

            for (let x = startX; x < endX; x += tileWidth) {
                for (let y = 0; y + tileHeight <= upperPartHeight; y += tileHeight) {
                    ctx!.strokeRect(x, y, tileWidth, tileHeight);
                }
            }

            ctx!.strokeStyle = 'black';
            ctx!.lineWidth = 10;
            ctx!.beginPath();
            ctx!.moveTo(lineStartX, lineY);
            ctx!.lineTo(lineEndX, lineY);
            ctx!.stroke();
        }
        trashCanX: number;
        trashCanY: number;
        trashCanWidth: number = 20;
        trashCanHeight: number = 20;

        drawTrashCan(ctx: CanvasRenderingContext2D | null, rowHeight: number): void {
            ctx!.lineWidth = 3;

            this.trashCanX = 130;
            this.trashCanY = (rowHeight - this.trashCanHeight) / 1.5;

            ctx!.beginPath();
            ctx!.rect(this.trashCanX, this.trashCanY, this.trashCanWidth, this.trashCanHeight);
            ctx!.stroke();

            ctx!.beginPath();
            ctx!.rect(this.trashCanX - 5, this.trashCanY - 10, this.trashCanWidth + 10, 10);
            ctx!.stroke();

            let stricheAbstand = 5;
            for (let x = this.trashCanX + stricheAbstand; x < this.trashCanX + this.trashCanWidth; x += stricheAbstand) {
                ctx!.beginPath();
                ctx!.moveTo(x, this.trashCanY);
                ctx!.lineTo(x, this.trashCanY + this.trashCanHeight);
                ctx!.stroke();
            }
        }

        drawEarnings(ctx: CanvasRenderingContext2D | null, width: number, earnings: number): void {
            let MenuWidth = width / 3;
            let rowHeight = 720 / 5;

            ctx!.fillStyle = earnings >= 0 ? 'green' : 'red';
            ctx!.font = '20px Arial';
            ctx!.textAlign = 'center';
            let textX = 2.5 * (MenuWidth / 4);
            let textY = rowHeight / 2 + 20;

            ctx!.fillText(`Ertrag: ${earnings.toFixed(2)} €`, textX, textY);
        }

        drawTables(ctx: CanvasRenderingContext2D | null, tablePositions: { x: number, y: number }[]): void {
            let tableRadius = 80;

            ctx!.fillStyle = '#8B4513';
            ctx!.strokeStyle = 'black';
            ctx!.lineWidth = 2;

            tablePositions.forEach(position => {
                ctx!.beginPath();
                ctx!.arc(position.x, position.y, tableRadius, 0, Math.PI * 2);
                ctx!.fill();
                ctx!.stroke();
            });
        }
    }
}