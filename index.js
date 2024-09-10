const LEFT = document.querySelector('#left');
const RIGHT = document.querySelector('#right');
const CARUSEL = document.querySelector('#carusel');
const SECTIONS = document.querySelectorAll('section');
const LINKS = document.querySelectorAll('a');
const LOGO = document.querySelector('.div-logo');
const LEFT_PHOTO = document.querySelector('#left-photo');
const RIGHT_PHOTO = document.querySelector('#right-photo');
const PHOTO = document.querySelector('#pub-photo');
const MENU = document.querySelectorAll('.menu > div > img');
const MODAL = document.querySelector('#modal-wrapper');
const AFISHA = document.querySelector('#div-afisha');
const GAME = document.querySelector('#div-game');
const SUBSCRIBE = document.querySelector('#subscribe');
const RESERVE = document.querySelector('#reserve-btn');
const GO_GAME = document.querySelector('#btn-game');
const CLOSE = document.querySelector('#close');
const BURGER = document.querySelector('.burger-menu');
const NAV = document.querySelector('nav');
const BLACKOUT = document.querySelector('#blackout');
const ABOUT = document.querySelector('.div-about');
const FOTO = document.querySelector('.div-photo');

let beforeCoord, afterCoord = '0px', step, activeSec = 0, photoNum = 0;
const photos = new Array();

const test = {
    count: 0,
    numbQ: 5,
    arrQ: [
        ["В каком году открыл двери наш паб?", ["2020", "2018", "1999"], 2],
        ["Когда мы празднуем наш день рождения?", ["25 марта", "12 сентября", "14 февраля"], 1],
        ["Какой сорт пива самый популярный в нашем пабе?", ["Guinness", "Олд Бобби", "Белое золото"], 3],
        ["Какая самая популярная настойка у наших гостей?", ["Смородина на джине", "Щавелевая", "Вишня на виски"], 2],
        ['Из чего состоит наше самое популярное блюдо "Колбаски с хашбраунами"?', ["Две колбаски из птицы, картофельные оладушки, маринованные огручики, горчичный соус", "Колбаска из телятины, картофельные дольки, соус Барбекю, зеленый лук", 'Две свинные колбаски, порция фри, кетчуп'], 2]
    ],
    currentAnswer: -1,
    rightAnswers: 0,
    btn: GO_GAME,
    start: function (arrQ) {
        test.btn.setAttribute("disabled", "disabled");
        test.btn.addEventListener('click', test.checkAnswer);

        let question = document.querySelector("#question");
        question.innerHTML = arrQ[0];
        let answers = document.querySelectorAll("li>input");
        answers.forEach((el, j) => {
            el.value = arrQ[1][j];
            el.addEventListener('click', test.selected)
        });

        answers = document.querySelectorAll("li>label");
        answers.forEach((el, j) => {
            el.innerHTML = arrQ[1][j];
        });
    },
    selected: function (e) {
        let answers = document.querySelectorAll("li>input");
        answers.forEach((el) => {
            if (el.checked) {
                test.currentAnswer = el.id;
            }
            if (test.currentAnswer !== -1) {
                test.btn.removeAttribute("disabled");
            }
        })

    },
    checkAnswer: function () {
        if (test.currentAnswer == test.arrQ[test.count][2]) {
            test.rightAnswers++
        }
        document.getElementById(`${test.currentAnswer}`).checked = false;
        test.currentAnswer = -1;

        if (test.count + 1 === test.numbQ) {
            test.btn.removeEventListener('click', test.checkAnswer);
            test.btn.removeAttribute("disabled");
            test.showResult(test.rightAnswers); return;
        }
        test.count++
        test.btn.setAttribute("disabled", "disabled");

        setTimeout(test.start(test.arrQ[test.count]), 500);
    },
    showResult: function (a) {
        document.querySelector('#div-q > ul').classList.add('hidden');
        let resulStr = "";
        switch (a) {
            case (0):
            case (1):
                resulStr = "Приходите чаще, многое про нас узнаете!"; break;
            case (2):
            case (3):
                resulStr = "Видимо вы бываете у нас, но хотелось бы чаще!<br>Угостим настойкой)"; break;
            case (4):
            case (5):
                resulStr = "Вы наш любимый гость!<br>Приходите с друзьями - у вас 10% скидка!"; break;
            default:
                resulStr = "Что-то пошло не так"; break;
        }
        document.querySelector("#question").innerHTML = resulStr;
        document.querySelector("#question").classList.toggle('result');
        test.btn.innerHTML = "отправить результат";
        test.btn.addEventListener('click', test.sentResult);
    },
    sentResult: function () {
        test.btn.classList.add('hidden')
        getSubscribe();

    }

}


