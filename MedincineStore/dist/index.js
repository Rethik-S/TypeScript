"use strict";
let UserIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 10;
let OrderIdAutoIncrement = 100;
// let CurrentLoggedInuser: UserDetails;
let CurrentUserId;
let CurrentUserName;
let NewUserNameStatus = false;
let NewUserAgeStatus = false;
let NewUserPhoneNumberStatus = false;
let cuurentMedicineID;
class UserDetails {
    constructor(userName, userAge, userPhoneNumber, userPassword, userEmail) {
        UserIdAutoIncrement++;
        this.UserId = "UI" + UserIdAutoIncrement.toString();
        this.UserName = userName;
        this.UserAge = userAge;
        this.UserPhoneNumber = userPhoneNumber;
        this.UserPassword = userPassword;
        this.UserEmail = userEmail;
    }
}
class MedicineDetails {
    constructor(medicineName, medicineCount, medicinePrice, medicineExpiry) {
        MedicineIdAutoIncrement++;
        this.MedicineId = "MD" + MedicineIdAutoIncrement.toString();
        this.MedicineName = medicineName;
        this.MedicineCount = medicineCount;
        this.MedicinePrice = medicinePrice;
        this.MedicineExpiry = medicineExpiry;
    }
}
class OrderDetails {
    constructor(medicineId, userId, medicineName, medicineCount) {
        OrderIdAutoIncrement++;
        this.OrderId = "OI" + OrderIdAutoIncrement.toString();
        this.MedicineId = medicineId;
        this.UserId = userId;
        this.MedicineName = medicineName;
        this.MedicineCount = medicineCount;
    }
}
let UsersList = new Array();
UsersList.push(new UserDetails("Rethik", 21, "777777777", "password", "rethik@gmail.com"));
UsersList.push(new UserDetails("Nataraj", 22, "888888888", "password", "dsas"));
let MedicineList = new Array();
MedicineList.push(new MedicineDetails("Paracetomol", 5, 50, new Date("2025-8-12")));
MedicineList.push(new MedicineDetails("Colpal", 5, 60, new Date("2025-8-12")));
MedicineList.push(new MedicineDetails("Stepsil", 5, 70, new Date("2025-8-12")));
MedicineList.push(new MedicineDetails("Iodex", 5, 80, new Date("2025-8-12")));
MedicineList.push(new MedicineDetails("Acetherol", 5, 100, new Date("2025-8-12")));
let OrderList = new Array();
function newUser() {
    let signUpElement = document.getElementById("signUp");
    let existingUserElement = document.getElementById("existingUser");
    signUpElement.style.display = "block";
    existingUserElement.style.display = "none";
}
function existingUser() {
    let existingUserElement = document.getElementById("existingUser");
    let signUpElement = document.getElementById("signUp");
    signUpElement.style.display = "none";
    existingUserElement.style.display = "block";
}
function nameValidate() {
    var name = document.getElementById("username").value;
    var error = document.getElementById("nameInvalid");
    var nameRegex = /[a-zA-Z]+/;
    if (nameRegex.test(name)) {
        error.innerHTML = "valid";
        error.style.color = "green";
        NewUserNameStatus = true;
        return true;
    }
    else {
        NewUserNameStatus = false;
        error.innerHTML = "name Invalid";
        error.style.color = "red";
        return false;
    }
}
function numberValidate() {
    var number = document.getElementById("number").value.trim();
    //phone number
    var numRegex = /^[7-9][0-9]{9}$/;
    var error = document.getElementById("numberInvalid");
    if (numRegex.test(number)) {
        error.innerHTML = "valid";
        error.style.color = "green";
    }
    else {
        error.innerHTML = "Enter valid number";
        error.style.display = "block";
        return number;
    }
    return false;
}
function login() {
    let email = document.getElementById("userID").value;
    let password = document.getElementById("password").value;
    for (let i = 0; i < UsersList.length; i++) {
        if (email == UsersList[i].UserEmail && password == UsersList[i].UserPassword) {
            CurrentUserId = UsersList[i].UserId;
            homepage();
        }
    }
}
function homepage() {
    let signUpElement = document.getElementById("signUp");
    signUpElement.style.display = "none";
    let existingUserElement = document.getElementById("existingUser");
    existingUserElement.style.display = "none";
    let homeElement = document.getElementById("homepage");
    homeElement.style.display = "none";
    let indexpage = document.getElementById("indexPage");
    indexpage.style.display = "block";
}
function signUp() {
    let name = document.getElementById("username").value;
    let age = parseInt(document.getElementById("age").value);
    let number = document.getElementById("number").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("pass").value;
    let confirmpassword = document.getElementById("confirmPass").value;
    if (password == confirmpassword) {
        UsersList.push(new UserDetails(name, age, number, password, email));
        homepage();
    }
}
function showMedicineDetails() {
    let tableElement = document.getElementById("medicine-table");
    for (var i = 0; i < MedicineList.length; i++) {
        let tableData = document.createElement("tr");
        tableData.innerHTML = `<td>${MedicineList[i].MedicineName}</td>
        <td>${MedicineList[i].MedicineCount}</td>
        <td>${MedicineList[i].MedicineExpiry.toDateString()}</td>
            <td>${MedicineList[i].MedicinePrice}</td>
            `;
        tableElement.appendChild(tableData);
    }
}
function purchase() {
    let tableElement = document.getElementById("medicine-table");
    for (var i = 0; i < MedicineList.length; i++) {
        let tableData = document.createElement("tr");
        tableData.innerHTML = `
        <td>${MedicineList[i].MedicineId}</td>
        <td>${MedicineList[i].MedicineName}</td>
        <td>${MedicineList[i].MedicineCount}</td>
        <td>${MedicineList[i].MedicineExpiry.toDateString()}</td>
            <td>${MedicineList[i].MedicinePrice}</td>
            <td><button onclick="setGlobal('${MedicineList[i].MedicineId.toString()}')">buy</button></td>
            `;
        tableElement.appendChild(tableData);
    }
}
function setGlobal(id) {
    cuurentMedicineID = id;
}
function setQuantity() {
    let quantity = parseInt(document.getElementById("quantity").value);
    buyMedicine(quantity);
}
function buyMedicine(quantity) {
    for (let i = 0; i < MedicineList.length; i++) {
        if (MedicineList[i].MedicineId == cuurentMedicineID) {
            MedicineList[i].MedicineCount -= quantity;
            let order = new OrderDetails(MedicineList[i].MedicineId, CurrentUserId, MedicineList[i].MedicineName, quantity);
            OrderList.push(order);
            break;
        }
    }
}
function orderHistory() {
    let tableElement = document.getElementById("order-table");
    for (var i = 0; i < OrderList.length; i++) {
        let tableData = document.createElement("tr");
        tableData.innerHTML = `
        <td>${OrderList[i].MedicineId}</td>
        <td>${OrderList[i].UserId}</td>
        <td>${OrderList[i].MedicineName}</td>
        <td>${OrderList[i].MedicineCount}</td>
            `;
        tableElement.appendChild(tableData);
    }
}
