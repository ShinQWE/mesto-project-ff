import {openPopupImg} from './modal.js'
const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');
const placesList = document.querySelector('.places__list');


// Создание карточек

const createCard = (data) => {
   const cardElement = cardTemplate.cloneNode(true);
   const cardTitle = cardElement.querySelector(".card__title");
   const cardDelete = cardElement.querySelector(".card__delete-button");
   const imgCard = cardElement.querySelector(".card__image");
   const likeBtn = cardElement.querySelector('.card__like-button');

   imgCard.src = data.link;
   cardTitle.textContent = data.name;

   cardDelete.addEventListener("click", deleteCard);
   likeBtn.addEventListener("click", likeCard);
   imgCard.addEventListener("click", openPopupImg);

   return cardElement;
};

// Удаление карточек

const deleteCard = (evnt) => {
   evnt.target.closest(".places__item").remove();
};

// Генерация карточек

const renderCard = (data) => {
   placesList.append(createCard(data));
};

// Лайк карточек

const likeCard = (evnt) => {
   const likeBtnEvn = evnt.target;
   if (likeBtnEvn.classList.contains('card__like-button_is-active')) {
      likeBtnEvn.classList.remove('card__like-button_is-active');
   } else {
      likeBtnEvn.classList.add('card__like-button_is-active');
   }
}; 



export {createCard, deleteCard, renderCard, likeCard};



