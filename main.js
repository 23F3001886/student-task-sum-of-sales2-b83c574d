document.addEventListener("DOMContentLoaded", init);

function init() {
    // Set the document title
    document.title = 'Sales Summary';

    // Add event listener to the button
    document.getElementById('fetch-data').addEventListener('click', fetchSalesData);
}

async function fetchSalesData() {
    try {
        // Fetch the CSV data
        const response = await fetch('data.csv'); // Replace with the actual path to your CSV file
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.text();
        const totalSales = calculateTotalSales(data);
        
        // Display the total sales
        document.getElementById('total-sales').textContent = totalSales.toFixed(2);
        document.getElementById('error-message').classList.add('d-none'); // Hide error message if successful
    } catch (error) {
        // Handle errors
        document.getElementById('error-message').textContent = 'Error fetching sales data: ' + error.message;
        document.getElementById('error-message').classList.remove('d-none');
    }
}

function calculateTotalSales(csvData) {
    const rows = csvData.split('\n');
    let total = 0;

    // Assuming the first row is the header
    for (let i = 1; i < rows.length; i++) {
        const columns = rows[i].split(',');
        if (columns.length > 1) {
            const sales = parseFloat(columns[1]); // Assuming sales are in the second column
            if (!isNaN(sales)) {
                total += sales;
            }
        }
    }
    return total;
}

### Explanation of Key Functionality:
1. **HTML Structure**: The HTML file includes a title, a button to fetch data, and a section to display the total sales. It uses Bootstrap for styling.
2. **CSS Styles**: The CSS file provides basic styling to enhance the visual appeal of the application.
3. **JavaScript Functionality**:
   - The `init` function sets the document title and adds an event listener to the button.
   - The `fetchSalesData` function fetches the CSV file, handles errors, and calculates the total sales.
   - The `calculateTotalSales` function processes the CSV data, summing the sales values from the specified column.
4. **Error Handling**: If the fetch fails or if there are issues with the data, an error message is displayed to the user.
5. **Accessibility**: The error message is marked with a role of alert for screen readers.

### Note:
- Replace `'data.csv'` in the `fetch` call with the actual path to your CSV file when deploying the application.
- Ensure that the CSV file is formatted correctly, with sales data in the second column.