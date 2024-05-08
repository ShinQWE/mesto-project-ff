const closePopupEsc = (event) => {
   if (event.key === 'Escape') {
      closeModal(document.querySelector('.popup_is-opened'));
   }
};

const closePopupOverlay = (event) => {
   if (event.target.classList.contains('popup_is-opened')) {
      return closeModal(event.target);
   }

   if (event.target.closest('.popup__close')) {
      return closeModal(event.target.closest('.popup'));
   }
};

const openModal = (element) => {
   element.classList.add('popup_is-opened');
   document.addEventListener('keydown', closePopupEsc);
};

const closeModal = (element) => {
   document.removeEventListener('keydown', closePopupEsc);
   element.classList.remove('popup_is-opened');
};

export {openModal, closeModal, closePopupOverlay};