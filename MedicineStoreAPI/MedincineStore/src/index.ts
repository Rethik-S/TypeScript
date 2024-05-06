let UserIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 10;
let OrderIdAutoIncrement = 101;

let CurrentLoggedInuser: UserDetails;

let CurrentUserId: string;
let CurrentUserName: string;

let editingId: string | null = null;

let NewUserNameStatus = false;
let NewUserAgeStatus = false;
let NewUserPhoneNumberStatus = false;

interface User {
    id: string;
    name: string;
    // UserAge: number;
    email: string
    phone: string;
    password: string;
    _balance: number;

}


let cuurentMedicineID: string;
class UserDetails {

    id: string;
    name: string;
    // UserAge: number;
    email: string
    phone: string;
    password: string;
    private _balance: number = 0;

    constructor(userName: string, userPhoneNumber: string, userPassword: string, userEmail: string) {

        UserIdAutoIncrement++;

        this.id = "UI" + UserIdAutoIncrement.toString();

        this.name = userName;
        // this.UserAge = userAge;
        this.phone = userPhoneNumber;
        this.password = userPassword;
        this.email = userEmail
    }

    updateBalance(amount: number): number {

        this._balance += amount;
        return this._balance;
    }

    showBalance(): number {
        return this._balance;
    }

}

class MedicineDetails {

    medicineID: string;
    medicineName: string;
    medicineCount: number;
    medicinePrice: number;
    medicineExpiry: string;

    constructor(medicineID: string, medicineName: string, medicineCount: number, medicinePrice: number, medicineExpiry: string) {
        // MedicineIdAutoIncrement++;

        this.medicineID = medicineID;
        this.medicineName = medicineName;
        this.medicineCount = medicineCount;
        this.medicinePrice = medicinePrice;
        this.medicineExpiry = medicineExpiry;
    }

}

enum OrderStatus { Ordered, Cancelled }

class OrderDetails {
    orderID: string;
    medicineId: string;
    userId: string;
    orderStatus: string
    medicineName: string;
    medicineCount: number;

    constructor(orderID: string, medicineId: string, userId: string, medicineName: string, medicineCount: number, orderStatus: string) {
        // OrderIdAutoIncrement++;

        this.orderID = orderID;
        this.medicineId = medicineId;
        this.userId = userId;
        this.orderStatus = orderStatus;
        this.medicineName = medicineName;
        this.medicineCount = medicineCount;
    }
}

let UsersList: Array<UserDetails> = new Array<UserDetails>();

// UsersList.push(new UserDetails("Rethik",  "777777777", "password", "rethik@gmail.com"));
// UsersList.push(new UserDetails("Nataraj",  "888888888", "password", "dsas"));

let MedicineList: Array<MedicineDetails> = new Array<MedicineDetails>();

// MedicineList.push(new MedicineDetails("Paracetomol", 5, 50, new Date("2025-8-12")));
// MedicineList.push(new MedicineDetails("Colpal", 5, 60, new Date("2025-8-12")));
// MedicineList.push(new MedicineDetails("Stepsil", 5, 70, new Date("2025-8-12")));
// MedicineList.push(new MedicineDetails("Iodex", 5, 80, new Date("2025-8-12")));
// MedicineList.push(new MedicineDetails("Acetherol", 5, 100, new Date("2025-8-12")));

let OrderList: Array<OrderDetails> = new Array<OrderDetails>();

document.addEventListener('DOMContentLoaded', async function () {
    try {
        let Users = await fetchContacts();
        Users.forEach((u) => {
            let user: UserDetails = new UserDetails(u.name, u.phone, u.password, u.email);
            UsersList.push(user);
        })
        let medicines = await fetchMedicines();
        medicines.forEach((m) => {
            let medicine: MedicineDetails = new MedicineDetails(m.medicineID, m.medicineName, m.medicineCount, m.medicinePrice, m.medicineExpiry);
            MedicineList.push(medicine);
        })
        let Orders = await fetchOrders();
        Orders.forEach((o) => {
            let order: OrderDetails = new OrderDetails(o.orderID, o.medicineId, o.userId, o.medicineName, o.medicineCount, o.orderStatus);
            OrderList.push(order);
        })
    }
    catch (error) {

    }
});


