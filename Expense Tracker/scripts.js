let earnBtn = document.querySelector("#earnBtn");
let expBtn = document.querySelector("#expBtn");

let arr = [];
let balance = 0;
let editIndex = -1; // Track if editing a transaction
let earnings = 0;
let expenses=0;

earnBtn.addEventListener('click', function (event) {
  event.preventDefault();
  let text = document.querySelector("#text");
  let amount = document.querySelector("#amount");

  if (text.value.trim() === '') {
    alert("Enter the text");
    return;
  }
  if (amount.value.trim() === '') {
    alert("Enter the amount");
    return;
  }

  text.value = text.value.trim();
  amount.value = amount.value.trim();

  if (editIndex !== -1) {
    let oldAmount = parseFloat(arr[editIndex].amount.replace(/[^0-9.-]+/g, ""));
    let newAmount = parseFloat(amount.value);
    balance = balance - oldAmount + newAmount;

    arr[editIndex] = {
      text: text.value,
      amount: "+ ₹" + amount.value,
      status: "C",
    };
    earnings =earnings- oldAmount + newAmount;
    editIndex = -1;
  } else {
    let newTransaction = {
      text: text.value,
      amount: "+ ₹" + amount.value,
      status: "C",
    };
    arr.push(newTransaction);
    balance += parseFloat(amount.value);
    earnings =earnings+parseFloat(amount.value);
  }

  document.querySelector("#balance-amount").textContent = "₹" + balance;
  document.querySelector("#earnings").textContent = earnings;
  AddTransactions(arr);
  text.value = "";
  amount.value = "";
});

expBtn.addEventListener('click', function (event) {
  event.preventDefault();
  let text = document.querySelector("#text");
  let amount = document.querySelector("#amount");

  if (text.value.trim() === '' && amount.value.trim() === '') {
    alert("Enter the text and Amount");
    return;
  } else if (amount.value.trim() === '') {
    alert("Enter the amount");
    return;
  } else if (text.value.trim() === '') {
    alert("Enter the text");
    return;
  }

  text.value = text.value.trim();
  amount.value = amount.value.trim();

  if (editIndex !== -1) {
    let oldAmount = parseFloat(arr[editIndex].amount.replace(/[^0-9]+/g, ""));
    let newAmount = parseFloat(amount.value);
    balance = balance + oldAmount - newAmount;
    expenses = expenses+oldAmount-parseFloat(amount.value);

    arr[editIndex] = {
      text: text.value,
      amount: "- ₹" + amount.value,
      status: "D",
    };
    editIndex = -1;
  } else {
    let newTransaction = {
      text: text.value,
      amount: "- ₹" + amount.value,
      status: "D",
    };
    arr.push(newTransaction);
    balance -= parseFloat(amount.value);
    expenses = expenses-amount.value;
  }

  document.querySelector("#balance-amount").textContent = "₹" + balance;
  document.querySelector("#expenses").textContent = expenses;
  AddTransactions(arr);
  text.value = "";
  amount.value = "";
});

function AddTransactions(arr) {
  let transactions = document.querySelector("#transactions");
  transactions.innerHTML = '';

  arr.forEach((trans, index) => {
    let transaction = document.createElement("div");
    transaction.classList.add("transaction");

    let edit_transactions = document.createElement("div");
    edit_transactions.classList.add('edit-transactions');

    let left = document.createElement("div");
    left.classList.add("left");

    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    p1.textContent = trans.text;
    p2.textContent = trans.amount;

    left.appendChild(p1);
    left.appendChild(p2);
    edit_transactions.appendChild(left);

    let status = document.createElement("div");
    status.textContent = trans.status;
    status.classList.add("status");
    if (trans.status === 'C') {
      status.classList.add("credit");
    } else {
      status.classList.add("debit");
    }
    edit_transactions.appendChild(status);

    let iconsDiv = document.createElement("div");
    iconsDiv.id = "icons";
    iconsDiv.classList.add("hidden");

    let editImg = document.createElement("img");
    editImg.src = "\\Expense Tracker\\icons\\edit.png";
    editImg.alt = "Edit";
    editImg.id = `edit${index}`;

    let deleteImg = document.createElement("img");
    deleteImg.src = "\\Expense Tracker\\icons\\delete.png";
    deleteImg.alt = "Delete";
    deleteImg.id = `deleteid${index}`;

    iconsDiv.appendChild(editImg);
    iconsDiv.appendChild(deleteImg);

    transaction.appendChild(edit_transactions);
    transaction.appendChild(iconsDiv);
    transactions.appendChild(transaction);

    transaction.addEventListener('click', function () {
      iconsDiv.classList.remove('hidden');

      let textInput = document.querySelector("#text");
      let amountInput = document.querySelector("#amount");

      editImg.addEventListener('click', function () {
        textInput.value = trans.text;
        amountInput.value = trans.amount.replace(/[^0-9]+/g, "");
        editIndex = index;
      });

      deleteImg.addEventListener('click', function () {
        let deletedAmount = parseFloat(arr[index].amount.replace(/[^0-9.-]+/g, ""));
        if (arr[index].status === 'C') {
          balance -= deletedAmount;
        } else {
          balance += deletedAmount;
        }
        arr.splice(index, 1);
        document.querySelector("#balance-amount").textContent = "₹" + balance;
        AddTransactions(arr);
      });
    });
  });
}
