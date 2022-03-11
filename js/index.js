// Картка зареєструватись
let registerCard = document.querySelector('.register_card');//Картка зареєструватись
let name = document.querySelector('.name');//Імя користувача
let lastName = document.querySelector('.last_name');//Прізвище користувача
let email = document.querySelector('.email');//Email користувача
let password = document.querySelector('.password');// Пароль користувача
let itDirection = document.querySelector('.itDirection');// IT напрямок
let genderMan = document.querySelector('.male');//Стать 'чол'
let genderWoman = document.querySelector('.female');// Стать 'жін'
let inputSexName = document.getElementsByName('flexRadioDefault');//input статі
let checkbox = document.querySelector('.checkbox');//Checkbox подження з умовами
let btnSignUp = document.querySelector('.btn_Sign_Up');//Кнопка зареєструвати користувача
let btnSignIn = document.querySelector('.btn_Sign_In');//Кнопка увійти якщо користувач зареєстрований
let inputCardRegister = document.querySelectorAll('.index');//inputs картки зареєструватись

//Картка увійти якщо користувач вже зареєстрований
let loginCard = document.querySelector('.login_card');//Картка увійти увійти якщо користувач вже зареєстрований
let passwordLogin = document.querySelector('.login_password');//Пароль зареєстрованого користувача
let emailLogin = document.querySelector('.login_email');//Email зареєстрованого користувача
let btnSignOut = document.querySelector('.btn_Sign_out_login');//Кнопка яка виводить картку користувача 
let message = document.querySelector('.message');//Повідомлення якщо email або пароль введено не вірно

//Картка користувача
let userСard = document.querySelector('.user_card');//Картка інформації про користувача
let btnGoOut = document.querySelector('.btn_Go_out');//Кнопка вийти
let displayItdirection = document.querySelector('.display_it_direction');// Виводить it напрямок користувача на його картці
let displayNameandSecondName = document.querySelector('.display_name_and_secondName');//Виводить імя та прізвище користувача на його картці
let displayEmail = document.querySelector('.display_email');// Виводить email користувача на його картці

//Відкриває необхідні картки
const ShowCards = (card) => {
  switch (card) {
    case 'Sign in':
      userСard.style.display = 'none';
      registerCard.style.display = 'none';
      loginCard.style.display = 'block'
      break;
    case 'User card sign in':
      userСard.style.display = 'block';
      registerCard.style.display = 'none';
      loginCard.style.display = 'none'
      break;
    case 'Sign up':
      userСard.style.display = 'block';
      registerCard.style.display = 'none';
      loginCard.style.display = 'none'
      break;
    case 'Go out':
      userСard.style.display = 'none';
      registerCard.style.display = 'block';
      loginCard.style.display = 'none'
      message.style.display = 'none'
      break;
    default:
      alert('Error')
      break;
  }
}

// Додає чи видаляє зеленений border
for (let i = 0; i < inputCardRegister.length; i++) {
  inputCardRegister[i].addEventListener('change', () => {
    if (inputCardRegister[i].value === '') {
      inputCardRegister[i].classList.remove('is-valid')
    } else {
      inputCardRegister[i].classList.add('is-valid')
      inputCardRegister[i].classList.remove('is-invalid')
    }
  })
}

//Приводить до верхнього регістра імя
name.addEventListener('change', () => {
  if (!name.value) return name.value;
  name.value = name.value[0].toUpperCase() + name.value.substring(1)
})

//Приводить до верхнього регістра прізвище
lastName.addEventListener('change', () => {
  if (!lastName.value) return lastName.value;
  lastName.value = lastName.value[0].toUpperCase() + lastName.value.substring(1)
})

// Перевіряє чи вірно написано емайл та додає чи видаляє червоний border
let booleanEmail
email.addEventListener('change', () => {
  let searchStart = email.value.startsWith('@')
  let searchEnd = email.value.endsWith('@')
  let searchSymbol = email.value.includes('@')
  if (email.value === '') {
    email.classList.remove('is-invalid')
  } else if (searchStart) {
    email.classList.add('is-invalid')
    booleanEmail = false
  } else if (searchEnd) {
    email.classList.add('is-invalid')
    booleanEmail = false
  } else if (!searchSymbol) {
    email.classList.add('is-invalid')
    booleanEmail = false
  } else if (searchSymbol) {
    email.classList.remove('is-invalid')
    booleanEmail = true
    email.classList.add('is-valid')
  }
})

//Відкриває картку увійти//
btnSignIn.addEventListener('click', () => {
  ShowCards('Sign in')
})

//Змінюємо колір кнопки при погодженні умов
checkbox.addEventListener('click', colorBtnSign);

