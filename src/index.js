import './pages/index.css'; 

// template

const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');
const placesList = document.querySelector('.places__list');

// Создание карточек

const createCard = (data) => {
   const cardElement = cardTemplate.cloneNode(true);
   const cardTitle = cardElement.querySelector(".card__title");
   const cardDelete = cardElement.querySelector(".card__delete-button");
   const imgCard = cardElement.querySelector(".card__image");

   imgCard.src = data.link;
   cardTitle.textContent = data.name;

   cardDelete.addEventListener("click", deleteCard);
   
   return cardElement;
};

// Удаление карточек

const deleteCard = (evnt) => {
   evnt.target.closest(".places__item").remove();
};

const renderCard = (data) => {
   placesList.append(createCard(data));
};

// Добавление карточек из card.js

initialCards.forEach((data) => {
   renderCard(data);
});





