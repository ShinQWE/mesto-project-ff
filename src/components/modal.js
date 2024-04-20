import {createCard} from './card.js';


// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const popup = document.querySelector('.popup');


const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');

const popupTypeImg = document.querySelector('.popup_type_image');



// клик по изображению и открытие попапа

function openPopupImg (event) {
   const cardElement  = event.target.closest('.card');
   popupTypeImg.classList.add('popup_is-opened');
   popupTypeImg.classList.add('popup_is-animated');

   const cardImage = cardElement.querySelector('.card__image');
   const cardText = cardElement.querySelector('.card__title');

   if (cardText && cardImage) {
      const popupImage = document.querySelector('.popup__image');
      const popupCaption = document.querySelector('.popup__caption');
      popupImage.src = cardImage.src;
      popupCaption.textContent = cardText.textContent;
   }

   otherClick(); // esc и клик по оверлею (закрытие)
}


// открытие Редактировать профиль

function openPopup () {
   popupTypeEdit.classList.add('popup_is-opened');
   popupTypeEdit.classList.add('popup_is-animated');

   const profileTitle = document.querySelector('.profile__title');
   const profileDescription = document.querySelector('.profile__description');

   const nameValue = profileTitle.textContent;
   const jobValue = profileDescription.textContent;

   nameInput.value = nameValue;
   jobInput.value = jobValue;

   otherClick();
};

//добавление картинки

function addCard(event) {
   event.preventDefault();

   const cardNameInput = document.querySelector(".popup__input_type_card-name");
   const cardLinkInput = document.querySelector(".popup__input_type_url");

   const cardData = {
      link: cardLinkInput.value,
      name: cardNameInput.value,
   };

   const newCard = createCard(cardData); // Вызов функции для создания карточки на основе данных

   // Вставка карточки в DOM
   const placesItem = document.querySelector('.places__list');
   placesItem.prepend(newCard);

   // Очистка формы
   const form = document.querySelector(".popup_type_new-card .popup__form");
   form.reset();

   // Закрытие попапа
   popupTypeNewCard.classList.remove("popup_is-opened");
}

// открытие Новое место

function openPopupBtn() {
   popupTypeNewCard.classList.add('popup_is-opened');
   popupTypeNewCard.classList.add('popup_is-animated');

   const popForm = document.querySelector(".popup_type_new-card .popup__form");
   popForm.addEventListener("submit", addCard);

   otherClick();
};


// Закрытие попапов

function closePopup(event) {
   const popup = event.target.closest('.popup');
   if (popup) {
      popup.classList.remove('popup_is-opened');
   }
};

// обработчики на ESC и на клик по overlay 

function removePopap() {
   popupTypeEdit.classList.remove('popup_is-opened');
   popupTypeNewCard.classList.remove('popup_is-opened');
   popupTypeImg.classList.remove('popup_is-opened');
};

function closePopupOverlay(evt) {
   if (evt.target.classList.contains('popup')) {
      removePopap();
   }
};

function closePopupEsc(evt) {
   if (evt.key === 'Escape' || evt.key === 'Esc') {
      removePopap();
   }
};

function otherClick () {
   document.addEventListener('keydown', closePopupEsc);
   document.addEventListener('click', closePopupOverlay);
}




export {openPopup, closePopup, openPopupBtn, otherClick, openPopupImg, addCard};