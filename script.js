document.getElementById("expenses").addEventListener("submit", addExpense);

let total = 0;
let expenseArray = [];

document.addEventListener("DOMContentLoaded", loadExpenses);

function addExpense(e) {
  e.preventDefault();
  const descInput = document.getElementById("desc");
  const amtInput = document.getElementById("amt");
  const desc = descInput.value.trim();
  const amt = parseFloat(amtInput.value);

  if (!desc || isNaN(amt) || amt <= 0) {
    alert("Please enter a valid description and a positive amount.");
    return;
  }

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });
  formatter.format(expense.amount);

  const expense = {
    id: Date.now(),
    description: desc,
    amount: amt,
  };

  expenseArray.push(expense);
  renderExpense(expense);

  total += amt;
  updateTotal();
  saveExpenses();

  document.getElementById("expenses").reset();
  descInput.focus();
}

function renderExpense(expense) {
  const li = document.createElement("li");
  li.textContent = `${expense.description}: ₹${expense.amount.toFixed(2)}`;

  const delbtn = document.createElement("button");
  delbtn.textContent = "❌";
  delbtn.type = "button";
  delbtn.onclick = () => {
    const index = expenseArray.indexOf(expense);
    if (index > -1) {
      expenseArray.splice(index, 1);
      total -= expense.amount;
      updateTotal();
      saveExpenses();
    }
    li.remove();
  };

  li.appendChild(delbtn);
  document.getElementById("expense-list").appendChild(li);
}

function updateTotal() {
  document.getElementById("total").textContent = total.toFixed(2);
}

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenseArray));
}

function loadExpenses() {
  const storedExpenses = localStorage.getItem("expenses");
  if (storedExpenses) {
    expenseArray = JSON.parse(storedExpenses);
    total = 0;
    expenseArray.forEach((expense) => {
      renderExpense(expense);
      total += expense.amount;
    });
    updateTotal();
  }
}
