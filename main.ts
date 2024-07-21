/*
Aufgabe: EisdealerLtd
Name: Marius Dauner
Matrikel: 275813
Datum: 12.07.24
Quellen: -
*/

namespace EisDealer {
    // DEFINIEREN DES NAMENS DER EISDIELE
    // Abrufen des Namens aus dem localStorage
    let ParlourName = localStorage.getItem('ParlourName');

    window.addEventListener('load', () => {
        if (ParlourName) {
            console.log("Der Name deiner Eisdiele lautet:", ParlourName);
        } else {
            // Falls kein Name im localStorage gefunden wurde, wird der Standardname verwendet
            ParlourName = "";
            console.log("Kein Name für die Eisdiele gefunden, Standardname wird verwendet:", ParlourName);
        }
        addCustomer();

        // Hintergrundmusik laden und abspielen
        const backgroundMusic = new Audio('sounds/background.mp3');
        backgroundMusic.loop = true; // Musik in Schleife abspielen
        backgroundMusic.play();
    });

    // CANVAS ALLGEMEIN
    const canvas = <HTMLCanvasElement>document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 1280; // Width of the canvas
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
    const tables = tablePositions.map(position => ({ ...position, occupied: false }));
    const customers: Customer[] = [];

    function addCustomer() {
        const newCustomer = new Customer(canvas.width - 50, rowHeight - 80);
        customers.push(newCustomer);
        console.log("Neuer Kunde hinzugefügt:", newCustomer);
    }

    setInterval(addCustomer, 10000);

    // Debugging-Information welche Kunden intitalisiert wurden
    console.log("Initialisierte Kunden:", customers);

    let selectedItems: Drawable[] = [];
    let isDragging = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let dragStartX = 0;
    let dragStartY = 0;

    function calculateSelectedItemsPrice(items: Drawable[]): number {
        return items.reduce((total, item) => total + (item as any).price, 0);
    }

    //EVENT-LISTENER FÜR MAUSKLICKS
    canvas.addEventListener('click', function (event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;


        // Überprüfen, ob der Mülleimer angeklickt wurde
        const trashSound = new Audio('sounds/trash.wav');

        if (x >= staticElements.trashCanX && x <= staticElements.trashCanX + staticElements.trashCanWidth &&
            y >= staticElements.trashCanY && y <= staticElements.trashCanY + staticElements.trashCanHeight) {
            trashSound.play();
            earnings -= currentItemPrice; //den Preis der ausgewählten Elemente vom Ertrag abziehen
            selectedItems = []; // Leeren des Arrays mit ausgewählten Elementen
            currentItemPrice = 0; //den aktuellen Preis auf Null setzen
            redrawCanvas();
            staticElements.drawEarnings(ctx, canvas.width, earnings);
            return;
        }

        let itemClicked = false;
        const clickSound = new Audio('sounds/click.mp3');


        //schauen ob base, icecream, special angeklickt wurde
        [bases, specials, iceCreams].forEach((items) => {
            items.forEach((item, index) => {
                if (item.isClicked(x, y, index, canvas.width, canvas.height)) {
                    console.log(`${item.name} clicked`);
                    selectedItems.push(item);
                    itemClicked = true;
                    clickSound.play();
                }
            });
        });

        if (itemClicked) {
            redrawSelectedItems();
            currentItemPrice = calculateSelectedItemsPrice(selectedItems);
            console.log("Selected Items:", selectedItems);
        }
    });

