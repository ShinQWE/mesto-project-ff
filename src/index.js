//import
import './pages/index.css'; 
import {createCard} from './components/card.js';
import {closeModal, openModal, closePopupOverlay} from './components/modal.js'
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

//ПОПАП ДЛЯ ОТКРЫТИЯ КАРТИНКИ 
const popupImage = document.querySelector('.popup_type_image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupImageImage = popupImage.querySelector('.popup__image');
//МЕСТО ГДЕ ХРАНЯТСЯ КАРТОЧКИ
const cardsContainer = document.querySelector('.places__list');
//НОВАЯ КАРТОЧКА
const cardTemplate = document.querySelector('#card-template').content;
const cardForm = document.forms['new-place'];
const cardFormSubmitButton = cardForm.querySelector('.popup__button');
const cardNameInput = cardForm.elements['place-name'];
const cardLinkInput = cardForm.elements.link;
const popupCard = document.querySelector('.popup_type_new-card');
const popupCardButtonOpen = document.querySelector('.profile__add-button');
//ОБНОВЛЕНИЕ АВАТАРА
const profileImageForm = document.forms['edit-avatar'];
const profileImageInput = profileImageForm.elements.avatar;
const profileImageFormSubmitButton = profileImageForm.querySelector('.popup__button');
const popupProfileImage = document.querySelector('.popup_type_edit-avatar');
//HEADER
const profileImage = document.querySelector('.profile__image');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
//РЕДАКЦИЯ ПРОФИЛЯ
const profileForm = document.forms['edit-profile'];
const profileFormSubmitButton = profileForm.querySelector('.popup__button');
const profileNameInput = profileForm.elements.name;
const profileDescriptionInput = profileForm.elements.description;
const popupProfile = document.querySelector('.popup_type_edit');
const popupProfileButtonOpen = document.querySelector('.profile__edit-button');
//ПОПАП ДЛЯ ЗАКРЫТИЯ
const popupConfirm = document.querySelector('.popup_type_confirm');
const popupConfirmButton = popupConfirm.querySelector('.popup__button_confirm');



// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const validationConfig = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__button',
   inactiveButtonClass: 'popup__button_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__error_visible',
};

//ПОЛУЧЕНИЕ ПРОФИЛЯ 
const setProfile = ({name, description, avatar}) => {
   profileName.textContent = name;
   profileDescription.textContent = description;
   profileImage.style.backgroundImage = `url(${avatar})`;
};

const renderLoading = ({ buttonElement, isLoading }) => {
   if (isLoading) {
      buttonElement.textContent = 'Сохранение...';
   } else {
      buttonElement.textContent = 'Сохранить';
   }
};

//LIKES
const handleCardLike = ({ cardId, buttonElement, counterElement }) => {
   buttonElement.disabled = true;

   if (buttonElement.classList.contains('card__like-button_is-active')) {
      APIUnLikeCard(cardId)
      .then(({ likes }) => {
         buttonElement.classList.remove('card__like-button_is-active');

         if (likes.length) {
            counterElement.classList.add('card__like-counter_is-active');
            counterElement.textContent = likes.length;
         } else {
            counterElement.classList.remove('card__like-counter_is-active');
            counterElement.textContent = '';
         }
      })
      .catch((error) => console.error(error))
      .finally(() => {
         buttonElement.disabled = false;
      });
   } else {
      APILikeCard(cardId)
      .then(({ likes }) => {
         buttonElement.classList.add('card__like-button_is-active');

         counterElement.classList.add('card__like-counter_is-active');
         counterElement.textContent = likes.length;
      })
      .catch((error) => console.error(error))
      .finally(() => {
         buttonElement.disabled = false;
      });
   }
};

//удаление карточки
const handleCardDelete = ({ cardId, buttonElement }) => {
   openModal(popupConfirm);
   popupConfirmButton.onclick = () => {
      buttonElement.disabled = true;

      APIDeleteCard(cardId)
      .then(() => {
         buttonElement.closest('.card').remove();

         closeModal(popupConfirm);
      })
      .catch((error) => {
         buttonElement.disabled = false;
         console.error(error);
      });
   };
};

