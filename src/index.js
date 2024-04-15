//import

import './pages/index.css'; 
import {initialCards} from './scripts/cards.js';
import {renderCard} from './components/card.js'


// template



// Добавление карточек из card.js

initialCards.forEach((data) => {
   renderCard(data);
});