function newUser() {
    let signUpElement = document.getElementById("signUp") as HTMLDivElement;
    let existingUserElement = document.getElementById("existingUser") as HTMLDivElement;

    signUpElement.style.display = "block";
    existingUserElement.style.display = "none";
}

function existingUser() {
    let existingUserElement = document.getElementById("existingUser") as HTMLDivElement;
    let signUpElement = document.getElementById("signUp") as HTMLDivElement;

    signUpElement.style.display = "none";
    existingUserElement.style.display = "block";

}

function nameValidate() {
    var name = (document.getElementById("username") as HTMLInputElement).value;
    var error = document.getElementById("nameInvalid") as HTMLSpanElement;

    var nameRegex = /[a-zA-Z]+/;

    if (nameRegex.test(name)) {
        error.innerHTML = "valid"
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
    var number = (document.getElementById("number") as HTMLInputElement).value.trim();

    //phone number
    var numRegex = /^[7-9][0-9]{9}$/;
    var error = document.getElementById("numberInvalid") as HTMLSpanElement;

    if (numRegex.test(number)) {
        error.innerHTML = "valid"
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
    let email = (document.getElementById("userID") as HTMLInputElement).value;
    let password = (document.getElementById("password") as HTMLInputElement).value;

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

    let signUpElement = document.getElementById("signUp") as HTMLDivElement;
    signUpElement.style.display = "none";

    let existingUserElement = document.getElementById("existingUser") as HTMLDivElement;
    existingUserElement.style.display = "none";

    let homeElement = document.getElementById("homepage") as HTMLDivElement;
    homeElement.style.display = "none";

    // let medicineElement = document.getElementById("medicineDetails") as HTMLDivElement;
    // medicineElement.style.display = "none";

    let wrapperElement = document.getElementById("wrapper") as HTMLDivElement;
    wrapperElement.style.display = "none";

    let indexpage = document.getElementById("indexPage") as HTMLDivElement;
    indexpage.style.display = "block";

    (document.getElementById("greeting") as HTMLHeadingElement).innerHTML = `Welcome ${CurrentLoggedInuser.name}`;
}

function signUp() {

    let name = (document.getElementById("username") as HTMLInputElement).value;
    // let age = parseInt((document.getElementById("age") as HTMLInputElement).value);
    let number = (document.getElementById("number") as HTMLInputElement).value;
    let email = (document.getElementById("email") as HTMLInputElement).value;
    let password = (document.getElementById("pass") as HTMLInputElement).value;
    let confirmpassword = (document.getElementById("confirmPass") as HTMLInputElement).value;

    if (password == confirmpassword) {
        let newUser = new UserDetails(name, number, password, email);
        addContact(newUser);
        CurrentLoggedInuser=newUser;
        homepage();
    }
}

function HideAll() {
    let medicineElement = document.getElementById("medicineDetails") as HTMLDivElement;
    medicineElement.style.display = "none";

    let quantityElement = document.getElementById("quantity-container") as HTMLDivElement;
    quantityElement.style.display = "none";

    let orderElement = document.getElementById("order-container") as HTMLDivElement;
    orderElement.style.display = "none";

    let balanceElement = document.getElementById("updateBalance") as HTMLDivElement;
    balanceElement.style.display = "none";

    let showbalanceElement = document.getElementById("showBalance") as HTMLDivElement;
    showbalanceElement.style.display = "none";
}
function showMedicineDetails() {

    HideAll();

    let medicineElement = document.getElementById("medicineDetails") as HTMLDivElement;
    medicineElement.style.display = "block";

    let tableElement = document.getElementById("medicine-table") as HTMLDivElement;
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
            `
        tableElement.appendChild(tableData)
    }


}

function purchase() {

    HideAll();

    let medicineElement = document.getElementById("medicineDetails") as HTMLDivElement;
    medicineElement.style.display = "block";

    let tableElement = document.getElementById("medicine-table") as HTMLDivElement;
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

function setGlobal(id: string) {
    cuurentMedicineID = id;
    HideAll();

    let quantityElement = document.getElementById("quantity-container") as HTMLDivElement;
    quantityElement.style.display = "block";
}
function setQuantity() {
    let quantity = parseInt((document.getElementById("quantity") as HTMLInputElement).value);
    buyMedicine(quantity)
}
function buyMedicine(quantity: number) {



    for (let i = 0; i < MedicineList.length; i++) {
        if (MedicineList[i].medicineID == cuurentMedicineID) {
            MedicineList[i].medicineCount -= quantity;
            let price = quantity * MedicineList[i].medicinePrice;
            // CurrentLoggedInuser.updateBalance(-price);
            OrderIdAutoIncrement++;
            let order: OrderDetails = new OrderDetails(OrderIdAutoIncrement.toString(), MedicineList[i].medicineID, CurrentLoggedInuser.id, MedicineList[i].medicineName, quantity, "ordered",);
            // OrderList.push(order);
            addOrder(order);

            //get amount
            CurrentLoggedInuser.updateBalance(-price);
            let user: User = {
                id: CurrentLoggedInuser.id,
                name: CurrentLoggedInuser.name,
                email: CurrentLoggedInuser.email,
                phone: CurrentLoggedInuser.phone,
                password: CurrentLoggedInuser.password,
                _balance: CurrentLoggedInuser.showBalance()

            }
            updateContact(CurrentLoggedInuser.id, user);
            updateMedicine(MedicineList[i].medicineID, MedicineList[i]);
            break;
        }
    }
    purchase();

}

function orderHistory() {
    HideAll();

    let orderElement = document.getElementById("order-container") as HTMLDivElement;
    orderElement.style.display = "block";

    let tableElement = document.getElementById("order-table") as HTMLDivElement;
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

    let balanceElement = document.getElementById("updateBalance") as HTMLDivElement;
    balanceElement.style.display = "block";
}

function Recharge() {

    HideAll();

    let balanceElement = document.getElementById("showBalance") as HTMLDivElement;
    balanceElement.style.display = "block";


    let amount: number = parseInt((document.getElementById("balance") as HTMLInputElement).value);
    CurrentLoggedInuser.updateBalance(amount);

    (document.getElementById("balance-message") as HTMLParagraphElement).innerHTML = `your balance is ${CurrentLoggedInuser.showBalance()}`;

    let user: User = {
        id: CurrentLoggedInuser.id,
        name: CurrentLoggedInuser.name,
        // UserAge: number;
        email: CurrentLoggedInuser.email,
        phone: CurrentLoggedInuser.phone,
        password: CurrentLoggedInuser.password,
        _balance: CurrentLoggedInuser.showBalance()

    }
    updateContact(CurrentLoggedInuser.id, user);
}

function showBalance() {
    HideAll();

    let balanceElement = document.getElementById("showBalance") as HTMLDivElement;
    balanceElement.style.display = "block";

    (document.getElementById("balance-message") as HTMLParagraphElement).innerHTML = `your balance is ${CurrentLoggedInuser.showBalance()}`;

}

function Edit(id: string) {

    const nameInput = document.getElementById("name") as HTMLInputElement;
    const quantityInput = document.getElementById("editQuantity") as HTMLInputElement;
    editingId = id;

    const item = MedicineList.find((item) => item.medicineID === id);
    if (item) {
        nameInput.value = item.medicineName;
        quantityInput.value = String(item.medicineCount);
    }


}

function editElement() {

    const nameInput = document.getElementById("name") as HTMLInputElement;
    const quantityInput = document.getElementById("editQuantity") as HTMLInputElement;
    const name = nameInput.value.trim();
    const quantity = parseInt(quantityInput.value.trim());


    const index = MedicineList.findIndex((item) => item.medicineID === editingId);

    MedicineList[index] = { ...MedicineList[index], medicineName: name, medicineCount: quantity };
    updateMedicine(MedicineList[index].medicineID, MedicineList[index])

    editingId = null;
    showMedicineDetails();




}

function Delete(id: string) {



    MedicineList = MedicineList.filter((item) => item.medicineID !== id);
    showMedicineDetails();


}

function showCancelOrder() {
    HideAll();

    let balanceElement = document.getElementById("order-container") as HTMLDivElement;
    balanceElement.style.display = "block";

    let tableElement = document.getElementById("order-table") as HTMLDivElement;
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

function cancelOrder(id: string) {

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
                    let user: User = {
                        id: CurrentLoggedInuser.id,
                        name: CurrentLoggedInuser.name,
                        // UserAge: number;
                        email: CurrentLoggedInuser.email,
                        phone: CurrentLoggedInuser.phone,
                        password: CurrentLoggedInuser.password,
                        _balance: CurrentLoggedInuser.showBalance()

                    }
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

async function fetchContacts(): Promise<UserDetails[]> {
    const apiUrl = 'http://localhost:5077/api/contacts';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch contacts');
    }
    return await response.json();
}
async function fetchMedicines(): Promise<MedicineDetails[]> {
    const apiUrl = 'http://localhost:5077/api/Medicine';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch medicines');
    }
    return await response.json();
}
async function fetchOrders(): Promise<OrderDetails[]> {
    const apiUrl = 'http://localhost:5077/api/Order';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch order');
    }
    return await response.json();
}

async function deleteMedicine(id: string): Promise<void> {
    const response = await fetch(`http://localhost:5077/api/Medicine/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete contact');
    }
    let medicines = await fetchMedicines();
    MedicineList = new Array<MedicineDetails>();
    medicines.forEach((m) => {
        let medicine: MedicineDetails = new MedicineDetails(m.medicineID, m.medicineName, m.medicineCount, m.medicinePrice, m.medicineExpiry);
        MedicineList.push(medicine);
    })
    showMedicineDetails();
}

async function updateContact(id: string, user: User): Promise<void> {
    const response = await fetch(`http://localhost:5077/api/Contacts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (!response.ok) {
        throw new Error('Failed to update contact');
    }
}
async function updateMedicine(id: string, medicine: MedicineDetails): Promise<void> {
    const response = await fetch(`http://localhost:5077/api/Medicine/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(medicine)
    });
    if (!response.ok) {
        throw new Error('Failed to update medicine');
    }
    let medicines = await fetchMedicines();
    MedicineList = new Array<MedicineDetails>();
    medicines.forEach((m) => {
        let medicine: MedicineDetails = new MedicineDetails(m.medicineID, m.medicineName, m.medicineCount, m.medicinePrice, m.medicineExpiry);
        MedicineList.push(medicine);
    })
    // showMedicineDetails();
}
async function updateOrder(id: string, order: OrderDetails): Promise<void> {
    const response = await fetch(`http://localhost:5077/api/Order/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    });
    if (!response.ok) {
        throw new Error('Failed to update medicine');
    }
    let orders = await fetchOrders();
    OrderList = new Array<OrderDetails>();
    orders.forEach((o) => {
        let order: OrderDetails = new OrderDetails(o.orderID, o.medicineId, o.userId, o.medicineName, o.medicineCount, o.orderStatus);
        OrderList.push(order);
    })
    // orderHistory();
}

async function addOrder(order: OrderDetails): Promise<void> {
    const response = await fetch('http://localhost:5077/api/Order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    });
    if (!response.ok) {
        throw new Error('Failed to add order');
    }
    let orders = await fetchOrders();
    OrderList = new Array<OrderDetails>();
    orders.forEach((o) => {
        let order: OrderDetails = new OrderDetails(o.orderID, o.medicineId, o.userId, o.medicineName, o.medicineCount, o.orderStatus);
        OrderList.push(order);
    })
    // orderHistory();
}

async function addContact(contact: UserDetails): Promise<void> {
    const response = await fetch('http://localhost:5077/api/Contacts', {
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
  }