const { dataStore } = require("../data/data.js");

function getCustomerBaskets(email, data) {
    const customerBaskets = [];
    for(let index in data) {
        if(email === data[index].email) {
            customerBaskets.push(data[index].items);
        };
    }
    return customerBaskets;
}

function getAllCustomers(data) {
    const customerEmails = [];
    for(let index in data) {
        if(customerEmails.includes(data[index].email)) {
            continue;
        } 
        customerEmails.push(data[index].email);
    }
    return customerEmails;
}

function requiredStock(data) {
    const stockRequired = [];
    for(let basketIndex in data) {
        if(data[basketIndex].status === "PAID") {
            for(let itemsIndex in data[basketIndex].items){
                let stock = {};
                stock.name = data[basketIndex].items[itemsIndex].name;
                stock.quantity = data[basketIndex].items[itemsIndex].quantity;
                stockRequired.push(stock);
            };
        };
    }
    return stockRequired;
}

function totalSpent(email, data) {
    const finalInfo = {};
    let totalExpense = 0;
    for(let basketIndex in data){
        if(data[basketIndex].email === email && data[basketIndex].status === "PAID" || data[basketIndex].email === email && data[basketIndex].status === "DELIVERED") {
            for(let itemsIndex in data[basketIndex].items){
                totalExpense += data[basketIndex].items[itemsIndex].price * data[basketIndex].items[itemsIndex].quantity;
            };
        };
    }
    finalInfo.email = email;
    finalInfo.total = totalExpense 
    return finalInfo;
}

function topCustomers(data) {
    const customerExpentiture = [];
    for(let index in data) {
        customerExpentiture.push(totalSpent(data[index].email, data));
    }
    customerExpentiture.sort((a, b) => parseFloat(b.total) - parseFloat(a.total));
    return customerExpentiture;
}

function getCustomersWithOpenBaskets(data) {
    const openBasketEmails = [];
    for(let index in data) {
        if(data[index].status === "OPEN") {
            openBasketEmails.push(data[index].email)
        };
    }
    return openBasketEmails;
}
