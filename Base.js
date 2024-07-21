"use strict";
var EisDealer;
(function (EisDealer) {
    class Base extends EisDealer.Drawable {
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
        static drawBases(ctx, canvasWidth, canvasHeight, bases) {
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
        isClicked(x, y, index, canvasWidth, canvasHeight) {
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
    EisDealer.Base = Base;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Base.js.map