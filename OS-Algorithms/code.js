function columnTable(ch, tableName, tableId, divId) {

  var resource = document.getElementById("numResource").value;

  var myTableDiv = document.getElementById(divId);
 
  var title = document.createElement('P');
  title.appendChild(document.createTextNode(tableName));
  myTableDiv.appendChild(title);

  var table = document.createElement('TABLE');
  table.id = tableId;

  var tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);

  for (let i = 1; i <= resource; i++) {
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);

    var td = document.createElement('TD');

    td.appendChild(document.createTextNode("Resource " + String.fromCharCode("A".charCodeAt(0) + (i - 1))));
    tr.appendChild(td);

    var td = document.createElement('TD');
    var input = document.createElement("input");
    input.type = "text";
    input.id = ch + i;
    td.appendChild(input);

    tr.appendChild(td);
  }

  myTableDiv.appendChild(table);
}

function gridTable(ch, tableName, tableId, divId) {

  var process = document.getElementById("numProcess").value;
  var resource = document.getElementById("numResource").value;

  var myTableDiv = document.getElementById(divId);

  var title = document.createElement('P');
  title.appendChild(document.createTextNode(tableName));
  myTableDiv.appendChild(title);

  var table = document.createElement('TABLE');
  table.id = tableId;

  var tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);

  for (let i = 0; i <= process; i++) {
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);

    for (let j = 0; j <= resource; j++) {
      var td = document.createElement('TD');

      if (i == 0 && j == 0) {
        td.appendChild(document.createTextNode("Resource /\nProcess"));
      }
      else if (i == 0) {
        td.appendChild(document.createTextNode(String.fromCharCode("A".charCodeAt(0) + (j - 1))));
      }
      else if (j == 0) {
        td.appendChild(document.createTextNode("Process " + i));
      }
      else {
        var input = document.createElement("input");
        input.type = "text";
        input.id = ch + i + j;
        td.appendChild(input);
      }
      tr.appendChild(td);
    }
  }
  myTableDiv.appendChild(table);
}

function safeSequenceTable(ch, tableName, tableId, divId) {

  var process = document.getElementById("numProcess").value;

  var myTableDiv = document.getElementById(divId);

  var title = document.createElement('P');
  title.appendChild(document.createTextNode(tableName));
  myTableDiv.appendChild(title);

  var table = document.createElement('TABLE');
  table.id = tableId;

  var tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);

  var tr = document.createElement('TR');
  tableBody.appendChild(tr);

  for (let i = 1; i <= process; i++) {

    var td = document.createElement('TD');

    var input = document.createElement("input");
    input.type = "text";
    input.id = ch + i;
    td.appendChild(input);

    tr.appendChild(td);
  }

  myTableDiv.appendChild(table);
}

function createTables() {

  //event.preventDefault();
  var process = document.getElementById("numProcess").value;
  var resource = document.getElementById("numResource").value;

  if (!process) {
    alert('Enter number of process')
    return;
  }

  if (!resource) {
    alert('Enter types of resources')
    return;
  }

  columnTable('r', 'Resource Table', 'resourceTable', 'allTables');
  gridTable('a', 'Allocation Table', 'allocationTable', 'allTables');
  gridTable('m', 'Maximum Table', 'maximumTable', 'allTables');

  document.getElementById("createTables").disabled = true;
  document.getElementById("findNeed").disabled = false;

}

function isValid() {

  var process = document.getElementById("numProcess").value;
  var resource = document.getElementById("numResource").value;

  for (var i = 1; i <= resource; i++) {
    var res = document.getElementById('r' + i).value;

    if (!res) {
      return false;
    }

    var allocate1 = 0;

    for (var j = 1; j <= process; j++) {
      allocate1 += Number(document.getElementById('a' + j + i).value);
      var max = document.getElementById('m' + j + i).value;
      var allocate2 = document.getElementById('a' + j + i).value;

      if (!allocate2 || !max) {
        return false;
      }

      if (max < allocate2)
        return false;
    }

    if (allocate1 > res)
      return false;
  }

  return true;
}

