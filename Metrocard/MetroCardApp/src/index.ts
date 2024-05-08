interface User {
    cardNumber: number;
    name: string;
    phoneNumber: string;
    password: string;
    balance: number;
    email: string;
}

interface TravelDetails {
    travelID: number;
    cardNumber: number;
    fromLocation: string;
    toLocation: string;
    date: string;
    travelCost: number;
}
interface TicketFairs {
    ticketID: number;
    fromLocation: string;
    toLocation: string;
    fair: number;
}


let editingId: number | null = null;
let CurrentLoggedInuser: User;

const form = document.getElementById("signupform") as HTMLFormElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const phoneInput = document.getElementById("phone") as HTMLInputElement;
const passwordInput = document.getElementById("signuppassword") as HTMLInputElement;
const loginPasswordInput = document.getElementById("password") as HTMLInputElement;
const signInEmailInput = document.getElementById("signInEmail") as HTMLInputElement;
const signUpEmailInput = document.getElementById("signUpEmail") as HTMLInputElement;
const loginForm = document.getElementById("signInForm") as HTMLFormElement;
const signUpElement = document.getElementById("signUp") as HTMLDivElement;
const existingUserElement = document.getElementById("existingUser") as HTMLDivElement;
const signSwitchElement = document.getElementById("signSwitch") as HTMLDivElement;
const wrapperElement = document.getElementById("wrapper") as HTMLDivElement;
const homePage = document.getElementById("homePage") as HTMLDivElement;
const greeting = document.getElementById("greeting") as HTMLHeadingElement;
const travelHistoryElement = document.getElementById("travelHistory") as HTMLDivElement;
const updateBalanceElement = document.getElementById("updateBalance") as HTMLDivElement;
const showBalanceElement = document.getElementById("showBalance") as HTMLDivElement;
const ticketFairElement = document.getElementById("ticketFair") as HTMLDivElement;
const travelError = document.getElementById("travelError") as HTMLDivElement;
const editForm = document.getElementById("editTicketForm") as HTMLFormElement;
const fromLocation = document.getElementById("fromLocation") as HTMLFormElement;
const toLocation = document.getElementById("toLocation") as HTMLFormElement;
const fair = document.getElementById("fair") as HTMLFormElement;


//error
const balanceError = document.getElementById("balanceError") as HTMLSpanElement
const invalidLogin = document.getElementById("invalidLogin") as HTMLSpanElement;


//sign up
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const password = passwordInput.value.trim();
    const email = signUpEmailInput.value.trim();
    const user: User = {
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
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = signInEmailInput.value.trim();
    const pass = loginPasswordInput.value.trim();
    const users = await fetchUser();
    const userIndex = users.findIndex(u => u.email == email && u.password == pass
    );

    if (userIndex == -1) {
        invalidLogin.innerHTML = "Please check email and password";
    }
    else {
        CurrentLoggedInuser = users[userIndex];
        homepage();
        greeting.innerHTML = `Welcome ${users[userIndex].name}`;

    }

    form.reset();
});

function newUser() {

    signUpElement.style.display = "block";
    existingUserElement.style.display = "none";
}

function existingUser() {
    signUpElement.style.display = "none";
    existingUserElement.style.display = "block";

}

