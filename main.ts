
namespace EisDealer {
    // DEFINIEREN DES NAMENS DER EISDIELE
    // Abrufen des Namens aus dem localStorage

    let ParlourName = localStorage.getItem('ParlourName');

    window.addEventListener('load', function () {
        if (ParlourName) {
            console.log("Der Name deiner Eisdiele lautet:", ParlourName);
        } else {
            // Falls kein Name im localStorage gefunden wurde, wird der Standardname verwendet
            ParlourName = "";
            console.log("Kein Name für die Eisdiele gefunden, Standardname wird verwendet:", ParlourName);
        }
    });

    // CANVAS ALLGEMEIN
    const canvas = <HTMLCanvasElement>document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 1280;  // Width of the canvas
    canvas.height = 720; // Height of the canvas

    let earnings = 0;
    let currentItemPrice = 0;
    let staticImageData: ImageData;

    const staticElements = new Static();
    const tablePositions = [
        { x: 650, y: 300 },
        { x: 900, y: 300 },
        { x: 1150, y: 300 },
        { x: 650, y: 550 },
        { x: 900, y: 550 },
        { x: 1150, y: 550 },
    ];   
    const menuWidth = canvas.width / 3;
    const rowHeight = canvas.height / 5;

    // Tische initialisieren
    const tables = tablePositions.map(position => ({ ...position, occupied: false }));

    const customers: Customer[] = [];

    function addCustomer() {
        const newCustomer = new Customer(canvas.width - 50, rowHeight - 80);
        customers.push(newCustomer);
        console.log("Neuer Kunde hinzugefügt:", newCustomer);
    }

    setInterval(addCustomer, 3000);

    



   



    // Debugging-Informationen
    console.log("Initialisierte Kunden:", customers);

    








    // EISSORTEN + SPECIALS
    const iceCreams: IceCream[] = [
        new IceCream("Vanille", 1.5, "#FDF2CC"),
        new IceCream("Schokolade", 1.8, "#84563C"),
        new IceCream("Zitrone", 1.7, "#fff700"),
        new IceCream("Waldmeister", 2.0, "#8B9916"),
        new IceCream("Erdbeere", 1.6, "#FB2943"),
        new IceCream("Joghurt", 1.5, "#F1F3F4"),
        new IceCream("Mango", 1.6, "#F4BB44"),
        new IceCream("Blaubeere", 1.6, "#4F86F7")
    ];

