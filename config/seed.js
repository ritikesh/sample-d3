const fs = require('fs');
const CsvReadableStream = require('csv-reader');
const inputStream = fs.createReadStream('./config/Daily Inventory.csv', 'utf8');
let skipHeader = true;

const Inventory = require('./../models/inventory')

Inventory.sync({force: true})
    .then(function(){
        inputStream
        .pipe(CsvReadableStream({ parseNumbers: true, trim: true }))
        .on('data', function (row) {
            if(!skipHeader) {
                Inventory.create({
                    product_id: row[0],
                    date: row[1],
                    location: row[2],
                    current_quantity: row[3],
                    unit_cost: row[4],
                    current_value: row[5]
                })
                .then(inventory => console.log(inventory.id))
                .catch(error => console.log(error));
            }
            skipHeader = false;
        })
        .on('end', function (data) {
            console.log('No more rows!');
        });
    })