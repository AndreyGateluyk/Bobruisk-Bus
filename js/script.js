import { bobruiskStations, gluskStations, days, scheduleGluskBobruisk, scheduleBobruiskGlusk } from "./data.js";
import { userId, usersBase } from "./authorization.js";
const form = document.querySelector('#search-form');

// Обработка выбора даты
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
      item.classList.add('start-station')
      startStation.append(item);
    });
    gluskStations.forEach((elem, index) => {
      let item = document.createElement('option');
      item.textContent = elem;
      item.value = elem;
      item.id = index;
      item.classList.add('finish-station')
      finishStation.append(item);
    });
  } 
  if(start.value === 'Глуск') {
    gluskStations.forEach((elem, index) => {
      let item = document.createElement('option');
      item.textContent = elem;
      item.value = elem;
      item.id = index;
      item.classList.add('start-station')
      startStation.append(item);
    });
    bobruiskStations.forEach((elem, index) => {
      let item = document.createElement('option');
      item.textContent = elem;
      item.value = elem;
      item.id = index;
      item.classList.add('finish-station')
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

      return { name, value, };
    });
}

function handelForm(event) {
  event.preventDefault();
  collectingFormData(form);
  RenderTrip();
}
form.addEventListener('submit', handelForm);

let startId = 0;
let finishId = 0;
form.addEventListener('click', (e) => {
  if(e.target.id === 'city-station-start') {
    let startStationArr = document.querySelectorAll('.start-station');
    document.querySelector('select[id="city-station-start"]').addEventListener('change', (e) => {
      startStationArr.forEach((elem, index) => {
        if(elem.value === e.target.value) {
          startId = index;
        }
      })
    });
  }
  if(e.target.id === 'city-station-finish') {
    let finishStationArr = document.querySelectorAll('.finish-station');
    document.querySelector('select[id="city-station-finish"]').addEventListener('change', (e) => {
      finishStationArr.forEach((elem, index) => {
        if(elem.value === e.target.value) {
          finishId = index;
        }
      })
    });
  }
})


// Отрисовка доступных рейсов
const tripItems = document.querySelector('.trip-items');
function RenderTrip() {
  tripItems.innerHTML = '';
  let cityStart = data[0].value;
  let currentDay = days[new Date(data[4].value).getDay()];
  let startDate = data[4].value.split('-').reverse().join('.');
  let currentSchedule;
  if (cityStart === 'Бобруйск') {
    currentSchedule = scheduleBobruiskGlusk.filter((item) => item.day === currentDay)[0].start;
  }
  if (cityStart === 'Глуск') {
    currentSchedule = scheduleGluskBobruisk.filter((item) => item.day === currentDay)[0].start;
  }
  // Сортировка актуальных рейсов по времени
  let targetHours = 0;
  if(new Date().getDate() === Number(data[4].value.substring(8))) {
    targetHours = new Date().getHours() + 1;
  }
  currentSchedule.filter((item) => item.substring(0,2) > targetHours)
  .forEach((elem) => {
    let timeStart = calculateTime(elem, startId);
    let timeFinish = calculateTime(String(Number(elem.substring(0,2)) + 1).padStart(2, '0') + ':' + elem.substring(3,5), finishId);
    const tripTemplate = `
    <div class="trip" 
      data-start-day="${startDate}"
      data-start-time="${timeStart}" 
      data-start-station="${data[0].value}, ${data[1].value}"
      data-finish-time="${timeFinish}"
      data-finish-station="${data[2].value}, ${data[3].value}"
      data-passengers="0"
      >
    <div class="trip-left">
      <div class="trip__start">
        <div class="trip__start-time">${timeStart}</div>
        <div class="trip__start-station">${data[0].value}, ${data[1].value}</div>
      </div>
      <div class="trip__finish">
        <div class="trip__finish-time">${timeFinish}</div>
        <div class="trip__finish-station">${data[2].value}, ${data[3].value}</div>
      </div>
    </div>
    <div class="trip-right">
      <div class="trip__time">
        ${calculateTimeToTrip(timeStart, timeFinish)}
      </div>
      <div class="trip__places-free" data-quantity-free=14>
        14
      </div>
      <div class="trip__places">
        <button id="minus">-</button>
        <div class="trip__places-quantity" data-quantity=1>1</div>
        <button id="plus">+</button>
      </div>
      <div class="trip__price">
        5 р.
      </div>
      <button class="order">Заказать</button>
    </div>
  </div>
    `
    tripItems.insertAdjacentHTML('beforeend', tripTemplate)
  });
  if(!tripItems.firstChild) {
    const noTrips = `
    <div class="no-trips">
      Сожалеем, рейсов на сегодня больше нет
    </div>
    `
    tripItems.insertAdjacentHTML('beforeend', noTrips)
  }
  tripItems.addEventListener('click', (e) => {
    changePassengers(e.target);
  })
}

//
function changePassengers(btn) {
  const quantity = btn.closest('.trip__places').children[1];
  let quantityData = Number(quantity.dataset.quantity);
  if(btn.id === 'minus') {
    if(quantityData === 1) {
      return
    }
    quantity.setAttribute('data-quantity', quantityData-1)
    quantity.textContent = quantityData - 1;
  }
  if(btn.id === 'plus') {
    if(quantityData === 6) {
      return
    }
    quantity.setAttribute('data-quantity', quantityData+1)
    quantity.textContent = quantityData + 1
  }
  console.log(quantity, btn.id)
}

// Обработка времени приезда-отъезда
function calculateTime(time, id) {
  const min = (Number(time.substring(0,2)) * 60) + Number(time.substring(3,5)) + (id * 3);
  const minRest = String(min % 60).padStart(2, '0');
  const hours = String((Number(min) - minRest) / 60).padStart(2, '0');
  return `${hours}:${minRest}`;
}

// Подсчет времени в пути
function calculateTimeToTrip(start, finish) {
  const startToMin = Number((start.substring(0,2)) * 60) + Number(start.substring(3,5));
  const finishToMin = Number((finish.substring(0,2)) * 60) + Number(finish.substring(3,5));
  const timeToMin = finishToMin - startToMin;
  let time;
  if (timeToMin < 60) {
    time = `00:${String(timeToMin).padStart(2, '0')}`;
  } else {
    let min = String(timeToMin % 60).padStart(2, '0');
    let hours = String((timeToMin - Number(min)) / 60).padStart(2,'0');
    time = `${hours} : ${min}`;
  }
  return time;
}

// Сбор данных о поездке
tripItems.addEventListener('click', (e) => {
  if(e.target.classList.contains('order')) {
    collectingTripData(e.target.closest('.trip'));
  }
})
function collectingTripData(item) {
  usersBase.filter((elem) => elem.id === userId)[0].trips.push(item.dataset);
  localStorage.setItem("usersBase", JSON.stringify(usersBase));
}
console.log(usersBase)