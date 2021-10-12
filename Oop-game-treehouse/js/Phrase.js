/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

//to create a Phrase class to handle the creation of phrases.
class Phrase {
    constructor (phrase) {
        this.phrase = phrase;
    }
    //need to make sure the phrase is lowercased and free of punctuation and an array of letters
    fillterPhrase = () => phraseFillteredOfPunctuationAndLowerCase(this.phrase).split('');
    
    // When the player correctly guesses a letter, the empty box is replaced with the matched letter (see the showMatchedLetter() method below). 
    checkLetter(selectedLetter){
         let doesLetterMatch = false
         // It checks to see if the button clicked by the player matches a letter in the phrase, and then directs the game based on a correct or incorrect guess. This method should:
         const fillteredArray = this.fillterPhrase()
         fillteredArray.forEach(letter => {
            if(letter === selectedLetter.innerHTML || letter === selectedLetter){
                doesLetterMatch = true
            } 
        })
        return doesLetterMatch
    }
    //The phrase class should have these three methods
    addPhraseToDisplay(){
    // this adds letter placeholders to the display when the game starts. 
    this.fillterPhrase().forEach(item => {
        if(item === " "){
            emptySpace();
        } else {
            emptyLetterBox(item); 
        }
    })
   } 
   //need to be able to show a matched letter
   showMatchedLetter = (letterToMatch) => {
        const emptyLetterBoxes = document.querySelectorAll('.letter')
        emptyLetterBoxes.forEach(letter => {
            if (letter.classList.contains(letterToMatch)){
                letter.classList.remove("hide")
                letter.classList.add("show")
            } 
        })
    }
}
