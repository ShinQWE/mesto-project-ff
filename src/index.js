//import
import './pages/index.css'; 
import {initialCards} from './components/cards.js';
import {createCard} from './components/card.js';
import {closeModal, openModal} from './components/modal.js'
import {enableValidation, clearValidation} from './components/validation.js';
import {
   getInitialCards as APIGetInitialCards,
   getUserInfo as APIGetUserInfo,
   updateUserAvatar as APIUpdateUserAvatar,
   updateUserInfo as APIUpdateUserInfo,
   likeCard as APILikeCard,
   unLikeCard as APIUnLikeCard,
   createCard as APICreateCard,
   deleteCard as APIDeleteCard,
} from './components/api.js';

// DOM
const popupImage = document.querySelector('.popup_type_image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupImageImage = popupImage.querySelector('.popup__image');
const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const cardForm = document.forms['new-place'];
const cardFormSubmitButton = cardForm.querySelector('.popup__button');
const cardNameInput = cardForm.elements['place-name'];
const cardLinkInput = cardForm.elements.link;
const popupCard = document.querySelector('.popup_type_new-card');
const popupCardButtonOpen = document.querySelector('.profile__add-button');
const profileImageForm = document.forms['edit-avatar'];
const profileImageInput = profileImageForm.elements.avatar;
const profileImageFormSubmitButton =
profileImageForm.querySelector('.popup__button');
const popupProfileImage = document.querySelector('.popup_type_edit-avatar');
const profileImage = document.querySelector('.profile__image');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileForm = document.forms['edit-profile'];
const profileFormSubmitButton = profileForm.querySelector('.popup__button');
const profileNameInput = profileForm.elements.name;
const profileDescriptionInput = profileForm.elements.description;
const popupProfile = document.querySelector('.popup_type_edit');
const popupProfileButtonOpen = document.querySelector('.profile__edit-button');
const popupConfirm = document.querySelector('.popup_type_confirm');
const popupConfirmButton = popupConfirm.querySelector('.popup__button_confirm');

const setProfile = ({ name, description, avatar }) => {
   profileTitle.textContent = 'SHIN';
   profileDescription.textContent = 'SHINOBI';
   profileImage.style.backgroundImage = `url(${avatar})`;
};

const renderLoading = ({ buttonElement, isLoading }) => {
   if (isLoading) {
      buttonElement.textContent = 'Сохранение';
   } else {
      buttonElement.textContent = 'Сохранить';
   }
};


// открытие Новое место

function openPopupBtn() {
   openModal(popupTypeNewCard);
   clearValidation(document.getElementById('typeNewCard'));
};


// открытие Редактировать профиль

function openPopupProfile () {
   openModal(popupTypeEdit);

   const nameValue = profileTitle.textContent;
   const jobValue = profileDescription.textContent;

   nameInput.value = nameValue;
   jobInput.value = jobValue;

   clearValidation(document.getElementById('editProfileForm'));
};

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
   closeModal(popupTypeEdit);
}

formElementTypeEdit.addEventListener('submit', handleFormSubmitTypeEdit);


// Кнопка сохранение попапа

popapFormTypeNewCard.addEventListener("submit", (cardItem) => {
   cardItem.preventDefault();
   const cardData = {
      link: cardLinkInput.value,
      name: cardNameInput.value,
   };
   const cardElement = createCard(cardData, deleteCard, likeCard, openPopupImg); // Вызов функции для создания карточки на основе данных
   placesItem.prepend(cardElement);
   formNewCard.reset();
   closeModal(popupTypeNewCard);
});


// Добавление карточек из card.js

/*
initialCards.forEach(function(cardItem) {
   const cardElement = createCard(cardItem, deleteCard, likeCard, openPopupImg);
   placesList.append(cardElement);
   
});
*/

   

// открытие редактирования профиля

btnProfile.addEventListener('click', openPopupProfile);

// открытие доб. карточки

profileAddBtn.addEventListener('click', openPopupBtn);

// Закрытие попапов

if (popupBtnCloseList.length > 0) {
   popupBtnCloseList.forEach(btn => {
      btn.addEventListener('click', function() {
         const popup = btn.closest('.popup');
         closeModal(popup);
      });
   });
}

/*
APIUpdateUserAvatar(profileImageInput.value)
.then(({ name, about, avatar }) => {
   setProfile({
      name,
      description: about,
      avatar,
   });

   closeModal(popupProfileImage);
})
.catch((error) => {
   console.error(error);
})
.finally(() => {
   renderLoading({
      buttonElement: profileImageFormSubmitButton,
      isLoading: false,
   });
});

const handleProfileImageClick = () => {
   //profileImageForm.reset();

   //clearValidation(document.getElementById('editAvatar'));

   openModal(popupProfileImage);
};

// редактировать профиль открытие картинка

popupProfileImage.addEventListener('click', closeModal);

profileImage.addEventListener('click', handleProfileImageClick);
*/
// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__button',
   inactiveButtonClass: 'popup__button_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__error_visible'
}); 

const handleCardFormSubmit = (event) => {
   event.preventDefault();

   renderLoading({
     buttonElement: profileImageFormSubmitButton,
     isLoading: true,
   });
 
   APICreateCard({
     name: cardNameInputPlaceName.value,
     link: cardLinkInputPlaceName.value,
   })
     .then((cardData) => {
      placesList.prepend(function(cardItem) {
         const cardElement = createCard(cardItem, deleteCard, likeCard, openPopupImg);
         placesList.append(cardElement);
      });

      closeModal(popupTypeNewCard);
     })
     .catch((error) => {
       console.error(error);
     })
     .finally(() => {
       renderLoading({
         buttonElement: cardFormSubmitButton,
         isLoading: false,
       });
     });
 };

cardForm.addEventListener('submit', handleCardFormSubmit);

//добавление карточек изначально

Promise.all([APIGetUserInfo(), APIGetInitialCards()])
.then(([{ name, about, avatar }, cardsData]) => {
   setProfile({
      name,
      description: about,
      avatar,
});

   cardsData.forEach(function(cardItem) {
      const cardElement = createCard(cardItem, deleteCard, likeCard, openPopupImg);
      placesList.append(cardElement);
   });
   })
   .catch(error => {
    // Обработка ошибок
      console.error('Ошибка:', error);
});







