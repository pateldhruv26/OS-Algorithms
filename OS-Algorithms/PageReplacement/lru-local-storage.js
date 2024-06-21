function getTotalRecords() {
    // Get all keys from localStorage
    const keys = Object.keys(localStorage);

    const totalRecords = keys.length;
    return totalRecords;
}


function setCapacity() {
    localStorage.clear();
    localStorage.setItem("arr", JSON.stringify([]));
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


function lru(){
    console.log("hello");
    let key = document.querySelector('#page-number').value;
    console.log(key);
    let capacity  = Number(localStorage.getItem('capacity'));
    let array = JSON.parse(localStorage.getItem('frames'));
    let counter = array.length-1;
    let flag = -1;
    let lastArr = array[counter];
    let status = JSON.parse(localStorage.getItem('status'));
    lastArr.forEach((ele,i) => {
        if(ele == key && flag == -1){
            flag=i;
        }
    });
    if(flag < 0 ){
        let findEmpty = isEmpty(lastArr);
        if(findEmpty == -1){
            let valueArr=[];
            for (let index = 0; index < capacity; index++) {
                let element = lastArr[index];
                element = Number(localStorage.getItem(element));
                valueArr.push(element);
            }
            let mnInd=0;
            for (let i = 0; i < capacity; i++) {
                if(valueArr[i]<valueArr[mnInd]){
                    mnInd=i;
                }
            }
            localStorage.removeItem(lastArr[mnInd]);
            lastArr[mnInd] = key;
        }
        else{
            lastArr[findEmpty] = key;
        }
        lastArr[lastArr.length-1]="Fault";
        status.push("Fault");
    }
    else{
        status.push("Hit");
        lastArr[lastArr.length-1]="Hit";
    }
    
    console.log(lastArr);
    console.log(status);
    document.querySelector('#display').innerHTML = (JSON.stringify(lastArr));
    array.push(lastArr);
    localStorage.setItem("frames",JSON.stringify(array));
    localStorage.setItem('status',JSON.stringify(status));
    localStorage.setItem(key,counter+1);
    console.log("funtion over");
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
    tableContainer.innerHTML = '<h2>LRU cache</h2>';
    tableContainer.appendChild(table);
    // return table;
  }
  
  