const beer = [['Разливное пиво',
    ['Аливария Премиум, 500 мл', '7 р.'],
    ['Аливария Белое Золото, 500 мл', '7 р.'],
    ['Олд Бобби, 500 мл', '7 р.'],
    ['IPA by HOPS brewery, 500 мл', '10 р.'],
    ['Dark Lager by HAS brewery, 500 мл', '10 р.']],
['Бутылочное пиво',
    ['Guinness, 440 мл', '15 р.'],
    ['Budwieser, 330 мл', '9 р.'],
    ['Estrella, 330 мл', '8 р.'],
    ['Сидр в ассортименте, 500 мл', '7 р.'],
    ['Аливария 0, 500 мл', '7 р.']]
]
const cocktail = [['Коктейли',
    ['Paloma', '16 р.'],
    ['Fiero Tonic', '16 р.'],
    ['Gin Tonic', '16 р.'],
    ['Negroni', '18 р.'],
    ['Bulvardier', '18 р.'],
    ['Rum/Whiskey Sour', '18 р.'],
    ['Big Lebowsky', '18 р.'],
    ['Long Island', '22 р.']]
]
const spirit = [['Вино',
    ['Красное вино, 750 мл', '45 р.'],
    ['Белое вино, 750 мл', '45 р.']],
['Вермут',
    ['Bianco', '7 р.'],
    ["Rosso", '7 р.'],
    ['Extra Dry', '7 р.'],
    ['Fiero', '8 р.']],
['Виски',
    ['Jim Beam', '12 р.'],
    ["Bushmill's", '12 р.'],
    ['Jameson', '12 р.']],
['Бренди',
    ['Torres', '10 р.']],
['Ликеры',
    ['Becherovka', '10 р.'],
    ['Kahlua', '10 р.'],
    ['Campari', '12 р.'],
    ['Jagermeister', '12 р.'],
    ['Cointreau', '12 р.']],
['Водка',
    ['Finlandia', '10 р.'],
    ['Бульбаш', '4 р.']],
['Ром',
    ['Havana Anos', '10 р.'],
    ['Havana Espesial', '10 р.']],
['Джин',
    ['Beefeater', '12 р.'],
    ["Gordon's", '12 р.']],
['Текила',
    ['Olmeca', '10 р.']]
]
const food = [['Горячие закуски',
    ['Пивная тарелка', '38 р.'],
    ['Колбаски и хашбрауны', '18 р.'],
    ['Куриный крылья', '12 р.'],
    ['Мясные подушечки', '10 р.'],
    ['Наггетсы', '10 р.'],
    ['Хашбрауны', '10 р.'],
    ['Сырные палочки', '10 р.'],
    ['Луковые кольца', '10 р.'],
    ['Картофель фри', '7 р.']],
['Снэки',
    ['Начос с соусом', '6 р.'],
    ['Арахис соленый', '4 р.'],
    ['Арахис в аанировке', '4 р.'],
    ['Фисташки', '12 р.']]
]

