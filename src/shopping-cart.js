const { dataStore } = require("../data/data.js");

function getCustomerBaskets(email, data) {
    const customerBaskets = [];
    for(let index in data) {
        if(email === data[index].email) {
            let basket = {};
            basket.email = data[index].email;
            basket.status = data[index].status;
            basket.items = [];
            data[index].items.forEach(item => {
                basket.items.push(item);
            });
            customerBaskets.push(basket);
            basket = {};
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
    const emailCheck = [];
    for(let basketIndex in data) {
        if(data[basketIndex].status === "PAID") {
            for(let itemsIndex in data[basketIndex].items){
                let stock = {};
                if(emailCheck.includes(data[basketIndex].items[itemsIndex].name)) {
                    for(let i = 0; i < stockRequired.length; i++){
                        if(stockRequired[i].name === data[basketIndex].items[itemsIndex].name){
                            stockRequired[i].quantity += data[basketIndex].items[itemsIndex].quantity;
                        };

                    }
                    continue;
                }
                stock.name = data[basketIndex].items[itemsIndex].name;
                stock.quantity = data[basketIndex].items[itemsIndex].quantity;
                stockRequired.push(stock);
                emailCheck.push(data[basketIndex].items[itemsIndex].name); 
            };
        };
    }
    return stockRequired;
}

function totalSpent(email, data) {
    let totalExpense = 0;
    for(let basketIndex in data){
        if(data[basketIndex].email === email && data[basketIndex].status === "PAID" || data[basketIndex].email === email && data[basketIndex].status === "DELIVERED") {
            for(let itemsIndex in data[basketIndex].items){
                totalExpense += data[basketIndex].items[itemsIndex].price * data[basketIndex].items[itemsIndex].quantity;
            };
        };
    } 
    return totalExpense;
}

function topCustomers(data) {
    const customerExpentiture = [];
    const emails = [];
    for(let index in data) {
        let tempData = {};
        if(emails.includes(data[index].email)) {
            continue;
        }
        emails.push(data[index].email);
        tempData.email = data[index].email;
        tempData.total = totalSpent(data[index].email, data);
        customerExpentiture.push(tempData);
        tempData = {};
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
