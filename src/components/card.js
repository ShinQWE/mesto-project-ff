
const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');



// Создание карточек

const createCard = (data, deleteCardCallback, likeCardCallback, openPopupImgCallback) => {
   const cardElement = cardTemplate.cloneNode(true);
   const cardTitle = cardElement.querySelector(".card__title");
   const cardDelete = cardElement.querySelector(".card__delete-button");
   const imgCard = cardElement.querySelector(".card__image");
   const likeBtn = cardElement.querySelector('.card__like-button');

   imgCard.src = data.link;
   imgCard.alt = data.cardTitle;
   cardTitle.textContent = data.name;

   cardDelete.addEventListener("click", deleteCardCallback);
   likeBtn.addEventListener("click", likeCardCallback);
   imgCard.addEventListener("click", openPopupImgCallback);

   return cardElement;
};

// Удаление карточек

const deleteCard = (evnt) => {
   evnt.target.closest(".places__item").remove();
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


export {createCard, deleteCard, likeCard};



