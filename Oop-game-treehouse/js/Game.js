/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 //to create a Game class with methods for starting and ending the game, handling interactions, getting a random phrase, checking for a win, and removing a life from the scoreboard.
 //The class should include a constructor that initializes the following properties:
 class Game {
    constructor (missed= 0, phrases= [], activePhrase= null, healthPoints= 5) {
    //missed: used to track the number of missed guesses by the player. The initial value is 0, since no guesses have been made at the start of the game.
      this.missed = missed;
    //phrases: an array of five Phrase objects to use with the game. A phrase should only include letters and spaces— no numbers, punctuation or other special characters.
      this.phrases = phrases;
    //activePhrase: This is the Phrase object that’s currently in play. The initial value is null. Within the startGame() method, this property will be set to the Phrase object returned from a call to the getRandomPhrase() method.
      this.activePhrase = activePhrase;
    //need to chart health
      this.healthPoints = healthPoints;
    }
    startGame(){
        //hides the start screen overlay
        gameStartOverlay.style.display = "none"
        //calls the getRandomPhrase() method  &  sets the activePhrase property with the chosen phrase. It also adds that phrase to the board by calling the addPhraseToDisplay() method on the active Phrase object.
        this.createPhrases()
        this.activePhrase = this.getRandomPhrase()
        this.activePhrase.addPhraseToDisplay()
        gameStartOverlay.className = "start"
        hearts.forEach(heart => {
            heart.childNodes[0].src = "images/liveHeart.png";
         });

    }
    //need to check if we have won or not
    checkForWin(){
        let youWon = true;
        const emptyLetterBoxes = document.querySelectorAll('.letter')
    
        emptyLetterBoxes.forEach(letter => {
        let hiddentItem = letter.classList.contains("hide")
            if(hiddentItem){
                youWon = false
            }
        })
        return youWon
    }
    createPhrases(){ 
        //creates and returns an array of 5 new Phrase objects, and then set the `phrases` property to call that method.
        let myArray = phraseArray.forEach(phraseString => {
            const phraseObject = new Phrase(phraseString);
            this.phrases.push(phraseObject)
        })
    }

    
    //this method randomly retrieves one of the phrases stored in the phrases array and returns it.
    getRandomPhrase = () => this.phrases[generateRandomNumber(phraseArray.length,0)] 
       
    handleInteraction(letterPressed){
        const selectedButtonClassName = "key " + letterPressed
        const selectedButtonCollection = document.getElementsByClassName(selectedButtonClassName)
        const selectedButton = selectedButtonCollection[0];
        //we need to check how many hearts are left
        const heartsEmpty = this.healthPoints === 1; 
        //check if a element has the chosen class
        const letterHasAlreadyBeenPressed = selectedButton.classList.contains('chosen');

        // we need to check for a match this returns true on a found match
        const letterPressedMatches = game.activePhrase.checkLetter(letterPressed);
        //add chosen class to selected button
        if(!letterHasAlreadyBeenPressed){
            selectedButton.classList.add('chosen');
                if(letterPressedMatches){
                    // If the phrase includes the guessed letter, add the chosen CSS class to the selected letter's keyboard button, call the showMatchedLetter() method on the phrase, and then call the checkForWin() method. If the player has won the game, also call the gameOver() method.
                    this.activePhrase.showMatchedLetter(letterPressed)
                    if(this.checkForWin()){
                        this.gameOver()
                    }
                } else { 
                    if(heartsEmpty){
                        this.gameOver()
                    }
                    //else if there is no life left then end the game
                    selectedButton.classList.add('wrong');
                    this.removeLife()
                } 
        }
    }
    //input: 
    //if a match is found, 
    removeLife(){
        // this method removes a life from the scoreboard, by replacing one of the liveHeart.png images with a lostHeart.png image (found in the images folder) and increments the missed property. If the player has five missed guesses (i.e they're out of lives), then end the game by calling the gameOver() method.
        this.healthPoints = this.healthPoints - 1
        const amountOfHearts = this.healthPoints;
        heart(amountOfHearts).src = "images/lostHeart.png";
        //end the game when you have ran out of health
    }
    reset(){
        //remove letter boxes
        phraseContainer.innerHTML = " "
        //hides the start screen overlay
        gameStartOverlay.style.display = "none"
        //calls the getRandomPhrase() method  &  sets the activePhrase property with the chosen phrase. It also adds that phrase to the board by calling the addPhraseToDisplay() method on the active Phrase object.
        this.createPhrases()
        this.healthPoints = 5;
        gameStartOverlay.className = "start"
        hearts.forEach(heart => {
            heart.childNodes[0].src = "images/liveHeart.png";
        });
        //reset keys
        keys.forEach(key => {
            key.className = "key " + key.innerHTML
            key.disabled = false
        });
    }
    gameOver(){
        setTimeout( () => { 
            // this method displays the original start screen overlay, and depending on the outcome of the game, updates the overlay h1 element with a friendly win or loss message, and replaces the overlay’s start CSS class with either the win or lose CSS class.
            gameStartOverlay.style.display = "inline"
            // need to have a message to illustrate is some one has won or lost
            gameOverContainer.innerHTML = this.checkForWin() ? gameWinMessage : gameLoseMessage
            gameStartOverlay.className = this.checkForWin() ? "win" : "lose"
        }, 1000);
    }
 }
