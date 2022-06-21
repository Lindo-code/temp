const { dataStore } = require("../data/data.js");

function getCustomerBaskets(email, data) {
    const customerBaskets = [];
    let y = 0;
    for(let x in data) {
        if(email === data[x].email) {
            customerBaskets.push(data[x].items);
        };
    }
    return customerBaskets;
}

function getAllCustomers(data) {
    const customerEmails = [];
    for(let x in data) {
        if(customerEmails.includes(data[x].email)) {
            continue;
        } 
        customerEmails.push(data[x].email);
    }
    return customerEmails;
}

function requiredStock(data) {
    const stockRequired = [];
    for(let x in data) {
        if(data[x].status === "PAID") {
            for(let y in data[x].items){
                let stock = {};
                stock.name = data[x].items[y].name;
                stock.quantity = data[x].items[y].quantity;
                stockRequired.push(stock);
            };
        };
    }
    return stockRequired;
}

function totalSpent(email, data) {
    const finalInfo = {};
    let totalExpense = 0;
    for(let x in data){
        if(data[x].email === email && data[x].status === "PAID" || data[x].email === email && data[x].status === "DELIVERED") {
            for(let y in data[x].items){
                totalExpense += data[x].items[y].price * data[x].items[y].quantity;
            };
        };
    }
    finalInfo.email = email;
    finalInfo.total = totalExpense 
    return finalInfo;
}

function topCustomers(data) {
    const customerExpentiture = [];
    for(let x in data) {
        customerExpentiture.push(totalSpent(data[x].email, data));
    }
    customerExpentiture.sort((a, b) => parseFloat(b.total) - parseFloat(a.total));
    return customerExpentiture;
}

function getCustomersWithOpenBaskets(data) {
    const openBasketEmails = [];
    for(let x in data) {
        if(data[x].status === "OPEN") {
            openBasketEmails.push(data[x].email)
        };
    }
    return openBasketEmails;
}

