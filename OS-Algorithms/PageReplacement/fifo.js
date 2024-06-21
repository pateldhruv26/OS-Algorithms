function getTotalRecords() {
    const keys = Object.keys(localStorage);

    const totalRecords = keys.length;
    return totalRecords;
}


function setCapacity() {
    localStorage.clear();
    localStorage.setItem("arr", JSON.stringify([]));
    let capacity = document.querySelector('#capacity').value;
    localStorage.setItem("capacity", capacity);
    localStorage.setItem('counter', 0);
    let temp = [];
    for (let index = 0; index < capacity; index++) {
        temp.push(-1);
    }
    temp.push("Fault");
    localStorage.setItem('frames', JSON.stringify([temp]));
    localStorage.setItem('status', JSON.stringify([]));
}


function isEmpty(arr) {
    let flag = -1;
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (element == -1) {
            flag = index;
            break;
        }
    }
    return flag;
}


function fifo() {
    let key = document.querySelector('#page-number').value;
    let capacity = Number(localStorage.getItem('capacity'));
    let arr = JSON.parse(localStorage.getItem('frames'));
    let lastArr = arr[arr.length - 1];
    let counter = Number(localStorage.getItem('counter'));
    let flag = -1;
    lastArr.forEach((ele, i) => {
        if (ele == key && flag == -1) {
            flag = i;
        }
    });

    if (flag < 0) {
        lastArr[counter % capacity] = key;
        counter++;

        lastArr[lastArr.length - 1] = "Fault";
    }
    else {
        lastArr[lastArr.length - 1] = "Hit";
    }

    arr.push(lastArr);
    document.querySelector('#display').innerHTML = (JSON.stringify(lastArr));
    localStorage.setItem('counter', counter);
    localStorage.setItem('frames', JSON.stringify(arr));


    createTable();
}


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
        h.textContent = `frame${i + 1}`;
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
    let tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = '<h2>FIFO cache</h2>';
    tableContainer.appendChild(table);
}