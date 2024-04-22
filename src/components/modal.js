
//функция открытия попапа

function openModal(modal) {
   modal.classList.add('popup_is-opened');
   modal.classList.add('popup_is-animated');
   document.addEventListener('keydown', closePopupEsc);
   modal.addEventListener('mousedown', closePopupOverlay);
};


// функция закрытие попапа

function closeModal(modalWindow) {
      modalWindow.classList.remove('popup_is-opened');
      document.removeEventListener('keydown', closePopupEsc);
      modalWindow.removeEventListener('mousedown', closePopupOverlay);
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




export {closeModal, openModal, closePopupOverlay, closePopupEsc};