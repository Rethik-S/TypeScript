interface User {
    userID: number;
    name: string;
    email: string
    password: string;
    balance: number;
    userImage: any;
}

interface Products {
    productID: number;
    productName: string;
    quantityAvailable: number
    pricePerQuantity: number
    purchaseDate: string;
    expiryDate: string;
    productImage: any;
}

interface Items {
    itemID: number;
    orderID: number;
    productID: number;
    purchaseCount: number;
    priceOfItems: number;
}

interface Orders {
    orderID: number;
    userID: number;
    orderStatus: string;
    orderDate: string;
    totalPrice: number;
}

let itemAutoIncrement: number = 0;

let localCartItemsList: Items[] = new Array;

let CurrentLoggedInuser: User;
let base64String: any;
let userImagebase64String: any;

let editingId: number | null = null;
let currentProduct: Products;

//navigation
const signSwitchElement = document.getElementById("signSwitch") as HTMLDivElement;
const existingUserElement = document.getElementById("existingUser") as HTMLDivElement;
const wrapperElement = document.getElementById("wrapper") as HTMLDivElement;
const homePage = document.getElementById("homePage") as HTMLDivElement;
const updateBalanceElement = document.getElementById("updateBalance") as HTMLDivElement;
const showBalanceElement = document.getElementById("showBalance") as HTMLDivElement;

//sign up
const form = document.getElementById("signUpForm") as HTMLFormElement;
const editForm = document.getElementById("editProductForm") as HTMLFormElement;
const signUpName = (document.getElementById("username") as HTMLInputElement);
const signUpEmail = (document.getElementById("email") as HTMLInputElement);
const signUpNumber = (document.getElementById("number") as HTMLInputElement);
const signUpPassword = (document.getElementById("pass") as HTMLInputElement);
const signUpConfirmPassword = (document.getElementById("confirmPass") as HTMLInputElement);
const signUpElement = document.getElementById("signUp") as HTMLDivElement;

//login
const loginForm = document.getElementById("signInForm") as HTMLFormElement;
const loginUserID = document.getElementById("userID") as HTMLInputElement;
const loginPasswordInput = document.getElementById("password") as HTMLInputElement;
const userImageElement = document.getElementById("userImage") as HTMLInputElement;

//after login
const greeting = document.getElementById("greeting") as HTMLHeadingElement;
const profileName = document.getElementById("profileName") as HTMLSpanElement;
const profile = document.getElementById("profile") as HTMLImageElement;

// error elements
const invalidLogin = document.getElementById("invalidLogin") as HTMLSpanElement;
const purchaseError = document.getElementById("purchaseError") as HTMLSpanElement
const balanceError = document.getElementById("balanceError") as HTMLSpanElement

//edit form elements
const nameInput = document.getElementById("name") as HTMLInputElement;
const quantityInput = document.getElementById("editQuantity") as HTMLInputElement;
const priceInput = document.getElementById("editPrice") as HTMLInputElement;
const expiryDateInput = document.getElementById("expiryDate") as HTMLInputElement;
const purchaseDateInput = document.getElementById("purchaseDate") as HTMLInputElement;

//product elements
const productElement = document.getElementById("productDetails") as HTMLDivElement;
const productTableElement = document.getElementById("product__table") as HTMLDivElement;
const productImage = document.getElementById("productImage") as HTMLInputElement;

//cart elements
const cartElement = document.getElementById("cart__container") as HTMLDivElement;
const cartTableElement = document.getElementById("cart__table") as HTMLDivElement;

//order Element
const orderHistoryElement = document.getElementById("orderHistory") as HTMLDivElement;
// const orderTableElement = document.getElementById("order__table") as HTMLDivElement;

//purchase elements
const purchaseElemet = document.getElementById("purchase") as HTMLDivElement;

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

