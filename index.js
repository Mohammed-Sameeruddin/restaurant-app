const menu = menuItems;

const tableDetails = tableData;

document.getElementById("para1").innerHTML = "Rs." + tableDetails.table1.totalPrice() + " " + "| " + tableDetails.table1.totalItems() + " items";
document.getElementById("para2").innerHTML = "Rs." + tableDetails.table2.totalPrice() + " " + "| " + tableDetails.table2.totalItems() + " items";
document.getElementById("para3").innerHTML = "Rs." + tableDetails.table3.totalPrice() + " " + "| " + tableDetails.table3.totalItems() + " items";
document.getElementById("para4").innerHTML = "Rs." + tableDetails.table4.totalPrice() + " " + "| " + tableDetails.table4.totalItems() + " items";

// Rendering the menu items
let menuId = 0;
const menuList = document.getElementsByClassName("menu-list");
for(var obj of menu){
    const node = document.getElementsByClassName("menu")[0];
    const clone = node.cloneNode(true);
    clone.childNodes[1].textContent = obj.name;
    clone.childNodes[3].textContent = obj.course;
    clone.childNodes[6].textContent = "Rs." + obj.price;
    clone.setAttribute("id",menuId++);

    menuList[0].appendChild(clone);
}
menuList[0].children[0].style.display = "none";


// search for menu
function searchMenu(){
    console.log("searching...");
    const searchInput = document.getElementById("search-menu");
    let filterValue = searchInput.value.toUpperCase();
    for(let i=0;i<menu.length;i++){
        if((menu[i].course.toUpperCase().indexOf(filterValue) > -1) || menu[i].name.toUpperCase().indexOf(filterValue) > -1 ){
            document.getElementById(i).style.display = "";
        }else {
            document.getElementById(i).style.display = "none";
        }
    }
}

// search for tables
function searchTable(){
    const searchInput = document.getElementById("search-table");
    let filterValue = searchInput.value.toUpperCase();
    const classTable = document.getElementsByClassName('table');
    for(let i=0;i<classTable.length;i++){
        let temp = classTable[i].getElementsByTagName("h2")[0];
        let content = temp.textContent;
        if(content.toUpperCase().indexOf(filterValue) > -1){
            classTable[i].style.display = "";
        }else {
            classTable[i].style.display = "none";
        }
    }
}

// open specific modal when clicked
function openModal(num){
    const modalHead = document.getElementById("table-num");
    modalHead.innerHTML = "Table " + num + " ";

    var modal = document.getElementById("myModal");

    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    const closeBill = document.getElementsByClassName('close-bill')[0];
    closeBill.setAttribute("id",num);
    closeBill.setAttribute("onclick","generateBill(event)");
    closeBill.style.cursor = "pointer";
    closeBill.style.textAlign = "right";
    console.log(closeBill);

    display(num);

    span.onclick = function() {
        modal.style.display = "none";
        window.location.reload();
    }

    window.onclick = function(event) {
        if (event.target == modal) {
             modal.style.display = "none";
             window.location.reload();
        }
       
    }
}

// closes the session and generate the bill 
function generateBill(event){
    const table = event.target.id;
    const tableName = "table" + table;
    const data = JSON.parse(localStorage.getItem(tableName));
    let totalPrice = 0;
    console.log("Item\tPrice\tQuantity\tTotal");
    let displayAlert = "Item - Price - Quantity - Total\n";
    for(let item of data){
        totalPrice = totalPrice + item.price * item.quantity;
        console.log(item.name + "\t" + item.price + "\t" + item.quantity + "\t" + (item.price*item.quantity));
        displayAlert = displayAlert + item.name + " - " + item.price + " - " + item.quantity + " - " + (item.price*item.quantity) + "\n";
    }
    console.log("Total Price:\t" + totalPrice);
    localStorage.removeItem(tableName);
    displayAlert = displayAlert + "Total Price: " + totalPrice +  "\n";
    alert(displayAlert);
    window.location.reload();
}


// displays the menu items ordered at specific table
function display(num){
    let totalPrice = 0;
    let tempArray = [];

    let tableNum = "table" + num;
    const tbody = document.getElementsByTagName("tbody");
    let j = 1;
    if(!localStorage.getItem(tableNum)){
        window.location.reload();
    }
    data = JSON.parse(localStorage.getItem(tableNum));
    totalItems = data.length;
    for(let obj of data){
        var inputNumber = document.createElement("input");
        inputNumber.setAttribute("type","number");
        inputNumber.setAttribute("class","quantity");
        inputNumber.setAttribute("min",1);
        inputNumber.setAttribute("id",""+num+j);
        inputNumber.setAttribute("oninput","updateQuantity(event)");


        const node = document.getElementById("row");
        const clone = node.cloneNode(true);
        clone.childNodes[1].textContent = j++;
        clone.childNodes[3].textContent = obj.name;
        clone.childNodes[5].textContent = obj.price;
        clone.childNodes[7].appendChild(inputNumber);
        clone.childNodes[9].childNodes[0].setAttribute("id","d"+num+(j-1));
        clone.childNodes[9].childNodes[0].setAttribute("onclick","deleteItem(event)");

        tbody[0].appendChild(clone);
        tempArray.push(obj.quantity);
        totalPrice = totalPrice + obj.quantity * obj.price;

        document.getElementById("total").innerHTML = "Total Rs." + totalPrice;
    }
    const inputArray = document.getElementsByClassName("quantity");
    for(let k=0;k<inputArray.length;k++){
        inputArray[k].value = tempArray[k];
    }
    
}


