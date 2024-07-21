"use strict";
var EisDealer;
(function (EisDealer) {
    class Special extends EisDealer.Drawable {
        name;
        price;
        drawFunction;
        constructor(name, price, drawFunction) {
            super();
            this.name = name;
            this.price = price;
            this.drawFunction = drawFunction;
        }
        draw(ctx, x, y, width, height) {
            this.drawFunction(ctx, x, y, width, height);
        }
        static drawSpecials(ctx, canvasWidth, canvasHeight, specials) {
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
        isClicked(x, y, index, canvasWidth, canvasHeight) {
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
    EisDealer.Special = Special;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Special.js.map