interface User {
    cardNumber: string;
    name: string;
    phoneNumber: string;
    balance: number;
    password: string;
}

let editingId: string | null = null;
let CurrentLoggedInuser: User;

const form = document.getElementById("signupform") as HTMLFormElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const phoneInput = document.getElementById("phone") as HTMLInputElement;
const passwordInput = document.getElementById("signuppassword") as HTMLInputElement;
const loginPasswordInput = document.getElementById("password") as HTMLInputElement;
const cardNumberInput = document.getElementById("cardNumber") as HTMLInputElement;
const loginForm = document.getElementById("signInForm") as HTMLFormElement;
const signUpElement = document.getElementById("signUp") as HTMLDivElement;
const existingUserElement = document.getElementById("existingUser") as HTMLDivElement;
const signSwitchElement = document.getElementById("signSwitch") as HTMLDivElement;
const wrapperElement = document.getElementById("wrapper") as HTMLDivElement;
const homePage = document.getElementById("homePage") as HTMLDivElement;
const greeting = document.getElementById("greeting") as HTMLHeadingElement;

//sign up
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const pass = passwordInput.value.trim();
    const user: User = {
        cardNumber: Math.random().toString(),
        name: name,
        phoneNumber: phone,
        balance: 0,
        password: pass
    };
    addUser(user);
    CurrentLoggedInuser = user;
    homepage();
    greeting.innerHTML = `Welcome ${CurrentLoggedInuser.name}`;
    form.reset();
});

//login
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const cardNumber = cardNumberInput.value.trim();
    const pass = loginPasswordInput.value.trim();
    const users = await fetchUser();
    const userIndex = users.findIndex(u => u.cardNumber == cardNumber && u.password == pass
    );

    if (userIndex == -1) {
        greeting.innerHTML = "Invalid User";
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

async function fetchUser(): Promise<User[]> {
    const apiUrl = 'http://localhost:5075/api/Users';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch contacts');
    }
    return await response.json();
}


function homepage() {

    wrapperElement.style.display = "none";
    homePage.style.display = "block";
}