let getStep = () => {
    const width = window.innerWidth;
    if (width < 700) {
        step = width+50; 
    } else if (width < 960) {
        step = 750;
    } else if (width < 1060) {
        step = 850;
    } else if (width < 1160) {
        step = 950;
    } else {
        step = 1100;
    }

    if (width < 860) {
        openAbout();
    }
}
let moveRight = () => {
    LINKS[activeSec].classList.remove('active');
    activeSec++;
    if (activeSec >= SECTIONS.length) activeSec = 0;
    afterCoord = -activeSec * step;
    document.documentElement.style.setProperty('--after-coord', `${afterCoord}px`);

    CARUSEL.classList.add('transition');
    LINKS[activeSec].classList.add('active');
}
let moveLeft = () => {
    LINKS[activeSec].classList.remove('active');
    activeSec--;
    if (activeSec < 0) activeSec = SECTIONS.length - 1;
    afterCoord = -activeSec * step;
    document.documentElement.style.setProperty('--after-coord', `${afterCoord}px`);

    CARUSEL.classList.add('transition');
    LINKS[activeSec].classList.add('active');
}
let newCoord = (e) => {
    if (e.animationName === 'move') {
        CARUSEL.classList.remove('transition');
        beforeCoord = afterCoord;
        document.documentElement.style.setProperty('--before-coord', `${beforeCoord}px`);
    }
}
let changeSec = (e) => {
    LINKS[activeSec].classList.remove('active');
    activeSec = e.currentTarget.dataset.link;
    afterCoord = -activeSec * step;
    document.documentElement.style.setProperty('--after-coord', `${afterCoord}px`);
    CARUSEL.classList.add('transition');
    LINKS[activeSec].classList.add('active');

}
let showRightPhoto = () => {
    PHOTO.classList.add('fade-out');
    setTimeout(() => {
        if (++photoNum > 10) photoNum = 0;
        PHOTO.src = photos[photoNum].src;
        setTimeout(() => {
            PHOTO.classList.remove('fade-out');
        }, 50)
    }, 500);
}
let showLeftPhoto = () => {
    PHOTO.classList.add('fade-out');
    setTimeout(() => {
        if (--photoNum < 0) photoNum = 10;
        PHOTO.src = photos[photoNum].src;
        setTimeout(() => {
            PHOTO.classList.remove('fade-out');
        }, 50)
    }, 500);
}
let showMenu = (e) => {
    let obj = [];
    if (e.currentTarget.id === 'beer') obj = beer;
    if (e.currentTarget.id === 'cocktail') obj = cocktail;
    if (e.currentTarget.id === 'spirit') obj = spirit;
    if (e.currentTarget.id === 'food') obj = food;
    MODAL.classList.remove('hidden');
    MODAL.classList.add('modal-wrapper');
    let content = `<div class='modal'>
            <div id='close'><img src='./assets/images/cross.svg'></div>`;
    for (let i = 0; i < obj.length; i++) {
        content += `<h3>${obj[i][0]}</h3>`
        for (let j = 1; j < obj[i].length; j++) {
            content += `<div class='str-menu'><span>${obj[i][j][0]}</span><span>${obj[i][j][1]}</span></div>`
        }
    }
    content += `</div>`;
    MODAL.innerHTML = content;
    MODAL.addEventListener('click', closeModal)

}
let closeModal = (e) => {
    if (e.target.closest('div') === MODAL || e.target.closest('div').id === 'close') {
        MODAL.classList.add('hidden');
        MODAL.innerHTML = '';
    }
}
let openGame = () => {
    GAME.removeEventListener('click', openGame);
    AFISHA.addEventListener('click', openAfisha);
    AFISHA.classList.remove('open');
    AFISHA.classList.add('closed');
    GAME.classList.add('open');
    GAME.classList.remove('closed');
    AFISHA.children[0].classList.remove('hidden');
    AFISHA.children[1].classList.add('hidden');
    AFISHA.children[2].classList.add('hidden');
    GAME.children[0].classList.add('hidden');
    GAME.children[1].classList.remove('hidden');
}
let openAfisha = () => {
    AFISHA.removeEventListener('click', openAfisha);
    GAME.addEventListener('click', openGame);
    GAME.classList.remove('open');
    GAME.classList.add('closed');
    AFISHA.classList.remove('closed');
    AFISHA.classList.add('open');
    AFISHA.children[0].classList.add('hidden');
    AFISHA.children[2].classList.remove('hidden');
    GAME.children[0].classList.remove('hidden');
    GAME.children[1].classList.add('hidden');
    setTimeout(function () { AFISHA.children[1].classList.remove('hidden') }, 400)
}
let getSubscribe = () => {
    MODAL.classList.remove('hidden');
    MODAL.classList.add('modal-wrapper');
    let content = `<div class='modal'>`;
    content += `<form id="subscribeForm">
    <div id='close'><img src='./assets/images/cross.svg'></div>
    <div>
      <label for="firstName">Имя:</label>
      <input type="text" id="firstName" name="firstName" placeholder='Иван'>
      <span class="error" id="firstNameError"></span>
    </div>
    <div>
      <label for="lastName">Фамилия:</label>
      <input type="text" id="lastName" name="lastName" placeholder='Иванов'>
      <span class="error" id="lastNameError"></span>
    </div>
    <div>
      <label for="phone">Номер телефона:</label>
      <input type="tel" id="phone" name="phone" placeholder='+375111111111'>
      <span class="error" id="phoneError"></span>
    </div>
    <div>
      <label for="email">Почта:</label>
      <input type="email" id="email" name="email" placeholder='name@mail.com'>
      <span class="error" id="emailError"></span>
    </div>
    <button type="submit">Отправить</button>
  </form>`;
    content += `</div>`;
    MODAL.innerHTML = content;
    MODAL.addEventListener('click', closeModal)
    document.getElementById('subscribeForm').addEventListener('submit', function (event) {
        let isValid = true;

        // Проверка имени
        const firstName = document.getElementById('firstName');
        const firstNameError = document.getElementById('firstNameError');
        if (!/^[А-Яа-яЁёA-Za-z]+$/.test(firstName.value.trim())) {
            firstNameError.textContent = 'Введите корректное имя (только буквы).';
            isValid = false;
        } else {
            firstNameError.textContent = '';
        }

        // Проверка фамилии
        const lastName = document.getElementById('lastName');
        const lastNameError = document.getElementById('lastNameError');
        if (!/^[А-Яа-яЁёA-Za-z]+$/.test(lastName.value.trim())) {
            lastNameError.textContent = 'Введите корректную фамилию (только буквы).';
            isValid = false;
        } else {
            lastNameError.textContent = '';
        }

        // Проверка номера телефона
        const phone = document.getElementById('phone');
        const phoneError = document.getElementById('phoneError');
        const phonePattern = /^\+?\d{9,14}$/;
        if (!phonePattern.test(phone.value)) {
            phoneError.textContent = 'Введите корректный номер телефона.';
            isValid = false;
        } else {
            phoneError.textContent = '';
        }

        // Проверка почты
        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email.value)) {
            emailError.textContent = 'Введите корректный адрес электронной почты.';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        if (!isValid) {
            event.preventDefault();
        } else {
            event.preventDefault();
            MODAL.classList.add('hidden');
            MODAL.innerHTML = '';
        }
    });
}
let getReserve = () => {
    MODAL.classList.remove('hidden');
    MODAL.classList.add('modal-wrapper');
    let content = `<div class='modal'>`;
    content += `<form id="resrveForm">
        <div id='close'><img src='./assets/images/cross.svg'></div>
        <div>
            <label for="firstName">Имя:</label>
            <input type="text" id="firstName" name="firstName" placeholder='Иван'>
            <span class="error" id="firstNameError"></span>
        </div>
        <div>
            <label for="lastName">Фамилия:</label>
            <input type="text" id="lastName" name="lastName" placeholder='Иванов'>
            <span class="error" id="lastNameError"></span>
        </div>
        <div>
            <label for="phone">Номер телефона:</label>
            <input type="tel" id="phone" name="phone" placeholder='+375111111111'>
            <span class="error" id="phoneError"></span>
        </div>
        <div>
            <label for="datetime">Дата и время:</label>
            <input type="datetime-local" id="datetime"  name="datetime" >
            <span class="error" id="datetimeError"></span>
        </div>
        <div>
            <label for="comments" >Комментарии:</label>
            <textarea id="comments" name="comments" placeholder='Количество человек и другие пожелания'></textarea>
            <span class="error" id="commentsError"></span>
        </div>
        <button type="submit">Отправить</button>
    </form></div>`
    MODAL.innerHTML = content;
    MODAL.addEventListener('click', closeModal);

    const datetimeInput = document.getElementById('datetime');
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const currentDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

    datetimeInput.min = currentDateTime;

    document.getElementById('resrveForm').addEventListener('submit', function (event) {
        event.preventDefault();
        let isValid = true;

        // Проверка имени
        const firstName = document.getElementById('firstName');
        const firstNameError = document.getElementById('firstNameError');
        if (!/^[А-Яа-яЁёA-Za-z]+$/.test(firstName.value.trim())) {
            firstNameError.textContent = 'Введите корректное имя (только буквы).';
            isValid = false;
        } else {
            firstNameError.textContent = '';
        }

        // Проверка фамилии
        const lastName = document.getElementById('lastName');
        const lastNameError = document.getElementById('lastNameError');
        if (!/^[А-Яа-яЁёA-Za-z]+$/.test(lastName.value.trim())) {
            lastNameError.textContent = 'Введите корректную фамилию (только буквы).';
            isValid = false;
        } else {
            lastNameError.textContent = '';
        }

        // Проверка номера телефона
        const phone = document.getElementById('phone');
        const phoneError = document.getElementById('phoneError');
        if (!/^\+?\d{9,14}$/.test(phone.value.trim())) {
            phoneError.textContent = 'Введите корректный номер телефона.';
            isValid = false;
        } else {
            phoneError.textContent = '';
        }

        // Проверка даты и времени
        const datetime = document.getElementById('datetime');
        const datetimeError = document.getElementById('datetimeError');
        if (datetime.value.trim() === '') {
            datetimeError.textContent = 'Выберите дату и время.';
            isValid = false;
        } else {
            datetimeError.textContent = '';
        }

        // Проверка комментариев
        const comments = document.getElementById('comments');
        const commentsError = document.getElementById('commentsError');
        if (comments.value.trim() === '') {
            commentsError.textContent = 'Поле комментариев не должно быть пустым.';
            isValid = false;
        } else {
            commentsError.textContent = '';
        }

        if (isValid) {
            alert('Заявка отправлена! Мы с вами свяжемся.');
            MODAL.classList.add('hidden');
            MODAL.innerHTML = '';
        }
    });
}
let getDiscount = () => {
    GO_GAME.removeEventListener('click', getDiscount)
    const title = document.querySelector('#game-wrapper > h3');
    title.classList.add('hidden');
    const testBody = document.querySelector('#div-q');
    testBody.innerHTML = `<p id="question">Вопрос?</p>
        <ul>
            <li>
                <input type="radio" name="answer" id="1" value="">
                <label for="1">
            </li>
            <li>
                <input type="radio" name="answer" id="2" value="">
                <label for="2">
            </li>
            <li> 
                <input type="radio" name="answer" id="3" value="">
                <label for="3">
            </li>
        </ul>`;
    GO_GAME.innerHTML = 'ответить';
    test.start(test.arrQ[test.count]);
}
let openBurger = () => {
    BURGER.removeEventListener('click', openBurger);
    BURGER.classList.add('active');
    BURGER.addEventListener('click', closeBurger);
    BLACKOUT.classList.add('blackout');
    NAV.classList.add('nav-active');
    BLACKOUT.addEventListener('click', closeBurger)
    LINKS.forEach(el => {el.addEventListener('click', closeBurger) })

}
let closeBurger = () => {
    BURGER.removeEventListener('click', closeBurger);
    BURGER.classList.remove('active');
    BURGER.addEventListener('click', openBurger);
    NAV.classList.remove('nav-active')
    BURGER.addEventListener('click', openBurger)
    BLACKOUT.classList.remove('blackout');
}
let openAbout = () => {
    FOTO.classList.add('closed');
    FOTO.classList.remove('open');
    ABOUT.classList.add('open');
    ABOUT.classList.remove('closed');
    FOTO.addEventListener('click', openFoto);
    ABOUT.addEventListener('click', openAbout);
    PHOTO.classList.add('hidden')
    for (let i = 1; i < ABOUT.children.length; i++) {
        if (ABOUT.children[i].classList.contains('hidden')) ABOUT.children[i].classList.remove('hidden');
    }
    for (let i = 1; i < FOTO.children.length; i++) {
        FOTO.children[i].classList.add('hidden');
    }
}
let openFoto = () => {
    FOTO.classList.remove('closed');
    FOTO.classList.add('open');
    ABOUT.classList.remove('open');
    ABOUT.classList.add('closed');
    FOTO.removeEventListener('click', openFoto);
    ABOUT.addEventListener('click', openAbout);
    PHOTO.classList.remove('hidden');
    for (let i = 1; i < ABOUT.children.length; i++) {
        ABOUT.children[i].classList.add('hidden');
    }
    setTimeout(function () {
        for (let i = 1; i < FOTO.children.length; i++) {
        if (FOTO.children[i].classList.contains('hidden')) FOTO.children[i].classList.remove('hidden');
        }
    }, 300);
        
    }

