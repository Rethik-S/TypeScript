interface User {
    userID: number;
    name: string;
    email: string;
    gender: string;
    department: string;
    phone: string;
    password: string;
    balance: number;
}

interface BorrowDetails {
    borrowID: number;
    bookID: number;
    userID: number;
    borrowedDate: Date;
    borrowBookCount: number;
    status: string;
    paidFineAmount: number;
}

interface BookDetails {
    bookID: number;
    bookName: string;
    authorName: string;
    bookCount: number;
}

let editingId: number | null = null;
let CurrentLoggedInuser: User;
let currentBookID: number;

const form = document.getElementById("signupform") as HTMLFormElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const phoneInput = document.getElementById("phone") as HTMLInputElement;
const passwordInput = document.getElementById("signuppassword") as HTMLInputElement;
const departmentInput = document.getElementById("department") as HTMLInputElement;
const loginPasswordInput = document.getElementById("password") as HTMLInputElement;
const signInEmailInput = document.getElementById("signInEmail") as HTMLInputElement;
const signUpEmailInput = document.getElementById("signUpEmail") as HTMLInputElement;
const loginForm = document.getElementById("signInForm") as HTMLFormElement;
const signUpElement = document.getElementById("signUp") as HTMLDivElement;
const existingUserElement = document.getElementById("existingUser") as HTMLDivElement;
const signSwitchElement = document.getElementById("signSwitch") as HTMLDivElement;
const wrapperElement = document.getElementById("wrapper") as HTMLDivElement;
const homePage = document.getElementById("homePage") as HTMLDivElement;
const greeting = document.getElementById("greeting") as HTMLHeadingElement;
const maleInput = document.getElementById("male") as HTMLInputElement
const femaleInput = document.getElementById("female") as HTMLInputElement
const invalidLogin = document.getElementById("invalidLogin") as HTMLSpanElement;
const updateBalanceElement = document.getElementById("updateBalance") as HTMLDivElement;
const showBalanceElement = document.getElementById("showBalance") as HTMLDivElement;
const borrowHistoryElement = document.getElementById("borrowHistory") as HTMLDivElement;
const bookDetailsElement = document.getElementById("bookDetails") as HTMLDivElement;
const quantityElement = document.getElementById("quantity-container") as HTMLDivElement;
const bookname = document.getElementById("bookname") as HTMLInputElement;
const authorname = document.getElementById("authorname") as HTMLInputElement;
const BookCount = document.getElementById("BookCount") as HTMLInputElement;
const editForm = document.getElementById("editBookForm") as HTMLFormElement;

//error
const balanceError = document.getElementById("balanceError") as HTMLSpanElement
const bookingError = document.getElementById("bookingError") as HTMLSpanElement

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
    const user: User = {
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
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = signInEmailInput.value.trim();
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
        balanceError.style.display = "block";

        balanceError.innerHTML = 'Enter a valid amount';
    }

}
function showBalance() {
    HideAll();

    showBalanceElement.style.display = "block";

    (document.getElementById("balance-message") as HTMLParagraphElement).innerHTML = `your balance is ${CurrentLoggedInuser.balance}`;

}

async function borrowHistory() {
    HideAll();

    borrowHistoryElement.style.display = "block";
    const borrowHistoryList = await fetchBorrowDetails();

    let tableElement = document.getElementById("borrow-table") as HTMLDivElement;
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
}

async function showBookDetails() {
    HideAll();

    bookDetailsElement.style.display = "block";
    const bookDetailsList = await fetchBookDetails();

    let tableElement = document.getElementById("book-table") as HTMLDivElement;
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
}
async function purchase() {

    HideAll();
    bookDetailsElement.style.display = "block";
    const bookDetailsList = await fetchBookDetails();

    let tableElement = document.getElementById("book-table") as HTMLDivElement;
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
}

function setGlobal(id: number) {
    currentBookID = id;
    HideAll();

    quantityElement.style.display = "block";
}

