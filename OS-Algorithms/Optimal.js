

function setCapacity() {
    localStorage.clear();
    let capacity = document.querySelector('#capacity').value;
    localStorage.setItem("capacity", capacity);
    localStorage.setItem('counter',0);
    let temp = [];
    for (let index = 0; index < capacity; index++) {
        temp.push(-1);
    }
    temp.push("Fault");
    localStorage.setItem('frames',JSON.stringify([temp]));
    localStorage.setItem('status',JSON.stringify([]));
    console.log("capacity: ", capacity);
}




function isEmpty(arr){
    let flag = -1;
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if(element == -1){
            flag = index;
            break;
        }
    }
    return flag;
}


function Optimal(){
    let arr = JSON.parse(localStorage.getItem('frames'));
    console.log("at first",arr);
    console.log("button clicked");
    let inp = document.createElement('input');
    let totalProcess = document.querySelector('#total-process').value;
    let processInput = document.querySelector('#process-input');
    console.log("before for loop");
    console.log( "total processes", totalProcess);

    let collection = [];
    for (let i = 0; i  < totalProcess; i++) {
        let temp = document.createElement('input');
        temp.setAttribute('type', 'number');
        temp.setAttribute('placeholder', `process${i+1}`);
        temp.setAttribute('id',`id${i+1}`);
        // collection.push(temp);
        processInput.appendChild(temp);
        console.log("id ", temp.getAttribute('id'));
    }
    console.log("inside Optimal funciton:",collection);
    localStorage.setItem('collection', JSON.stringify(collection));

    console.log("at first",arr);
}
function craft(){

    let capacity = Number(localStorage.getItem('capacity'));
    let temparr = []; // Changed variable name from arr to temparr
    console.log("tempArr", temparr);
    let temp = [];
    for (let index = 0; index < capacity; index++) {
        temp.push(-1);
    }
    temparr.pop();
    console.log("temparr ", temparr); // Updated variable name
    temp.push("Fault");
    console.log(temp);
    temparr.push(temp); // Updated variable name
    console.log("at first", temparr); // Updated variable name
    // let collection = JSON.parse(localStorage.getItem('collection'));
    let collection =[];
    let totalProcess = document.querySelector('#total-process').value;
    for(let i = 0; i<totalProcess;i++){
        collection.push(document.querySelector(`#id${i+1}`).value);
    }
    console.log(collection.length);
    console.log(collection);
    for(let i =0;i<collection.length; i++){
        let ele = collection[i];
        
        let key = ele;
        let lastArr = temparr[temparr.length -1 ]; // Updated variable name
        let flag = -1;
        console.log(lastArr);
        lastArr.forEach((el,ind) => {
            if(el == key && flag == -1){
                flag=i;
            }
        });
        if(flag < 0 ){
            let findEmpty = isEmpty(lastArr);
            if(findEmpty == -1){
                let hash = lastArr;
                for (let j = i+1; j < collection.length; j++) {
                    let a = collection[j];
                    hash = hash.filter(item => item!=a);
                    if(hash.length ==1){
                        break;
                    }
                }
                lastArr[lastArr.indexOf(hash[0])] = key;
                console.log("inside findEmpty == -1 condition");
            }
            else{
                console.log("inside first elese condition");
                lastArr[findEmpty] = key;
            }
            lastArr[lastArr.length-1]="Fault";
        }
        else{
            console.log("inside second elese condition");
            lastArr[lastArr.length-1]="Hit";
        }
        // console.log("out side all condition ",lastArr);
        temparr.push(lastArr); // Updated variable name

        console.log("at collection number",i,temparr); // Updated variable name
    }
    console.log("at last",temparr); // Updated variable name
    // console.log("out side all condition");
    // console.log(temparr);
    localStorage.setItem('frames',JSON.stringify(temparr));
    
    createTable();
}




// 2D Array
  
  // Function to create HTML table from 2D array
  function createTable() {
    let data = JSON.parse(localStorage.getItem('frames'));
    let status = JSON.parse(localStorage.getItem('status'));
    console.log(data);
    let table = document.createElement('table');
    let tbody = document.createElement('tbody');

    // inserting headings to the table
    let headings = document.createElement('tr');
    for (let i = 0; i < capacity; i++) {
        let h = document.createElement('th');
        h.textContent = `frame${i+1}`;
        headings.appendChild(h);
    }
    tbody.appendChild(headings);

    // Iterate over rows in the array
    data.forEach(rowData => {
      let row = document.createElement('tr');
  
      // Iterate over cells in the row
      rowData.forEach(cellData => {
        let cell = document.createElement('td');
        cell.textContent = cellData;
        row.appendChild(cell);
      });
  
      tbody.appendChild(row);
    });
    tbody.removeChild(tbody.lastChild);
    table.appendChild(tbody);
    // Get table container element
    let tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = '<h2>OPTIMAL cache</h2>';
    tableContainer.appendChild(table);
    // return table;
  }
  
  
//   Create table and append to container
//   let table = createTable(data);
  