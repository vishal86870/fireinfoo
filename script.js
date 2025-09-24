document.addEventListener('DOMContentLoaded', () => {
    // Function to handle operations on the customer list page (index.html)
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
        displayCustomers();
    }
    
    // Function to handle operations on the customer form page (customer.html)
    if (window.location.pathname.endsWith('customer.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const customerId = urlParams.get('id');
        
        if (customerId) {
            loadCustomerForEdit(customerId);
        }

        document.getElementById('customerForm').addEventListener('submit', handleFormSubmit);
    }
});

function getCustomers() {
    const customers = localStorage.getItem('customers');
    return customers ? JSON.parse(customers) : [];
}

function saveCustomers(customers) {
    localStorage.setItem('customers', JSON.stringify(customers));
}

function displayCustomers() {
    const customers = getCustomers();
    const tableBody = document.querySelector('#customerTable tbody');
    tableBody.innerHTML = ''; // Clear existing table content

    customers.forEach(customer => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.Number}</td>
            <td>${customer.Details}</td>
            <td>${customer.info}</td>
            <td>
                <a href="customer.html?id=${customer.id}" class="edit-button">Edit</a>
                <button class="delete-button" onclick="deleteCustomer(${customer.id})">Delete</button>
            </td>
        `;
    });
}

function handleFormSubmit(event) {
    event.preventDefault();
    const customerId = document.getElementById('customerId').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const Number = document.getElementById('Number').value;
    const Details = document.getElementById('Details').value;
    const info = document.getElementById('info').value;

    
    const customers = getCustomers();

    if (customerId) {
        // Edit existing customer
        const customerIndex = customers.findIndex(c => c.id == customerId);
        if (customerIndex !== -1) {
            customers[customerIndex].name = name;
            customers[customerIndex].email = email;
            customers[customerIndex].Number = Number;
            customers[customerIndex].Details = Details;
            customers[customerIndex].info = info;
        }
    } else {
        // Add new customer
        const newCustomer = {
            id: Date.now(), // Use timestamp for a unique ID
            name: name,
            email: email
            
        };
        customers.push(newCustomer);
    }

    saveCustomers(customers);
    window.location.href = 'index.html'; // Redirect to the customer list page
}

function loadCustomerForEdit(customerId) {
    const customers = getCustomers();
    const customer = customers.find(c => c.id == customerId);
    
    if (customer) {
        document.getElementById('form-title').textContent = `Edit Customer: ${customer.name}`;
        document.getElementById('customerId').value = customer.id;
        document.getElementById('name').value = customer.name;
        document.getElementById('email').value = customer.email;
        document.getElementById('Number').value = customer.Number;
        document.getElementById('Details').value = customer.Details;
        document.getElementById('info').value = customer.info;
        document.getElementById('saveButton').textContent = 'Update Customer';
    }
}

function deleteCustomer(customerId) {
    if (confirm('Are you sure you want to delete this customer?')) {
        let customers = getCustomers();
        customers = customers.filter(c => c.id !== customerId);
        saveCustomers(customers);
        displayCustomers(); // Refresh the list
    }
}
// search

// Get the input and button elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// Add a click event listener to the button
searchButton.addEventListener('click', function() {
  performSearch();
});

// Add a keyup event listener to the input for the "Enter" key
searchInput.addEventListener('keyup', function(event) {
  // Check if the key pressed was "Enter"
  if (event.key === 'Enter') {
    performSearch();
  }
});

// Function to handle the search logic
function performSearch() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    console.log(`Searching for: "${searchTerm}"`);
    // Example: Redirect to a search results page
    // window.location.href = `/search?query=${encodeURIComponent(searchTerm)}`;
  } else {
    alert('Please enter a search term.');
  }
}