    canvas.addEventListener('mousedown', function (event) {
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

    canvas.addEventListener('mousemove', function (event) {
        if (isDragging) {
            const rect = canvas.getBoundingClientRect();
            dragOffsetX = event.clientX - rect.left - dragStartX;
            dragOffsetY = event.clientY - rect.top - dragStartY;
            redrawCanvas();
            redrawSelectedItems(dragOffsetX, dragOffsetY);
        }
    });

    const correctSound = new Audio('sounds/correct.mp3');
    const wrongSound = new Audio('sounds/wrong.mp3');

    canvas.addEventListener('mouseup', function (event) {
        isDragging = false;

        if (selectedItems.length > 0) {
            const selectedCombination = selectedItems.map(item => (item as any).name);
            customers.forEach((customer, index) => {
                if (customer.hasTable && customer.arrived && !customer.matched) {
                    const distance = Math.sqrt(
                        (event.clientX - canvas.getBoundingClientRect().left - customer.x) ** 2 +
                        (event.clientY - canvas.getBoundingClientRect().top - customer.y) ** 2
                    );
                    if (distance < 30) {
                        if (customer.checkCombination(selectedCombination)) {
                            customer.matched = true;
                            earnings += calculateSelectedItemsPrice(selectedItems);
                            staticElements.drawEarnings(ctx, canvas.width, earnings);
                            correctSound.play();
                            setTimeout(() => {
                                customers.splice(index, 1);
                                tables.forEach(table => {
                                    if (table.x === customer.targetX && table.y === customer.targetY) {
                                        table.occupied = false;
                                    }
                                });
                                moveWaitingCustomerToTable();
                            }, 5000);
                        } else {
                            customer.deleteIn = 5; //den Timer auf 5 Sekunden setzen (nach Ablauf Customer löschen)
                            wrongSound.play();
                            earnings -= currentItemPrice;
                            staticElements.drawEarnings(ctx, canvas.width, earnings);
                        }
                        selectedItems = [];
                        currentItemPrice = 0;
                        redrawCanvas();
                    }
                }
            });
        }
    });

    function redrawCanvas() {
        ctx!.putImageData(staticImageData, 0, 0);
        staticElements.drawEarnings(ctx, canvas.width, earnings);
    }

    function redrawSelectedItems(offsetX: number = 0, offsetY: number = 0) {
        const margin = 10;
        const baseHeight = 80;
        const iceCreamRadius = 15;
        const initialY = canvas.height / 5 - margin;
        let baseY = initialY;
        let stackHeight = 0;

        selectedItems.forEach((item) => {
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
    staticElements.createSidewalk(ctx, canvas.width, menuWidth, rowHeight);
    staticElements.drawTrashCan(ctx, rowHeight);

    IceCream.drawIceCreamColors(ctx!, canvas.width, canvas.height, iceCreams);
    Base.drawBases(ctx!, canvas.width, canvas.height, bases);
    Special.drawSpecials(ctx!, canvas.width, canvas.height, specials);

    // Speichern des Bildes der statischen Elemente
    staticImageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);

    function update() {
        ctx!.putImageData(staticImageData, 0, 0);
        staticElements.drawEarnings(ctx, canvas.width, earnings);

        customers.forEach((customer, index) => {
            customer.move();
            customer.draw(ctx!);

            // Kunde wird gelöscht, wenn er länger als (customer.waitTime >= xxx) Sekunden wartet oder deleteIn abgelaufen ist
            if (customer.waitTime >= 125 || (customer.deleteIn !== null && customer.deleteIn <= 0)) {
                customers.splice(index, 1);
                tables.forEach(table => {
                    if (table.x === customer.targetX && table.y === customer.targetY) {
                        table.occupied = false;
                    }
                });
                moveWaitingCustomerToTable();
            }

            // Verringern des Timer, falls der Kunde ein falsches Eis bekommen hat
            if (customer.deleteIn !== null) {
                customer.deleteIn -= 1 / 60;
            }

            if (customer.arrived && !customer.hasTable) {
                const freeTable = tables.find(table => !table.occupied);
                if (freeTable) {
                    customer.targetX = freeTable.x;
                    customer.targetY = freeTable.y;
                    customer.hasTable = true;
                    customer.arrived = false;
                    customer.waiting = false;
                    freeTable.occupied = true;
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
            }
        }
    }

    update();
}