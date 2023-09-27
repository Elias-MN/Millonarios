const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let userList = [];

//getRandomUser();

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);

async function getRandomUser() {
  let res = await fetch('https://randomuser.me/api');
  let data = await res.json();
  let user = data.results[0];
  let newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.random() * 100000
  }
  addData(newUser);
}

function addData(obj) {
  userList.push(obj)
  updateDOM()
}

function doubleMoney() {

  //Forma 1
  userList.map(element => {
    element.money *= 2
  });

  //Forma 2
  userList = userList.map(element => ({
    name: element.name,
    money: element.money * 2
  }));

  updateDOM()
}

function sortByRichest() {
  userList.sort((a, b) => b.money - a.money);
  updateDOM()
}

function showMillionaires() {
  userList = userList.filter(element => element.money > 1000000);
  updateDOM()
}

function calculateWealth() {
  let wealth = userList.reduce((acc, user) => (acc += user.money), 0);
  let wealthElement = document.createElement('div');
  let wealthFormated = formatMoney(wealth);
  wealthElement.innerHTML = `<h3>Dinero total: <strong>${wealthFormated}</strong></h3>`;
  main.appendChild(wealthElement);
}

function updateDOM() {
  main.innerHTML = '<h2><strong>Persona</strong> Dinero</h2>';

  userList.forEach(user => {
    let userElement = document.createElement("div");
    userElement.classList.toggle("person");
    let moneyFormated = formatMoney(user.money);
    userElement.innerHTML = `<strong>${user.name} </strong> ${moneyFormated}`;
    main.appendChild(userElement);
  });
}

function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '€';
}
