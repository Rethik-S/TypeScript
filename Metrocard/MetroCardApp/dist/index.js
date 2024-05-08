"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let editingId = null;
let CurrentLoggedInuser;
const form = document.getElementById("signupform");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("signuppassword");
const loginPasswordInput = document.getElementById("password");
const signInEmailInput = document.getElementById("signInEmail");
const signUpEmailInput = document.getElementById("signUpEmail");
const loginForm = document.getElementById("signInForm");
const signUpElement = document.getElementById("signUp");
const existingUserElement = document.getElementById("existingUser");
const signSwitchElement = document.getElementById("signSwitch");
const wrapperElement = document.getElementById("wrapper");
const homePage = document.getElementById("homePage");
const greeting = document.getElementById("greeting");
const travelHistoryElement = document.getElementById("travelHistory");
const updateBalanceElement = document.getElementById("updateBalance");
const showBalanceElement = document.getElementById("showBalance");
const ticketFairElement = document.getElementById("ticketFair");
const travelError = document.getElementById("travelError");
const editForm = document.getElementById("editTicketForm");
const fromLocation = document.getElementById("fromLocation");
const toLocation = document.getElementById("toLocation");
const fair = document.getElementById("fair");
//error
const balanceError = document.getElementById("balanceError");
const invalidLogin = document.getElementById("invalidLogin");
//sign up
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const password = passwordInput.value.trim();
    const email = signUpEmailInput.value.trim();
    const user = {
        cardNumber: 0,
        name: name,
        phoneNumber: phone,
        password: password,
        balance: 0,
        email: email
    };
    addUser(user);
    CurrentLoggedInuser = user;
    // homepage();
    // greeting.innerHTML = `Welcome ${CurrentLoggedInuser.name}`;
    form.reset();
});
//login
loginForm.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const email = signInEmailInput.value.trim();
    const pass = loginPasswordInput.value.trim();
    const users = yield fetchUser();
    const userIndex = users.findIndex(u => u.email == email && u.password == pass);
    if (userIndex == -1) {
        invalidLogin.innerHTML = "Please check email and password";
    }
    else {
        CurrentLoggedInuser = users[userIndex];
        homepage();
        greeting.innerHTML = `Welcome ${users[userIndex].name}`;
    }
    form.reset();
}));
function newUser() {
    signUpElement.style.display = "block";
    existingUserElement.style.display = "none";
}
function existingUser() {
    signUpElement.style.display = "none";
    existingUserElement.style.display = "block";
}
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5075/api/Users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to add user');
        }
        // renderusers();
    });
}
function addTicket(ticket) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5075/api/TicketFairs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticket)
        });
        if (!response.ok) {
            throw new Error('Failed to add user');
        }
        // renderusers();
        showTicketDetails();
    });
}
function fetchUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5075/api/Users';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function updateUser(cardNumber, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5075/api/Users/${cardNumber}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to update user');
        }
    });
}
function updateTicket(ticketID, ticket) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5075/api/TicketFairs/${ticketID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticket)
        });
        if (!response.ok) {
            throw new Error('Failed to update user');
        }
        showTicketDetails();
    });
}
function fetchTravelDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5075/api/TravelDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch travel details');
        }
        return yield response.json();
    });
}
function addTravelDetails(travelDetails) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5075/api/TravelDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(travelDetails)
        });
        if (!response.ok) {
            throw new Error('Failed to add travel details');
        }
        // renderusers();
    });
}
function fetchTicketFairs() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5075/api/TicketFairs';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch ticket fairs');
        }
        return yield response.json();
    });
}
function homepage() {
    wrapperElement.style.display = "none";
    homePage.style.display = "block";
}
function HideAll() {
    travelHistoryElement.style.display = "none";
    updateBalanceElement.style.display = "none";
    showBalanceElement.style.display = "none";
    ticketFairElement.style.display = "none";
    travelError.style.display = "none";
    balanceError.style.display = "none";
}
//features
function travelHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        HideAll();
        travelHistoryElement.style.display = "block";
        const travelHistoryList = yield fetchTravelDetails();
        let tableElement = document.getElementById("travel-table");
        tableElement.innerHTML = "";
        for (var i = 0; i < travelHistoryList.length; i++) {
            if (travelHistoryList[i].cardNumber == CurrentLoggedInuser.cardNumber) {
                let tableData = document.createElement("tr");
                tableData.innerHTML = `
        <td>${travelHistoryList[i].travelID}</td>
        <td>${travelHistoryList[i].cardNumber}</td>
        <td>${travelHistoryList[i].fromLocation}</td>
        <td>${travelHistoryList[i].toLocation}</td>
        <td>${travelHistoryList[i].date.split('T')[0].split('-').reverse().join('/')}</td>
        <td>${travelHistoryList[i].travelCost}</td>
            `;
                tableElement.appendChild(tableData);
            }
        }
    });
}
function DisplayRecharge() {
    HideAll();
    updateBalanceElement.style.display = "block";
}
function Recharge() {
    let amount = parseInt(document.getElementById("balance").value);
    if (amount > 0) {
        HideAll();
        showBalanceElement.style.display = "block";
        CurrentLoggedInuser.balance += amount;
        document.getElementById("balance-message").innerHTML = `your balance is ${CurrentLoggedInuser.balance}`;
        updateUser(CurrentLoggedInuser.cardNumber, CurrentLoggedInuser);
    }
    else {
        balanceError.style.display = "block";
        balanceError.innerHTML = 'Enter a valid amount';
    }
}
function showBalance() {
    HideAll();
    showBalanceElement.style.display = "block";
    document.getElementById("balance-message").innerHTML = `your balance is ${CurrentLoggedInuser.balance}`;
}
function Travel() {
    return __awaiter(this, void 0, void 0, function* () {
        HideAll();
        ticketFairElement.style.display = "block";
        const travelFairsList = yield fetchTicketFairs();
        let tableElement = document.getElementById("ticket-table");
        tableElement.innerHTML = "";
        for (var i = 0; i < travelFairsList.length; i++) {
            let tableData = document.createElement("tr");
            tableData.innerHTML = `
        <td>${travelFairsList[i].ticketID}</td>
        <td>${travelFairsList[i].fromLocation}</td>
        <td>${travelFairsList[i].toLocation}</td>
        <td>${travelFairsList[i].fair}</td>
        <td><button onclick="Book(${travelFairsList[i].ticketID})">Book</button></td>
            `;
            tableElement.appendChild(tableData);
        }
    });
}
function showTicketDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        HideAll();
        ticketFairElement.style.display = "block";
        const travelFairsList = yield fetchTicketFairs();
        let tableElement = document.getElementById("ticket-table");
        tableElement.innerHTML = "";
        for (var i = 0; i < travelFairsList.length; i++) {
            let tableData = document.createElement("tr");
            tableData.innerHTML = `
        <td>${travelFairsList[i].ticketID}</td>
        <td>${travelFairsList[i].fromLocation}</td>
        <td>${travelFairsList[i].toLocation}</td>
        <td>${travelFairsList[i].fair}</td>
        <td><button onclick="Edit(${travelFairsList[i].ticketID})">Edit</button></td>
        <td><button onclick="deleteTicket(${travelFairsList[i].ticketID})">Delete</button></td>
            `;
            tableElement.appendChild(tableData);
        }
    });
}
function Book(ticketID) {
    return __awaiter(this, void 0, void 0, function* () {
        const travelFairsList = yield fetchTicketFairs();
        const ticketindex = travelFairsList.findIndex((t) => t.ticketID == ticketID);
        const ticket = travelFairsList[ticketindex];
        if (CurrentLoggedInuser.balance > ticket.fair) {
            const travelDetails = {
                travelID: 0,
                cardNumber: CurrentLoggedInuser.cardNumber,
                fromLocation: ticket.fromLocation,
                toLocation: ticket.toLocation,
                date: new Date().toISOString().substring(0, 10),
                travelCost: ticket.fair
            };
            CurrentLoggedInuser.balance -= ticket.fair;
            updateUser(CurrentLoggedInuser.cardNumber, CurrentLoggedInuser);
            addTravelDetails(travelDetails);
            travelHistory();
        }
        else {
            travelError.style.display = "block";
            travelError.innerHTML = 'Insufficient Balance Please Recharge.';
        }
    });
}
function deleteTicket(ticketID) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5075/api/TicketFairs/${ticketID}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete contact');
        }
        showTicketDetails();
    });
}
editForm.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const fromlocation = fromLocation.value.trim();
    const tolocation = toLocation.value.trim();
    const price = parseInt(fair.value.trim());
    if (editingId !== null) {
        const ticketList = yield fetchTicketFairs();
        const index = ticketList.findIndex((item) => item.ticketID === editingId);
        ticketList[index] = Object.assign(Object.assign({}, ticketList[index]), { fromLocation: fromlocation, toLocation: tolocation, fair: price });
        updateTicket(ticketList[index].ticketID, ticketList[index]);
        editingId = null;
    }
    else {
        const ticket = {
            ticketID: 0,
            fromLocation: fromlocation,
            toLocation: tolocation,
            fair: price
        };
        addTicket(ticket);
    }
    editForm.reset();
}));
function Edit(id) {
    return __awaiter(this, void 0, void 0, function* () {
        editingId = id;
        const ticketList = yield fetchTicketFairs();
        const item = ticketList.find((item) => item.ticketID === id);
        if (item) {
            fromLocation.value = item.fromLocation;
            toLocation.value = item.toLocation;
            fair.value = item.fair;
        }
    });
}
