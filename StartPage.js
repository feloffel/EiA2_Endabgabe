"use strict";
var EisDealer;
(function (EisDealer) {
    let button = document.getElementById('StartButton');
    EisDealer.ParlourName = "";
    if (button) {
        // Add an event listener to the button for the 'click' event
        button.addEventListener('click', () => {
            // Ausführen der Funktion zum aufrufen des Prompt
            getParlourName();
        });
    }
    //Abfrage des Namens der Eisdiele + speichern in einer Variablen
    function getParlourName() {
        let newParlourName = prompt("Wie soll deine Eisdiele heißen? (Wenn Feld leer: Eisdiele Jelsi)");
        // Falls der Benutzer den Prompt abbricht oder nichts eingibt, wird der Standardname verwendet
        if (newParlourName === null || newParlourName.trim() === "") {
            newParlourName = "Eisdiele Jelsi";
        }
        EisDealer.ParlourName = newParlourName;
        // Speichern des Namens im localStorage
        localStorage.setItem('ParlourName', EisDealer.ParlourName);
        return EisDealer.ParlourName;
    }
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=StartPage.js.map