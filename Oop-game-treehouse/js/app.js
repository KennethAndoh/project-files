/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

game = new Game();

 //give user the ablity to create there own phrase
 phraseInputField.focus()
 submitButton.addEventListener("click", () => {
    phraseArray.push(phraseInputField.value)  
    phraseInputField.value = ""
 })

 //Add a click event listener to the "Start Game" button which creates a new Game object and starts the game by calling the startGame() method.
 startButton.addEventListener("click", () => { 
    //game state
    if(firstGame){   
        firstGame = false
    } else {
        game.reset()
    }
    //create a new instance of the Game class and add event listeners for the start button and onscreen keyboard buttons.
    game = new Game();
    game.startGame();
}); 

//Add click event listeners to each of the onscreen keyboard buttons, so that clicking a button calls the handleInteraction() method on the Game object. Event delegation can also be used in order to avoid having to add an event listener to each individual keyboard button. Clicking the space between and around the onscreen keyboard buttons should not result in the handleInteraction() method being called.
keys.forEach(key => {
    key.addEventListener("click", (event) => { 
        // Disable the selected letter’s onscreen keyboard button.
        event.target.disabled = true;
        const letterPressed = event.target.innerHTML;
        game.handleInteraction(letterPressed)
        
    });  
})

const qwertyClick = (event) => {
    game.handleInteraction(event.key);
    //event.key.removeEventListener("keypress", qwertyClick, false);
    
}

//create a keyboard input

document.addEventListener("keyup", qwertyClick, false);


