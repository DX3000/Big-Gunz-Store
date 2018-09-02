const mysql = require('mysql2');
const db = require('./db');
const inquirer = require('inquirer');
const tbname = 'products';
const choices = [
    'See GunZas',
    'See if we has low gunZas',
    'Add Gunzas',
    'Add new Gunza',
];
const limit = 5;

db.connect((err) => {
    if (err) throw err;

    inquirer.prompt([
        {
            name: "options",
            type: "list",
            message: "Pick an option",
            choices: choices
        }
    ]).then(answer => {
        db.query(`SELECT * FROM ${tbname}`, (err, res) => {
            let products = res.map(x => { return x });
            switch (answer.options) {
                // view products
                case choices[0]:
                    for (let prod of products) {
                        console.log(`${prod.item_id} | ${prod.product_name} | ${prod.price} | ${prod.stock_quantity}`);
                    }
                    break;
                // view low inventory
                case choices[1]:
                    for (let prod of res) {
                        if (prod.stock_quantity < limit) {
                            console.log(`${prod.item_id} | ${prod.product_name} | ${prod.price} | ${prod.stock_quantity}`);
                        }
                    }
                    break;
                // add inventory
                case choices[2]:
                    let opt = products.map(x => { return x.product_name });
                    inquirer.prompt([
                        {
                            name: "product",
                            type: "list",
                            message: "Pick a Bang Bang",
                            choices: products.map(x => { return x.product_name })
                        },
                        {
                            name: "quantity",
                            type: "input",
                            message: "How many GunZa u need?"
                        }
                    ]).then(product => {
                        db.query(`UPDATE ${tbname} SET stock_quantity = stock_quantity + ${product.quantity} WHERE product_name = '${product.product}'`, (err, res) => {
                            if (err) throw err;
                            console.log("Right on!! U added more Bang Bang Boom Boom");
                        });
                    });
                // add product
                case choices[3]:
                    inquirer.prompt([
                        {
                            name: "name",
                            type: "input",
                            message: "GunZa name:"
                        },
                        {
                            name: "department",
                            type: "input",
                            message: "Type of GunZa:"
                        },
                        {
                            name: "price",
                            type: "input",
                            message: "Gunza $$:"
                        },
                        {
                            name: "quantity",
                            type: "input",
                            message: "# of GunZas:"
                        },
                    ]).then(product => {
                        db.query(`INSERT INTO ${tbname} (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)`, [
                            product.name,
                            product.department,
                            product.price,
                            product.quantity,
                        ], (err) => {
                            if (err) throw err;
                            console.log('Right on!! U added more Bang Bang Boom Boom')
                        });
                    });
                    break;
            }
        });
    });
});