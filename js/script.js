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

// Сбор данных формы
function serializeForm(formNode) {
  const { elements } = formNode
  const data = Array.from(elements)
    .filter((item) => !!item.name)
    .map((element) => {
      const { name, value } = element

      return { name, value }
    })

  console.log(data)
}

function handelForm(event) {
  event.preventDefault();
  serializeForm(form);
}
form.addEventListener('submit', handelForm);