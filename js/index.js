//constants
const WORDSTOGUEST = [
    'sad',
    'empty',
    'weak',
    'coward',
]
const LIMIT_TRIES = 6
//DOM elements
let cardWordGuess = document.getElementById('card-word-guess')
let cardInputLetters = document.getElementById('card-input-letters')
let cardCurrentTries = document.getElementById('card-current-tries')
let cardTotalTries = document.getElementById('card-total-tries')
let cardMistakes = document.getElementById('card-mistakes')
let btnRandom = document.getElementById('btn-random')
let btnReset = document.getElementById('btn-reset')
let indexToWordRandom = 0
let currentTries = 0
let currentMistakes = []
init()
function init() {
    indexToWordRandom = Math.floor(Math.random() * WORDSTOGUEST.length)
    console.log(indexToWordRandom)
    let shuffleWord = shuffleArray(WORDSTOGUEST[indexToWordRandom].split(''))
    let wordLength = shuffleWord.length
    cardTotalTries.innerHTML=wordLength
    cardCurrentTries.innerHTML = currentTries
    
    cardWordGuess.innerHTML = shuffleWord.join('')
    generateInputs(wordLength)

}

function reset() {
    currentMistakes = []
    currentTries = 0
    cardCurrentTries.innerHTML = currentTries
    cardMistakes.innerHTML = ''
    Array.from(cardInputLetters.children).forEach(e => {
        e.setAttribute('filled', false)
        e.value = ''

    })
    cardInputLetters.firstElementChild.focus()
}
//Event Listeners
btnRandom.addEventListener('click', init)
btnReset.addEventListener('click', reset)

function generateInputs(wordLength) {
    cardInputLetters.replaceChildren('')
    for (let index = 0; index < wordLength; index++) {
        let inputElement = document.createElement('input')
        inputElement.setAttribute('maxlength', 1)
        inputElement.setAttribute('filled', false)
        inputElement.setAttribute('index', index)
        inputElement.setAttribute('type', 'text')
        cardInputLetters.append(inputElement)

    }
    cardInputLetters.firstElementChild.focus()
    Array.from(cardInputLetters.childNodes).forEach(e => {
        e.addEventListener('keyup', function () {
            let inputFilled = e.getAttribute('filled')
            if (inputFilled == 'true') return
            else {
                e.setAttribute('filled', true)
                currentTries++
                let index = parseInt(e.getAttribute('index'))
                let currentLetter = WORDSTOGUEST[indexToWordRandom][index]
                if (currentLetter !== e.value) {
                    currentMistakes.push(e.value)
                }


                cardCurrentTries.innerHTML = currentTries
                cardMistakes.innerHTML = currentMistakes.join(', ')
                
                if (currentTries >= WORDSTOGUEST[indexToWordRandom].length) {
                    if (currentMistakes.length == 0) {
                        alert('🎉 Success')
                        return
                    }
                    reset()
                }
                if (e.nextSibling == null) return
                e.nextSibling.focus()
            }

        })
    })

}

function shuffleArray(array) {
    const shuffledArray = array.slice();

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
}