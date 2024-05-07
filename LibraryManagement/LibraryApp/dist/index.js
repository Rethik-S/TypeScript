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
const departmentInput = document.getElementById("department");
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
const maleInput = document.getElementById("male");
const femaleInput = document.getElementById("female");
const invalidLogin = document.getElementById("invalidLogin");
const updateBalanceElement = document.getElementById("updateBalance");
const showBalanceElement = document.getElementById("showBalance");
//error
const balanceError = document.getElementById("balanceError");
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
    const user = {
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
function homepage() {
    wrapperElement.style.display = "none";
    homePage.style.display = "block";
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
    document.getElementById("balance-message").innerHTML = `your balance is ${CurrentLoggedInuser.balance}`;
}
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5004/api/Users', {
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
        const apiUrl = 'http://localhost:5004/api/Users';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return yield response.json();
    });
}
function updateUser(userID, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5004/api/Users/${userID}`, {
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
