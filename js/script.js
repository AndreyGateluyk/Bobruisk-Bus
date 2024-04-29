import { bobruiskStations, gluskStations, schedule } from "./data.js";
const form = document.querySelector('#search-form');

// Обработка даты
function handelDate() {
  const date = document.querySelector('input[name="date"]');
  date.valueAsDate = new Date ();

  let currentDate = new Date();
  let day = String(currentDate.getDate()).padStart(2, '0');
  let monthMax = String(currentDate.getMonth() + 2).padStart(2, '0');
  let monthMin = String(currentDate.getMonth() + 1).padStart(2, '0');
  let year = currentDate.getFullYear();

  date.max = `${year}-${monthMax}-${day}`;
  date.min = `${year}-${monthMin}-${day}`;
}
handelDate();

// Обработка выбора города
const start = document.querySelector('#city-start');
function handelStartCity() {
  if(start.value === 'Глуск') {
    finish.value = 'Бобруйск';
  } 
  else {
    finish.value = 'Глуск';
  }
  handleStations();
}
start.addEventListener('change', handelStartCity);

const finish = document.querySelector('#city-finish');
function handelFinishCity() {
  if(finish.value === 'Бобруйск') {
    start.value = 'Глуск';
  } else {
    start.value = 'Бобруйск';
  }
  handleStations();
}
finish.addEventListener('change', handelFinishCity);

// Обработка выбора остановки
const startStation = document.querySelector('#city-station-start');
const finishStation = document.querySelector('#city-station-finish');
function handleStations() {
  startStation.innerHTML = '';
  finishStation.innerHTML = '';
  if(start.value === 'Бобруйск') {
    bobruiskStations.forEach((elem, index) => {
      let item = document.createElement('option');
      item.textContent = elem;
      item.value = elem;
      item.id = index;
      startStation.append(item);
    });
    gluskStations.forEach((elem, index) => {
      let item = document.createElement('option');
      item.textContent = elem;
      item.value = elem;
      item.id = index;
      finishStation.append(item);
    });
  } 
  if(start.value === 'Глуск') {
    gluskStations.forEach((elem, index) => {
      let item = document.createElement('option');
      item.textContent = elem;
      item.value = elem;
      item.id = index;
      startStation.append(item);
    });
    bobruiskStations.forEach((elem, index) => {
      let item = document.createElement('option');
      item.textContent = elem;
      item.value = elem;
      item.id = index;
      finishStation.append(item);
    });
  }
}
handleStations();


// Сбор данных формы
let data
function collectingFormData(formNode) {
  const { elements } = formNode;
  data = Array.from(elements)
  .filter((item) => !!item.name)
  .map((element) => {
      const { name, value } = element;

      return { name, value };
    })

  console.log(data)
}

function handelForm(event) {
  event.preventDefault();
  collectingFormData(form);
  RenderTrip()
}
form.addEventListener('submit', handelForm);

// Отрисовка доступных рейсов
const tripItems = document.querySelector('.trip-items');
function RenderTrip() {
  tripItems.innerHTML = '';
  // Сортировка актуальных рейсов по времени
  let targetHours = 0;
  if(new Date().getDate() === Number(data[4].value.substring(8))) {
    targetHours = new Date().getHours() + 1;
  }
  schedule.filter((item) => item.start.substring(0,2) > targetHours)
  .forEach((elem) => {
    const tripTemplate = `
    <div class="trip" 
      data-start-time="${elem.start}" 
      data-start-station="${data[0].value}, ${data[1].value}"
      data-finish-time="${elem.finish}"
      data-finish-station="${data[2].value}, ${data[3].value}"
      >
    <div class="trip-left">
      <div class="trip__start">
        <div class="trip__start-time">${elem.start}</div>
        <div class="trip__start-station">${data[0].value}, ${data[1].value}</div>
      </div>
      <div class="trip__finish">
        <div class="trip__finish-time">${elem.finish}</div>
        <div class="trip__finish-station">${data[2].value}, ${data[3].value}</div>
      </div>
    </div>
    <div class="trip-right">
      <div class="trip__time">
        1 час
      </div>
      <div class="trip__places">
        14
      </div>
      <div class="trip__price">
        5 р.
      </div>
      <button class="order">Заказать</button>
    </div>
  </div>
    `
    tripItems.insertAdjacentHTML('beforeend', tripTemplate)
  })
  if(!tripItems.firstChild) {
    const noTrips = `
    <div class="no-trips">
      Сожалеем, рейсов на сегодня больше нет
    </div>
    `
    tripItems.insertAdjacentHTML('beforeend', noTrips)
  }
}

// Сбор данных о поездке
tripItems.addEventListener('click', (e) => {
  if(e.target.classList.contains('order')) {
    collectingTripData(e.target.closest('.trip'));
  }
})
function collectingTripData(item) {
  console.log(item.dataset)
}