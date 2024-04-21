
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileDescription = document.querySelector('.profile__description');
const profileTitle = document.querySelector('.profile__title');



// открытие Редактировать профиль

function openPopup () {
   openModal(popupTypeEdit);

   const nameValue = profileTitle.textContent;
   const jobValue = profileDescription.textContent;

   nameInput.value = nameValue;
   jobInput.value = jobValue;
   
};


// открытие Новое место

function openPopupBtn() {
   openModal(popupTypeNewCard);
};

//функция открытия попапа

function openModal(modal) {
   modal.classList.add('popup_is-opened');
   modal.classList.add('popup_is-animated');
   document.addEventListener('keydown', closePopupEsc);
   modal.addEventListener('mousedown', closePopupOverlay);
};


// функция закрытие попапа

function closeModal(event) {
   if (event != null) {
      event.classList.remove('popup_is-opened');
      document.removeEventListener('keydown', closePopupEsc);
      event.removeEventListener('mousedown', closePopupOverlay);
   }
};

// обработчики на ESC и на клик по overlay 

function closePopupOverlay(evt) {
   if (evt.target.classList.contains('popup_is-opened')) {
      closeModal(evt.target);
   }
};

function closePopupEsc(evt) {
   if (evt.key === 'Escape' || evt.key === 'Esc') {
      const modalOpen = document.querySelector('.popup_is-opened');
      if (modalOpen) {
         closeModal(modalOpen);
      }
   }
};




export {openPopup, closeModal, openPopupBtn, openModal, closePopupOverlay, closePopupEsc};