async function addUser(user: User): Promise<void> {
    const response = await fetch('http://localhost:5075/api/Users', {
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
}
async function addTicket(ticket: TicketFairs): Promise<void> {
    const response = await fetch('http://localhost:5075/api/TicketFairs', {
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
}

async function fetchUser(): Promise<User[]> {
    const apiUrl = 'http://localhost:5075/api/Users';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch contacts');
    }
    return await response.json();
}

async function updateUser(cardNumber: number, user: User): Promise<void> {
    const response = await fetch(`http://localhost:5075/api/Users/${cardNumber}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (!response.ok) {
        throw new Error('Failed to update user');
    }
}
async function updateTicket(ticketID: number, ticket: TicketFairs): Promise<void> {
    const response = await fetch(`http://localhost:5075/api/TicketFairs/${ticketID}`, {
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
}

async function fetchTravelDetails(): Promise<TravelDetails[]> {
    const apiUrl = 'http://localhost:5075/api/TravelDetails';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch travel details');
    }
    return await response.json();
}
async function addTravelDetails(travelDetails: TravelDetails): Promise<void> {
    const response = await fetch('http://localhost:5075/api/TravelDetails', {
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
}
async function fetchTicketFairs(): Promise<TicketFairs[]> {
    const apiUrl = 'http://localhost:5075/api/TicketFairs';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch ticket fairs');
    }
    return await response.json();
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
async function travelHistory() {
    HideAll();

    travelHistoryElement.style.display = "block";
    const travelHistoryList = await fetchTravelDetails();

    let tableElement = document.getElementById("travel-table") as HTMLDivElement;
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
}

function DisplayRecharge() {
    HideAll();

    updateBalanceElement.style.display = "block";
}

function Recharge() {



    let amount: number = parseInt((document.getElementById("balance") as HTMLInputElement).value);
    if (amount > 0) {
        HideAll();
        showBalanceElement.style.display = "block";
        CurrentLoggedInuser.balance += amount;

        (document.getElementById("balance-message") as HTMLParagraphElement).innerHTML = `your balance is ${CurrentLoggedInuser.balance}`;

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

    (document.getElementById("balance-message") as HTMLParagraphElement).innerHTML = `your balance is ${CurrentLoggedInuser.balance}`;

}

async function Travel() {
    HideAll();

    ticketFairElement.style.display = "block";

    const travelFairsList = await fetchTicketFairs();

    let tableElement = document.getElementById("ticket-table") as HTMLDivElement;
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

}

async function showTicketDetails() {
    HideAll();

    ticketFairElement.style.display = "block";

    const travelFairsList = await fetchTicketFairs();

    let tableElement = document.getElementById("ticket-table") as HTMLDivElement;
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
}
async function Book(ticketID: number) {
    const travelFairsList = await fetchTicketFairs();

    const ticketindex = travelFairsList.findIndex((t) => t.ticketID == ticketID);

    const ticket = travelFairsList[ticketindex];

    if (CurrentLoggedInuser.balance > ticket.fair) {
        const travelDetails: TravelDetails = {
            travelID: 0,
            cardNumber: CurrentLoggedInuser.cardNumber,
            fromLocation: ticket.fromLocation,
            toLocation: ticket.toLocation,
            date: new Date().toISOString().substring(0, 10),
            travelCost: ticket.fair
        }
        CurrentLoggedInuser.balance -= ticket.fair;
        updateUser(CurrentLoggedInuser.cardNumber, CurrentLoggedInuser);
        addTravelDetails(travelDetails);
        travelHistory();
    }
    else {
        travelError.style.display = "block";
        travelError.innerHTML = 'Insufficient Balance Please Recharge.';
    }


}

async function deleteTicket(ticketID: string): Promise<void> {
    const response = await fetch(`http://localhost:5075/api/TicketFairs/${ticketID}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete contact');
    }
    showTicketDetails();
}

editForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const fromlocation = fromLocation.value.trim();
    const tolocation = toLocation.value.trim();
    const price = parseInt(fair.value.trim());
    if (editingId !== null) {
        const ticketList = await fetchTicketFairs();
        const index = ticketList.findIndex((item) => item.ticketID === editingId);

        ticketList[index] = { ...ticketList[index], fromLocation: fromlocation, toLocation: tolocation, fair: price };
        updateTicket(ticketList[index].ticketID, ticketList[index])

        editingId = null;
    } else {
        const ticket: TicketFairs = {
            ticketID: 0,
            fromLocation: fromlocation,
            toLocation: tolocation,
            fair: price
        };

        addTicket(ticket);
    }

    editForm.reset();

});

async function Edit(id: number) {


    editingId = id;
    const ticketList = await fetchTicketFairs();
    const item = ticketList.find((item) => item.ticketID === id);
    if (item) {
        fromLocation.value = item.fromLocation;
        toLocation.value = item.toLocation;
        fair.value = item.fair;

    }
}