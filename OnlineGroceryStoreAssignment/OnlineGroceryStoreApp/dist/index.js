"use strict";
let itemAutoIncrement = 0;
let localCartItemsList = new Array;
let CurrentLoggedInuser;
let base64String;
let userImagebase64String;
let editingId = null;
let currentProduct;
//navigation
const signSwitchElement = document.getElementById("signSwitch");
const existingUserElement = document.getElementById("existingUser");
const wrapperElement = document.getElementById("wrapper");
const homePage = document.getElementById("homePage");
const updateBalanceElement = document.getElementById("updateBalance");
const showBalanceElement = document.getElementById("showBalance");
//sign up
const form = document.getElementById("signUpForm");
const editForm = document.getElementById("editProductForm");
const signUpName = document.getElementById("username");
const signUpEmail = document.getElementById("email");
const signUpNumber = document.getElementById("number");
const signUpPassword = document.getElementById("pass");
const signUpConfirmPassword = document.getElementById("confirmPass");
const signUpElement = document.getElementById("signUp");
//login
const loginForm = document.getElementById("signInForm");
const loginUserID = document.getElementById("userID");
const loginPasswordInput = document.getElementById("password");
const userImageElement = document.getElementById("userImage");
//after login
const greeting = document.getElementById("greeting");
const profileName = document.getElementById("profileName");
const profile = document.getElementById("profile");
// error elements
const invalidLogin = document.getElementById("invalidLogin");
const purchaseError = document.getElementById("purchaseError");
const balanceError = document.getElementById("balanceError");
//edit form elements
const nameInput = document.getElementById("name");
const quantityInput = document.getElementById("editQuantity");
const priceInput = document.getElementById("editPrice");
const expiryDateInput = document.getElementById("expiryDate");
const purchaseDateInput = document.getElementById("purchaseDate");
//product elements
const productElement = document.getElementById("productDetails");
const productTableElement = document.getElementById("product__table");
const productImage = document.getElementById("productImage");
//cart elements
const cartElement = document.getElementById("cart__container");
const cartTableElement = document.getElementById("cart__table");
//order Element
const orderHistoryElement = document.getElementById("orderHistory");
// const orderTableElement = document.getElementById("order__table") as HTMLDivElement;
//purchase elements
const purchaseElemet = document.getElementById("purchase");
//display functions
function HideAll() {
    // quantityElement.style.display = "none";
    updateBalanceElement.style.display = "none";
    showBalanceElement.style.display = "none";
    productElement.style.display = "none";
    purchaseElemet.style.display = "none";
    cartElement.style.display = "none";
    orderHistoryElement.style.display = "none";
}
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
userImageElement.addEventListener("input", (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
        userImagebase64String = reader.result;
        userImagebase64String = userImagebase64String === null || userImagebase64String === void 0 ? void 0 : userImagebase64String.toString().split(',')[1];
    };
    reader.readAsDataURL(file);
});
//sign up
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = signUpName.value.trim();
    const email = signUpEmail.value.trim();
    const pass = signUpPassword.value.trim();
    const confirmPass = signUpConfirmPassword.value.trim();
    if (pass == confirmPass) {
        const user = {
            userID: 0,
            name: name,
            email: email,
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
    const password = loginPasswordInput.value.trim();
    const users = await fetchUser();
    const userIndex = users.findIndex(u => u.email == email && u.password == password);
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
productImage.addEventListener("input", (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
        base64String = reader.result;
        base64String = base64String === null || base64String === void 0 ? void 0 : base64String.toString().split(',')[1];
    };
    reader.readAsDataURL(file);
});
async function showProductDetails() {
    HideAll();
    productElement.style.display = "block";
    const productsList = await fetchProducts();
    productTableElement.innerHTML = "";
    productsList.forEach((product) => {
        let tableData = document.createElement("tr");
        tableData.innerHTML = `
        <td><img src="${'data:image/jpg;base64,' + product.productImage}" class="card__image"></td>
        <td>${product.productID}</td>
        <td>${product.productName}</td>
        <td>${product.quantityAvailable}</td>
        <td>${product.purchaseDate.split('T')[0].split('-').reverse().join('/')}</td>
        <td>${product.expiryDate.split('T')[0].split('-').reverse().join('/')}</td>
            <td>${product.pricePerQuantity}</td>
            <td><button onclick="Edit(${product.productID})">Edit</button></td>
            <td><button onclick="deleteProduct(${product.productID})">Delete</button></td>
            `;
        productTableElement.appendChild(tableData);
    });
}
async function purchase() {
    HideAll();
    purchaseElemet.style.display = "block";
    purchaseElemet.style.display = "flex";
    purchaseElemet.style.flexWrap = "wrap";
    purchaseElemet.style.gap = "1rem";
    const productsList = await fetchProducts();
    purchaseElemet.innerHTML = "";
    productsList.forEach((product) => {
        let cardDiv = document.createElement("div");
        cardDiv.className = "productCard";
        // <td>${product.purchaseDate.split('T')[0].split('-').reverse().join('/')}</td>
        cardDiv.innerHTML = `
        <img src="${'data:image/jpg;base64,' + product.productImage}" class="card__image">
        <p>${product.productName}</p>
        <p>quantity: ${product.quantityAvailable}</p>
        <p>Expiry: ${product.expiryDate.split('T')[0].split('-').reverse().join('/')}</p>
        <p>Price: ${product.pricePerQuantity}</p>
        <button id="productAddButton" onclick="setGlobal(${product.productID})">ADD</button>
        <div id="quantity-container${product.productID}" class="container quantity-container">
        <label for="quantity"></label>
        <input type="number" name="quantity" id="quantity" required>
        <button onclick="setQuantity()">buy</button>
        </div>
            `;
        purchaseElemet.appendChild(cardDiv);
    });
}
async function setGlobal(id) {
    const productsList = await fetchProducts();
    const index = productsList.findIndex((item) => item.productID === id);
    currentProduct = productsList[index];
    const quantityElement = document.getElementById(`quantity-container${currentProduct.productID}`);
    const productAddButton = document.getElementById("productAddButton");
    productAddButton.style.display = "none";
    quantityElement.style.display = "block";
}
function setQuantity() {
    let quantity = parseInt(document.getElementById("quantity").value);
    AddToCart(quantity);
    const quantityElement = document.getElementById("quantity-container");
    const productAddButton = document.getElementById("productAddButton");
    productAddButton.style.display = "block";
    quantityElement.style.display = "none";
}
function AddToCart(quantity) {
    const item = {
        itemID: ++itemAutoIncrement,
        orderID: 0,
        productID: currentProduct.productID,
        purchaseCount: quantity,
        priceOfItems: (currentProduct.pricePerQuantity * quantity)
    };
    localCartItemsList.push(item);
}
async function Edit(id) {
    const expiryDate = expiryDateInput;
    // const baseImage = productImage.value;
    editingId = id;
    const productsList = await fetchProducts();
    const item = productsList.find((item) => item.productID === id);
    if (item) {
        nameInput.value = item.productName;
        quantityInput.value = String(item.quantityAvailable);
        priceInput.value = String(item.pricePerQuantity);
        const purchaseOldDate = new Date();
        purchaseOldDate.setDate((new Date(item.purchaseDate)).getDate());
        purchaseDateInput.valueAsDate = purchaseOldDate;
        const expiryOldDate = new Date();
        expiryOldDate.setDate((new Date(item.expiryDate)).getDate());
        expiryDate.valueAsDate = expiryOldDate;
        // productImage.value=item.productImage
    }
}
editForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const quantity = parseInt(quantityInput.value.trim());
    const price = parseInt(priceInput.value.trim());
    const purchaseDate = new Date(purchaseDateInput.value).toISOString().substring(0, 10);
    const expiryDate = new Date(expiryDateInput.value).toISOString().substring(0, 10);
    if (editingId !== null) {
        const productsList = await fetchProducts();
        const index = productsList.findIndex((item) => item.productID === editingId);
        productsList[index] = Object.assign(Object.assign({}, productsList[index]), { productName: name, quantityAvailable: quantity, pricePerQuantity: price, purchaseDate: purchaseDate, expiryDate: expiryDate, productImage: base64String });
        updateProduct(productsList[index].productID, productsList[index]);
        editingId = null;
    }
    else {
        const product = {
            productID: 0,
            productName: name,
            quantityAvailable: quantity,
            pricePerQuantity: price,
            purchaseDate: purchaseDate,
            expiryDate: expiryDate,
            productImage: base64String
        };
        addProduct(product);
    }
    showProductDetails();
    editForm.reset();
});
async function showCart() {
    HideAll();
    cartElement.style.display = "block";
    const productsList = await fetchProducts();
    cartTableElement.innerHTML = "";
    localCartItemsList.forEach((item) => {
        const index = productsList.findIndex((p) => p.productID == item.productID);
        const product = productsList[index];
        let tableData = document.createElement("tr");
        tableData.innerHTML = `
        <td><img src="${'data:image/jpg;base64,' + product.productImage}"></td>
        <td>${product.productName}</td>
        <td>${item.purchaseCount}</td>
        <td>${item.priceOfItems}</td>
            <td><button onclick="deleteItem(${item.itemID})">Delete</button></td>
            `;
        cartTableElement.appendChild(tableData);
    });
}
function deleteItem(id) {
    localCartItemsList = localCartItemsList.filter((item) => item.itemID !== id);
    showCart();
}
async function Buy() {
    let flag = true;
    const Order = {
        orderID: 0,
        userID: CurrentLoggedInuser.userID,
        orderStatus: "Initiated",
        orderDate: new Date().toISOString().substring(0, 10),
        totalPrice: 0
    };
    addOrder(Order);
    const ordersList = await fetchOrders();
    const orderIndex = ordersList.findIndex((o) => o.orderStatus == "Initiated");
    const OrderWithID = ordersList[orderIndex];
    let totalPrice = 0;
    const productsList = await fetchProducts();
    localCartItemsList.forEach((item) => {
        item.itemID = 0;
        totalPrice += item.priceOfItems;
        item.orderID = OrderWithID.orderID;
        productsList.forEach((product) => {
            if (product.productID == item.productID) {
                if (item.purchaseCount > product.quantityAvailable) {
                    purchaseError.style.display = "block";
                    purchaseError.innerHTML = 'quantity is not present.';
                    OrderWithID.orderStatus = "Cancelled";
                    updateOrder(OrderWithID.orderID, OrderWithID);
                    flag = false;
                    return;
                }
                else {
                    product.quantityAvailable -= item.purchaseCount;
                }
            }
        });
    });
    if (flag == true) {
        if (totalPrice > CurrentLoggedInuser.balance) {
            purchaseError.style.display = "block";
            purchaseError.innerHTML = 'Insufficient balance Please recharge.';
            deleteOrder(OrderWithID.orderID);
            // OrderWithID.orderStatus = "Cancelled";
            // updateOrder(OrderWithID.orderID, OrderWithID);
        }
        else {
            OrderWithID.orderStatus = "Ordered";
            OrderWithID.totalPrice = totalPrice;
            CurrentLoggedInuser.balance -= totalPrice;
            updateUser(CurrentLoggedInuser.userID, CurrentLoggedInuser);
            updateOrder(OrderWithID.orderID, OrderWithID);
            productsList.forEach((p) => {
                updateProduct(p.productID, p);
            });
            localCartItemsList.forEach((i) => {
                addItem(i);
            });
            purchaseError.style.display = "none";
            localCartItemsList = new Array;
        }
    }
}
async function orderHistory() {
    HideAll();
    orderHistoryElement.style.display = "block";
    const ordersList = await fetchOrders();
    const itemsList = await fetchItems();
    orderHistoryElement.innerHTML = '';
    let buttondata = document.createElement('div');
    buttondata.innerHTML = '';
    const productsList = await fetchProducts();
    ordersList.forEach((order) => {
        let tableData = document.createElement("table");
        let flag = true;
        tableData.innerHTML = `<thead>
        <th>Product name</th>
        <th>Price</th>
        <th>quantity</th>
        <th></th>
    </thead>
    <tbody id="order__table">`;
        itemsList.forEach((item) => {
            if (item.orderID == order.orderID) {
                const index = productsList.findIndex((p) => p.productID == item.productID);
                const product = productsList[index];
                tableData.innerHTML += `
            <td>${product.productName}</td>
        <td>${item.priceOfItems}</td>
        <td>${item.purchaseCount}</td>
            `;
                if (flag) {
                    buttondata.innerHTML = `<button onclick="get(${order.orderID})">Download csv</button>`;
                    orderHistoryElement.appendChild(buttondata);
                    flag = false;
                }
            }
        });
        tableData.innerHTML += '</tbody>';
        orderHistoryElement.appendChild(tableData);
    });
}
//Api functions
//User
async function fetchUser() {
    const apiUrl = 'http://localhost:5242/api/Users';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    return await response.json();
}
async function addUser(user) {
    const response = await fetch('http://localhost:5242/api/Users', {
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
    const response = await fetch(`http://localhost:5242/api/Users/${userID}`, {
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
async function addProduct(product) {
    const response = await fetch('http://localhost:5242/api/Products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    if (!response.ok) {
        throw new Error('Failed to add user');
    }
    showProductDetails();
}
async function fetchProducts() {
    const apiUrl = 'http://localhost:5242/api/Products';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch Products');
    }
    return await response.json();
}
async function updateProduct(productID, product) {
    const response = await fetch(`http://localhost:5242/api/Products/${productID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    if (!response.ok) {
        throw new Error('Failed to update Product');
    }
}
async function addOrder(order) {
    const response = await fetch('http://localhost:5242/api/Orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    });
    if (!response.ok) {
        throw new Error('Failed to add Order');
    }
}
async function fetchOrders() {
    const apiUrl = 'http://localhost:5242/api/Orders';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch Orders');
    }
    return await response.json();
}
async function updateOrder(orderID, order) {
    const response = await fetch(`http://localhost:5242/api/Orders/${orderID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    });
    if (!response.ok) {
        throw new Error('Failed to update Product');
    }
}
async function addItem(item) {
    const response = await fetch('http://localhost:5242/api/Items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    });
    if (!response.ok) {
        throw new Error('Failed to add Order');
    }
}
async function deleteProduct(productID) {
    const response = await fetch(`http://localhost:5242/api/Products/${productID}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete product');
    }
    showProductDetails();
}
async function deleteOrder(orderID) {
    const response = await fetch(`http://localhost:5242/api/Products/${orderID}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete order');
    }
}
async function fetchItems() {
    const apiUrl = 'http://localhost:5242/api/Items';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch Items');
    }
    return await response.json();
}
const get = async (orderID) => {
    var _a;
    const items = await fetchItems();
    const userOrders = items.filter((i) => i.orderID == orderID);
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
