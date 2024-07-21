"use strict";
//Abfrage des Namens der Eisdiele + speichern in einer Variablen
function getParlourName() {
    let ParlourName = prompt("Wie soll deine Eisdiele heißen?");
    // Falls der Benutzer den Prompt abbricht, kann userInput null sein. Hier behandeln wir diesen Fall.
    if (ParlourName === null) {
        return "Eingabe inkorrekt, Bitte versuche es erneut!";
    }
    // Gibt den eingegebenen Text zurück
    console.log(ParlourName);
    return ParlourName;
}
//# sourceMappingURL=index.js.map