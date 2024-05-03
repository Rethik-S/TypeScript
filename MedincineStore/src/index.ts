let UserIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 10;
let OrderIdAutoIncrement = 100;

let CurrentLoggedInuser: UserDetails;

let CurrentUserId: string;
let CurrentUserName: string;

let editingId: string | null = null;

let NewUserNameStatus = false;
let NewUserAgeStatus = false;
let NewUserPhoneNumberStatus = false;




let cuurentMedicineID: string;
class UserDetails {

    UserId: string;
    UserName: string;
    UserAge: number;
    UserEmail: string
    UserPhoneNumber: string;
    UserPassword: string;
    private _balance: number = 0;

    constructor(userName: string, userAge: number, userPhoneNumber: string, userPassword: string, userEmail: string) {

        UserIdAutoIncrement++;

        this.UserId = "UI" + UserIdAutoIncrement.toString();

        this.UserName = userName;
        this.UserAge = userAge;
        this.UserPhoneNumber = userPhoneNumber;
        this.UserPassword = userPassword;
        this.UserEmail = userEmail
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

    MedicineId: string;
    MedicineName: string;
    MedicineCount: number;
    MedicinePrice: number;
    MedicineExpiry: Date;

    constructor(medicineName: string, medicineCount: number, medicinePrice: number, medicineExpiry: Date) {
        MedicineIdAutoIncrement++;

        this.MedicineId = "MD" + MedicineIdAutoIncrement.toString();
        this.MedicineName = medicineName;
        this.MedicineCount = medicineCount;
        this.MedicinePrice = medicinePrice;
        this.MedicineExpiry = medicineExpiry;
    }

}

enum OrderStatus { Ordered, Cancelled }

class OrderDetails {
    OrderId: string;
    MedicineId: string;
    UserId: string;
    OrderStatus: OrderStatus
    MedicineName: string;
    MedicineCount: number;

    constructor(medicineId: string, userId: string, medicineName: string, medicineCount: number, orderStatus: OrderStatus) {
        OrderIdAutoIncrement++;

        this.OrderId = "OI" + OrderIdAutoIncrement.toString();
        this.MedicineId = medicineId;
        this.UserId = userId;
        this.OrderStatus = orderStatus;
        this.MedicineName = medicineName;
        this.MedicineCount = medicineCount;
    }
}

let UsersList: Array<UserDetails> = new Array<UserDetails>();

UsersList.push(new UserDetails("Rethik", 21, "777777777", "password", "rethik@gmail.com"));
UsersList.push(new UserDetails("Nataraj", 22, "888888888", "password", "dsas"));

let MedicineList: Array<MedicineDetails> = new Array<MedicineDetails>();

MedicineList.push(new MedicineDetails("Paracetomol", 5, 50, new Date("2025-8-12")));
MedicineList.push(new MedicineDetails("Colpal", 5, 60, new Date("2025-8-12")));
MedicineList.push(new MedicineDetails("Stepsil", 5, 70, new Date("2025-8-12")));
MedicineList.push(new MedicineDetails("Iodex", 5, 80, new Date("2025-8-12")));
MedicineList.push(new MedicineDetails("Acetherol", 5, 100, new Date("2025-8-12")));

let OrderList: Array<OrderDetails> = new Array<OrderDetails>();

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
        if (email == UsersList[i].UserEmail && password == UsersList[i].UserPassword) {
            CurrentLoggedInuser = UsersList[i];
            // CurrentUserId = UsersList[i].UserId;
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

    (document.getElementById("greeting") as HTMLHeadingElement).innerHTML = `Welcome ${CurrentLoggedInuser.UserName}`;
}

function signUp() {

    let name = (document.getElementById("username") as HTMLInputElement).value;
    let age = parseInt((document.getElementById("age") as HTMLInputElement).value);
    let number = (document.getElementById("number") as HTMLInputElement).value;
    let email = (document.getElementById("email") as HTMLInputElement).value;
    let password = (document.getElementById("pass") as HTMLInputElement).value;
    let confirmpassword = (document.getElementById("confirmPass") as HTMLInputElement).value;

    if (password == confirmpassword) {
        UsersList.push(new UserDetails(name, age, number, password, email));
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

        tableData.innerHTML = `<td>${MedicineList[i].MedicineName}</td>
        <td>${MedicineList[i].MedicineCount}</td>
        <td>${MedicineList[i].MedicineExpiry.toDateString()}</td>
            <td>${MedicineList[i].MedicinePrice}</td>
            <td><button onclick="Edit('${MedicineList[i].MedicineId}')">Edit</button></td>
            <td><button onclick="Delete('${MedicineList[i].MedicineId}')">Delete</button></td>
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
        if (MedicineList[i].MedicineId == cuurentMedicineID) {
            MedicineList[i].MedicineCount -= quantity;
            let price = quantity * MedicineList[i].MedicinePrice;
            CurrentLoggedInuser.updateBalance(-price);
            let order: OrderDetails = new OrderDetails(MedicineList[i].MedicineId, CurrentLoggedInuser.UserId, MedicineList[i].MedicineName, quantity, OrderStatus.Ordered);
            OrderList.push(order);
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
    const item = MedicineList.find((item) => item.MedicineId === id);
    if (item) {
        nameInput.value = item.MedicineName;
        quantityInput.value = String(item.MedicineCount);
    }
}

function editElement() {
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const quantityInput = document.getElementById("editQuantity") as HTMLInputElement;
    const name = nameInput.value.trim();
    const quantity = parseInt(quantityInput.value.trim());

    const index = MedicineList.findIndex((item) => item.MedicineId === editingId);

    MedicineList[index] = { ...MedicineList[index], MedicineId: name, MedicineCount: quantity };
    editingId = null;

    showMedicineDetails();
}

function Delete(id: string) {
    MedicineList = MedicineList.filter((item) => item.MedicineId !== id);
    showMedicineDetails();
}

function showCancelOrder() {
    HideAll();

    let balanceElement = document.getElementById("order-container") as HTMLDivElement;
    balanceElement.style.display = "block";

    let tableElement = document.getElementById("order-table") as HTMLDivElement;
    tableElement.innerHTML = "";
    for (var i = 0; i < OrderList.length; i++) {

        let tableData = document.createElement("tr");

        tableData.innerHTML = `
        <td>${OrderList[i].MedicineId}</td>
        <td>${OrderList[i].UserId}</td>
        <td>${OrderList[i].MedicineName}</td>
        <td>${OrderList[i].MedicineCount}</td>
        <td>${OrderList[i].OrderStatus}</td>
        <td><button onclick="cancelOrder('${OrderList[i].OrderId}')">cancel</button></td>
            `;
        tableElement.appendChild(tableData);
    }
}

function cancelOrder(id: string) {
    for (let i = 0; i < OrderList.length; i++) {
        if (OrderList[i].OrderId == id) {
            OrderList[i].OrderStatus = OrderStatus.Cancelled;
            for (let j = 0; j < MedicineList.length; j++) {
                if (MedicineList[j].MedicineId == OrderList[i].MedicineId) {
                    MedicineList[j].MedicineCount += OrderList[i].MedicineCount;
                    let price = MedicineList[j].MedicinePrice * OrderList[i].MedicineCount;
                    CurrentLoggedInuser.updateBalance(price);
                    break;
                }

            }
            break;
        }
    }
    showCancelOrder();
}