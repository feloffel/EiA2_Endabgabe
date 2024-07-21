namespace EisDealer {
    export class Customer extends Moveable {
        targetX: number;
        targetY: number;
        hasTable: boolean;
        arrived: boolean;
        waiting: boolean;

        constructor(x: number, y: number) {
            super(x, y);
            this.targetX = x;
            this.targetY = y;
            this.hasTable = false;
            this.arrived = false;
            this.waiting = false;
        }

        draw(ctx: CanvasRenderingContext2D): void {
            const radius = 20;
            ctx.fillStyle = 'green';
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(this.x - 7, this.y - 7, 3, 0, Math.PI * 2);
            ctx.arc(this.x + 7, this.y - 7, 3, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(this.x, this.y + 5, 10, 0, Math.PI, false);
            ctx.stroke();
        }

        move(): void {
            if (!this.hasTable && !this.waiting) {
                if (this.x > 450) {
                    this.x -= 2; // Geschwindigkeit des Kunden
                } else {
                    this.arrived = true;
                }
            } else if (this.waiting) {
                // Warten, wenn kein Tisch verfügbar ist
                this.x = this.targetX;
                this.y = this.targetY;
            } else if (this.hasTable) {
                // Bewege zum Tisch
                if (this.x !== this.targetX || this.y !== this.targetY) {
                    const dx = this.targetX - this.x;
                    const dy = this.targetY - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance > 1) {
                        this.x += dx / distance;
                        this.y += dy / distance;
                    } else {
                        this.x = this.targetX;
                        this.y = this.targetY;
                    }
                }
            }
        }
    }
}