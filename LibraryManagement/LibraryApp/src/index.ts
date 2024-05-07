interface User {
    userID: number;
    name: string;
    email: string;
    gender: string;
    department: string;
    phone: string;
    password: string;
    balance: number;
}


let editingId: string | null = null;
let CurrentLoggedInuser: User;

const form = document.getElementById("signupform") as HTMLFormElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const phoneInput = document.getElementById("phone") as HTMLInputElement;
const passwordInput = document.getElementById("signuppassword") as HTMLInputElement;
const departmentInput = document.getElementById("department") as HTMLInputElement;
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
const maleInput = document.getElementById("male") as HTMLInputElement
const femaleInput = document.getElementById("female") as HTMLInputElement
const invalidLogin = document.getElementById("invalidLogin") as HTMLSpanElement;
const updateBalanceElement = document.getElementById("updateBalance") as HTMLDivElement;
const showBalanceElement = document.getElementById("showBalance") as HTMLDivElement;

//error
const balanceError = document.getElementById("balanceError") as HTMLSpanElement

function HideAll() {
    balanceError.style.display = "none";
    updateBalanceElement.style.display = "none";
    showBalanceElement.style.display = "none";
}
function newUser() {

    signUpElement.style.display = "block";
    existingUserElement.style.display = "none";
}

function existingUser() {
    signUpElement.style.display = "none";
    existingUserElement.style.display = "block";

}

//sign up
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const password = passwordInput.value.trim();
    const email = signUpEmailInput.value.trim();
    const dept = departmentInput.value.trim();
    let gender = "";
    if (maleInput.checked == true) {
        gender = "Male";
    }
    else if (femaleInput.checked == true) {
        gender = "Female";
    }
    else {
        gender = "other";
    }
    const user: User = {
        userID: 0,
        name: name,
        email: email,
        gender: gender,
        department: dept,
        phone: phone,
        password: password,
        balance: 0,
    };
    addUser(user);
    // CurrentLoggedInuser = user;
    // homepage();
    // greeting.innerHTML = `Welcome ${CurrentLoggedInuser.name}`;
    form.reset();
});


// login
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


function homepage() {

    wrapperElement.style.display = "none";
    homePage.style.display = "block";
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

        updateUser(CurrentLoggedInuser.userID, CurrentLoggedInuser);
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

async function addUser(user: User): Promise<void> {
    const response = await fetch('http://localhost:5004/api/Users', {
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
async function fetchUser(): Promise<User[]> {
    const apiUrl = 'http://localhost:5004/api/Users';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return await response.json();
}

async function updateUser(userID: number, user: User): Promise<void> {
    const response = await fetch(`http://localhost:5004/api/Users/${userID}`, {
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