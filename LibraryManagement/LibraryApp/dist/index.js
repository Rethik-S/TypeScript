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
let currentBookID;
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
const borrowHistoryElement = document.getElementById("borrowHistory");
const bookDetailsElement = document.getElementById("bookDetails");
const quantityElement = document.getElementById("quantity-container");
const bookname = document.getElementById("bookname");
const authorname = document.getElementById("authorname");
const BookCount = document.getElementById("BookCount");
const editForm = document.getElementById("editBookForm");
//error
const balanceError = document.getElementById("balanceError");
const bookingError = document.getElementById("bookingError");
function HideAll() {
    balanceError.style.display = "none";
    updateBalanceElement.style.display = "none";
    showBalanceElement.style.display = "none";
    borrowHistoryElement.style.display = "none";
    bookDetailsElement.style.display = "none";
    quantityElement.style.display = "none";
    bookingError.style.display = "none";
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
function borrowHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        HideAll();
        borrowHistoryElement.style.display = "block";
        const borrowHistoryList = yield fetchBorrowDetails();
        let tableElement = document.getElementById("borrow-table");
        tableElement.innerHTML = "";
        for (var i = 0; i < borrowHistoryList.length; i++) {
            if (borrowHistoryList[i].userID == CurrentLoggedInuser.userID) {
                let tableData = document.createElement("tr");
                tableData.innerHTML = `
        <td>${borrowHistoryList[i].borrowID}</td>
        <td>${borrowHistoryList[i].bookID}</td>
        <td>${borrowHistoryList[i].userID}</td>
        <td>${borrowHistoryList[i].borrowedDate.toString().substring(0, 10)}</td>
        <td>${borrowHistoryList[i].borrowBookCount}</td>
        <td>${borrowHistoryList[i].status}</td>
        <td>${borrowHistoryList[i].paidFineAmount}</td>
            `;
                tableElement.appendChild(tableData);
            }
        }
    });
}
function showBookDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        HideAll();
        bookDetailsElement.style.display = "block";
        const bookDetailsList = yield fetchBookDetails();
        let tableElement = document.getElementById("book-table");
        tableElement.innerHTML = "";
        for (var i = 0; i < bookDetailsList.length; i++) {
            let tableData = document.createElement("tr");
            tableData.innerHTML = `
        <td>${bookDetailsList[i].bookID}</td>
        <td>${bookDetailsList[i].bookName}</td>
        <td>${bookDetailsList[i].authorName}</td>
        <td>${bookDetailsList[i].bookCount}</td>
        <td><button onclick="Edit(${bookDetailsList[i].bookID})">Edit</button></td>
        <td><button onclick="delete(${bookDetailsList[i].bookID})">Delete</button></td>
            `;
            tableElement.appendChild(tableData);
        }
    });
}
function purchase() {
    return __awaiter(this, void 0, void 0, function* () {
        HideAll();
        bookDetailsElement.style.display = "block";
        const bookDetailsList = yield fetchBookDetails();
        let tableElement = document.getElementById("book-table");
        tableElement.innerHTML = "";
        for (var i = 0; i < bookDetailsList.length; i++) {
            let tableData = document.createElement("tr");
            tableData.innerHTML = `
        <td>${bookDetailsList[i].bookID}</td>
        <td>${bookDetailsList[i].bookName}</td>
        <td>${bookDetailsList[i].authorName}</td>
        <td>${bookDetailsList[i].bookCount}</td>
        <td><button onclick="setGlobal(${bookDetailsList[i].bookID})">Book</button></td>
            `;
            tableElement.appendChild(tableData);
        }
    });
}
function setGlobal(id) {
    currentBookID = id;
    HideAll();
    quantityElement.style.display = "block";
}
function setQuantity() {
    let quantity = parseInt(document.getElementById("quantity").value);
    Book(quantity);
}
function Book(quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookDetailsList = yield fetchBookDetails();
        const borrowDetailsList = yield fetchBorrowDetails();
        const bookindex = bookDetailsList.findIndex((b) => b.bookID == currentBookID);
        const book = bookDetailsList[bookindex];
        if (!(quantity > 0 && book.bookCount > 0 && quantity <= book.bookCount)) {
            //display book availabilty
            const borrowindex = borrowDetailsList.findIndex((b) => b.bookID == currentBookID);
            const bookAvailability = borrowDetailsList[borrowindex];
            const tempDate = new Date(bookAvailability.borrowedDate);
            tempDate.setDate(tempDate.getDate() + 15);
            showBookDetails();
            bookingError.style.display = "block";
            bookingError.innerHTML = `Books are not available for the selected count.\nThe book will be available on ${tempDate}`;
            return;
        }
        else {
            let totalBorrows = 0;
            borrowDetailsList.forEach((b) => {
                if (CurrentLoggedInuser.userID == b.userID) {
                    if (b.status == "Borrowed") {
                        totalBorrows += b.borrowBookCount;
                    }
                }
            });
            if (totalBorrows >= 3) {
                showBookDetails();
                bookingError.style.display = "block";
                bookingError.innerHTML = 'You have borrowed 3 books already';
                return;
            }
            else if ((quantity + totalBorrows) > 3) {
                showBookDetails();
                bookingError.style.display = "block";
                bookingError.innerHTML = `You can have maximum of 3 borrowed books. Your already borrowed books count is ${totalBorrows} and requested count is ${book.bookCount}, which exceeds 3`;
                return;
            }
            else {
                //need to create book details object
                const borrowDetails = {
                    borrowID: 0,
                    bookID: book.bookID,
                    userID: CurrentLoggedInuser.userID,
                    borrowedDate: new Date(),
                    borrowBookCount: quantity,
                    status: "Borrowed",
                    paidFineAmount: 0
                };
                //Add borrowed book details to books list
                addBorrowDetails(borrowDetails);
                //returning the book count
                book.bookCount -= quantity;
                updateBookDetail(currentBookID, book);
                showBookDetails();
            }
        }
    });
}
function showReturnBook() {
    return __awaiter(this, void 0, void 0, function* () {
        HideAll();
        borrowHistoryElement.style.display = "block";
        let borrowHistoryList = yield fetchBorrowDetails();
        let tableElement = document.getElementById("borrow-table");
        tableElement.innerHTML = "";
        for (var i = 0; i < borrowHistoryList.length; i++) {
            if (borrowHistoryList[i].userID == CurrentLoggedInuser.userID && borrowHistoryList[i].status == "Borrowed") {
                let tableData = document.createElement("tr");
                tableData.innerHTML = `
            <td>${borrowHistoryList[i].borrowID}</td>
        <td>${borrowHistoryList[i].bookID}</td>
        <td>${borrowHistoryList[i].userID}</td>
        <td>${borrowHistoryList[i].borrowedDate.toString().substring(0, 10)}</td>
        <td>${borrowHistoryList[i].borrowBookCount}</td>
        <td>${borrowHistoryList[i].status}</td>
        <td>${borrowHistoryList[i].paidFineAmount}</td>
            <td><button onclick="returnBook('${borrowHistoryList[i].borrowID}')">Return</button></td>
                `;
                tableElement.appendChild(tableData);
            }
        }
    });
}
function returnBook(borrowID) {
    return __awaiter(this, void 0, void 0, function* () {
        const borrowDetailsList = yield fetchBorrowDetails();
        const borrowIndex = borrowDetailsList.findIndex((b) => b.borrowID == borrowID);
        const borrow = borrowDetailsList[borrowIndex];
        const returnDate = new Date(borrow.borrowedDate);
        let dayDiff = Math.ceil((new Date().getTime() - returnDate.getTime()) / (1000 * 3600 * 24));
        if (dayDiff > 15) {
            if (CurrentLoggedInuser.balance > dayDiff - 15) {
                CurrentLoggedInuser.balance -= dayDiff - 15;
                borrow.paidFineAmount = dayDiff - 15;
                const bookDetailsList = yield fetchBookDetails();
                const bookindex = bookDetailsList.findIndex((b) => b.bookID == borrow.bookID);
                const book = bookDetailsList[bookindex];
                book.bookCount += borrow.borrowBookCount;
                borrow.status = "Returned";
                updateBookDetail(book.bookID, book);
                updateBorrowDetail(borrow.borrowID, borrow);
                updateUser(CurrentLoggedInuser.userID, CurrentLoggedInuser);
            }
            else {
                alert('Insufficient balance');
            }
        }
    });
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
function addBook(book) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5004/api/BookDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        if (!response.ok) {
            throw new Error('Failed to add user');
        }
        // renderusers();
        showBookDetails();
    });
}
function addBorrowDetails(borrowDetails) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5004/api/BorrowDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(borrowDetails)
        });
        if (!response.ok) {
            throw new Error('Failed to add borrow Details');
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
function fetchBorrowDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5004/api/BorrowDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch Borrow Details');
        }
        return yield response.json();
    });
}
function fetchBookDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5004/api/BookDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch Book Details');
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
function updateBookDetail(bookID, book) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5004/api/BookDetails/${bookID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        if (!response.ok) {
            throw new Error('Failed to update book');
        }
        showBookDetails();
    });
}
function updateBorrowDetail(borrowID, borrow) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5004/api/BorrowDetails/${borrowID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(borrow)
        });
        if (!response.ok) {
            throw new Error('Failed to update borrow');
        }
    });
}
function Edit(id) {
    return __awaiter(this, void 0, void 0, function* () {
        editingId = id;
        const bookList = yield fetchBookDetails();
        const item = bookList.find((item) => item.bookID === id);
        if (item) {
            bookname.value = item.bookName;
            authorname.value = item.authorName;
            BookCount.value = String(item.bookCount);
        }
    });
}
editForm.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const name = bookname.value.trim();
    const author = authorname.value.trim();
    const count = parseInt(BookCount.value.trim());
    if (editingId !== null) {
        const bookList = yield fetchBookDetails();
        const index = bookList.findIndex((item) => item.bookID === editingId);
        bookList[index] = Object.assign(Object.assign({}, bookList[index]), { bookName: name, authorName: author, bookCount: count });
        updateBookDetail(bookList[index].bookID, bookList[index]);
        editingId = null;
    }
    else {
        const book = {
            bookID: 0,
            bookName: name,
            authorName: author,
            bookCount: count
        };
        addBook(book);
    }
    editForm.reset();
}));
