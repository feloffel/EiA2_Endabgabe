namespace EisDealer {

    let button = document.getElementById('StartButton');
    export let ParlourName: string = "";
    
    
    if (button) {
        // Add an event listener to the button for the 'click' event
        button.addEventListener('click', () => {
            // Ausführen der Funktion zum aufrufen des Prompt
            getParlourName();
        });
    
    }
    
    //Abfrage des Namens der Eisdiele + speichern in einer Variablen
    function getParlourName(): string { 
        let newParlourName = prompt("Wie soll deine Eisdiele heißen? (Wenn Feld leer: Eisdiele Jelsi)");
        
        // Falls der Benutzer den Prompt abbricht oder nichts eingibt, wird der Standardname verwendet
        if (newParlourName === null || newParlourName.trim() === "") {
            newParlourName = "Eisdiele Jelsi";
        }
    
        ParlourName = newParlourName;
        
        // Speichern des Namens im localStorage
        localStorage.setItem('ParlourName', ParlourName);
    
        return ParlourName;
    }
    
    }
    