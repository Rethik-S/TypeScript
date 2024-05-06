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
const cardNumberInput = document.getElementById("cardNumber");
const loginForm = document.getElementById("signInForm");
const signUpElement = document.getElementById("signUp");
const existingUserElement = document.getElementById("existingUser");
const signSwitchElement = document.getElementById("signSwitch");
const wrapperElement = document.getElementById("wrapper");
const homePage = document.getElementById("homePage");
const greeting = document.getElementById("greeting");
//sign up
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const pass = passwordInput.value.trim();
    const user = {
        cardNumber: Math.random().toString(),
        name: name,
        phoneNumber: phone,
        balance: 0,
        password: pass
    };
    addUser(user);
    form.reset();
});
//login
loginForm.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const cardNumber = cardNumberInput.value.trim();
    const pass = loginPasswordInput.value.trim();
    const users = yield fetchUser();
    const userIndex = users.findIndex(u => u.cardNumber == cardNumber && u.password == pass);
    if (userIndex == -1) {
        greeting.innerHTML = "Invalid User";
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
function homepage() {
    // signUpElement.style.display = "none";
    // existingUserElement.style.display = "none";
    // signSwitchElement.style.display = "none";    
    wrapperElement.style.display = "none";
    homePage.style.display = "block";
}
