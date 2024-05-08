// let UserIdAutoIncrement = 2001;
// let MedicineIdAutoIncrement = 1005;
// let OrderIdAutoIncrement = 3001;

let CurrentLoggedInuser: User;
let base64String: any;

// let CurrentUserID: number;
// let CurrentUserName: string;

let editingId: number | null = null;

let NewUserNameStatus = false;
let NewUserAgeStatus = false;
let NewUserPhoneNumberStatus = false;
let NewUserEmailStatus = false;
let currentMedicineID: number;

interface User {
    userID: number;
    name: string;
    email: string
    phone: string;
    password: string;
    balance: number;
}

interface Medicine {
    medicineID: number;
    medicineName: string;
    medicineCount: number;
    medicinePrice: number;
    medicineExpiry: string;
    medicineImage: any;
}

interface Order {
    orderID: number;
    medicineID: number;
    userID: number;
    orderStatus: string
    medicineName: string;
    medicineCount: number;
}

const form = document.getElementById("signUpForm") as HTMLFormElement;
const editForm = document.getElementById("editMedicineForm") as HTMLFormElement;
const signUpName = (document.getElementById("username") as HTMLInputElement);
const signUpEmail = (document.getElementById("email") as HTMLInputElement);
const signUpNumber = (document.getElementById("number") as HTMLInputElement);
const signUpPassword = (document.getElementById("pass") as HTMLInputElement);
const signUpConfirmPassword = (document.getElementById("confirmPass") as HTMLInputElement);
const loginForm = document.getElementById("signInForm") as HTMLFormElement;
const loginUserID = document.getElementById("userID") as HTMLInputElement;
const loginPasswordInput = document.getElementById("password") as HTMLInputElement;
const signUpElement = document.getElementById("signUp") as HTMLDivElement;
const existingUserElement = document.getElementById("existingUser") as HTMLDivElement;
const signSwitchElement = document.getElementById("signSwitch") as HTMLDivElement;
const wrapperElement = document.getElementById("wrapper") as HTMLDivElement;
const homePage = document.getElementById("homePage") as HTMLDivElement;
const greeting = document.getElementById("greeting") as HTMLHeadingElement;
const medicineElement = document.getElementById("medicineDetails") as HTMLDivElement;
const medicineTableElement = document.getElementById("medicine-table") as HTMLDivElement;
const quantityElement = document.getElementById("quantity-container") as HTMLDivElement;
const orderElement = document.getElementById("order-container") as HTMLDivElement;
const orderTableElement = document.getElementById("order-table") as HTMLDivElement;
const updateBalanceElement = document.getElementById("updateBalance") as HTMLDivElement;
const showBalanceElement = document.getElementById("showBalance") as HTMLDivElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const quantityInput = document.getElementById("editQuantity") as HTMLInputElement;
const priceInput = document.getElementById("editPrice") as HTMLInputElement;
const expiryDateInput = document.getElementById("expiryDate") as HTMLInputElement;

// error elements
const invalidLogin = document.getElementById("invalidLogin") as HTMLSpanElement;
const purchaseError = (document.getElementById("purchaseError") as HTMLSpanElement)
const balanceError = document.getElementById("balanceError") as HTMLSpanElement

//dob.split('T')[0].split('-').reverse().join('/')