    const specials: Special[] = [
        new Special("Kirsche", 0.5, (ctx, x, y, width, height) => {
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
        new Special("Keksflocken", 0.5, (ctx, x, y, width, height) => {
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
        new Special("Schokodrops", 0.5, (ctx, x, y, width, height) => {
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
        new Special("Streusel", 0.5, (ctx, x, y, width, height) => {
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
        new Special("Kokosraspeln", 0.5, (ctx, x, y, width, height) => {
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

                new Special('Karamellsoße', 1.0, (ctx, x, y, width, height) => {
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
        ]





    const bases: Base[] = [
        new Base("Eisbecher", 0, (ctx, x, y, width, height) => {
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
        new Base("Waffel", 0, (ctx, x, y, width, height) => {
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



    
    





//EVENT-LISTENER FÜR MAUSKLICKS
let selectedItems: Drawable[] = [];
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;
let dragStartX = 0;
let dragStartY = 0;


function calculateSelectedItemsPrice(items: Drawable[]): number {
    return items.reduce((total, item) => total + (item as any).price, 0);
}

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;


// Überprüfen, ob der Mülleimer angeklickt wurde
if (x >= staticElements.trashCanX && x <= staticElements.trashCanX + staticElements.trashCanWidth &&
    y >= staticElements.trashCanY && y <= staticElements.trashCanY + staticElements.trashCanHeight) {
    // Leeren des Arrays mit ausgewählten Elementen
    earnings -= currentItemPrice;
    selectedItems = [];
    redrawCanvas();
    staticElements.drawEarnings(ctx, canvas.width, earnings);
    return;
}




    let itemClicked = false;

    // Check if a base was clicked
    bases.forEach((base, index) => {
        if (base.isClicked(x, y, index, canvas.width, canvas.height)) {
            console.log(`${base.name} clicked`);
            selectedItems.push(base);
            itemClicked = true;
        }
    });

    // Check if a special was clicked
    specials.forEach((special, index) => {
        if (special.isClicked(x, y, index, canvas.width, canvas.height)) {
            console.log(`${special.name} clicked`);
            selectedItems.push(special);
            itemClicked = true;
        }
    });

    // Check if an ice cream was clicked
    iceCreams.forEach((iceCream, index) => {
        if (iceCream.isClicked(x, y, index, canvas.width, canvas.height)) {
            console.log(`${iceCream.name} clicked`);
            selectedItems.push(iceCream);
            itemClicked = true;
        }
    });

    if (itemClicked) {
        redrawSelectedItems();
        currentItemPrice = calculateSelectedItemsPrice(selectedItems);
        console.log("Selected Items:", selectedItems);
    }
});

canvas.addEventListener('mousedown', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (x >= 10 && x <= 70 && y >= 50 && y <= 150) {
        isDragging = true;
        dragStartX = x;
        dragStartY = y;
        dragOffsetX = x;
        dragOffsetY = y;
    }
});

canvas.addEventListener('mousemove', function(event) {
    if (isDragging) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        dragOffsetX = x;
        dragOffsetY = y;

        redrawCanvas();
        redrawSelectedItems(dragOffsetX - dragStartX, dragOffsetY - dragStartY);
    }
});



canvas.addEventListener('mouseup', function(event) {
    isDragging = false;
});

function redrawCanvas() {
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    staticElements.createTilePattern(ctx, canvas.width, canvas.height);
    staticElements.createMenu(ctx, canvas.width, canvas.height, ParlourName);
    staticElements.createSidewalk(ctx, canvas.width, canvas.height, menuWidth, rowHeight);
    staticElements.drawTrashCan(ctx, rowHeight);
    IceCream.drawIceCreamColors(ctx!, canvas.width, canvas.height, iceCreams);
    Base.drawBases(ctx!, canvas.width, canvas.height, bases);
    Special.drawSpecials(ctx!, canvas.width, canvas.height, specials);
    staticElements.drawEarnings(ctx, canvas.width, earnings);
    staticElements.drawTables(ctx, tablePositions);
}

function redrawSelectedItems(offsetX: number = 0, offsetY: number = 0) {
    const margin = 10;
    const baseHeight = 80;
    const iceCreamRadius = 15;
    const initialY = canvas.height / 5 - margin;

    let baseY = initialY;
    let stackHeight = 0;

    selectedItems.forEach((item, index) => {
        if (!(item instanceof Base)) {
            const y = baseY - stackHeight - 30 + offsetY;
            if (item instanceof IceCream) {
                const x = margin + 30 + offsetX;
                ctx!.fillStyle = item.color;
                ctx!.beginPath();
                ctx!.arc(x, y - iceCreamRadius, iceCreamRadius, 0, Math.PI * 2);
                ctx!.fill();
                stackHeight += iceCreamRadius * 1.5;
                } else if (item instanceof Special) {
                const x = margin + offsetX;
                item.draw(ctx!, x, y - 20, 60, 30);
                }
                }
                });

    selectedItems.forEach((item) => {
        if (item instanceof Base) {
            const y = initialY + 20 - baseHeight + offsetY;
            const x = margin + offsetX;
            item.draw(ctx!, x, y, 60, baseHeight);
        }
    });
}
   

// Erstellen der statischen Elemente (Hintergrund, Menü, Buttons, ...)
staticElements.createTilePattern(ctx, canvas.width, canvas.height);
        staticElements.createMenu(ctx, canvas.width, canvas.height, ParlourName);

        staticElements.drawTables(ctx, tablePositions);
        staticElements.createSidewalk(ctx, canvas.width, canvas.height, menuWidth, rowHeight);
        staticElements.drawTrashCan(ctx, rowHeight);

        // Zeichne Eiscreme und Specials
    IceCream.drawIceCreamColors(ctx!, canvas.width, canvas.height, iceCreams);
    Base.drawBases(ctx!, canvas.width, canvas.height, bases);
    Special.drawSpecials(ctx!, canvas.width, canvas.height, specials);
    console.log("Angebot:", iceCreams);
    console.log("Specials", specials);


        // Speichern des Bildes der statischen Elemente
      staticImageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);











      function update() {
        ctx!.putImageData(staticImageData, 0, 0);
        staticElements.drawEarnings(ctx, canvas.width, earnings);
    
        customers.forEach((customer, index) => {
            customer.move();
            customer.draw(ctx!);
    
            if (customer.arrived && !customer.hasTable) {
                const freeTable = tables.find(table => !table.occupied);
                if (freeTable) {
                    customer.targetX = freeTable.x;
                    customer.targetY = freeTable.y;
                    customer.hasTable = true;
                    customer.arrived = false;
                    customer.waiting = false;
                    freeTable.occupied = true;
    
                    setTimeout(() => {
                        const idx = customers.indexOf(customer);
                        if (idx > -1) {
                            customers.splice(idx, 1);
                            freeTable.occupied = false;
                            moveWaitingCustomerToTable();
                        }
                    }, 35000);
                } else {
                    customer.waiting = true;
                    customer.targetX = 450 + index * 40;
                    customer.targetY = rowHeight - 80;
                }
            }
        });
    
        let waitingIndex = 0;
        customers.forEach(customer => {
            if (customer.waiting) {
                customer.targetX = 450 + waitingIndex * 80;
                customer.targetY = rowHeight - 80;
                waitingIndex++;
            }
        });
    
        if (isDragging) {
            const rect = canvas.getBoundingClientRect();
            const x = dragOffsetX - rect.left;
            const y = dragOffsetY - rect.top;
            redrawSelectedItems(x, y);
        } else {
            redrawSelectedItems();
        }
    
        requestAnimationFrame(update);
    }
    
    function moveWaitingCustomerToTable() {
        const waitingCustomer = customers.find(customer => customer.waiting);
        if (waitingCustomer) {
            const freeTable = tables.find(table => !table.occupied);
            if (freeTable) {
                waitingCustomer.targetX = freeTable.x;
                waitingCustomer.targetY = freeTable.y;
                waitingCustomer.hasTable = true;
                waitingCustomer.waiting = false;
                freeTable.occupied = true;
                waitingCustomer.arrived = false;
                setTimeout(() => {
                    const idx = customers.indexOf(waitingCustomer);
                    if (idx > -1) {
                        customers.splice(idx, 1);
                        freeTable.occupied = false;
                        moveWaitingCustomerToTable();
                    }
                }, 35000);
            }
        }
    }
    
    update();


}