// deleting the item from the list of servings
function deleteItem(event){
    console.log(event.target.id);

    const table = event.target.id[1];
    const item = event.target.id[2];

    if(table == 1){
        const data = JSON.parse(localStorage.table1);
        const index = data.indexOf(data[item-1]);
        if(index > -1){
            data.splice(index,1);
        }
        localStorage.setItem("table1",JSON.stringify(data));
        document.getElementById("total").innerHTML = "Total Rs." + tableDetails.table1.totalPrice();

    }else if(table == 2){
        const data = JSON.parse(localStorage.table2);
        const index = data.indexOf(data[item-1]);
        if(index > -1){
            data.splice(index,1);
        }
        localStorage.setItem("table2",JSON.stringify(data)); 
        document.getElementById("total").innerHTML = "Total Rs." + tableDetails.table1.totalPrice();

    }else if(table == 3){
        const data = JSON.parse(localStorage.table3);
        const index = data.indexOf(data[item-1]);
        if(index > -1){
            data.splice(index,1);
        }
        localStorage.setItem("table3",JSON.stringify(data));
        document.getElementById("total").innerHTML = "Total Rs." + tableDetails.table1.totalPrice();

    }else if(table == 4){
        const data = JSON.parse(localStorage.table4);
        const index = data.indexOf(data[item-1]);
        if(index > -1){
            data.splice(index,1);
        }
        localStorage.setItem("table4",JSON.stringify(data));
        document.getElementById("total").innerHTML = "Total Rs." + tableDetails.table1.totalPrice();

    }

    window.location.reload();
}


// updating the quantity of an item at particular table
function updateQuantity(event){
    const num = event.target.id[1];

    if(event.target.id[0] == 1){
        const data = JSON.parse(localStorage.table1);
        data[num-1].quantity = event.target.value;
        localStorage.setItem("table1",JSON.stringify(data));
        document.getElementById("total").innerHTML = "Total Rs." + tableDetails.table1.totalPrice();
    }else if(event.target.id[0] == 2){
        const data = JSON.parse(localStorage.table2);
        data[num-1].quantity = event.target.value;
        localStorage.setItem("table2",JSON.stringify(data));
        document.getElementById("total").innerHTML = "Total Rs." + tableDetails.table2.totalPrice();
    }else if(event.target.id[0] == 3){
        const data = JSON.parse(localStorage.table3);
        data[num-1].quantity = event.target.value;
        localStorage.setItem("table3",JSON.stringify(data));
        document.getElementById("total").innerHTML = "Total Rs." + tableDetails.table3.totalPrice();
    }else if(event.target.id[0] == 4){
        const data = JSON.parse(localStorage.table4);
        data[num-1].quantity = event.target.value;
        localStorage.setItem("table4",JSON.stringify(data));
        document.getElementById("total").innerHTML = "Total Rs." + tableDetails.table4.totalPrice();
    }
}


// functionality for dragging and dropping
function drag(event) {
    event.dataTransfer.setData("text",event.target.id);
    console.log("dragging");
}

function onDragOver(event) {
    event.preventDefault();
    console.log("on drag over");
}

function onDrop(event,num) {
    const targetId = event.dataTransfer.getData("text");

    if(num === 1){
        if(!localStorage.getItem("table1")){
            localStorage.setItem("table1",'[]');
        }
        let oldData = JSON.parse(localStorage.getItem("table1"));
        for(let i=0;i<oldData.length;i++){
            if(oldData[i].name === menu[targetId].name){
               oldData[i].quantity = parseInt(oldData[i].quantity) + 1;
                localStorage.setItem("table1",JSON.stringify(oldData));
                window.location.reload();
                return;
            }
        }
        oldData.push(menu[targetId]);
        localStorage.setItem("table1",JSON.stringify(oldData));
    }else if(num === 2){
        if(!localStorage.getItem("table2")){
            localStorage.setItem("table2",'[]');
        }
        let oldData = JSON.parse(localStorage.getItem("table2"));
        for(let i=0;i<oldData.length;i++){
            if(oldData[i].name === menu[targetId].name){
               oldData[i].quantity = parseInt(oldData[i].quantity) + 1;
                localStorage.setItem("table2",JSON.stringify(oldData));
                window.location.reload();
                return;
            }
        }
        oldData.push(menu[targetId]);
        localStorage.setItem("table2",JSON.stringify(oldData));
    }else if(num === 3){
        if(!localStorage.getItem("table3")){
            localStorage.setItem("table3",'[]');
        }
        let oldData = JSON.parse(localStorage.getItem("table3"));
        for(let i=0;i<oldData.length;i++){
            if(oldData[i].name === menu[targetId].name){
               oldData[i].quantity = parseInt(oldData[i].quantity) + 1;
                localStorage.setItem("table3",JSON.stringify(oldData));
                window.location.reload();
                return;
            }
        }
        oldData.push(menu[targetId]);
        localStorage.setItem("table3",JSON.stringify(oldData));
    }else if(num === 4){
        if(!localStorage.getItem("table4")){
            localStorage.setItem("table4",'[]');
        }
        let oldData = JSON.parse(localStorage.getItem("table4"));
        for(let i=0;i<oldData.length;i++){
            if(oldData[i].name === menu[targetId].name){
               oldData[i].quantity = parseInt(oldData[i].quantity) + 1;
                localStorage.setItem("table4",JSON.stringify(oldData));
                window.location.reload();
                return;
            }
        }
        oldData.push(menu[targetId]);
        localStorage.setItem("table4",JSON.stringify(oldData));
    }
    window.location.reload();
}

