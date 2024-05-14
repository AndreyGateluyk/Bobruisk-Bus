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

export const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

export const scheduleGluskBobruisk = [
  {day: "ВС", start: ["08:10", "11:30", "16:20", "18:30"]},
  {day: "ПН", start: ["08:10", "11:30", "16:20"]},
  {day: "ВТ", start: ["06:10", "10:10", "15:00"]},
  {day: "СР", start: ["06:10", "10:10", "15:00"]},
  {day: "ЧТ", start: ["06:10", "10:10", "15:00"]},
  {day: "ПТ", start: ["08:10", "11:30", "16:20", "18:30"]},
  {day: "СБ", start: ["08:10", "11:30", "16:20"]},
];

export const scheduleBobruiskGlusk = [
  {day: "ВС", start: ["10:00", "15:30", "18:30", "21:00"]},
  {day: "ПН", start: ["10:00", "15:30", "18:30"]},
  {day: "ВТ", start: ["08:00", "12:00", "17:00"]},
  {day: "СР", start: ["08:00", "12:00", "17:00"]},
  {day: "ЧТ", start: ["08:00", "12:00", "17:00"]},
  {day: "ПТ", start: ["10:00", "15:30", "18:30", "21:00"]},
  {day: "СБ", start: ["10:00", "15:30", "18:30"]},
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