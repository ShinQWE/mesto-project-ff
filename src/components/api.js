const CONFIG = {
   baseUrl: 'https://nomoreparties.co/v1/wff-cohort-13',
   headers: {
      authorization: '0e162fe0-7093-45a2-bc51-8feb2a573b2d',
      'Content-Type': 'application/json'
   }
}

export const handleResponse = (response) => {
   if (response.ok) {
      return response.json();
   }

   return Promise.reject(`Ошибка: ${response.status}`);
};

export const checkImageUrl = (url) => {
   return fetch(url, {
      method: 'HEAD',
   }).then(({ ok, headers, status }) => {
      if (ok) {
         if (headers.get('Content-Type').includes('image')) {
         return Promise.resolve();
      }

      return Promise.reject('Ошибка: URL ссылается на не изображение');
   }
   
      return Promise.reject(`Ошибка: ${status}`);
   });
};

export const getInitialCards = () => {
   return fetch(`${CONFIG.baseUrl}/cards`, { headers: CONFIG.headers })
   .then(
      handleResponse
   );
};

export const createCard = ({ name, link }) => {
   return checkImageUrl(link).then(() =>
      fetch(`${CONFIG.baseUrl}/cards`, {
         headers: CONFIG.headers,
         method: 'POST',
         body: JSON.stringify({
         name,
         link,
      }),
   }).then(handleResponse)
   );
};

export const deleteCard = (cardId) => {
   return fetch(`${CONFIG.baseUrl}/cards/${cardId}`, {
      headers: CONFIG.headers,
      method: 'DELETE',
   }).then(handleResponse);
};

export const likeCard = (cardId) => {
   return fetch(`${CONFIG.baseUrl}/cards/likes/${cardId}`, {
      headers: CONFIG.headers,
      method: 'PUT',
   }).then(handleResponse);
};

export const unLikeCard = (cardId) => {
   return fetch(`${CONFIG.baseUrl}/cards/likes/${cardId}`, {
      headers: CONFIG.headers,
      method: 'DELETE',
   }).then(handleResponse);
};

export const getUserInfo = () => {
   return fetch(`${CONFIG.baseUrl}/users/me`, { headers: CONFIG.headers }).then(
      handleResponse
   );
};

export const updateUserInfo = ({ name, description }) => {
   return fetch(`${CONFIG.baseUrl}/users/me`, {
      headers: CONFIG.headers,
      method: 'PATCH',
      body: JSON.stringify({
      name,
      about: description,
   }),
   }).then(handleResponse);
};

export const updateUserAvatar = (url) => {
   return checkImageUrl(url).then(() =>
      fetch(`${CONFIG.baseUrl}/users/me/avatar`, {
         headers: CONFIG.headers,
         method: 'PATCH',
         body: JSON.stringify({
         avatar: url,
      }),
   })
   .then(handleResponse)
   );
};
