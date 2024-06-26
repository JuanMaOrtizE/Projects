'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////

const mostrarMovimientos = function (acc, sort = false) {
  containerMovements.innerHTML = ``;

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements; //se usa una copia utilizand el método slice() para no modificar el array original al usar sort()

  movs.forEach(function (mov, i) {
    const tipo = mov > 0 ? `deposit` : `withdrawal`;
    const date = new Date(acc.movementsDates[i]);
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getDate() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    const displayDate = `${day}/${month}/${year}`;
    const html = ` <div class="movements__row">
    <div class="movements__type movements__type--${tipo}">${i + 1} ${tipo}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${mov}</div>
  </div>`;
    containerMovements.insertAdjacentHTML(`afterbegin`, html);
  });
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(` `)
      .map(name => name[0])
      .join(``);
  });
};

const updateUI = function (currentAccount) {
  mostrarMovimientos(currentAccount);
  calcPrintBalance(currentAccount);
  calcDisplaySummary(currentAccount);
  clearInterval(timer);
  timer = startLogOutTimer();
};
createUsernames(accounts);

const calcPrintBalance = function (acc) {
  const balance = acc.movements.reduce((acum, element) => acum + element, 0);

  acc.balance = balance;

  labelBalance.textContent = `${acc.balance}$`;
};

const calcDisplaySummary = function (acc) {
  const movimientos = acc.movements;
  const incomes = movimientos
    .filter(element => element >= 0)
    .reduce((acum, element) => acum + element, 0);

  labelSumIn.textContent = `${incomes} $`;

  const out = movimientos
    .filter(element => element < 0)
    .reduce((acum, element) => acum + element, 0);

  labelSumOut.textContent = `${Math.abs(out)}$`;

  const interest = movimientos
    .filter(mov => mov >= 0)
    .map(element => (element * acc.interestRate) / 100)
    .filter(element => element > 1)
    .reduce((acum, element) => acum + element, 0);

  labelSumInterest.textContent = `${interest}$`;
};

//LOGIN
let currentAccount, timer;

btnLogin.addEventListener(`click`, function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Bienvenido de nuevo, ${
      currentAccount.owner.split(` `)[0]
    }`;

    containerApp.style.opacity = `100`;
    inputLoginPin.blur();
    inputLoginUsername.value = inputLoginPin.value = ``;
    if (timer) {
      clearInterval(timer);
    }
    // timer = startLogOutTimer();
    updateUI(currentAccount);
  }
});

//TRANSFERIR

btnTransfer.addEventListener(`click`, function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = ``;
  if (
    receiverAcc &&
    amount > 0 &&
    amount <= currentAccount.balance &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);
    // clearInterval(timer);
    // timer = startLogOutTimer();
  }
});

//ELIMINAR CUENTA

btnClose.addEventListener(`click`, function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // console.log(index);

    accounts.splice(index, 1);
    containerApp.style.opacity = ` 0`;
  }

  inputClosePin.value = inputCloseUsername.value = '';
});

//PRESTAMO

btnLoan.addEventListener(`click`, function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= 0.1 * amount)) {
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);
  }
});

//ORDENAR (envía el arreglo de movimientos y altera el parametro para saber si ordena o no)
let sorted = false;
btnSort.addEventListener(`click`, function (e) {
  e.preventDefault();
  mostrarMovimientos(currentAccount, !sorted);

  sorted = !sorted;
});

//DATE
const now = new Date();
const day = `${now.getDate()}`.padStart(2, 0);
const month = `${now.getDate() + 1}`.padStart(2, 0);
const year = now.getFullYear();
const hour = now.getHours();
const min = now.getMinutes();
labelDate.textContent = `${day}/${month}/${year}, /${hour}:${min}`;

//SIEMPRE LOGG
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
    time--;
  };
  let time = 15;
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};
