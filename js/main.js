/*
List To Do ....
1- add product ++ Done
2- check empty inputs ++ Done
3- display data ++ Done
4- data storage ++ Done
5- clear inputs ++ Done
6- delete product ++ Done
7- update product ++ Done
8- search in products ++ Done
*/

// ==================== vars ==================== //
let requiredAllFieldsMsg = document.getElementById("FillMESSAGE");

// CRUD side

// ++++++ CRUD INPUTS ++++++ //
let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let unit = document.getElementById("unit");
let description = document.getElementById("description");

// ++++++ CRUD BUTTONS ++++++ //
let submitBtn = document.getElementById("addBtn");
let clearInputsBtn = document.getElementById("clearBtn");

// DISPLAY DATA side
let searchInput = document.getElementById("search");
let tableBody = document.getElementById("tbody");

// ================ get storage ================ //
let arrayOfProducts;

if(localStorage.getItem("productsStrg") == null){
    arrayOfProducts = [];
}else{
    arrayOfProducts = JSON.parse(localStorage.getItem("productsStrg"));
    displayData();
}

// ========== click on addbtn & save in storage ========== //

submitBtn.addEventListener("click",function(){
    if(submitBtn.innerHTML == "Add Product" ){
        addProducts()
    }
    else{
        editRow()
    }
});

function addProducts(){
    
    if(checkEmptyInputs() != true){
        var product = {
            productName : productName.value,
            productPrice : productPrice.value,
            productUnit : unit.value,
            productDes : description.value
        };
    
        arrayOfProducts.push(product);
        localStorage.setItem("productsStrg",JSON.stringify(arrayOfProducts));
        displayData();
        clearInputs();
    }else{
        requiredAllFieldsMsg.classList.remove("d-none")
        alertMsg()
    }

};

// ================  check empty inputs ================  //

function checkEmptyInputs(){
    if(productName.value=="" || productPrice.value=="" || unit.value=="" || description.value==""){
        return true
    }else{
        return false
    }
};

// ======== for loop on inputs to alert alertMsg ============ //
let allAlertMsg = document.getElementsByClassName("alert");
let allInputs = document.getElementsByClassName("crudInput");

function alertMsg(){

    for(var i=0;i<allInputs.length;i++){

        if(allInputs[i].value != ""){
            allAlertMsg[i].innerHTML= "Done"
            allAlertMsg[i].classList.add("alert-success")
            allAlertMsg[i].classList.remove("d-none")
        }else{
            allAlertMsg[i].innerHTML= "Please Enter The Product Name"
            allAlertMsg[i].classList.add("alert-danger")
            allAlertMsg[i].classList.remove("d-none")
        }
    }
};

// ================ display data in table ================ //

function displayData(){
    box = "";
    for(var i=0;i<arrayOfProducts.length;i++){
        box += `<tr>
        <td>${i+1}</td>
        <td>${arrayOfProducts[i].productName}</td>
        <td>${arrayOfProducts[i].productPrice}</td>
        <td>${arrayOfProducts[i].productUnit}</td>
        <td>${arrayOfProducts[i].productDes}</td>
        <td><button onclick=getDataFromRow(${i}) class="btn btn-warning"><i class="far fa-edit"></i></button></td>
        <td><button onclick=deleteRow(${i}) class="btn btn-danger"><i class="fas fa-trash-alt"></i></button></td>
        </tr>
        `
    };
    tableBody.innerHTML = box ;
};

// ================ search ================ //

searchInput.addEventListener("keyup",function(){
    searchInData()
})

function searchInData(){

    box = "";
    for(var i=0;i<arrayOfProducts.length;i++){
        if(arrayOfProducts[i].productName.toLowerCase().includes(searchInput.value.toLowerCase()) == true){
            box += `<tr>
            <td>${i+1}</td>
            <td>${arrayOfProducts[i].productName}</td>
            <td>${arrayOfProducts[i].productPrice}</td>
            <td>${arrayOfProducts[i].productUnit}</td>
            <td>${arrayOfProducts[i].productDes}</td>
            <td><button onclick=getDataFromRow(${i}) class="btn btn-warning"><i class="far fa-edit"></i></button></td>
            <td><button onclick=deleteRow(${i}) class="btn btn-danger"><i class="fas fa-trash-alt"></i></button></td>
            </tr>
            `
        }
    };
    tableBody.innerHTML = box ;
};

// ================ delete data ================ //

function deleteRow(indexOfRow){
    arrayOfProducts.splice(`${indexOfRow}`,1);
    localStorage.setItem("productsStrg",JSON.stringify(arrayOfProducts));
    displayData();
}

// ================ get Data ================ //

function getDataFromRow(indexOfRow){
    submitBtn.innerHTML = "Edit Product"
    submitBtn.classList.replace("btn-primary","btn-warning")

    let currentRow = arrayOfProducts[indexOfRow];

    productName.value = currentRow.productName;
    productPrice.value = currentRow.productPrice ;
    unit.value = currentRow.productUnit ;
    description.value = currentRow.productDes;    

    currentIndexForEditRow = indexOfRow
};

// ================ edit ================ //
var currentIndexForEditRow;

function editRow(){
    var product = {
        productName : productName.value,
        productPrice : productPrice.value,
        productUnit : unit.value,
        productDes : description.value
    }

    arrayOfProducts[currentIndexForEditRow] = product
    localStorage.setItem("productsStrg",JSON.stringify(arrayOfProducts));
    displayData();
    clearInputs();
};

// ================ clear inputs ================ //

function clearInputs(){
    productName.value = "";
    productPrice.value = "";
    unit.value = "";
    description.value = "";
};

clearInputsBtn.addEventListener("click",function(){
    clearInputs()
});

