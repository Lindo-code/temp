const basketsData = require("./data/data.js");
const customer = {
    shoppingBaskets: basketsData.dataStore, 
    email: "tshepo@umuzi.org"
};
const {shoppingBaskets, email} = customer;

function getCustomerBaskets(data) {
    const customerBaskets = [];
    for(let index in data.shoppingBaskets) {
        if(data.email === data.shoppingBaskets[index].email) {
            let basket = {};
            basket.email = data.shoppingBaskets[index].email;
            basket.status = data.shoppingBaskets[index].status;
            basket.items = [];
            data.shoppingBaskets[index].items.forEach(item => {
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
    for(let index in data.shoppingBaskets) {
        if(customerEmails.includes(data.shoppingBaskets[index].email)) {
            continue;
        } 
        customerEmails.push(data.shoppingBaskets[index].email);
    }
    return customerEmails;
}

function requiredStock(data) {
    const stockRequired = [];
    const emailCheck = [];
    for(let basketIndex in data.shoppingBaskets) {
        if(data.shoppingBaskets[basketIndex].status === "PAID") {
            for(let itemsIndex in data.shoppingBaskets[basketIndex].items){
                let stock = {};
                if(emailCheck.includes(data.shoppingBaskets[basketIndex].items[itemsIndex].name)) {
                    for(let i = 0; i < stockRequired.length; i++){
                        if(stockRequired[i].name === data.shoppingBaskets[basketIndex].items[itemsIndex].name){
                            stockRequired[i].quantity += data.shoppingBaskets[basketIndex].items[itemsIndex].quantity;
                        };

                    }
                    continue;
                }
                stock.name = data.shoppingBaskets[basketIndex].items[itemsIndex].name;
                stock.quantity = data.shoppingBaskets[basketIndex].items[itemsIndex].quantity;
                stockRequired.push(stock);
                emailCheck.push(data.shoppingBaskets[basketIndex].items[itemsIndex].name); 
            };
        };
    }
    return stockRequired;
}

function totalSpent(email, data) {
    let totalExpense = 0;
    for(let basketIndex in data.shoppingBaskets){
        if(data.shoppingBaskets[basketIndex].email === data.email && data.shoppingBaskets[basketIndex].status === "PAID" || data.shoppingBaskets[basketIndex].email === data.email && data.shoppingBaskets[basketIndex].status === "DELIVERED") {
            for(let itemsIndex in data.shoppingBaskets[basketIndex].items){
                totalExpense += data.shoppingBaskets[basketIndex].items[itemsIndex].price * data.shoppingBaskets[basketIndex].items[itemsIndex].quantity;
            };
        };
    } 
    return totalExpense;
}

function topCustomers(data) {
    const customerExpentiture = [];
    const emails = [];
    for(let index in data.shoppingBaskets) {
        let tempData = {};
        if(emails.includes(data.shoppingBaskets[index].email)) {
            continue;
        }
        emails.push(data.shoppingBaskets[index].email);
        tempData.email = data.shoppingBaskets[index].email;
        tempData.total = totalSpent(data.shoppingBaskets[index].email, data.shoppingBaskets);
        customerExpentiture.push(tempData);
        tempData = {};
    }
    customerExpentiture.sort((a, b) => parseFloat(b.total) - parseFloat(a.total));
    return customerExpentiture;
}

function getCustomersWithOpenBaskets(data) {
    const openBasketEmails = [];
    for(let index in data.shoppingBaskets) {
        if(data.shoppingBaskets[index].status === "OPEN") {
            openBasketEmails.push(data.shoppingBaskets[index].email)
        };
    }
    return openBasketEmails;
}
