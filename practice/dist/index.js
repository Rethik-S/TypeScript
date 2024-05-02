"use strict";
let UserIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 10;
let OrderIdAutoIncrement = 100;
let CurrentUserId;
let CurrentUserName;
let NewUserNameStatus = false;
let NewUserAgeStatus = false;
let NewUserPhoneNumberStatus = false;
class UserDetails {
    constructor(userName, userAge, userPhoneNumber) {
        UserIdAutoIncrement++;
        this.UserId = "UI" + UserIdAutoIncrement.toString();
        this.UserName = userName;
        this.UserAge = userAge;
        this.UserPhoneNumber = userPhoneNumber;
    }
}
class MedicineDetails {
    constructor(medicineName, medicineCount, medicinePrice) {
        MedicineIdAutoIncrement++;
        this.MedicineId = "MD" + MedicineIdAutoIncrement.toString();
        this.MedicineName = medicineName;
        this.MedicineCount = medicineCount;
        this.MedicinePrice = medicinePrice;
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
UsersList.push(new UserDetails("Rethik", 21, 777777777));
UsersList.push(new UserDetails("Nataraj", 22, 888888888));
let MedicineList = new Array();
MedicineList.push(new MedicineDetails("Paracetomol", 5, 50));
MedicineList.push(new MedicineDetails("Colpal", 5, 60));
MedicineList.push(new MedicineDetails("Stepsil", 5, 70));
MedicineList.push(new MedicineDetails("Iodex", 5, 80));
MedicineList.push(new MedicineDetails("Acetherol", 5, 100));
let OrderList = new Array();
function newUserPage() {
    let homePage = document.getElementById('homePage');
    let newUserPage = document.getElementById('newUserPage');
    homePage.style.display = "none";
    newUserPage.style.display = "block";
}
function existingUserPage() {
    let homePage = document.getElementById('homePage');
    let existingUserPage = document.getElementById('existingUserPage');
    let availableUser = document.getElementById('availableUser');
    homePage.style.display = "none";
    existingUserPage.style.display = "block";
    availableUser.innerHTML = "<h2>Available UserDetails</h2>";
    for (let i = 0; i < UsersList.length; i++) {
        availableUser.innerHTML += `UserDetails Name : ${UsersList[i].UserName} | UserDetails Id : ${UsersList[i].UserId}<br>`;
    }
}
function signUp() {
    if (NewUserNameStatus == true &&
        NewUserAgeStatus == true &&
        NewUserPhoneNumberStatus == true) {
        let newUserName = document.getElementById('newUserName').value;
        let newUserAge = document.getElementById('newUserAge').value;
        let newUserPhoneNumber = document.getElementById('newUserPhoneNumber').value;
        UsersList.push(new UserDetails(newUserName, +newUserAge, +newUserPhoneNumber));
        // displayHomePage();
    }
    else {
        alert("Please fill out the form fully.");
    }
}
function displayHomePage() {
    CurrentUserId = "";
    CurrentUserName = "";
    let medicineList = document.getElementById('medicineList');
    medicineList.selectedIndex = 0;
    let requiredCount = document.getElementById('requiredCount');
    let medicineInfo = document.getElementById('medicineInfo');
    let historyDisplay = document.getElementById('historyDisplay');
    let medicinePage = document.getElementById('medicinePage');
    let newUserPage = document.getElementById('newUserPage');
    let existingUserPage = document.getElementById('existingUserPage');
    let homePage = document.getElementById('homePage');
    // (document.getElementById('medicineRequiredCount') as HTMLInputElement).value = null;
    // (document.getElementById('existingUserId') as HTMLInputElement).value = null;
    requiredCount.style.display = "none";
    historyDisplay.style.display = "none";
    medicinePage.style.display = "none";
    medicineInfo.style.display = "none";
    newUserPage.style.display = "none";
    existingUserPage.style.display = "none";
    homePage.style.display = "block";
}
function signIn() {
    let noExistingUserIdChecker = false;
    let existingUserId = document.getElementById('existingUserId').value;
    let existingUserIdRegex = /^UI\d{4}$/;
    if (existingUserIdRegex.test(existingUserId)) {
        for (let i = 0; i < UsersList.length; i++) {
            if (UsersList[i].UserId == existingUserId) {
                CurrentUserId = UsersList[i].UserId;
                CurrentUserName = UsersList[i].UserName;
                console.log("logged in");
                // medicinePage();
                return;
            }
            else {
                noExistingUserIdChecker = true;
            }
        }
        if (noExistingUserIdChecker) {
            alert("Enter Valid UserDetails Id");
        }
    }
    else {
        alert("Enter Valid UserDetails Id.");
    }
}
