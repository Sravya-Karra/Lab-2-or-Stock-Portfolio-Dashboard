/* add your code here */

document.addEventListener('DOMContentLoaded', () => {

  const stocksData = JSON.parse(stockContent);
  const userData = JSON.parse(userContent);

  function generateUserList(users, stocks) {
    const userList = document.querySelector('.user-list');
    userList.innerHTML = '';

    users.map(({ user, id }) => {
      const listItem = document.createElement('li');
      listItem.innerText = user.lastname + ', ' + user.firstname;
      listItem.setAttribute('id', id);
      userList.appendChild(listItem);
    });

    userList.addEventListener('click', (event) => {
      if (event.target.tagName === 'LI') {
        handleUserListClick(event, userData, stocksData);
      }
    });
  }

  function handleUserListClick(event, users, stocks) {
    const userId = event.target.id;
    const user = users.find(user => user.id == userId);
    populateForm(user);
    renderPortfolio(user, stocks);
  }

  function renderPortfolio(user, stocks) {
    const { portfolio } = user;
    const portfolioDetails = document.querySelector('.portfolio-list');
    portfolioDetails.innerHTML = '';

    portfolio.map(({ symbol, owned }) => {
      const symbolEl = document.createElement('p');
      const sharesEl = document.createElement('p');
      const actionEl = document.createElement('button');

      symbolEl.innerText = symbol;
      sharesEl.innerText = owned;
      actionEl.innerText = 'View';
      actionEl.setAttribute('id', symbol);

      portfolioDetails.appendChild(symbolEl);
      portfolioDetails.appendChild(sharesEl);
      portfolioDetails.appendChild(actionEl);
    });

    portfolioDetails.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        viewStock(event.target.id, stocks);
      }
    });
  }

  function viewStock(symbol, stocks) {
    const stockArea = document.querySelector('.stock-form');
    if (stockArea) {
      const stock = stocks.find(s => s.symbol == symbol);
      document.querySelector('#stockName').textContent = stock.name;
      document.querySelector('#stockSector').textContent = stock.sector;
      document.querySelector('#stockIndustry').textContent = stock.subIndustry;
      document.querySelector('#stockAddress').textContent = stock.address;
      document.querySelector('#logo').src = `logos/${symbol}.svg`;
    }
  }

  function populateForm(data) {
    const { user, id } = data;
    document.querySelector('#userID').value = id;
    document.querySelector('#firstname').value = user.firstname;
    document.querySelector('#lastname').value = user.lastname;
    document.querySelector('#address').value = user.address;
    document.querySelector('#city').value = user.city;
    document.querySelector('#email').value = user.email;
  }

  const saveButton = document.querySelector('#btnSave');
  const deleteButton = document.querySelector('#btnDelete');

  saveButton.addEventListener('click', (event) => {
    event.preventDefault();
    const id = document.querySelector('#userID').value;
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].id == id) {
        userData[i].user.firstname = document.querySelector('#firstname').value;
        userData[i].user.lastname = document.querySelector('#lastname').value;
        userData[i].user.address = document.querySelector('#address').value;
        userData[i].user.city = document.querySelector('#city').value;
        userData[i].user.email = document.querySelector('#email').value;
        generateUserList(userData, stocksData);
      }
    }
  });

deleteButton.addEventListener('click', (event) => {
  event.preventDefault();
  const userId = document.querySelector('#userID').value;
  const userIndex = userData.findIndex(user => user.id == userId);

  if (userIndex !== -1) {
    // Remove the user from the userData array
    userData.splice(userIndex, 1);

    // Clear the user list and portfolio list on the dashboard
    clearUserList();
    clearPortfolio();

    // Re-render the user list without the deleted user
    generateUserList(userData, stocksData);
  }
});

// Function to clear the user list
function clearUserList() {
  const userList = document.querySelector('.user-list');
  userList.innerHTML = '';
}

// Function to clear the portfolio list
function clearPortfolio() {
  const portfolioDetails = document.querySelector('.portfolio-list');
  portfolioDetails.innerHTML = '';
}


  generateUserList(userData, stocksData);

});