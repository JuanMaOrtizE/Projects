'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const mostrarMovimientos = function (movimientos) {
  containerMovements.innerHTML = ``;
  movimientos.forEach(function (mov, i) {
    const tipo = mov > 0 ? `deposit` : `withdrawal`;
    const html = ` <div class="movements__row">
    <div class="movements__type movements__type--${tipo}">${i + 1} ${tipo}</div>
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
  mostrarMovimientos(currentAccount.movements);
  calcPrintBalance(currentAccount);
  calcDisplaySummary(currentAccount);
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
let currentAccount;

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
    updateUI(currentAccount);
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
    updateUI(currentAccount);
  }
});