userImageElement.addEventListener("input", (event: any) => {
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = () => {
        userImagebase64String = reader.result;
        userImagebase64String = userImagebase64String?.toString().split(',')[1];
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
        const user: User = {
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
        setTimeout(() => {
            greeting.style.display = "none";
        }, 5000);
        profile.src = `data:image/jpg;base64, ${users[userIndex].userImage}`;
        profileName.innerHTML = `${users[userIndex].name}`;

    }

    form.reset();
});




productImage.addEventListener("input", (event: any) => {
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = () => {
        base64String = reader.result;
        base64String = base64String?.toString().split(',')[1];
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
            `
        productTableElement.appendChild(tableData)
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
            `
        purchaseElemet.appendChild(cardDiv)
    });

}

async function setGlobal(id: number) {
    const productsList = await fetchProducts()
    const index = productsList.findIndex((item) => item.productID === id);
    currentProduct = productsList[index];

    const quantityElement = document.getElementById(`quantity-container${currentProduct.productID}`) as HTMLDivElement;
    const productAddButton = document.getElementById("productAddButton") as HTMLButtonElement;
    productAddButton.style.display = "none"
    quantityElement.style.display = "block";
}


function setQuantity() {
    let quantity = parseInt((document.getElementById("quantity") as HTMLInputElement).value);
    AddToCart(quantity);
    const quantityElement = document.getElementById(`quantity-container${currentProduct.productID}`) as HTMLDivElement;
    const productAddButton = document.getElementById("productAddButton") as HTMLButtonElement;
    productAddButton.style.display = "block"
    quantityElement.style.display = "none";
}
function AddToCart(quantity: number) {
    const item: Items = {
        itemID: ++itemAutoIncrement,
        orderID: 0,
        productID: currentProduct.productID,
        purchaseCount: quantity,
        priceOfItems: (currentProduct.pricePerQuantity * quantity)
    }
    localCartItemsList.push(item);
}

async function Edit(id: number) {

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
        purchaseOldDate.setDate((new Date(item.purchaseDate)).getDate())
        purchaseDateInput.valueAsDate = purchaseOldDate;

        const expiryOldDate = new Date();
        expiryOldDate.setDate((new Date(item.expiryDate)).getDate())
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

        productsList[index] = { ...productsList[index], productName: name, quantityAvailable: quantity, pricePerQuantity: price, purchaseDate: purchaseDate, expiryDate: expiryDate, productImage: base64String };
        updateProduct(productsList[index].productID, productsList[index])

        editingId = null;
    } else {
        const product: Products = {
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
            `
        cartTableElement.appendChild(tableData)
    });
}

function deleteItem(id: number) {
    localCartItemsList = localCartItemsList.filter((item) => item.itemID !== id);
    showCart();
}


async function Buy() {

    let flag: boolean = true;

    let totalPrice: number = 0;

    const productsList = await fetchProducts();
    localCartItemsList.forEach((item) => { totalPrice += item.priceOfItems; })
    if (totalPrice > CurrentLoggedInuser.balance) {
        purchaseError.style.display = "block";
        purchaseError.innerHTML = 'Insufficient balance Please recharge.'
        flag = false;
    }
    else {
        localCartItemsList.forEach((item) => {
            productsList.forEach((product) => {
                if (product.productID == item.productID) {
                    if (item.purchaseCount > product.quantityAvailable) {
                        purchaseError.style.display = "block";
                        purchaseError.innerHTML = 'quantity is not present.'
                        flag = false;
                        return;
                    }
                    else {
                        product.quantityAvailable -= item.purchaseCount;
                    }
                }
            });
        });
    }
    if (flag) {
        const Order: Orders = {
            orderID: 0,
            userID: CurrentLoggedInuser.userID,
            orderStatus: "Ordered",
            orderDate: new Date().toISOString().substring(0, 10),
            totalPrice: 0
        }
        const OrderWithID = await addOrder(Order);

        localCartItemsList.forEach((item) => { item.orderID = OrderWithID.orderID; item.itemID = 0; })
        OrderWithID.totalPrice = totalPrice;
        CurrentLoggedInuser.balance -= totalPrice;
        setTimeout(() => {

        }, 100);
        updateUser(CurrentLoggedInuser.userID, CurrentLoggedInuser);
        setTimeout(() => {

        }, 100);
        updateOrder(OrderWithID.orderID, OrderWithID);
        setTimeout(() => {

        }, 100);
        productsList.forEach((p) => {
            updateProduct(p.productID, p);
            setTimeout(() => {

            }, 100);
        })
        localCartItemsList.forEach((i) => {
            addItem(i);
            setTimeout(() => {

            }, 100);
        })
        purchaseError.style.display = "none";
        localCartItemsList = new Array;

    }
    showCart();
}

async function orderHistory() {
    HideAll();
    orderHistoryElement.style.display = "block";

    const ordersList = await fetchOrders();
    const itemsList = await fetchItems();
    orderHistoryElement.innerHTML = '<h2>Your Orders</h2>';

    const productsList = await fetchProducts();

    ordersList.forEach((order) => {
        if (order.orderStatus == "Ordered") {
            const orderCard = document.createElement('div');
            orderCard.innerHTML = '';
            orderCard.className = "orderCard";
            const heading = document.createElement('div');
            heading.innerHTML = '';
            heading.innerHTML = `<p>Name: ${CurrentLoggedInuser.name}</p> <p>Price: ${order.totalPrice}</p> <p>Date:${order.orderDate.split('T')[0].split('-').reverse().join('/')}</p>`
            orderCard.appendChild(heading);
            let buttondata = document.createElement('div');
            buttondata.innerHTML = '';
            let tableData = document.createElement("table");
            // let flag = true;
            tableData.innerHTML = `<thead>
        <th>Product name</th>
        <th>Price</th>
        <th>quantity</th>
        <th></th>
    </thead>
    <tbody id="order__table">`
            itemsList.forEach((item) => {
                if (item.orderID == order.orderID) {
                    const index = productsList.findIndex((p) => p.productID == item.productID);
                    const product = productsList[index];

                    tableData.innerHTML += `
            <td>${product.productName}</td>
        <td>${item.priceOfItems}</td>
        <td>${item.purchaseCount}</td>
            `
                    // if (flag) {
                    buttondata.innerHTML = `<button onclick="get(${order.orderID})">Download csv</button>`
                    heading.appendChild(buttondata);
                    // flag = false;
                    // }


                    tableData.innerHTML += '</tbody>'
                    orderCard.appendChild(tableData);
                    orderHistoryElement.appendChild(orderCard);
                }
            })
        }
    })
}


//Api functions

//User
async function fetchUser(): Promise<User[]> {
    const apiUrl = 'http://localhost:5242/api/Users';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    return await response.json();
}


async function addUser(user: User): Promise<void> {
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

async function updateUser(userID: number, user: User): Promise<void> {
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

async function addProduct(product: Products): Promise<void> {
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

async function fetchProducts(): Promise<Products[]> {
    const apiUrl = 'http://localhost:5242/api/Products';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch Products');
    }
    return await response.json();
}

async function updateProduct(productID: number, product: Products): Promise<void> {
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


async function addOrder(order: Orders): Promise<Orders> {
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
    return response.json();

}

async function fetchOrders(): Promise<Orders[]> {
    const apiUrl = 'http://localhost:5242/api/Orders';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch Orders');
    }
    return await response.json();
}

async function updateOrder(orderID: number, order: Orders): Promise<void> {
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

async function addItem(item: Items): Promise<void> {
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

async function deleteProduct(productID: string): Promise<void> {
    const response = await fetch(`http://localhost:5242/api/Products/${productID}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete product');
    }
    showProductDetails();
}
async function deleteOrder(orderID: number): Promise<void> {
    const response = await fetch(`http://localhost:5242/api/Products/${orderID}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete order');
    }
}

async function fetchItems(): Promise<Items[]> {
    const apiUrl = 'http://localhost:5242/api/Items';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch Items');
    }
    return await response.json();
}

const get = async (orderID: number) => {
    const items = await fetchItems();
    const userOrders = items.filter((i) => i.orderID == orderID);
    const titleKeys = Object.keys(userOrders[0])
    // .push('Product Name');
    const redefinedData = [];
    redefinedData.push(titleKeys);
    redefinedData[0].push('Product Name');
    const productsList = await fetchProducts();

    userOrders.forEach((item) => {
        const index = productsList.findIndex((p) => p.productID === item.productID)
        const product = productsList[index];
        const newItem = {
            itemID: item.itemID,
            orderID: item.orderID,
            productID: item.productID,
            purchaseCount: item.purchaseCount,
            priceOfItems: item.priceOfItems,
            ProductName: product.productName
        }
        redefinedData.push(Object.values(newItem));
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