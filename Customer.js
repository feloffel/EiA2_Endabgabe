"use strict";
var EisDealer;
(function (EisDealer) {
    class Customer extends EisDealer.Moveable {
        targetX;
        targetY;
        hasTable;
        arrived;
        waiting;
        iceCombination;
        matched;
        deleteIn;
        waitTime;
        constructor(x, y) {
            super(x, y);
            this.targetX = x;
            this.targetY = y;
            this.hasTable = false;
            this.arrived = false;
            this.waiting = false;
            this.iceCombination = this.generateRandomIceCombination();
            this.matched = false;
            this.deleteIn = null;
            this.waitTime = 0;
        }
        draw(ctx) {
            let radius = 30;
            let mouthType = 'smile';
            if (this.matched) {
                ctx.fillStyle = 'blue';
            }
            else if (this.deleteIn !== null || this.waitTime >= 90) {
                ctx.fillStyle = 'red';
                mouthType = 'sad';
            }
            else if (this.waitTime >= 50) {
                ctx.fillStyle = 'orange';
                mouthType = 'neutral';
            }
            else {
                ctx.fillStyle = 'green';
            }
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(this.x - 7, this.y - 7, 3, 0, Math.PI * 2);
            ctx.arc(this.x + 7, this.y - 7, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            if (mouthType === 'sad') {
                ctx.arc(this.x, this.y + 15, 10, Math.PI, 2 * Math.PI, false);
            }
            else if (mouthType === 'neutral') {
                ctx.moveTo(this.x - 10, this.y + 5);
                ctx.lineTo(this.x + 10, this.y + 5);
            }
            else {
                ctx.arc(this.x, this.y + 5, 10, 0, Math.PI, false);
            }
            ctx.stroke();
            if (this.hasTable && this.arrived) {
                ctx.font = '12px Arial';
                let padding = 10;
                let lineHeight = 16;
                let bubbleHeight = (this.iceCombination.length * lineHeight) + (padding * 2);
                let maxTextWidth = 0;
                this.iceCombination.forEach(line => {
                    let textWidth = ctx.measureText(line).width;
                    if (textWidth > maxTextWidth) {
                        maxTextWidth = textWidth;
                    }
                });
                let bubbleWidth = maxTextWidth + padding * 2;
                ctx.fillStyle = 'white';
                ctx.fillRect(this.x - bubbleWidth / 2, this.y - bubbleHeight - 40, bubbleWidth, bubbleHeight);
                ctx.strokeRect(this.x - bubbleWidth / 2, this.y - bubbleHeight - 40, bubbleWidth, bubbleHeight);
                ctx.fillStyle = 'black';
                ctx.textAlign = 'center';
                this.iceCombination.forEach((line, index) => {
                    ctx.fillText(line, this.x, this.y - bubbleHeight - 40 + padding + (index + 1) * lineHeight - 4);
                });
                ctx.textAlign = 'left';
            }
        }
        move() {
            if (!this.hasTable && !this.waiting) {
                if (this.x > 450) {
                    this.x -= 2;
                }
                else {
                    this.arrived = true;
                }
            }
            else if (this.waiting) {
                this.x = this.targetX;
                this.y = this.targetY;
            }
            else if (this.hasTable) {
                if (this.x !== this.targetX || this.y !== this.targetY) {
                    let dx = this.targetX - this.x;
                    let dy = this.targetY - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance > 1) {
                        this.x += dx / distance;
                        this.y += dy / distance;
                    }
                    else {
                        this.x = this.targetX;
                        this.y = this.targetY;
                        this.arrived = true;
                    }
                }
            }
            this.waitTime += 1 / 60;
        }
        generateRandomIceCombination() {
            let base = EisDealer.bases[Math.floor(Math.random() * EisDealer.bases.length)].name;
            let iceCreamCount = Math.floor(Math.random() * 3) + 1;
            let iceCreamsSelected = [];
            for (let i = 0; i < iceCreamCount; i++) {
                iceCreamsSelected.push(EisDealer.iceCreams[Math.floor(Math.random() * EisDealer.iceCreams.length)].name);
            }
            let special = EisDealer.specials[Math.floor(Math.random() * EisDealer.specials.length)].name;
            return [base, ...iceCreamsSelected, special];
        }
        checkCombination(selectedCombination) {
            if (this.iceCombination.length !== selectedCombination.length) {
                return false;
            }
            for (let i = 0; i < this.iceCombination.length; i++) {
                if (this.iceCombination[i] !== selectedCombination[i]) {
                    return false;
                }
            }
            return true;
        }
    }
    EisDealer.Customer = Customer;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Customer.js.map