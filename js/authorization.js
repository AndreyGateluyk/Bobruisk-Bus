export let usersBase = JSON.parse(localStorage.getItem("usersBase")) || [];
export let userId;
const login = document.querySelector('#login');
const main = document.querySelector('main');
console.log(usersBase);

// Проверка авторизации пользователя
if(JSON.parse(localStorage.getItem("saveAuth"))) {
  login.textContent = "Личный кабинет";
  userId = JSON.parse(localStorage.getItem("saveAuth")).id;
}

login.addEventListener('click', authorizationUser);

function authorizationUser() {
  const modal = `
  <div class="modal-wrapper">
    <div class="modal">
      <form action="" id="login-form">
        <fieldset>
          <legend>Войти или зарегистрироваться</legend>
          <input name="user" type="tel" placeholder="375(_ _) _ _ _-_ _-_ _" pattern="(375)(25|33|44)[0-9]{7}" required>
          <input name="pass" type="password" placeholder="минимум 8 символов" minlength="8" required>
          <input type="submit" value="Войти или зарегистрироваться" id="submit">
        </fieldset>
      </form>
      <button class="close">
        <svg style="fill: currentColor" width="24" height="24" viewBox="0 0 24 24" fill="333333" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.41442 2L20.7281 19.3137L19.3139 20.7279L2.0002 3.41421L3.41442 2Z"></path>
          <path d="M19.3137 2L2 19.3137L3.41421 20.7279L20.7279 3.41421L19.3137 2Z"></path>
        </svg>
      </button>
    </div>
  </div>
  `;
  main.insertAdjacentHTML('beforeend', modal);
  const formContainer = document.querySelector('.modal-wrapper');
  closeForm(formContainer);
  // Сбор данных формы регистрации
  const formLogin = document.querySelector('#login-form');
  let currentUser
  function collectingFormData(formNode) {
    const { elements } = formNode;
    const userData = Array.from(elements).filter((item) => !!item.name);
    return currentUser = {id:userData[0].value, pass:userData[1].value, trips: []};
  }
  
  function handelFormLogin(event) {
    event.preventDefault();
    collectingFormData(formLogin);
    findUser(currentUser);
  }
  formLogin.addEventListener('submit', handelFormLogin);
}

// Закрыть форму
function closeForm(item) {
  const close = document.querySelector('.close');
  close.addEventListener('click', (e) => {
    main.removeChild(item);
  });
}

// Поиск пользователя в базе данных
function findUser(user) {
  const item = usersBase.filter((item) => item.id === user.id);
  if(item.length === 0) {
    registeredNewUser(user);
    saveAuthorization(user);
    //loginUser(item[0], user);
  }
  if(item.length === 1) {
    loginUser(item[0], user);
  }
}

// Регистрация нового пользователя
function registeredNewUser(data) {
  usersBase.push(data);
  localStorage.setItem("usersBase", JSON.stringify(usersBase));
}

// Сохранение авторизации пользователя
function saveAuthorization(user) {
  localStorage.setItem("saveAuth", JSON.stringify(user));
}

// Авторизация пользователя
function loginUser(base, user) {
  if(base.pass === user.pass) {
    userId = user.id;
    console.log("Верный пароль", userId)
    refreshPageAfterLogin();
  } else {
    alert("Неверный пароль!");
  }
}

// Обновление кнопки "Войти"
function refreshPageAfterLogin() {
  login.textContent = "Личный кабинет";
  const formContainer = document.querySelector('.modal-wrapper');
  main.removeChild(formContainer);
}

const baseExample = [
  {
    id: "375257238842",
    value: "12345678",
    trips: [
      {startTime: '21:00', startStation: "Бобруйск, Магазин 'Цыганский'", finishTime: '22:00', finishStation: 'Глуск, Центр'}, 
      {startTime: '21:00', startStation: "Бобруйск, Магазин 'Цыганский'", finishTime: '22:00', finishStation: 'Глуск, Центр'}
    ]
  },
  {
    id: "375257238840",
    value: "12121212",
    trips: [
      {startTime: '21:00', startStation: "Бобруйск, Магазин 'Цыганский'", finishTime: '22:00', finishStation: 'Глуск, Центр'}, 
      {startTime: '21:00', startStation: "Бобруйск, Магазин 'Цыганский'", finishTime: '22:00', finishStation: 'Глуск, Центр'}
    ]
  },
];
