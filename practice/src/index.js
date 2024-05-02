var UserIdAutoIncrement = 1000;
var MedicineIdAutoIncrement = 10;
var OrderIdAutoIncrement = 100;
var User = /** @class */ (function () {
    function User(paramUserName, paramUserAge, paramUserPhoneNumber) {
        UserIdAutoIncrement++;
        this.UserId = "UI" + UserIdAutoIncrement.toString();
        this.UserName = paramUserName;
        this.UserAge = paramUserAge;
        this.UserPhoneNumber = paramUserPhoneNumber;
    }
    return User;
}());
var MedicineDetails = /** @class */ (function () {
    function MedicineDetails(paramMedicineName, paramMedicineCount, paramMedicinePrice) {
        MedicineIdAutoIncrement++;
        this.MedicineId = "MD" + MedicineIdAutoIncrement.toString();
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.MedicinePrice = paramMedicinePrice;
    }
    return MedicineDetails;
}());
var Order = /** @class */ (function () {
    function Order(paramMedicineId, paramUserId, paramMedicineName, paramMedicineCount) {
        OrderIdAutoIncrement++;
        this.OrderId = "OI" + OrderIdAutoIncrement.toString();
        this.MedicineId = paramMedicineId;
        this.UserId = paramUserId;
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
    }
    return Order;
}());
var UserArrayList = new Array();
var MedicineList = new Array();
MedicineList.push(new MedicineDetails("Paracetomol", 5, 50));
MedicineList.push(new MedicineDetails("Colpal", 5, 60));
MedicineList.push(new MedicineDetails("Stepsil", 5, 70));
MedicineList.push(new MedicineDetails("Iodex", 5, 80));
MedicineList.push(new MedicineDetails("Acetherol", 5, 100));
var OrderList = new Array();
function newUserPage() {
    var homePage = document.getElementById('homePage');
    var newUserPage = document.getElementById('newUserPage');
    homePage.style.display = "none";
    newUserPage.style.display = "block";
}