window.addEventListener('load', function () {
    setTimeout(function () {
        const preloader = document.getElementById('preloader');
        preloader.style.display = 'none';
    }, 1500);
});
window.addEventListener('resize', getStep);

RIGHT.addEventListener('click', moveRight);
LEFT.addEventListener('click', moveLeft);
CARUSEL.addEventListener('animationend', newCoord);
LINKS.forEach(el => el.addEventListener('click', changeSec));
LOGO.addEventListener('click', changeSec);
RIGHT_PHOTO.addEventListener('click', showRightPhoto);
LEFT_PHOTO.addEventListener('click', showLeftPhoto);
MENU.forEach(el => el.addEventListener('click', showMenu));
GAME.addEventListener('click', openGame)
SUBSCRIBE.addEventListener('click', getSubscribe)
RESERVE.addEventListener('click', getReserve);
GO_GAME.addEventListener('click', getDiscount);
MENU.forEach(img => {
    img.addEventListener('touchstart', () => {
        img.classList.add('touch-active');
    });

    img.addEventListener('touchend', () => {
        img.classList.remove('touch-active');
    });
});
BURGER.addEventListener('click', openBurger);

window.onload = () => {
    getStep();
    for (let i = 0; i < 11; i++) {
        photos[i] = new Image();
        photos[i].src = `./assets/images/photo-${i}.jpg`;
    }
}
