namespace EisDealer {
    export class Customer extends Moveable {
        targetX: number;
        targetY: number;
        hasTable: boolean;
        arrived: boolean;
        waiting: boolean;
        iceCombination: string[];
        matched: boolean;
        timeAtTable: number; // Zeit in Sekunden
        deleteIn: number | null; // Zeit in Sekunden, bis der Kunde gelöscht wird, wenn er ein falsches Eis bekommt

        constructor(x: number, y: number) {
            super(x, y);
            this.targetX = x;
            this.targetY = y;
            this.hasTable = false;
            this.arrived = false;
            this.waiting = false;
            this.iceCombination = this.generateRandomIceCombination();
            this.matched = false;
            this.timeAtTable = 0; // Initialisiere mit 0
            this.deleteIn = null; // Initialisiere mit null
        }

        draw(ctx: CanvasRenderingContext2D): void {
            const radius = 30;
            let mouthType = 'smile'; // Standard Mundtyp
        
            // Ändere die Farbe basierend auf der Zeit am Tisch
            if (this.matched) {
                ctx.fillStyle = 'blue'; // Blau für Kunden, die das richtige Eis bekommen haben
            } else if (this.deleteIn !== null || this.timeAtTable >= 190) {
                ctx.fillStyle = 'red';
                mouthType = 'sad';
            } else if (this.timeAtTable >= 100) {
                ctx.fillStyle = 'orange';
                mouthType = 'neutral';
            } else {
                ctx.fillStyle = 'green';
            }
        
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.strokeStyle = 'black'; // Setze die Umrandungsfarbe auf Schwarz
            ctx.lineWidth = 3; // Setze die Linienbreite auf 1
            ctx.stroke();
        
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(this.x - 7, this.y - 7, 3, 0, Math.PI * 2);
            ctx.arc(this.x + 7, this.y - 7, 3, 0, Math.PI * 2);
            ctx.fill();
        
            // Mund basierend auf mouthType ändern
            ctx.beginPath();
            if (mouthType === 'sad') {
                ctx.arc(this.x, this.y + 15, 10, Math.PI, 2 * Math.PI, false); // trauriger Mund
            } else if (mouthType === 'neutral') {
                ctx.moveTo(this.x - 10, this.y + 5);
                ctx.lineTo(this.x + 10, this.y + 5); // horizontaler Strich
            } else {
                ctx.arc(this.x, this.y + 5, 10, 0, Math.PI, false); // lachender Mund
            }
            ctx.stroke();
        
            if (this.hasTable && this.arrived) {
                ctx.font = '12px Arial';
                const padding = 10;
                const lineHeight = 16;
                const bubbleHeight = (this.iceCombination.length * lineHeight) + (padding * 2);
        
                let maxTextWidth = 0;
                this.iceCombination.forEach(line => {
                    const textWidth = ctx.measureText(line).width;
                    if (textWidth > maxTextWidth) {
                        maxTextWidth = textWidth;
                    }
                });
        
                const bubbleWidth = maxTextWidth + padding * 2;
        
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
                        this.arrived = true;
                    }
                } else {
                    // Kunde sitzt am Tisch und wartet
                    this.timeAtTable += 1 / 60; // Aktualisiere die Zeit (1 Sekunde = 60 Frames)
                }
            }
        }

        private generateRandomIceCombination(): string[] {
            const base = EisDealer.bases[Math.floor(Math.random() * EisDealer.bases.length)].name;
            const iceCreamCount = Math.floor(Math.random() * 3) + 1;
            const iceCreamsSelected = [];
            for (let i = 0; i < iceCreamCount; i++) {
                iceCreamsSelected.push(EisDealer.iceCreams[Math.floor(Math.random() * EisDealer.iceCreams.length)].name);
            }
            const special = EisDealer.specials[Math.floor(Math.random() * EisDealer.specials.length)].name;
            return [base, ...iceCreamsSelected, special];
        }

        checkCombination(selectedCombination: string[]): boolean {
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
}