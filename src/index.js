//import
import './pages/index.css'; 
import {initialCards} from './components/cards.js';
import {createCard, deleteCard, likeCard} from './components/card.js';
import {openPopup, closeModal, openPopupBtn, openModal} from './components/modal.js'


// DOM
const btnProfile = document.querySelector('.profile__edit-button');
const formElementTypeEdit = document.querySelector('#editProfileForm');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const popupBtnClose = document.querySelectorAll('.popup__close');
const profileAddBtn = document.querySelector('.profile__add-button');
const placesList = document.querySelector('.places__list');
const popForm = document.querySelector(".popup_type_new-card .popup__form");
const placesItem = document.querySelector('.places__list');
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");
const popupTypeImg = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaptionImg = document.querySelector('.popup__caption');
const formNewCard = document.querySelector(".popup_type_new-card .popup__form");



// клик по изображению и открытие попапа

function openPopupImg (event) {
   const cardElement  = event.target.closest('.card');
   openModal(popupTypeImg);

   const cardImage = cardElement.querySelector('.card__image');
   const cardText = cardElement.querySelector('.card__title');


   if (cardText && cardImage) {
      popupImage.src = cardImage.src;
      popupImage.alt = cardText.textContent;
      popupCaptionImg.textContent = cardText.textContent;
   }
}


// Обработчик «отправки» формы

function handleFormSubmitTypeEdit(evt) {
   const profileTitle = document.querySelector('.profile__title');
   const profileDescription = document.querySelector('.profile__description');
   evt.preventDefault(); 
   
   const nameValue = nameInput.value;
   const jobValue = jobInput.value;

   // Вставьте новые значения с помощью textContent
   profileTitle.textContent = nameValue;
   profileDescription.textContent = jobValue;
   const modal = evt.target.closest('.popup_is-opened');
   closeModal(modal);
}

formElementTypeEdit.addEventListener('submit', handleFormSubmitTypeEdit);


// Кнопка сохранение попапа

popForm.addEventListener("submit", (cardItem) => {
   cardItem.preventDefault();
   const cardData = {
      link: cardLinkInput.value,
      name: cardNameInput.value,
   };
   const cardElement = createCard(cardData, deleteCard, likeCard, openPopupImg); // Вызов функции для создания карточки на основе данных
   placesItem.prepend(cardElement);
   formNewCard.reset();
   const modal = cardItem.target.closest('.popup_is-opened');
   closeModal(modal);
});


// Добавление карточек из card.js

initialCards.forEach(function(cardItem) {
   const cardElement = createCard(cardItem, deleteCard, likeCard, openPopupImg);
   placesList.append(cardElement);
   
});

// открытие редактирования профиля

btnProfile.addEventListener('click', openPopup);

// открытие доб. карточки

profileAddBtn.addEventListener('click', openPopupBtn);

// Закрытие попапов

if (popupBtnClose.length > 0) {
   popupBtnClose.forEach(btn => {
      btn.addEventListener('click', function() {
         const popup = btn.closest('.popup');
         closeModal(popup);
      });
   });
}










