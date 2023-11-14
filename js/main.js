let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
 
let add = "create";
let tmp;

 //console.log(title, price, taxes, ads, discount, total, count, search, category, submit);

//get total
function getTotal() {
   // console.log('done');
   if(price.value != ''){
    let result = (+price.value + +taxes.value + +ads.value) 
     - (+discount.value);

     //لو عاوزين نسبة discount ثابته 
    //     // القيم
    //     let priceValue = +price.value;
    //     let taxesValue = +taxes.value;
    //     let adsValue = +ads.value;
        
    //     // حساب الخصم
    // let discountPercentage = 0.1; // 10٪
    // let totalWithoutDiscount = priceValue + taxesValue + adsValue;
    // let discountAmount = totalWithoutDiscount * discountPercentage;
  
    // // القيمة الإجمالية بعد الخصم
    // let result = totalWithoutDiscount - discountAmount;
    
    total.innerHTML = result;
    total.style.background = '#040';
   } else{
    total.innerHTML='';
    total.style.background = '#a00d02'
   }
}
 

//create product


let dataPro;

    if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}

submit.onclick = function(){
    let newPro = {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value.toLowerCase(),
    }

    //Count
if (title.value != '' && price.value != '' && category.value !='') {
    if (add === 'create'){
    if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++){
        dataPro.push(newPro);
    } 
    } else { 
          dataPro.push(newPro);
    }
        }
      else {
    dataPro[tmp] = newPro;
    add = 'create';
    submit.innerHTML = 'CREATE';
    count.style.display = 'block';
         }
   //save LocalStorage
    localStorage.setItem('product', JSON.stringify(dataPro));
  //  console.log(dataPro);

showData();
clearData();
} else {
    alert("Please Insert Title, Price in numbers(0,1,2,3,4,5,6,7,8,9) and Category");
}
} 


// Clear Inputs
function clearData(){
     title.value = '';
     price.value = '';
     taxes.value = '';
     ads.value = '';
     discount.value = '';
     total.innerHTML ='';
     count.value = '';
     category.value ='';
}

//Read
function showData()
{
    getTotal();
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
    if (dataPro[i]){ 
           //const table = dataPro[i];
        table += `
        <tr>
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].count}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick="updateData( ${i} )" id="update">UPDATE</button></td>
    <td><button onclick="deleteData( ${i} )" id="delete">DELETE</button></td>
</tr>
`;
}   
    }
    document.getElementById('tbody').innerHTML = table;

    //لإضافة زرار الديليت لكل حاجة لو في بيانات
    let btnDelete = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()" >
        DELETE ALL THE TABLE
        (${dataPro.length})
        </button>
        `
    } else {
        btnDelete.innerHTML = '';
    }
}
showData();

//Delete one item array
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}


// Delete all table
function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    
    // تحديث الجدول بعد حذف العناصر
    showData();
}



//Update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = "UPDATE";
    add = "update";
    tmp = i;

    //علشان يطلع لفوق بعد ما يعمل أبديت لوحده
    scroll({
        top:0,
        behavior: 'smooth',
    });
}
//Search

let searchMood = 'title';
function getSearchMood(id) {
    let search = document.getElementById('search');   
     if (id == 'searchTitle') {
        searchMood = 'title';
        search.style.background = '#a00d02';
       // console.log(getSearchMood);
    } else {
        searchMood = 'category';
   }
   search.placeholder = 'Search By ' + searchMood + ' ...';
   search.focus();
search.value = '';
showData();
}

function searchData(value) 
{
   // console.log(value);
   let table = '';
   for (let i = 0; i < dataPro.length; i++) 
   {
       if (searchMood == 'title')  { 

        if (dataPro[i].title.includes(value.toLowerCase()))   {
            
           // console.log(i);
           table += `
           <tr>
       <td>${i}</td>
       <td>${dataPro[i].title}</td>
       <td>${dataPro[i].price}</td>
       <td>${dataPro[i].taxes}</td>
       <td>${dataPro[i].ads}</td>
       <td>${dataPro[i].discount}</td>
       <td>${dataPro[i].total}</td>
       <td>${dataPro[i].count}</td>
       <td>${dataPro[i].category}</td>
       <td><button onclick="updateData( ${i} )" id="update">UPDATE</button></td>
       <td><button onclick="deleteData( ${i} )" id="delete">DELETE</button></td>
   </tr>
   `;
        }        
       } 
           else {
        
         if (dataPro[i].category.includes(value)) 
         {
             
            // console.log(i);
            table += `
            <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].count}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData( ${i} )" id="update">UPDATE</button></td>
        <td><button onclick="deleteData( ${i} )" id="delete">DELETE</button></td>
    </tr>
    `;
         
        }       
    }
}
document.getElementById('tbody').innerHTML = table;
}


