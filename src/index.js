//import
import './pages/index.css'; 
import {initialCards} from './scripts/cards.js';
import {renderCard} from './components/card.js';
import { openPopup, closePopup,  openPopupBtn} from './components/modal.js'


// DOM
const btnProfile = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const popupBtnClose = document.querySelectorAll('.popup__close');
const popapSave = document.querySelector('.popup__button');
const profileAddBtn = document.querySelector('.profile__add-button');


// Обработчик «отправки» формы

function handleFormSubmit(evt) {
   evt.preventDefault(); 

   const nameValue = nameInput.value;
   const jobValue = jobInput.value;

   const profileTitle = document.querySelector('.profile__title');
   const profileDescription = document.querySelector('.profile__description');

   // Вставьте новые значения с помощью textContent
   profileTitle.textContent = nameValue;
   profileDescription.textContent = jobValue;

}

formElement.addEventListener('submit', handleFormSubmit);


// Кнопка сохранение попапа

popapSave.addEventListener('click', closePopup);


// Добавление карточек из card.js

initialCards.forEach((data) => {
   renderCard(data);
});

// открытие редактирования профиля

btnProfile.addEventListener('click', openPopup);

// открытие доб. карточки

profileAddBtn.addEventListener('click', openPopupBtn);

// Закрытие попапов

if (popupBtnClose.length > 0) {
   popupBtnClose.forEach(btn => {
      btn.addEventListener('click', closePopup);
   });
}










