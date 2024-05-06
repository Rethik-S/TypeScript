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
let UserIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 10;
let OrderIdAutoIncrement = 101;
let CurrentLoggedInuser;
let CurrentUserId;
let CurrentUserName;
let editingId = null;
let NewUserNameStatus = false;
let NewUserAgeStatus = false;
let NewUserPhoneNumberStatus = false;
let cuurentMedicineID;
class UserDetails {
    constructor(userName, userPhoneNumber, userPassword, userEmail) {
        this._balance = 0;
        UserIdAutoIncrement++;
        this.id = "UI" + UserIdAutoIncrement.toString();
        this.name = userName;
        // this.UserAge = userAge;
        this.phone = userPhoneNumber;
        this.password = userPassword;
        this.email = userEmail;
    }
    updateBalance(amount) {
        this._balance += amount;
        return this._balance;
    }
    showBalance() {
        return this._balance;
    }
}
class MedicineDetails {
    constructor(medicineID, medicineName, medicineCount, medicinePrice, medicineExpiry) {
        // MedicineIdAutoIncrement++;
        this.medicineID = medicineID;
        this.medicineName = medicineName;
        this.medicineCount = medicineCount;
        this.medicinePrice = medicinePrice;
        this.medicineExpiry = medicineExpiry;
    }
}
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["Ordered"] = 0] = "Ordered";
    OrderStatus[OrderStatus["Cancelled"] = 1] = "Cancelled";
})(OrderStatus || (OrderStatus = {}));
class OrderDetails {
    constructor(orderID, medicineId, userId, medicineName, medicineCount, orderStatus) {
        // OrderIdAutoIncrement++;
        this.orderID = orderID;
        this.medicineId = medicineId;
        this.userId = userId;
        this.orderStatus = orderStatus;
        this.medicineName = medicineName;
        this.medicineCount = medicineCount;
    }
}
let UsersList = new Array();
// UsersList.push(new UserDetails("Rethik",  "777777777", "password", "rethik@gmail.com"));
// UsersList.push(new UserDetails("Nataraj",  "888888888", "password", "dsas"));
let MedicineList = new Array();
// MedicineList.push(new MedicineDetails("Paracetomol", 5, 50, new Date("2025-8-12")));
// MedicineList.push(new MedicineDetails("Colpal", 5, 60, new Date("2025-8-12")));
// MedicineList.push(new MedicineDetails("Stepsil", 5, 70, new Date("2025-8-12")));
// MedicineList.push(new MedicineDetails("Iodex", 5, 80, new Date("2025-8-12")));
// MedicineList.push(new MedicineDetails("Acetherol", 5, 100, new Date("2025-8-12")));
let OrderList = new Array();
document.addEventListener('DOMContentLoaded', function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let Users = yield fetchContacts();
            Users.forEach((u) => {
                let user = new UserDetails(u.name, u.phone, u.password, u.email);
                UsersList.push(user);
            });
            let medicines = yield fetchMedicines();
            medicines.forEach((m) => {
                let medicine = new MedicineDetails(m.medicineID, m.medicineName, m.medicineCount, m.medicinePrice, m.medicineExpiry);
                MedicineList.push(medicine);
            });
            let Orders = yield fetchOrders();
            Orders.forEach((o) => {
                let order = new OrderDetails(o.orderID, o.medicineId, o.userId, o.medicineName, o.medicineCount, o.orderStatus);
                OrderList.push(order);
            });
        }
        catch (error) {
        }
    });
});
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
        if (email == UsersList[i].email && password == UsersList[i].password) {
            CurrentLoggedInuser = UsersList[i];
            // CurrentUserId = UsersList[i].id;
            homepage();
            break;
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
    // let medicineElement = document.getElementById("medicineDetails") as HTMLDivElement;
    // medicineElement.style.display = "none";
    let wrapperElement = document.getElementById("wrapper");
    wrapperElement.style.display = "none";
    let indexpage = document.getElementById("indexPage");
    indexpage.style.display = "block";
    document.getElementById("greeting").innerHTML = `Welcome ${CurrentLoggedInuser.name}`;
}
function signUp() {
    let name = document.getElementById("username").value;
    // let age = parseInt((document.getElementById("age") as HTMLInputElement).value);
    let number = document.getElementById("number").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("pass").value;
    let confirmpassword = document.getElementById("confirmPass").value;
    if (password == confirmpassword) {
        let newUser = new UserDetails(name, number, password, email);
        addContact(newUser);
        CurrentLoggedInuser = newUser;
        homepage();
    }
}
function HideAll() {
    let medicineElement = document.getElementById("medicineDetails");
    medicineElement.style.display = "none";
    let quantityElement = document.getElementById("quantity-container");
    quantityElement.style.display = "none";
    let orderElement = document.getElementById("order-container");
    orderElement.style.display = "none";
    let balanceElement = document.getElementById("updateBalance");
    balanceElement.style.display = "none";
    let showbalanceElement = document.getElementById("showBalance");
    showbalanceElement.style.display = "none";
}
function showMedicineDetails() {
    HideAll();
    let medicineElement = document.getElementById("medicineDetails");
    medicineElement.style.display = "block";
    let tableElement = document.getElementById("medicine-table");
    tableElement.innerHTML = "";
    for (var i = 0; i < MedicineList.length; i++) {
        let tableData = document.createElement("tr");
        tableData.innerHTML = `
        <td>${MedicineList[i].medicineID}</td>
        <td>${MedicineList[i].medicineName}</td>
        <td>${MedicineList[i].medicineCount}</td>
        <td>${MedicineList[i].medicineExpiry}</td>
            <td>${MedicineList[i].medicinePrice}</td>
            <td><button onclick="Edit('${MedicineList[i].medicineID}')">Edit</button></td>
            <td><button onclick="deleteMedicine('${MedicineList[i].medicineID}')">Delete</button></td>
            `;
        tableElement.appendChild(tableData);
    }
}
function purchase() {
    HideAll();
    let medicineElement = document.getElementById("medicineDetails");
    medicineElement.style.display = "block";
    let tableElement = document.getElementById("medicine-table");
    tableElement.innerHTML = "";
    for (var i = 0; i < MedicineList.length; i++) {
        let tableData = document.createElement("tr");
        tableData.innerHTML = `
        <td>${MedicineList[i].medicineID}</td>
        <td>${MedicineList[i].medicineName}</td>
        <td>${MedicineList[i].medicineCount}</td>
        <td>${MedicineList[i].medicineExpiry}</td>
            <td>${MedicineList[i].medicinePrice}</td>
            <td><button onclick="setGlobal('${MedicineList[i].medicineID.toString()}')">buy</button></td>
            `;
        tableElement.appendChild(tableData);
    }
}
function setGlobal(id) {
    cuurentMedicineID = id;
    HideAll();
    let quantityElement = document.getElementById("quantity-container");
    quantityElement.style.display = "block";
}
function setQuantity() {
    let quantity = parseInt(document.getElementById("quantity").value);
    buyMedicine(quantity);
}
function buyMedicine(quantity) {
    for (let i = 0; i < MedicineList.length; i++) {
        if (MedicineList[i].medicineID == cuurentMedicineID) {
            MedicineList[i].medicineCount -= quantity;
            let price = quantity * MedicineList[i].medicinePrice;
            // CurrentLoggedInuser.updateBalance(-price);
            OrderIdAutoIncrement++;
            let order = new OrderDetails(OrderIdAutoIncrement.toString(), MedicineList[i].medicineID, CurrentLoggedInuser.id, MedicineList[i].medicineName, quantity, "ordered");
            // OrderList.push(order);
            addOrder(order);
            //get amount
            CurrentLoggedInuser.updateBalance(-price);
            let user = {
                id: CurrentLoggedInuser.id,
                name: CurrentLoggedInuser.name,
                email: CurrentLoggedInuser.email,
                phone: CurrentLoggedInuser.phone,
                password: CurrentLoggedInuser.password,
                _balance: CurrentLoggedInuser.showBalance()
            };
            updateContact(CurrentLoggedInuser.id, user);
            updateMedicine(MedicineList[i].medicineID, MedicineList[i]);
            break;
        }
    }
    purchase();
}
function orderHistory() {
    HideAll();
    let orderElement = document.getElementById("order-container");
    orderElement.style.display = "block";
    let tableElement = document.getElementById("order-table");
    tableElement.innerHTML = "";
    for (var i = 0; i < OrderList.length; i++) {
        if (OrderList[i].userId == CurrentLoggedInuser.id) {
            let tableData = document.createElement("tr");
            tableData.innerHTML = `
        <td>${OrderList[i].medicineId}</td>
        <td>${OrderList[i].userId}</td>
        <td>${OrderList[i].medicineName}</td>
        <td>${OrderList[i].medicineCount}</td>
        <td>${OrderList[i].orderStatus}</td>
            `;
            tableElement.appendChild(tableData);
        }
    }
}
function DisplayRecharge() {
    HideAll();
    let balanceElement = document.getElementById("updateBalance");
    balanceElement.style.display = "block";
}
function Recharge() {
    HideAll();
    let balanceElement = document.getElementById("showBalance");
    balanceElement.style.display = "block";
    let amount = parseInt(document.getElementById("balance").value);
    CurrentLoggedInuser.updateBalance(amount);
    document.getElementById("balance-message").innerHTML = `your balance is ${CurrentLoggedInuser.showBalance()}`;
    let user = {
        id: CurrentLoggedInuser.id,
        name: CurrentLoggedInuser.name,
        // UserAge: number;
        email: CurrentLoggedInuser.email,
        phone: CurrentLoggedInuser.phone,
        password: CurrentLoggedInuser.password,
        _balance: CurrentLoggedInuser.showBalance()
    };
    updateContact(CurrentLoggedInuser.id, user);
}
function showBalance() {
    HideAll();
    let balanceElement = document.getElementById("showBalance");
    balanceElement.style.display = "block";
    document.getElementById("balance-message").innerHTML = `your balance is ${CurrentLoggedInuser.showBalance()}`;
}
function Edit(id) {
    const nameInput = document.getElementById("name");
    const quantityInput = document.getElementById("editQuantity");
    editingId = id;
    const item = MedicineList.find((item) => item.medicineID === id);
    if (item) {
        nameInput.value = item.medicineName;
        quantityInput.value = String(item.medicineCount);
    }
}
function editElement() {
    const nameInput = document.getElementById("name");
    const quantityInput = document.getElementById("editQuantity");
    const name = nameInput.value.trim();
    const quantity = parseInt(quantityInput.value.trim());
    const index = MedicineList.findIndex((item) => item.medicineID === editingId);
    MedicineList[index] = Object.assign(Object.assign({}, MedicineList[index]), { medicineName: name, medicineCount: quantity });
    updateMedicine(MedicineList[index].medicineID, MedicineList[index]);
    editingId = null;
    showMedicineDetails();
}
function Delete(id) {
    MedicineList = MedicineList.filter((item) => item.medicineID !== id);
    showMedicineDetails();
}
function showCancelOrder() {
    HideAll();
    let balanceElement = document.getElementById("order-container");
    balanceElement.style.display = "block";
    let tableElement = document.getElementById("order-table");
    tableElement.innerHTML = "";
    for (var i = 0; i < OrderList.length; i++) {
        if (OrderList[i].userId == CurrentLoggedInuser.id) {
            let tableData = document.createElement("tr");
            tableData.innerHTML = `
            <td>${OrderList[i].orderID}</td>
            <td>${OrderList[i].userId}</td>
            <td>${OrderList[i].medicineName}</td>
            <td>${OrderList[i].medicineCount}</td>
            <td>${OrderList[i].orderStatus}</td>
            <td><button onclick="cancelOrder('${OrderList[i].orderID}')">cancel</button></td>
                `;
            tableElement.appendChild(tableData);
        }
    }
}
function cancelOrder(id) {
    for (let i = 0; i < OrderList.length; i++) {
        if (OrderList[i].orderID == id) {
            OrderList[i].orderStatus = "Cancelled";
            updateOrder(OrderList[i].orderID, OrderList[i]);
            for (let j = 0; j < MedicineList.length; j++) {
                if (MedicineList[j].medicineID == OrderList[i].medicineId) {
                    MedicineList[j].medicineCount += OrderList[i].medicineCount;
                    //refund
                    let price = MedicineList[j].medicinePrice * OrderList[i].medicineCount;
                    CurrentLoggedInuser.updateBalance(price);
                    let user = {
                        id: CurrentLoggedInuser.id,
                        name: CurrentLoggedInuser.name,
                        // UserAge: number;
                        email: CurrentLoggedInuser.email,
                        phone: CurrentLoggedInuser.phone,
                        password: CurrentLoggedInuser.password,
                        _balance: CurrentLoggedInuser.showBalance()
                    };
                    updateContact(CurrentLoggedInuser.id, user);
                    updateMedicine(MedicineList[j].medicineID, MedicineList[j]);
                    break;
                }
            }
            break;
        }
    }
    showCancelOrder();
}
function fetchContacts() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5077/api/contacts';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function fetchMedicines() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5077/api/Medicine';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch medicines');
        }
        return yield response.json();
    });
}
function fetchOrders() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5077/api/Order';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch order');
        }
        return yield response.json();
    });
}
function deleteMedicine(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5077/api/Medicine/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete contact');
        }
        let medicines = yield fetchMedicines();
        MedicineList = new Array();
        medicines.forEach((m) => {
            let medicine = new MedicineDetails(m.medicineID, m.medicineName, m.medicineCount, m.medicinePrice, m.medicineExpiry);
            MedicineList.push(medicine);
        });
        showMedicineDetails();
    });
}
function updateContact(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5077/api/Contacts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to update contact');
        }
    });
}
function updateMedicine(id, medicine) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5077/api/Medicine/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medicine)
        });
        if (!response.ok) {
            throw new Error('Failed to update medicine');
        }
        let medicines = yield fetchMedicines();
        MedicineList = new Array();
        medicines.forEach((m) => {
            let medicine = new MedicineDetails(m.medicineID, m.medicineName, m.medicineCount, m.medicinePrice, m.medicineExpiry);
            MedicineList.push(medicine);
        });
        // showMedicineDetails();
    });
}
function updateOrder(id, order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5077/api/Order/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) {
            throw new Error('Failed to update medicine');
        }
        let orders = yield fetchOrders();
        OrderList = new Array();
        orders.forEach((o) => {
            let order = new OrderDetails(o.orderID, o.medicineId, o.userId, o.medicineName, o.medicineCount, o.orderStatus);
            OrderList.push(order);
        });
        // orderHistory();
    });
}
function addOrder(order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5077/api/Order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) {
            throw new Error('Failed to add order');
        }
        let orders = yield fetchOrders();
        OrderList = new Array();
        orders.forEach((o) => {
            let order = new OrderDetails(o.orderID, o.medicineId, o.userId, o.medicineName, o.medicineCount, o.orderStatus);
            OrderList.push(order);
        });
        // orderHistory();
    });
}
function addContact(contact) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5077/api/Contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
        if (!response.ok) {
            throw new Error('Failed to add contact');
        }
        // renderContacts();
    });
}
