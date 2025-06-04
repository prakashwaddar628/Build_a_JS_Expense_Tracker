document.getElementById('expenses').addEventListener("submit", addExpense);

let total = 0;

function addExpense(e) {
    e.preventDefault();
    const descInput = document.getElementById('desc');
    const amtInput = document.getElementById('amt');
    const desc = descInput.value.trim();
    const amt = parseFloat(amtInput.value);

    if (!desc || isNaN(amt) || amt <= 0) {
        alert("Please enter a valid description and a positive amount.");
        return;
    }

    const li = document.createElement("li");
    li.textContent = `${desc}: ₹${amt.toFixed(2)} `;

    const delbtn = document.createElement('button');
    delbtn.textContent = "❌";
    delbtn.type = "button";
    delbtn.onclick = () => {
        li.remove();
        total -= amt;
        updateTotal();
        localStorage.setItem("expenses", JSON.stringify(expenseArray));
    };

    li.appendChild(delbtn);
    document.getElementById('expense-list').appendChild(li);

    total += amt;
    updateTotal();
    localStorage.setItem("expenses", JSON.stringify(expenseArray));

    document.getElementById('expenses').reset();
    descInput.focus();
}

function updateTotal() {
    document.getElementById('total').textContent = total.toFixed(2);
}