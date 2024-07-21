"use strict";
var EisDealer;
(function (EisDealer) {
    class Static {
        createTilePattern(ctx, width, height) {
            const tileSize = 35;
            const tileColor1 = '#ffffff';
            const tileColor2 = '#d3d3d3';
            for (let y = 0; y < height; y += tileSize) {
                for (let x = 0; x < width; x += tileSize) {
                    ctx.fillStyle = ((x / tileSize + y / tileSize) % 2 === 0) ? tileColor1 : tileColor2;
                    ctx.fillRect(x, y, tileSize, tileSize);
                }
            }
        }
        createMenu(ctx, width, height, parlourName) {
            const MenuWidth = width / 3;
            const gradient = ctx.createLinearGradient(0, height, 0, 0);
            gradient.addColorStop(0, '#a90952');
            gradient.addColorStop(1, '#f486b1');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, MenuWidth, height);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            const columnWidth = MenuWidth / 4;
            const rowHeight = height / 5;
            for (let i = 1; i < 4; i++) {
                const x = i * columnWidth;
                ctx.beginPath();
                if (i !== 1) {
                    ctx.moveTo(x, rowHeight);
                }
                else {
                    ctx.moveTo(x, 0);
                }
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            for (let i = 1; i < 5; i++) {
                const y = i * rowHeight;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(MenuWidth, y);
                ctx.stroke();
            }
            if (parlourName) {
                ctx.fillStyle = 'white';
                ctx.font = '24px Arial';
                ctx.textAlign = 'center';
                const textX = 2.5 * columnWidth;
                const textY = rowHeight / 3;
                ctx.fillText(parlourName, textX, textY);
            }
        }
        createSidewalk(ctx, width, height, MenuWidth, rowHeight) {
            const lineStartX = width; // Startpunkt am rechten Rand des Canvas
            const lineEndX = MenuWidth + (width - MenuWidth) * 0.8 / 3; // Endpunkt bei ca. 0.8/3 des Canvas
            const lineY = rowHeight; // Höhe der Linie, gleiche Höhe wie die erste horizontale Linie
            // Oberen Teil der rechten zwei Drittel des Canvas grau einfärben
            ctx.fillStyle = '#B4ACA9';
            const startX = MenuWidth;
            const endX = width;
            const upperPartHeight = rowHeight;
            ctx.fillRect(startX, 0, endX - startX, upperPartHeight);
            // Hinzufügen eines Kachelmusters für den Gehweg
            const tileWidth = 30; // Breite der einzelnen "Pflastersteine"
            const tileHeight = 16; // Höhe der einzelnen "Pflastersteine"
            ctx.strokeStyle = '#5D5F5B'; // Farbe der Linien zwischen den "Pflastersteinen"
            ctx.lineWidth = 2;
            for (let x = startX; x < endX; x += tileWidth) {
                for (let y = 0; y + tileHeight <= upperPartHeight; y += tileHeight) {
                    ctx.strokeRect(x, y, tileWidth, tileHeight);
                }
            }
            // schwarze Linie
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 10; // Dicke der Linie
            ctx.beginPath();
            ctx.moveTo(lineStartX, lineY);
            ctx.lineTo(lineEndX, lineY);
            ctx.stroke();
        }
        drawTrashCan(ctx, rowHeight) {
            ctx.lineWidth = 3;
            const trashCanWidth = 20;
            const trashCanHeight = 20;
            const trashCanX = 130; // Abstand vom linken Rand des ersten Kastens
            const trashCanY = (rowHeight - trashCanHeight) / 1.5; // etwas unterhalb mittig in der Höhe des großen Kastens
            // Mülleimer zeichnen
            ctx.beginPath();
            ctx.rect(trashCanX, trashCanY, trashCanWidth, trashCanHeight); // Rechteck für den Mülleimer
            ctx.stroke();
            // Deckel zeichnen
            ctx.beginPath();
            ctx.rect(trashCanX - 5, trashCanY - 10, trashCanWidth + 10, 10); // Rechteck für den Deckel
            ctx.stroke();
            // Vertikale Striche im Mülleimer
            const stricheAbstand = 5;
            for (let x = trashCanX + stricheAbstand; x < trashCanX + trashCanWidth; x += stricheAbstand) {
                ctx.beginPath();
                ctx.moveTo(x, trashCanY);
                ctx.lineTo(x, trashCanY + trashCanHeight);
                ctx.stroke();
            }
        }
    }
    EisDealer.Static = Static;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Static.js.map