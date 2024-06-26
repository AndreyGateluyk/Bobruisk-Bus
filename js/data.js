export const bobruiskStations = [
  "Магазин 'Цыганский'",
  "7 ветров",
  "Евроопт Большой",
  "Центр",
  "Магазин 'Удобный'",
  "1 школа",
  "Калатичи"
];

export const gluskStations = [
  "Центр",
  "Евроопт",
  "Вокзал"
];

export const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
export const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'] 

export const scheduleGluskBobruisk = [
  {day: "воскресенье", start: ["08:10", "11:30", "16:20", "18:30"]},
  {day: "понедельник", start: ["08:10", "11:30", "16:20"]},
  {day: "вторник", start: ["06:10", "10:10", "15:00"]},
  {day: "среда", start: ["06:10", "10:10", "15:00"]},
  {day: "четверг", start: ["06:10", "10:10", "15:00"]},
  {day: "пятница", start: ["08:10", "11:30", "16:20", "18:30"]},
  {day: "суббота", start: ["08:10", "11:30", "16:20"]},
];

export const scheduleBobruiskGlusk = [
  {day: "воскресенье", start: ["10:00", "15:30", "18:30", "21:00"]},
  {day: "понедельник", start: ["10:00", "15:30", "18:30"]},
  {day: "вторник", start: ["08:00", "12:00", "17:00"]},
  {day: "среда", start: ["08:00", "12:00", "17:00"]},
  {day: "четверг", start: ["08:00", "12:00", "17:00"]},
  {day: "пятница", start: ["10:00", "15:30", "18:30", "21:00"]},
  {day: "суббота", start: ["10:00", "15:30", "18:30"]},
];

const baseExample = [
  {
    id: "375257238842",
    value: "12345678",
    trips: [
      {
        startDay: '15.05.2024',
        startTime: '21:00',
        startStation: "Бобруйск, Магазин 'Цыганский'",
        finishTime: '22:00',
        finishStation: 'Глуск, Центр',
        passengers: '1'
      }, 
      {
        startDay: '15.05.2024',
        startTime: '21:00',
        startStation: "Бобруйск, Магазин 'Цыганский'",
        finishTime: '22:00',
        finishStation: 'Глуск, Центр',
        passengers: '1'
      }
    ]
  },
  {
    id: "375257238840",
    value: "12121212",
    trips: [
      {
        startDay: '15.05.2024',
        startTime: '21:00',
        startStation: "Бобруйск, Магазин 'Цыганский'",
        finishTime: '22:00',
        finishStation: 'Глуск, Центр',
        passengers: '1'
      }, 
      {
        startDay: '15.05.2024',
        startTime: '21:00',
        startStation: "Бобруйск, Магазин 'Цыганский'",
        finishTime: '22:00',
        finishStation: 'Глуск, Центр',
        passengers: '1'
      }
    ]
  },
];