interface FlashCard {
  questionText: string;
  questionAnswer: string;
}

const STORAGE_KEY = "flashcards";

const defaultCards: FlashCard[] = [
  {
    questionText: "¿Cuál es la capital de Francia?",
    questionAnswer: "París",
  },
  {
    questionText: "¿Cuántos continentes hay?",
    questionAnswer: "7",
  },
];

const savedCards = localStorage.getItem(STORAGE_KEY);

const currentCards: FlashCard[] = savedCards
  ? JSON.parse(savedCards)
  : defaultCards;


const flashCard = document.querySelector<HTMLDivElement>("#flashcard");
const frontDisplay =
  document.querySelector<HTMLParagraphElement>("#front-display")!;
const backDisplay =
  document.querySelector<HTMLParagraphElement>("#back-display")!;

const deleteBtn =
  document.querySelector<HTMLButtonElement>("#delete-btn")!;

const deckList =
  document.querySelector<HTMLDivElement>("#deck-list")!;


let currentCardIndex = 0;


// Mostrar tarjeta
function displayCard(card: FlashCard) {
  frontDisplay.textContent = card.questionText;
  backDisplay.textContent = card.questionAnswer;

  flashCard?.classList.remove("flipped");

  renderDeck();
}


// Renderizar lista de tarjetas
function renderDeck() {
  deckList.innerHTML = "";

  currentCards.forEach((card, index) => {
    const item = document.createElement("button");

    item.textContent = card.questionText;

    item.addEventListener("click", () => {
      currentCardIndex = index;
      displayCard(currentCards[currentCardIndex]);
    });

    deckList.appendChild(item);
  });
}


// Guardar tarjetas
function saveCards() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(currentCards)
  );
}


// Voltear tarjeta
flashCard?.addEventListener("click", () => {
  flashCard.classList.toggle("flipped");
});


// Eliminar tarjeta
deleteBtn.addEventListener("click", () => {

  if (currentCards.length === 0) {
    return;
  }

  currentCards.splice(currentCardIndex, 1);

  saveCards();


  if (currentCards.length === 0) {

    frontDisplay.textContent = "Sin tarjetas";
    backDisplay.textContent = "";

    renderDeck();
    return;
  }


  if (currentCardIndex >= currentCards.length) {
    currentCardIndex = currentCards.length - 1;
  }


  displayCard(currentCards[currentCardIndex]);
});


// Error personalizado
class InvalidUserInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidUserInputError";
  }
}


// Formulario

const entryForm =
  document.querySelector<HTMLFormElement>("#entry-form")!;

const backText =
  document.querySelector<HTMLTextAreaElement>("#back-text")!;

const frontText =
  document.querySelector<HTMLTextAreaElement>("#front-text")!;

const formError =
  document.querySelector<HTMLParagraphElement>("#form-error")!;


entryForm.addEventListener("submit", (e) => {

  e.preventDefault();


  try {

    if (!frontText.value.trim() ||
        !backText.value.trim()) {

      throw new InvalidUserInputError(
        "La pregunta y respuesta no pueden estar vacías"
      );
    }


    const newCard: FlashCard = {
      questionText: frontText.value,
      questionAnswer: backText.value,
    };


    currentCards.push(newCard);

    currentCardIndex = currentCards.length - 1;


    saveCards();


    displayCard(newCard);


    frontText.value = "";
    backText.value = "";

    formError.textContent = "";


  } catch(error) {

    if(error instanceof InvalidUserInputError) {
      formError.textContent = error.message;
    }

  }

});


// Inicializar

if(currentCards.length > 0){
  displayCard(currentCards[currentCardIndex]);
}