"use strict";
// let UserIdAutoIncrement = 2001;
// let MedicineIdAutoIncrement = 1005;
// let OrderIdAutoIncrement = 3001;
let CurrentLoggedInuser;
let base64String;
let userImagebase64String;
// let CurrentUserID: number;
// let CurrentUserName: string;
let editingId = null;
let NewUserNameStatus = false;
let NewUserAgeStatus = false;
let NewUserPhoneNumberStatus = false;
let NewUserEmailStatus = false;
let currentMedicineID;
const form = document.getElementById("signUpForm");
const editForm = document.getElementById("editMedicineForm");
const signUpName = document.getElementById("username");
const signUpEmail = document.getElementById("email");
const signUpNumber = document.getElementById("number");
const signUpPassword = document.getElementById("pass");
const signUpConfirmPassword = document.getElementById("confirmPass");
const loginForm = document.getElementById("signInForm");
const loginUserID = document.getElementById("userID");
const loginPasswordInput = document.getElementById("password");
const signUpElement = document.getElementById("signUp");
const existingUserElement = document.getElementById("existingUser");
const signSwitchElement = document.getElementById("signSwitch");
const wrapperElement = document.getElementById("wrapper");
const homePage = document.getElementById("homePage");
const greeting = document.getElementById("greeting");
const profileName = document.getElementById("profileName");
const medicineElement = document.getElementById("medicineDetails");
const medicineTableElement = document.getElementById("medicine-table");
const quantityElement = document.getElementById("quantity-container");
const orderElement = document.getElementById("order-container");
const orderTableElement = document.getElementById("order-table");
const updateBalanceElement = document.getElementById("updateBalance");
const showBalanceElement = document.getElementById("showBalance");
const nameInput = document.getElementById("name");
const quantityInput = document.getElementById("editQuantity");
const priceInput = document.getElementById("editPrice");
const expiryDateInput = document.getElementById("expiryDate");
const medicineImageElement = document.getElementById("medicineImage");
const userImageElement = document.getElementById("userImage");
const profile = document.getElementById("profile");
// error elements
const invalidLogin = document.getElementById("invalidLogin");
const purchaseError = document.getElementById("purchaseError");
const balanceError = document.getElementById("balanceError");
//dob.split('T')[0].split('-').reverse().join('/')
// validation
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
function emailValidate() {
    var email = document.getElementById("email").value.trim();
    //email
    var emailRegex = /^([a-z 0-9\.-]+)@([a-z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})/;
    var emailError = document.getElementById("emailInvalid");
    if (emailRegex.test(email)) {
        emailError.innerHTML = "valid ";
        emailError.style.color = "green";
        emailError.style.display = "block";
    }
    else {
        emailError.innerHTML = "Invalid email";
        return email;
    }
    return false;
}
//sign up
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = signUpName.value.trim();
    const email = signUpEmail.value.trim();
    const phone = signUpNumber.value.trim();
    const pass = signUpPassword.value.trim();
    const confirmPass = signUpConfirmPassword.value.trim();
    // const userImage =
    // userImageElement.value;
    if (pass == confirmPass) {
        const user = {
            userID: 0,
            name: name,
            email: email,
            phone: phone,
            password: pass,
            balance: 0,
            userImage: userImagebase64String
        };
        addUser(user);
    }
    form.reset();
});
//login
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = loginUserID.value.trim();
    const pass = loginPasswordInput.value.trim();
    const users = await fetchUser();
    const userIndex = users.findIndex(u => u.email == email && u.password == pass);
    if (userIndex == -1) {
        invalidLogin.innerHTML = "Please check email and password";
    }
    else {
        CurrentLoggedInuser = users[userIndex];
        homepage();
        greeting.innerHTML = `Welcome ${users[userIndex].name}`;
        profile.src = `data:image/jpg;base64, ${users[userIndex].userImage}`;
        profileName.innerHTML = `${users[userIndex].name}`;
    }
    form.reset();
});
async function showMedicineDetails() {
    HideAll();
    medicineElement.style.display = "block";
    const MedicineList = await fetchMedicines();
    medicineTableElement.innerHTML = "";
    for (var i = 0; i < MedicineList.length; i++) {
        let tableData = document.createElement("tr");
        // const imageUrl = URL.createObjectURL(MedicineList[i].medicineImage);
        tableData.innerHTML = `
        <td><img src="${'data:image/jpg;base64,' + MedicineList[i].medicineImage}"></td>
        <td>${MedicineList[i].medicineID}</td>
        <td>${MedicineList[i].medicineName}</td>
        <td>${MedicineList[i].medicineCount}</td>
        <td>${MedicineList[i].medicineExpiry.split('T')[0].split('-').reverse().join('/')}</td>
            <td>${MedicineList[i].medicinePrice}</td>
            <td><button onclick="Edit(${MedicineList[i].medicineID})">Edit</button></td>
            <td><button onclick="deleteMedicine(${MedicineList[i].medicineID})">Delete</button></td>
            `;
        medicineTableElement.appendChild(tableData);
    }
}
async function purchase() {
    HideAll();
    medicineElement.style.display = "block";
    const MedicineList = await fetchMedicines();
    medicineTableElement.innerHTML = "";
    for (var i = 0; i < MedicineList.length; i++) {
        let tableData = document.createElement("tr");
        tableData.innerHTML = `
        <td>${MedicineList[i].medicineID}</td>
        <td>${MedicineList[i].medicineName}</td>
        <td>${MedicineList[i].medicineCount}</td>
        <td>${MedicineList[i].medicineExpiry.split('T')[0].split('-').reverse().join('/')}</td>
            <td>${MedicineList[i].medicinePrice}</td>
            <td><button onclick="setGlobal('${MedicineList[i].medicineID.toString()}')">buy</button></td>
            `;
        medicineTableElement.appendChild(tableData);
    }
}
function setGlobal(id) {
    currentMedicineID = id;
    HideAll();
    quantityElement.style.display = "block";
}
function setQuantity() {
    let quantity = parseInt(document.getElementById("quantity").value);
    buyMedicine(quantity);
}
async function buyMedicine(quantity) {
    const MedicineList = await fetchMedicines();
    for (let i = 0; i < MedicineList.length; i++) {
        if (MedicineList[i].medicineID == currentMedicineID) {
            if (quantity > MedicineList[i].medicineCount) {
                purchaseError.style.display = "block";
                purchaseError.innerHTML = 'quantity is not present.';
            }
            else {
                let price = quantity * MedicineList[i].medicinePrice;
                if (CurrentLoggedInuser.balance >= price) {
                    MedicineList[i].medicineCount -= quantity;
                    let order = {
                        orderID: 0,
                        medicineID: MedicineList[i].medicineID,
                        userID: CurrentLoggedInuser.userID,
                        medicineName: MedicineList[i].medicineName,
                        medicineCount: quantity,
                        orderStatus: "ordered"
                    };
                    addOrder(order);
                    //get amount
                    CurrentLoggedInuser.balance -= price;
                    updateUser(CurrentLoggedInuser.userID, CurrentLoggedInuser);
                    updateMedicine(MedicineList[i].medicineID, MedicineList[i]);
                    purchaseError.style.display = "none";
                }
                else {
                    purchaseError.style.display = "block";
                    purchaseError.innerHTML = 'Insufficient balance Please recharge.';
                }
            }
            break;
        }
    }
    purchase();
}
async function orderHistory() {
    HideAll();
    orderElement.style.display = "block";
    const OrderList = await fetchOrders();
    let tableElement = document.getElementById("order-table");
    tableElement.innerHTML = "";
    for (var i = 0; i < OrderList.length; i++) {
        if (OrderList[i].userID == CurrentLoggedInuser.userID) {
            let tableData = document.createElement("tr");
            tableData.innerHTML = `
        <td>${OrderList[i].orderID}</td>
        <td>${OrderList[i].medicineID}</td>
        <td>${OrderList[i].userID}</td>
        <td>${OrderList[i].medicineName}</td>
        <td>${OrderList[i].medicineCount}</td>
        <td>${OrderList[i].orderStatus}</td>
            `;
            tableElement.appendChild(tableData);
        }
    }
}
async function showCancelOrder() {
    HideAll();
    orderElement.style.display = "block";
    let OrderList = await fetchOrders();
    orderTableElement.innerHTML = "";
    for (var i = 0; i < OrderList.length; i++) {
        if (OrderList[i].userID == CurrentLoggedInuser.userID && OrderList[i].orderStatus == "ordered") {
            let tableData = document.createElement("tr");
            tableData.innerHTML = `
            <td>${OrderList[i].orderID}</td>
            <td>${OrderList[i].medicineID}</td>
            <td>${OrderList[i].userID}</td>
            <td>${OrderList[i].medicineName}</td>
            <td>${OrderList[i].medicineCount}</td>
            <td>${OrderList[i].orderStatus}</td>
            <td><button onclick="cancelOrder('${OrderList[i].orderID}')">cancel</button></td>
                `;
            orderTableElement.appendChild(tableData);
        }
    }
}
async function cancelOrder(userID) {
    let OrderList = await fetchOrders();
    for (let i = 0; i < OrderList.length; i++) {
        if (OrderList[i].orderID == userID && OrderList[i].orderStatus == "ordered") {
            OrderList[i].orderStatus = "Cancelled";
            updateOrder(OrderList[i].orderID, OrderList[i]);
            let MedicineList = await fetchMedicines();
            for (let j = 0; j < MedicineList.length; j++) {
                if (MedicineList[j].medicineID == OrderList[i].medicineID) {
                    MedicineList[j].medicineCount += OrderList[i].medicineCount;
                    //refund
                    let price = MedicineList[j].medicinePrice * OrderList[i].medicineCount;
                    CurrentLoggedInuser.balance += price;
                    updateUser(CurrentLoggedInuser.userID, CurrentLoggedInuser);
                    updateMedicine(MedicineList[j].medicineID, MedicineList[j]);
                    break;
                }
            }
            break;
        }
    }
    showCancelOrder();
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
        balanceError.innerHTML = 'Enter a valid amount';
    }
}
function showBalance() {
    HideAll();
    showBalanceElement.style.display = "block";
    document.getElementById("balance-message").innerHTML = `your balance is ${CurrentLoggedInuser.balance}`;
}
function HideAll() {
    medicineElement.style.display = "none";
    quantityElement.style.display = "none";
    orderElement.style.display = "none";
    updateBalanceElement.style.display = "none";
    showBalanceElement.style.display = "none";
    purchaseError.style.display = "none";
    // balanceError.style.display = "none";
}
const medicineImage = document.getElementById("medicineImage");
async function Edit(id) {
    const nameInput = document.getElementById("name");
    const quantityInput = document.getElementById("editQuantity");
    const priceInput = document.getElementById("editPrice");
    const expiryDate = expiryDateInput;
    // const baseImage = medicineImage.value;
    editingId = id;
    const MedicineList = await fetchMedicines();
    const item = MedicineList.find((item) => item.medicineID === id);
    if (item) {
        nameInput.value = item.medicineName;
        quantityInput.value = String(item.medicineCount);
        priceInput.value = String(item.medicinePrice);
        const changeddate = new Date();
        changeddate.setDate((new Date(item.medicineExpiry)).getDate());
        expiryDate.valueAsDate = changeddate;
        // medicineImage.value=item.medicineImage
    }
}
medicineImage.addEventListener("input", (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
        base64String = reader.result;
        base64String = base64String === null || base64String === void 0 ? void 0 : base64String.toString().split(',')[1];
    };
    reader.readAsDataURL(file);
});
userImageElement.addEventListener("input", (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
        userImagebase64String = reader.result;
        userImagebase64String = userImagebase64String === null || userImagebase64String === void 0 ? void 0 : userImagebase64String.toString().split(',')[1];
    };
    reader.readAsDataURL(file);
});
// medicineImage.onchange = function(event){
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//         const base64String = reader.result;
//         console.log(base64String);
//     };
// }; 
// function convertToBase64(event: any) {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//         const base64String = reader.result as string;
//         console.log(base64String);
//     }
// }
editForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const quantity = parseInt(quantityInput.value.trim());
    const price = parseInt(priceInput.value.trim());
    const expiryDate = new Date(expiryDateInput.value).toISOString().substring(0, 10);
    if (editingId !== null) {
        const MedicineList = await fetchMedicines();
        const index = MedicineList.findIndex((item) => item.medicineID === editingId);
        MedicineList[index] = Object.assign(Object.assign({}, MedicineList[index]), { medicineName: name, medicineCount: quantity, medicinePrice: price, medicineExpiry: expiryDate, medicineImage: base64String });
        updateMedicine(MedicineList[index].medicineID, MedicineList[index]);
        editingId = null;
    }
    else {
        const medicine = {
            medicineID: 0,
            medicineName: name,
            medicineCount: quantity,
            medicinePrice: price,
            medicineExpiry: expiryDate,
            medicineImage: base64String
        };
        addMedicine(medicine);
    }
    editForm.reset();
    showMedicineDetails();
});
//display functions
function newUser() {
    signUpElement.style.display = "block";
    existingUserElement.style.display = "none";
}
function existingUser() {
    signUpElement.style.display = "none";
    existingUserElement.style.display = "block";
}
function homepage() {
    wrapperElement.style.display = "none";
    homePage.style.display = "block";
}
//api calling functions
//User
async function fetchUser() {
    const apiUrl = 'http://localhost:5078/api/Users';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch contacts');
    }
    return await response.json();
}
async function addUser(user) {
    const response = await fetch('http://localhost:5078/api/Users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (!response.ok) {
        throw new Error('Failed to add user');
    }
}
async function updateUser(userID, user) {
    const response = await fetch(`http://localhost:5078/api/Users/${userID}`, {
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
//Medicine
async function fetchMedicines() {
    const apiUrl = 'http://localhost:5078/api/Medicine';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch medicines');
    }
    return await response.json();
}
async function addMedicine(medicine) {
    const response = await fetch('http://localhost:5078/api/Medicine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(medicine)
    });
    if (!response.ok) {
        throw new Error('Failed to add medicine');
    }
}
async function updateMedicine(id, medicine) {
    const response = await fetch(`http://localhost:5078/api/Medicine/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(medicine)
    });
    if (!response.ok) {
        throw new Error('Failed to update medicine');
    }
    showMedicineDetails();
}
async function deleteMedicine(userID) {
    const response = await fetch(`http://localhost:5078/api/Medicine/${userID}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete contact');
    }
    showMedicineDetails();
}
//Orders
async function fetchOrders() {
    const apiUrl = 'http://localhost:5078/api/Order';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch order');
    }
    return await response.json();
}
async function updateOrder(id, order) {
    const response = await fetch(`http://localhost:5078/api/Order/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    });
    if (!response.ok) {
        throw new Error('Failed to update medicine');
    }
    orderHistory();
}
async function addOrder(order) {
    const response = await fetch('http://localhost:5078/api/Order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    });
    if (!response.ok) {
        throw new Error('Failed to add order');
    }
    orderHistory();
}
const get = async () => {
    var _a;
    const orderList = await fetchOrders();
    const userOrders = orderList.filter((o) => o.userID == CurrentLoggedInuser.userID);
    const titleKeys = Object.keys(userOrders[0]);
    const redefinedData = [];
    redefinedData.push(titleKeys);
    userOrders.forEach((item) => {
        redefinedData.push(Object.values(item));
    });
    let csvContent = '';
    redefinedData.forEach((r) => {
        csvContent += r.join(',') + '\n';
    });
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const objUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', objUrl);
    link.setAttribute('download', 'Orders.csv');
    // link.textContent = 'Click to download'
    (_a = document.querySelector('#download')) === null || _a === void 0 ? void 0 : _a.append(link);
    link.click();
    // const jsonData = userOrders.statewise;
};