//для отправки
const handleCardFormSubmit = (event) => {
   event.preventDefault();

   renderLoading({
      buttonElement: cardFormSubmitButton,
      isLoading: true,
   });

   APICreateCard({
      name: cardNameInput.value,
      link: cardLinkInput.value,
   })
   .then((cardData) => {
      cardsContainer.prepend(
         createCard({
            currentUserId: cardData.owner['_id'],
            template: cardTemplate,
            data: cardData,
            onDelete: handleCardDelete,
            onLike: handleCardLike,
            onImageClick: openPopupImg,
         })
      );

      cardForm.reset();

      closeModal(popupCard);
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

const handleProfileFormSubmit = (event) => {
   event.preventDefault();

   renderLoading({
      buttonElement: profileFormSubmitButton,
      isLoading: true,
   });

   APIUpdateUserInfo({
      name: profileNameInput.value,
      description: profileDescriptionInput.value,
   })
      .then(({ name, about, avatar }) => {
      setProfile({
         name,
         description: about,
         avatar,
      });

      closeModal(popupProfile);
      })
      .catch((error) => {
         console.error(error);
      })
      renderLoading({
         buttonElement: profileFormSubmitButton,
         isLoading: false,
      });
};

const handleProfileImageFormSubmit = (event) => {
   event.preventDefault();

   renderLoading({
      buttonElement: profileImageFormSubmitButton,
      isLoading: true,
   });

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
};

const handlePopupProfileButtonOpenClick = () => {
   profileNameInput.value = profileName.textContent;
   profileDescriptionInput.value = profileDescription.textContent;

   clearValidation(profileForm, validationConfig);

   openModal(popupProfile);
};

const handlePopupCardButtonOpenClick = () => {
   cardForm.reset();

   clearValidation(cardForm, validationConfig);

   openModal(popupCard);
};

//клик по картинке
const openPopupImg = ({ cardName, cardLink }) => {
   popupImageImage.src = cardLink;
   popupImageImage.alt = cardName;
   popupImageCaption.textContent = cardName;

   openModal(popupImage);
};

const handleProfileImageClick = () => {
   profileImageForm.reset();

   clearValidation(profileImageForm, validationConfig);

   openModal(popupProfileImage);
};

//обработчики событий

cardForm.addEventListener('submit', handleCardFormSubmit);

profileForm.addEventListener('submit', handleProfileFormSubmit);

profileImageForm.addEventListener('submit', handleProfileImageFormSubmit);

popupImage.addEventListener('click', closePopupOverlay);

popupProfileImage.addEventListener('click', closePopupOverlay);

profileImage.addEventListener('click', handleProfileImageClick);

popupCard.addEventListener('click', closePopupOverlay);
popupCardButtonOpen.addEventListener('click', handlePopupCardButtonOpenClick);

popupProfile.addEventListener('click', closePopupOverlay);
popupProfileButtonOpen.addEventListener('click', handlePopupProfileButtonOpenClick);

popupConfirm.addEventListener('click', closePopupOverlay);

enableValidation(validationConfig);

//загрузка начальная
//Свойство _id — идентификатор пользователя, в данном случае вашего
Promise.all([APIGetUserInfo(), APIGetInitialCards()])
   .then(([{ name, about, avatar, ['_id']: currentUserId }, cardsData]) => {
      setProfile({
         name,
         description: about,
         avatar,
      });

      cardsData.forEach((cardData) => {
         cardsContainer.append(
         createCard({
            currentUserId,
            template: cardTemplate,
            data: cardData,
            onDelete: handleCardDelete,
            onLike: handleCardLike,
            onImageClick: openPopupImg,
         })
         );
   });
   })
   .catch((error) => {
      console.error(error);
   });





