const mysql = require('mysql2');
const db = require('./db');
const inquirer = require('inquirer');
const tbname = 'products';

db.connect((err) => {
    if (err) throw err;

    // return all products
    db.query(`SELECT * FROM ${tbname}`, (err, res) => {
        for (let prod of res) {
            console.log(`${prod.item_id} | ${prod.product_name} | ${prod.price} | ${prod.stock_quantity}`);
        }
        // Prompt ID
        inquirer.prompt([
            {
                name: "prodId",
                type: "input",
                message: "which GunZa u want?"
            },
            {
                name: "prodQuantity",
                type: "input",
                message: "How many GunZa u need?"
            }
        ]).then(answers => {
            db.query(`SELECT stock_quantity FROM ${tbname} WHERE item_id = ?`, [answers.prodId], (err, res) => {
                if (err) throw err;
                if (res[0].stock_quantity > answers.prodQuantity) {
                    db.query(`UPDATE ${tbname} SET stock_quantity = stock_quantity - ${answers.prodQuantity} WHERE item_id = ?`, [answers.prodId], (err, res) => {
                        if (err) throw err;
                        console.log("Got rid of dat!");
                    })
                } else {
                    console.log("Sorry all out of dat Gunza");
                }
                db.end();
            });
        });
    });
});