"use strict";
var EisDealer;
(function (EisDealer) {
    // EISSORTEN können hier vom Nutzer angepasst werden. Dazu muss eine Farbe, ein Preis sowie ein Name festgelegt werden.
    EisDealer.iceCreams = [
        new EisDealer.IceCream("Vanille", 1.5, "#FDF2CC"),
        new EisDealer.IceCream("Schokolade", 1.5, "#84563C"),
        new EisDealer.IceCream("Zitrone", 1.5, "#fff700"),
        new EisDealer.IceCream("Waldmeister", 1.5, "#8B9916"),
        new EisDealer.IceCream("Erdbeere", 1.5, "#FB2943"),
        new EisDealer.IceCream("Joghurt", 1.5, "#F1F3F4"),
        new EisDealer.IceCream("Mango", 1.5, "#F4BB44"),
        new EisDealer.IceCream("Blaubeere", 1.5, "#4F86F7")
    ];
    EisDealer.specials = [
        new EisDealer.Special("Kirsche", 0.5, (ctx, x, y, width, height) => {
            ctx.fillStyle = "#ff0000";
            ctx.beginPath();
            ctx.arc(x + width * 0.4, y + height * 0.6, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + width * 0.6, y + height * 0.6, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "#006400";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x + width * 0.4, y + height * 0.6 - 10);
            ctx.lineTo(x + width * 0.5, y + height * 0.6 - 30);
            ctx.lineTo(x + width * 0.6, y + height * 0.6 - 10);
            ctx.stroke();
            ctx.fillStyle = "#006400";
            ctx.beginPath();
            ctx.moveTo(x + width * 0.5, y + height * 0.6 - 30);
            ctx.lineTo(x + width * 0.55, y + height * 0.6 - 40);
            ctx.lineTo(x + width * 0.45, y + height * 0.6 - 40);
            ctx.closePath();
            ctx.fill();
        }),
        new EisDealer.Special("Keksflocken", 0.5, (ctx, x, y, width, height) => {
            ctx.fillStyle = "#d2b48c";
            const flakes = [
                { x: x + width * 0.3, y: y + height * 0.3 },
                { x: x + width * 0.5, y: y + height * 0.5 },
                { x: x + width * 0.7, y: y + height * 0.7 }
            ];
            flakes.forEach(flake => {
                ctx.beginPath();
                ctx.moveTo(flake.x - 10, flake.y - 10);
                ctx.lineTo(flake.x + 10, flake.y - 10);
                ctx.lineTo(flake.x + 10, flake.y + 10);
                ctx.lineTo(flake.x - 10, flake.y + 10);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = "#d2b48c";
                // Zacken links
                ctx.beginPath();
                ctx.moveTo(flake.x - 10, flake.y - 10);
                ctx.lineTo(flake.x - 15, flake.y - 5);
                ctx.lineTo(flake.x - 10, flake.y);
                ctx.lineTo(flake.x - 15, flake.y + 5);
                ctx.lineTo(flake.x - 10, flake.y + 10);
                ctx.closePath();
                ctx.fill();
                // Zacken rechts
                ctx.beginPath();
                ctx.moveTo(flake.x + 10, flake.y - 10);
                ctx.lineTo(flake.x + 15, flake.y - 5);
                ctx.lineTo(flake.x + 10, flake.y);
                ctx.lineTo(flake.x + 15, flake.y + 5);
                ctx.lineTo(flake.x + 10, flake.y + 10);
                ctx.closePath();
                ctx.fill();
            });
        }),
        new EisDealer.Special("Schokodrops", 0.5, (ctx, x, y, width, height) => {
            ctx.fillStyle = "#8b4513";
            const drops = [
                { x: x + width * 0.3, y: y + height * 0.3 },
                { x: x + width * 0.5, y: y + height * 0.5 },
                { x: x + width * 0.7, y: y + height * 0.7 }
            ];
            for (let drop of drops) {
                ctx.beginPath();
                ctx.arc(drop.x, drop.y, 10, 0, Math.PI * 2);
                ctx.fill();
            }
        }),
        new EisDealer.Special("Streusel", 0.5, (ctx, x, y, width, height) => {
            const colors = ['red', 'blue', 'green', 'yellow', 'pink'];
            const sprinkles = [
                { x: x + width * 0.2, y: y + height * 0.2, length: 15, angle: 0.5, color: colors[0], thickness: 2 },
                { x: x + width * 0.4, y: y + height * 0.4, length: 20, angle: 1.0, color: colors[1], thickness: 2.5 },
                { x: x + width * 0.6, y: y + height * 0.6, length: 10, angle: 1.5, color: colors[2], thickness: 1.5 },
                { x: x + width * 0.5, y: y + height * 0.3, length: 20, angle: 0.2, color: colors[3], thickness: 3 },
                { x: x + width * 0.3, y: y + height * 0.7, length: 12, angle: 0.7, color: colors[4], thickness: 2.2 }
            ];
            for (let sprinkle of sprinkles) {
                ctx.strokeStyle = sprinkle.color;
                ctx.lineWidth = sprinkle.thickness;
                ctx.beginPath();
                ctx.moveTo(sprinkle.x, sprinkle.y);
                ctx.lineTo(sprinkle.x + sprinkle.length * Math.cos(sprinkle.angle), sprinkle.y + sprinkle.length * Math.sin(sprinkle.angle));
                ctx.stroke();
            }
        }),
        new EisDealer.Special("Kokosraspeln", 0.5, (ctx, x, y, width, height) => {
            const flakeDetails = [
                { x: x + width * 0.6, y: y + height * 0.2, length: 15, angle: 0.5, thickness: 2 },
                { x: x + width * 0.4, y: y + height * 0.4, length: 20, angle: 1.0, thickness: 2.5 },
                { x: x + width * 0.6, y: y + height * 0.6, length: 10, angle: 1.5, thickness: 1.5 },
                { x: x + width * 0.5, y: y + height * 0.8, length: 25, angle: 0.2, thickness: 3 },
                { x: x + width * 0.3, y: y + height * 0.7, length: 12, angle: 0.7, thickness: 2.2 }
            ];
            for (let flake of flakeDetails) {
                ctx.save();
                ctx.translate(flake.x, flake.y);
                ctx.rotate(flake.angle);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(flake.length, 0);
                ctx.lineWidth = flake.thickness;
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.stroke();
                ctx.restore();
            }
        }),
        new EisDealer.Special('Karamellsoße', 1.0, (ctx, x, y, width, height) => {
            // Unterer Layer
            ctx.fillStyle = '#c68e17';
            ctx.beginPath();
            ctx.moveTo(x, y + height * 0.5);
            ctx.bezierCurveTo(x + width * 0.1, y + height * 0.4, x + width * 0.3, y + height * 0.4, x + width * 0.4, y + height * 0.5);
            ctx.bezierCurveTo(x + width * 0.5, y + height * 0.6, x + width * 0.7, y + height * 0.6, x + width * 0.8, y + height * 0.5);
            ctx.bezierCurveTo(x + width * 0.9, y + height * 0.4, x + width, y + height * 0.4, x + width, y + height * 0.5);
            ctx.lineTo(x + width, y + height * 0.9);
            ctx.lineTo(x, y + height * 0.9);
            ctx.closePath();
            ctx.fill();
            // Oberer Layer
            ctx.fillStyle = '#a67d3d';
            ctx.beginPath();
            ctx.moveTo(x, y + height * 0.6);
            ctx.bezierCurveTo(x + width * 0.1, y + height * 0.5, x + width * 0.3, y + height * 0.5, x + width * 0.4, y + height * 0.6);
            ctx.bezierCurveTo(x + width * 0.5, y + height * 0.7, x + width * 0.7, y + height * 0.7, x + width * 0.8, y + height * 0.6);
            ctx.bezierCurveTo(x + width * 0.9, y + height * 0.5, x + width, y + height * 0.5, x + width, y + height * 0.6);
            ctx.lineTo(x + width, y + height);
            ctx.lineTo(x, y + height);
            ctx.closePath();
            ctx.fill();
        })
    ];
    EisDealer.bases = [
        new EisDealer.Base("Eisbecher", 0, (ctx, x, y, width, height) => {
            ctx.fillStyle = "white"; // Beige Farbe für den Becher
            ctx.beginPath();
            ctx.moveTo(x + width * 0.3, y + height * 0.7); // Startpunkt unten links
            ctx.lineTo(x + width * 0.7, y + height * 0.7); // Linie nach unten rechts
            ctx.lineTo(x + width * 0.8, y + height * 0.3); // Linie zur Spitze des Bechers oben rechts
            ctx.lineTo(x + width * 0.2, y + height * 0.3); // Linie zur Spitze des Bechers oben links
            ctx.closePath();
            ctx.fill();
            // Optional: Linien des Bechers betonen
            ctx.strokeStyle = "black"; // graue Farbe für die Linien
            ctx.lineWidth = 5;
            ctx.stroke();
        }),
        new EisDealer.Base("Waffel", 0, (ctx, x, y, width, height) => {
            const waffleWidth = width * 0.6;
            const waffleHeight = height * 0.6;
            const offsetX = (width - waffleWidth) / 2;
            const offsetY = (height - waffleHeight) / 2;
            ctx.fillStyle = "#d2b48c"; // Beige Farbe für die Waffel
            ctx.beginPath();
            ctx.moveTo(x + offsetX, y + offsetY); // Startpunkt oben links
            ctx.lineTo(x + offsetX + waffleWidth, y + offsetY); // Linie nach oben rechts
            ctx.lineTo(x + offsetX + waffleWidth / 2, y + offsetY + waffleHeight); // Linie zur Spitze der Waffel unten
            ctx.closePath();
            ctx.fill();
            // Optional: Linien der Waffel betonen
            ctx.strokeStyle = "#8b4513"; // Dunkelbraune Farbe für die Linien
            ctx.lineWidth = 5;
            ctx.stroke();
        }),
    ];
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=JSON.js.map