// template

const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');
const placesList = document.querySelector('.places__list');
const popupCaption = document.querySelector('.popup__caption');

// Создание карточек

const createCard = (data) => {
   const templateElements = cardTemplate.cloneNode(true);
   const cardTitle = templateElements.querySelector(".card__title");
   const cardDelete = templateElements.querySelector(".card__delete-button");
   const imgCard = templateElements.querySelector(".card__image");

   imgCard.src = data.link;
   cardTitle.textContent = data.name;

   cardDelete.addEventListener("click", DeleteCard);
   
   return templateElements;
};

// Удаление карточек

const DeleteCard = (evnt) => {
   evnt.target.closest(".places__item").remove();
};

const renderCard = (data) => {
   placesList.prepend(createCard(data));
};

// Добавление карточек из card.js

initialCards.forEach((data) => {
   renderCard(data);
});





