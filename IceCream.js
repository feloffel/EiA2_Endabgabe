"use strict";
var EisDealer;
(function (EisDealer) {
    class IceCream extends EisDealer.Drawable {
        name;
        price;
        color;
        constructor(name, price, color) {
            super();
            this.name = name;
            this.price = price;
            this.color = color;
        }
        draw(ctx, x, y, width, height) {
            const radius = Math.min(width, height) / 2;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
            ctx.fill();
        }
        static drawIceCreamColors(ctx, canvasWidth, canvasHeight, iceCreams) {
            const columnWidth = canvasWidth / 3 / 4;
            const rowHeight = canvasHeight / 5;
            const margin = 10;
            const extraBottomMargin = 40;
            for (let row = 1; row < 5; row++) {
                for (let col = 0; col < 4; col++) {
                    if (row > 2) {
                        const x = col * columnWidth + margin;
                        const y = row * rowHeight + margin;
                        const width = columnWidth - 2 * margin;
                        const height = rowHeight - margin - extraBottomMargin;
                        const colorIndex = (row - 3) * 4 + col;
                        if (colorIndex < iceCreams.length) {
                            ctx.fillStyle = iceCreams[colorIndex].color;
                        }
                        else {
                            ctx.fillStyle = 'white';
                        }
                        ctx.fillRect(x, y, width, height);
                        if (colorIndex < iceCreams.length) {
                            ctx.fillStyle = 'white';
                            ctx.font = '16px Arial';
                            ctx.textAlign = 'center';
                            const textX = x + width / 2;
                            const textY = y + height + 20;
                            ctx.fillText(iceCreams[colorIndex].name, textX, textY);
                        }
                    }
                }
            }
        }
        isClicked(x, y, index, canvasWidth, canvasHeight) {
            const menuWidth = canvasWidth / 3;
            const rowHeight = canvasHeight / 5;
            const col = index % 4;
            const row = 3 + Math.floor(index / 4); // 3 + row position because IceCreams start from 4th row
            const boxX = col * (menuWidth / 4);
            const boxY = row * rowHeight;
            const boxWidth = menuWidth / 4;
            const boxHeight = rowHeight;
            return x > boxX && x < boxX + boxWidth && y > boxY && y < boxY + boxHeight;
        }
    }
    EisDealer.IceCream = IceCream;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=IceCream.js.map