import API_BASE_URL from "./config.js";

document.addEventListener("DOMContentLoaded", loadGroceries);

const form = document.getElementById("grocery-form");
const list = document.getElementById("grocery-list");
const totalDisplay = document.getElementById("total");

// ✅ Ensure deleteItem is globally available to avoid scope issues
window.deleteItem = async function (id) {
    try {
        console.log("Deleting item with ID:", id);
        const res = await fetch(`${API_BASE_URL}/groceries/${id}`, { method: "DELETE" });

        if (res.ok) {
            loadGroceries();
        } else {
            console.error("Failed to delete item.");
        }
    } catch (error) {
        console.error("Error deleting item:", error);
    }
};

// ✅ Handle form submission (Add Item)
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const price = parseFloat(document.getElementById("price").value);
    const quantity = parseInt(document.getElementById("quantity").value);

    await fetch(`${API_BASE_URL}/groceries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, quantity })
    });

    form.reset();
    loadGroceries();
});

// ✅ Fetch and Display Groceries
async function loadGroceries() {
    try {
        const res = await fetch(`${API_BASE_URL}/groceries`);
        const groceries = await res.json();
        
        list.innerHTML = "";
        let total = 0;

        groceries.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `${item.name} - $${item.price} x ${item.quantity}  
                            <button onclick="deleteItem(${item.id})">❌</button>`;
            list.appendChild(li);
            total += item.price * item.quantity;
        });

        totalDisplay.textContent = total.toFixed(2);
    } catch (error) {
        console.error("Error loading groceries:", error);
    }
}
