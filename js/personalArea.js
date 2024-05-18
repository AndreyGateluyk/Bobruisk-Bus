import { tripItems } from "./script.js";

export function loadArea() {
  const search = document.querySelector('.search');
  const searchForm = document.querySelector('#search-form');
  if(search.children.length > 1) {
    search.removeChild(searchForm);
  }
  //const tripItems = document.querySelector('.trip-items');
  tripItems.innerHTML = '';
  // const tripsContainer = document.createElement('div');
  // tripsContainer.classList.add('trip-items');
  // main.appendChild(tripsContainer);
  const userLogin =JSON.parse(localStorage.getItem('saveAuth'));
  const trips = JSON.parse(localStorage.getItem('usersBase')).filter((elem) => elem.id === userLogin.id)[0].trips;
  trips.forEach((elem, i) => {
    const tripTemplate = `
    <div class="trip" data-id="${i}">
    <div class="trip-left">
      <div class="trip__date">
        <div class="trip__date-month">${elem.startDate}</div>
        <div class="trip__date-day">${elem.startDay}</div>
      </div>
      <div class="trip__start">
        <div class="trip__start-time">${elem.startTime}</div>
        <div class="trip__start-station">${elem.startStation}</div>
      </div>
      <div class="trip__finish">
        <div class="trip__finish-time">${elem.finishTime}</div>
        <div class="trip__finish-station">${elem.finishStation}</div>
      </div>
    </div>
    <div class="trip-right">
      <div class="trip__places">${elem.passengers} чел.</div>
      <div class="trip__price">${elem.passengers * 5}р.</div>
      <button class="refuse btn">Отказаться</button>
    </div>
  </div>
    `
    tripItems.insertAdjacentHTML('beforeend', tripTemplate)
  });
  const user = document.querySelector('.user')
  if(user.children.length === 1) {
    const exit = document.createElement('button');
    exit.textContent = 'Выйти';
    exit.classList.add('exit');
    exit.classList.add('btn__header');
    user.appendChild(exit);
    exit.addEventListener('click', exitArea);
  }
}
//tripItems.addEventListener('click', (e) => removeOffer(e.target));

function exitArea() {
  localStorage.removeItem('saveAuth');
  location.reload();
}

export function removeOffer(item) {
  if(item.classList.contains('refuse')) {
    const index = Number(item.closest('.trip').dataset.id);
    const userLogin =JSON.parse(localStorage.getItem('saveAuth'));
    const trips = JSON.parse(localStorage.getItem('usersBase')).filter((elem) => elem.id === userLogin.id)[0].trips;
    trips.forEach((elem, i) => {
      if(i === index) {
        trips.splice(i, 1);
        let usersBase = JSON.parse(localStorage.getItem('usersBase'));
        usersBase.filter((elem) => elem.id === userLogin.id)[0].trips = trips;
        localStorage.setItem('usersBase', JSON.stringify(usersBase));
        loadArea();
        console.log(usersBase);
      }
    });
  }
}