// validation
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
function emailValidate() {
    var email = (document.getElementById("email") as HTMLInputElement).value.trim();
    //email
    var emailRegex = /^([a-z 0-9\.-]+)@([a-z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})/;
    var emailError = document.getElementById("emailInvalid") as HTMLSpanElement;

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

    if (pass == confirmPass) {
        const user: User = {
            userID: 0,
            name: name,
            email: email,
            phone: phone,
            password: pass,
            balance: 0,
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
            `
        medicineTableElement.appendChild(tableData)
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

function setGlobal(id: number) {
    currentMedicineID = id;
    HideAll();

    quantityElement.style.display = "block";
}


function setQuantity() {
    let quantity = parseInt((document.getElementById("quantity") as HTMLInputElement).value);
    buyMedicine(quantity)
}
async function buyMedicine(quantity: number) {

    const MedicineList = await fetchMedicines();


    for (let i = 0; i < MedicineList.length; i++) {
        if (MedicineList[i].medicineID == currentMedicineID) {
            if (quantity > MedicineList[i].medicineCount) {
                purchaseError.style.display = "block";
                purchaseError.innerHTML = 'quantity is not present.'
            }
            else {
                let price = quantity * MedicineList[i].medicinePrice;
                if (CurrentLoggedInuser.balance >= price) {
                    MedicineList[i].medicineCount -= quantity;

                    let order: Order = {
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
                    purchaseError.innerHTML = 'Insufficient balance Please recharge.'
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

    let tableElement = document.getElementById("order-table") as HTMLDivElement;
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

async function cancelOrder(userID: number) {
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



    let amount: number = parseInt((document.getElementById("balance") as HTMLInputElement).value);
    if (amount > 0) {
        HideAll();
        showBalanceElement.style.display = "block";
        CurrentLoggedInuser.balance += amount;

        (document.getElementById("balance-message") as HTMLParagraphElement).innerHTML = `your balance is ${CurrentLoggedInuser.balance}`;

        updateUser(CurrentLoggedInuser.userID, CurrentLoggedInuser);
    }
    else {
        balanceError.innerHTML = 'Enter a valid amount';
    }

}

function showBalance() {
    HideAll();

    showBalanceElement.style.display = "block";

    (document.getElementById("balance-message") as HTMLParagraphElement).innerHTML = `your balance is ${CurrentLoggedInuser.balance}`;

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


const medicineImage = document.getElementById("medicineImage") as HTMLInputElement;

async function Edit(id: number) {

    const nameInput = document.getElementById("name") as HTMLInputElement;
    const quantityInput = document.getElementById("editQuantity") as HTMLInputElement;
    const priceInput = document.getElementById("editPrice") as HTMLInputElement;
    const expiryDate = expiryDateInput;
    const baseImage = medicineImage.value;
    editingId = id;
    const MedicineList = await fetchMedicines();
    const item = MedicineList.find((item) => item.medicineID === id);
    if (item) {
        nameInput.value = item.medicineName;
        quantityInput.value = String(item.medicineCount);
        priceInput.value = String(item.medicinePrice);
        const changeddate = new Date();
        changeddate.setDate((new Date(item.medicineExpiry)).getDate())
        expiryDate.valueAsDate = changeddate;
    }


}


medicineImage.addEventListener("input", (event: any) => {
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = () => {
        base64String = reader.result;
        base64String = base64String?.toString().split(',')[1];
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

        MedicineList[index] = { ...MedicineList[index], medicineName: name, medicineCount: quantity, medicinePrice: price, medicineExpiry: expiryDate };
        updateMedicine(MedicineList[index].medicineID, MedicineList[index])

        editingId = null;
    } else {
        const medicine: Medicine = {
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
async function fetchUser(): Promise<User[]> {
    const apiUrl = 'http://localhost:5078/api/Users';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch contacts');
    }
    return await response.json();
}

async function addUser(user: User): Promise<void> {
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

async function updateUser(userID: number, user: User): Promise<void> {
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
async function fetchMedicines(): Promise<Medicine[]> {
    const apiUrl = 'http://localhost:5078/api/Medicine';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch medicines');
    }
    return await response.json();
}
async function addMedicine(medicine: Medicine): Promise<void> {
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
async function updateMedicine(id: number, medicine: Medicine): Promise<void> {
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

async function deleteMedicine(userID: string): Promise<void> {
    const response = await fetch(`http://localhost:5078/api/Medicine/${userID}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete contact');
    }
    showMedicineDetails();
}


//Orders
async function fetchOrders(): Promise<Order[]> {
    const apiUrl = 'http://localhost:5078/api/Order';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch order');
    }
    return await response.json();
}
async function updateOrder(id: number, order: Order): Promise<void> {
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

async function addOrder(order: Order): Promise<void> {
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
    const orderList = await fetchOrders();
    const userOrders = orderList.filter((o) => o.userID == CurrentLoggedInuser.userID);
    const titleKeys = Object.keys(userOrders[0]);
    const redefinedData = [];
    redefinedData.push(titleKeys);

    userOrders.forEach((item) => {
        redefinedData.push(Object.values(item)
        )
    })

    let csvContent = '';
    redefinedData.forEach((r) => {
        csvContent += r.join(',') + '\n';
    })

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const objUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', objUrl);
    link.setAttribute('download', 'Orders.csv');
    // link.textContent = 'Click to download'
    document.querySelector('#download')?.append(link);
    link.click();
    // const jsonData = userOrders.statewise;
}