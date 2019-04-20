var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'Perrin37',
	database: 'Bamazon'
});

function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole, non-negative number.';
	}
}

// promptPurchase will prompt for the item and quantity to purchase
function promptPurchase() {
	// console.log('___ENTER promptPurchase___');

	// Prompt the user to select an item
	inquirer.prompt([
		{
			type: 'input',
			name: 'product_name',
			message: 'Please enter the product ID you would like to purchase.',
			//validate: validateInput,
			//filter: String
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many do you want to purchase?',
			validate: validateInput,
			filter: Number
		}
    ])
    
    .then(function(input) {
		console.log('Customer has selected: \n    product_name = '  + input.product_name + '\n    quantity = ' + input.quantity);

		var item = input.product_name;
		var quantity = input.quantity;

		// Query db to confirm that the given item ID exists in the desired quantity
		var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, {product_name: item}, function(err, data) {
			if (err) throw err;

			// If invalid item ID, data attay will be empty
			

			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
				displayInventory();

			} else {
				var productData = data[0];

				//console.log('productData = ' + JSON.stringify(productData));
				//console.log('productData.stock_quantity = ' + productData.stock_quantity);

				// If the quantity requested by the user is in stock
				if (quantity <= productData.stock_quantity) {
					console.log('Congratulations, the product you requested is in stock! Placing order!');

					// Construct the updating query string
					var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE product_name = ' + item;
					//console.log('updateQueryStr = ' + updateQueryStr);

					// Update the inventory
					connection.query(updateQueryStr, function() {
						if (err) throw err;

						console.log('Your order has been placed! Your total is $' + productData.price * quantity);
						console.log('Thank you for shopping with us!');
						console.log("\n__________________________________________________________________\n");

						// End the database connection
						connection.end();
                    });
                    //console.log("query = "+qu.query);
				} else {
					console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
					console.log('Please modify your order.');
					console.log("\n---------------------------------------------------------------------\n");

					displayInventory();
				}
			}
		})
	})
}

function displayInventory() {

	// query string
	queryStr = 'SELECT * FROM products';

	connection.query(queryStr, function(err, data) {
		if (err) throw err;

        console.log('');
		console.log('Inventory: ');
		console.log('______________________________________________________________________\n');

		var strOut = '';
		for (var i = 0; i < data.length; i++) {
			strOut = '';
			strOut += 'Item ID: ' + data[i].auto_id + '  //  ';
			strOut += 'Product Name: ' + data[i].product_name + '  //  ';
			strOut += 'Department: ' + data[i].department_name + '  //  ';
			strOut += 'Price: $' + data[i].price + '\n';

			console.log(strOut);
		}

	  	console.log("_____________________________________________________________________\n");

	  	
	  	promptPurchase();
	})
}

function runBamazon() {
	
	displayInventory();
}

runBamazon();