function setQuantity() {
    let quantity = parseInt((document.getElementById("quantity") as HTMLInputElement).value);
    Book(quantity)
}
async function Book(quantity: number) {

    const bookDetailsList = await fetchBookDetails();
    const borrowDetailsList = await fetchBorrowDetails();

    const bookindex = bookDetailsList.findIndex((b) => b.bookID == currentBookID);

    const book = bookDetailsList[bookindex];
    if (!(quantity > 0 && book.bookCount > 0 && quantity <= book.bookCount)) {


        //display book availabilty
        const borrowindex = borrowDetailsList.findIndex((b) => b.bookID == currentBookID);
        const bookAvailability = borrowDetailsList[borrowindex];
        const tempDate = new Date(bookAvailability.borrowedDate);
        tempDate.setDate(tempDate.getDate() + 15)

        showBookDetails();
        bookingError.style.display = "block";
        bookingError.innerHTML = `Books are not available for the selected count.\nThe book will be available on ${tempDate}`;

        return;
    }
    else {
        let totalBorrows: number = 0;
        borrowDetailsList.forEach((b) => {
            if (CurrentLoggedInuser.userID == b.userID) {
                if (b.status == "Borrowed") {
                    totalBorrows += b.borrowBookCount;
                }
            }
        })

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
            const borrowDetails: BorrowDetails = {
                borrowID: 0,
                bookID: book.bookID,
                userID: CurrentLoggedInuser.userID,
                borrowedDate: new Date(),
                borrowBookCount: quantity,
                status: "Borrowed",
                paidFineAmount: 0
            }

            //Add borrowed book details to books list
            addBorrowDetails(borrowDetails);
            //returning the book count
            book.bookCount -= quantity;
            updateBookDetail(currentBookID, book);
            showBookDetails();
        }
    }
}
async function showReturnBook() {
    HideAll();

    borrowHistoryElement.style.display = "block";
    let borrowHistoryList = await fetchBorrowDetails();
    let tableElement = document.getElementById("borrow-table") as HTMLDivElement;
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
}
async function returnBook(borrowID: number) {
    const borrowDetailsList = await fetchBorrowDetails();

    const borrowIndex = borrowDetailsList.findIndex((b) => b.borrowID == borrowID)

    const borrow = borrowDetailsList[borrowIndex];

    const returnDate = new Date(borrow.borrowedDate);


    let dayDiff = Math.ceil((new Date().getTime() - returnDate.getTime()) / (1000 * 3600 * 24));
    if (dayDiff > 15) {
        if (CurrentLoggedInuser.balance > dayDiff - 15) {
            CurrentLoggedInuser.balance -= dayDiff - 15;
            borrow.paidFineAmount = dayDiff - 15;
            
            const bookDetailsList = await fetchBookDetails();
            
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

}



async function addUser(user: User): Promise<void> {
    const response = await fetch('http://localhost:5004/api/Users', {
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
}
async function addBook(book: BookDetails): Promise<void> {
    const response = await fetch('http://localhost:5004/api/BookDetails', {
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
}
async function addBorrowDetails(borrowDetails: BorrowDetails): Promise<void> {
    const response = await fetch('http://localhost:5004/api/BorrowDetails', {
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
}
async function fetchUser(): Promise<User[]> {
    const apiUrl = 'http://localhost:5004/api/Users';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return await response.json();
}
async function fetchBorrowDetails(): Promise<BorrowDetails[]> {
    const apiUrl = 'http://localhost:5004/api/BorrowDetails';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch Borrow Details');
    }
    return await response.json();
}
async function fetchBookDetails(): Promise<BookDetails[]> {
    const apiUrl = 'http://localhost:5004/api/BookDetails';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch Book Details');
    }
    return await response.json();
}
async function updateUser(userID: number, user: User): Promise<void> {
    const response = await fetch(`http://localhost:5004/api/Users/${userID}`, {
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
async function updateBookDetail(bookID: number, book: BookDetails): Promise<void> {
    const response = await fetch(`http://localhost:5004/api/BookDetails/${bookID}`, {
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
}
async function updateBorrowDetail(borrowID: number, borrow: BorrowDetails): Promise<void> {
    const response = await fetch(`http://localhost:5004/api/BorrowDetails/${borrowID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(borrow)
    });
    if (!response.ok) {
        throw new Error('Failed to update borrow');
    }
}


async function Edit(id: number) {


    editingId = id;
    const bookList = await fetchBookDetails();
    const item = bookList.find((item) => item.bookID === id);
    if (item) {
        bookname.value = item.bookName;
        authorname.value = item.authorName;
        BookCount.value = String(item.bookCount);

    }
}

editForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = bookname.value.trim();
    const author = authorname.value.trim();
    const count = parseInt(BookCount.value.trim());
    if (editingId !== null) {
        const bookList = await fetchBookDetails();
        const index = bookList.findIndex((item) => item.bookID === editingId);

        bookList[index] = { ...bookList[index], bookName: name, authorName: author, bookCount: count };
        updateBookDetail(bookList[index].bookID, bookList[index])

        editingId = null;
    } else {
        const book: BookDetails = {
            bookID: 0,
            bookName: name,
            authorName: author,
            bookCount: count
        };

        addBook(book);
    }

    editForm.reset();

});