function calculateNeed() {

  var process = document.getElementById("numProcess").value;
  var resource = document.getElementById("numResource").value;

  for (var i = 1; i <= process; i++) {

    for (var j = 1; j <= resource; j++) {

      var max = document.getElementById('m' + i + j).value;
      var allocate = document.getElementById('a' + i + j).value;
      document.getElementById('n' + i + j).value = max - allocate;
      document.getElementById('n' + i + j).disabled = true;
    }
  }
}

function calculateAvailable() {
  var process = document.getElementById("numProcess").value;
  var resource = document.getElementById("numResource").value;

  for (var i = 1; i <= resource; i++) {
    var res = document.getElementById('r' + i).value;
    var allocate = 0;

    for (var j = 1; j <= process; j++) {
      allocate += Number(document.getElementById('a' + j + i).value);
    }

    document.getElementById('av' + i).value = res - allocate;
    document.getElementById('av' + i).disabled = true;
  }

}


function reset() {
  location.reload();
}

function safetyAlgorithm(ch, tableName, tableId, divId) {

  var process = document.getElementById("numProcess").value;
  var resource = document.getElementById("numResource").value;

  let completed = new Array(process);
  let sequence = new Array(process);
  let avail = new Array(resource);

  for (let i = 0; i < process; i++)
    completed[i] = 0;

  for (let i = 1; i <= resource; i++) {
    avail[i - 1] = document.getElementById('av' + i).value;
  }

  var count = 0;

  while (count < process) {

    var done = 0;
    for (let i = 1; i <= process; i++) {

      if (completed[i - 1] == 1)
        continue;

      var flag = 1;

      for (let j = 1; j <= resource; j++) {
        var need = Number(document.getElementById('n' + i + j).value);
        var available = Number(document.getElementById('av' + j).value);

        if (available < need) {
          flag = 0;
          break;
        }
      }

      if (flag == 0) {
        continue;
      }

      for (let j = 1; j <= resource; j++) {
        var allocate = document.getElementById('a' + i + j).value;
        var available = document.getElementById('av' + j).value;

        document.getElementById('a' + i + j).value = 0;
        document.getElementById('a' + i + j).disabled = true;
        document.getElementById('av' + j).value = Number(allocate) + Number(available);
      }

      count++;
      sequence[count - 1] = i;

      completed[i - 1] = 1;
      done = 1;
    }

    if (done == 0) {
      return false;
    }
  }

  safeSequenceTable(ch, tableName, tableId, divId);

  for (let i = 1; i <= process; i++) {
    document.getElementById(ch + i).value = sequence[i - 1];
    document.getElementById(ch + i).disabled = true;
  }

  
  return true;
}
function findNeed() {
  var process = document.getElementById("numProcess").value;
  var resource = document.getElementById("numResource").value;

  if (!isValid()) {
    alert('Invalid data');
    reset();
  }

  gridTable('n', 'Need Table', 'needTable', 'allTables');
  calculateNeed();

  document.getElementById("findNeed").disabled = true;
  document.getElementById("findAvailable").disabled = false;
}

function findAvailable() {
  var process = document.getElementById("numProcess").value;
  var resource = document.getElementById("numResource").value;

  if (!isValid()) {
    alert('Invalid data');
    reset();
  }

  columnTable('av', 'Available Table', 'availableTable', 'allTables');
  calculateAvailable();

  document.getElementById("findAvailable").disabled = true;
  document.getElementById("safeSequence").disabled = false;
}

function generateSafeSeq() {
  var process = document.getElementById("numProcess").value;
  var resource = document.getElementById("numResource").value;

  if (!safetyAlgorithm('safe', 'Safe Sequence', 'safeSequence', 'allTables')) {
    alert('The system is not in a safe state');
    reset();
  }

  document.getElementById("safeSequence").disabled = true;
  document.getElementById("resourceRequest").disabled = false;
}