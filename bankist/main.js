'use strict';

// Data
const account1 = {
  owner: 'John Wick',
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

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// FUNCTIONALITY

function updateUI(accs) {
  // display movements
  displayMovements(accs.movements);

  // display balance
  calcDisplayBalance(accs);

  // display summary
  calcDisplaySummary(accs);
}

// show the movements on the UI
function displayMovements(movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
        `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

function calcDisplayBalance(accs) {
  accs.balance = accs.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = accs.balance + '€';
}

function calcDisplaySummary(accs) {
  const incomes = accs.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = incomes + '€';

  const spends = accs.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = Math.abs(spends) + '€';

  const interest = accs.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * accs.interestRate) / 100)
    .filter(deposit => deposit >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = interest + '€';
}

// add a username to each account object
function createUsernames(accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
}

createUsernames(accounts);

// Event handlers

let currentAccount;
btnLogin.addEventListener('click', e => {
  e.preventDefault();

  // get current account
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display ui and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 1;

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginUsername.blur();
    inputLoginPin.blur();

    // update ui
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // update ui
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // add the movements
    currentAccount.movements.push(amount);

    // update UI
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === inputCloseUsername.value
    );

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  // Clear fields
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

const movementsUsd = movements.map(mov => Math.round(mov * eurToUsd));

// console.log(movements);
// console.log(movementsUsd);

const deposits = movements.filter(mov => mov > 0);

// console.log(deposits);

const balance = movements.reduce((acc, current) => acc + current, 0);

// console.log(balance);

// maximum value
const maxValue = movements.reduce((max, mov) => (mov > max ? mov : max));

// console.log(maxValue);

// find
console.log('find()');
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

// some
console.log('some()');
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// any
console.log('any()');
const allDeposits = movements.every(mov => mov > 0);
console.log(allDeposits);

// flat
console.log('flat()');
const arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(arr.flat()); // 1 is the default deepth

const arrDeep = [
  [[1], [2], [3]],
  [[4], [5], [6]],
  [[7], [8], [9]],
];
console.log(arrDeep.flat(2));

const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// flatMap (only goes 1 level deep)
console.log('flatMap()');
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance2);

// sort
// return < 0, A, B (keep order) A - B => < 0
// return > 0, B, A (switch order) A - B => > 0
// where A and B are any 2 consecutive elements in the array
/* [...movements].sort((a, b) => {
  if (a > b) return 1;
  if (b > a) return -1;
})*/

console.log(
  'Sorted movements (ascending): ' + [...movements].sort((a, b) => a - b)
);
console.log(
  'Sorted movements (descending): ' + [...movements].sort((a, b) => b - a)
);

// Array grouping
const groupedMovements = Object.groupBy(movements, movement =>
  movement > 0 ? 'deposits' : 'withdrawals'
);
console.log(groupedMovements);

// Create and fill arrays
console.log('fill() and from()');
const x = new Array(7);
console.log(x);
x.fill(0, 2, 5);
console.log(x);

const y = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(y);

console.log(Array.from('foobar'));

console.log(Array.from(document.querySelectorAll('button')));

// Non-destructive alternatives: toReversed, toSorted, toSpliced, with
console.log('toReversed()');
console.log(movements);
// const reversedMovements = movements.slice().reverse();
const reversedMovements = movements.toReversed();
console.log(reversedMovements);
console.log(movements);

const newMovements = movements.with(1, 2000);
console.log('with()');
console.log(movements);
console.log(newMovements);

// Challenge

/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/

const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];

// 1. Store the the average weight of a "Husky" in a variable "huskyWeight"
const huskyWeight = breeds.find(br => br.breed === 'Husky').averageWeight;
console.log(huskyWeight);

// 2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
const dogBothActivities = breeds.find(
  br => br.activities.includes('fetch') && br.activities.includes('running')
).breed;
console.log(dogBothActivities);

// 3. Create an array "allActivities" of all the activities of all the dog breeds
const allActivities = breeds.flatMap(br => br.activities);
console.log(allActivities);

// 4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
const uniqueActivities = [...new Set(allActivities)];
console.log(uniqueActivities);

// 5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
const swimmingAdjacent = [
  ...new Set(
    breeds
      .map(br => br.activities)
      .filter(br => br.includes('swimming'))
      .flat()
      .filter(act => act !== 'swimming')
  ),
];

console.log(swimmingAdjacent);

// 6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
console.log(breeds.every(br => br.averageWeight >= 10));

// 7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".
console.log(breeds.some(br => br.activities.length >= 3));

// BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.
const avgMaxWeightLikesFetch = Math.max(
  ...breeds
    .filter(br => br.activities.includes('fetch'))
    .map(br => br.averageWeight)
);

console.log(avgMaxWeightLikesFetch);