function colorBtnSign() {
  checkbox.checked ? btnSignUp.style.background = "linear-gradient(to right, #36d1dc, #5b86e5)" : btnSignUp.style.background = "";
};


//Створюємо пустий масив користувачів (users) та закидуємо в localStorage // а також перевіряємо чи є в localStorage наш users
let users
!localStorage.users ? users = [] : users = JSON.parse(localStorage.getItem('users'))

function User(userName, userLastName, userEmail, userItDirection, userPassword, userSex) {
  this.userName = userName
  this.userLastName = userLastName
  this.userEmail = userEmail
  this.userItDirection = userItDirection
  this.userPassword = userPassword
  this.userSex = userSex
}

//Додаєм дані користувачів до масиву user  в localStorage
const addDateUsers = () => {
  users.push(new User(name.value, lastName.value, email.value, itDirection.value, password.value, valueSex))
  localStorage.setItem('users', JSON.stringify(users))
}

//Додаємо value статі в localStorage//
for (let i = 0; i < inputSexName.length; i++) {
  inputSexName[i].onclick = function () {
    localStorage.setItem('valueSex', this.value);
  }
}
if (localStorage.getItem('valueSex')) {
  let valueSex = localStorage.getItem('valueSex');
  document.querySelector('input[name="flexRadioDefault"][value="' + valueSex + '"]').setAttribute('checked', 'checked');
}

//витягуємо значення value статі в localStorage//
let valueSex
const showValueSex = () => {
  valueSex = localStorage.getItem('valueSex')
  return valueSex
}

//Перевіряємо чи користувач погодився з умовами, чи всі input записані та чи вірно введений емайл користувачаб
//  якщо все вірно, реєструємо користувача
btnSignUp.addEventListener('click', registerUser);

function registerUser() {
  showValueSex()

  //Перевіряємо чи всі inputs записані // (Додає чи видаляє червоний border)

  let booleanValueInput
  for (let i = 0; i < inputCardRegister.length; i++) {
    if (inputCardRegister[i].value === '') {
      inputCardRegister[i].classList.add('is-invalid')
      booleanValueInput = false
    } else if (!booleanEmail) {
      email.classList.add('is-invalid')
    }
    else {
      inputCardRegister[i].classList.remove('is-invalid')
    }
    if (booleanValueInput === undefined) {
      booleanValueInput = true
    }
  }

  if (checkbox.checked && booleanValueInput && booleanEmail) {
    ShowCards('Sign up')

    displayNameandSecondName.textContent = `${name.value} ${lastName.value}`;
    displayEmail.textContent = email.value;
    displayItdirection.textContent = itDirection.value;

    if (genderMan.checked) {
      document.querySelector('.imgBox').classList.add('imageMan');
    } else if (genderWoman.checked) {
      document.querySelector('.imgBox').classList.add('imageWoman');
    };
    addDateUsers()
  };
};


//Увійти якщо користувач вже зареєстрований
btnSignOut.addEventListener('click', validationUser)

function validationUser() {

  for (i = 0; i < users.length; i++) {
    //Перевіряє чи вірний Email та password ввів користувач (додає червоний border якщо щось не вірно введенно)
    if (emailLogin.value !== users[i].userEmail) {
      emailLogin.classList.add('is-invalid')
      message.style.display = 'block'
    }
    if (passwordLogin.value !== users[i].userPassword) { passwordLogin.classList.add('is-invalid') }

    //Перевіряємо чи користувач зареєстрований (якщо все вірно виводим картку користувача)

    if (emailLogin.value === users[i].userEmail && passwordLogin.value === users[i].userPassword) {
      ShowCards('User card sign in')

      switch (users[i].userSex) {
        case '1':
          document.querySelector('.imgBox').classList.add('imageMan');
          break;
        case '2':
          document.querySelector('.imgBox').classList.add('imageWoman');
          break;
        default:
          alert('Error')
          break;
      }

      displayItdirection.textContent = users[i].userItDirection;
      displayNameandSecondName.textContent = `${users[i].userName} ${users[i].userLastName}`;
      displayEmail.textContent = users[i].userEmail;
    }
  }
}


//Видаляємо всі value та border з inputs коли виходимо
const clearAllValues = () => {
  ShowCards('Go out');

  const allInputs = document.querySelectorAll('.form-control')// всі inputs
  allInputs.forEach((elem) => {
    elem.value = ''
    elem.classList.remove('is-valid', 'is-invalid')
  })
  checkbox.checked = false;
  genderMan.checked = false;
  genderWoman.checked = false;
  document.querySelector('.imgBox').classList.remove('imageMan');
  document.querySelector('.imgBox').classList.remove('imageWoman');

  btnSignUp.style.background = ""
}