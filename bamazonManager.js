const inquirer = require("inquirer");
const connection = require("./connection"); 


//Manager
       function selectQuery() {
       //Asynchronas Operation
  connection.query('SELECT * FROM bamazon.products', function (error, results) {
    if (error) throw error;

    // validateInput makes sure that the user is supplying only positive integers for their inputs

    
    inquirer.prompt([{
            type: 'list',  
            message: 'Here are a list of products', 
            name: 'command',
             choices: function() {
                 return result = results.map((el) => `ID: ${el.id} || Name: ${el.item_names} || Price: ${el.price} || Quantity: ${el.quantity}`)
                },
                 }])
                 .then(function(answers){
                    console.log('Answers: ', answers);
                 });
                })
            }
            
                
    function searchLowInventory() {
        connection.query('SELECT * FROM bamazon.products WHERE quantity <= 5', function (err, data) {
            if (err) { 
                throw error;
            }else{
                for (let i = 0; i < data.length; i++) {
                    console.log(`LOW INVENTORY \n ID: ${data[i].id} || NAME: ${data[i].item_names}
                    `);
                }
            }
        });

    }

    function addInventory() {
        connection.query('SELECT * FROM bamazon.products', function (err, data) {
        if (err) { 
            throw err;
        }else {
            let products = data;

            for (let i = 0; i < products.length; i++) {
                console.log(`ID: ${products[i].id} || NAME: ${products[i].item_names} || PRICE: ${products[i].price} || QUANTITY: ${products[i].quantity}`);

            }

            inquirer.prompt([{
                type: 'input',
                name: 'id',
                message: 'What is the id of the product you would like to add?'
            },
            {
                type: 'input',
                name: 'quantity',
                message: 'How much quantity would you like to add '
            }
        ])
        .then(function(answers) {
            let  id = parseInt(answers.id);
            let quantity = parseInt(answers.quantity);
            oldQuantity = 0;

            for(let i = 0; i < products.length; i++) {
                if (products[i].id === id) {
                     oldQuantity = products[i].quantity;

                }
                 
            }
            let totalQuantity = oldQuantity + quantity;

            connection.query('UPDATE bamazon.products SET quantity = ? WHERE id = ?', [totalQuantity, id], function(err, data) {
                if (err) {
                    throw error
                }else {
                    console.log('Quantity successfully updated');
                }
            });
        });
        }
    }); 
}


function addNewProduct() {
    connection.query('SELECT * FROM bamazon.products', function (err, data) {
    if (err) { 
        throw error;
    }else {
        let products = data;

        for (let i = 0; i < products.length; i++) {
            console.log(`ID: ${products[i].id} || NAME: ${products[i].item_names} || PRICE: ${products[i].price} || QUANTITY: ${products[i].quantity}`);

        }

        inquirer.prompt([{
            type: 'input',
            name: 'item_names',
            message: 'What is the product you would like to add?'
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How much quantity of the product would you like to add? '
        }
    ])
    .then(function(answers) {
        let  id = parseInt(answers.id);
        let quantity = parseInt(answers.quantity);
        oldQuantity = 0;

        for(let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                 oldQuantity = products[i].quantity;

            }
             
        }
        let totalQuantity = oldQuantity + quantity;

        connection.query('INSERT INTO bamazon.products (item_names , price, quantity)', [totalQuantity, id], function(err, data) {
            if (err) {
                throw error
            }else {
                console.log('Quantity successfully updated');
            }
        });
    });
    }
}); 
}


    
     function start() {
         let questions = [
            {type: 'list', 
                name: 'command', 
                message: 'List a set of menu options', 
                choices: [
                    'View Products for Sale',
                    'View Low Inventory',
                    'Add to Inventory',
                    'Add New Product',
                    'View Products for Purchase'
                    ]  },
                        
                    ]
    
    inquirer.prompt(questions)
    .then(function(answers) {
        let command = answers.command;
        switch(command) {
            case 'View Products for Sale':
            selectQuery();
            break;

            case 'View Low Inventory':
            searchLowInventory();
            break;

            case 'Add to Inventory':
            addInventory();
            break;

            case 'Add New Product':
            addNewProduct();
            break;

            default:
            console.log('Sorry command does not understand right now')
        }
        console.log('Answers: ', answers);
        
    });
}

start();















// //    function selectQuery(query, cb) {
// //        //Asynchronas Operation
// //   connection.query('SELECT * FROM products', function (error, results) {
// //     if (error) throw error;
    
// //     inquirer.prompt([{
// //             type: 'list',  
// //             message: 'Here are a list of products', 
// //             name: 'command',
// //              choices: function() {
// //                  const result = results.map(function(el){
// //                     return `ID: ${el.id} || Name: ${el.item_names} || Price: ${el.price} || Quantity: ${el.quantity}`;
// //                  });
// //                  return result;
// //                 },
// //                  }])
// //                  .then(function(answers){
// //                     console.log('Answers: ', answers);
// //                  });

// //                 })

// //             }


// // selectQuery();



   
// // return Data.map(function(el){
// //     return `ID: ${el.id} - Name: ${el.name} - Price: ${el.price} - Quantity: ${el.quantity}`;



