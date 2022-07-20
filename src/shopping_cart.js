const fs = require("fs");
const customer = {
    shoppingBaskets: fetchData()
}
const {shoppingBaskets} = customer;

function fetchData() {
    try {
      const jsonData = fs.readFileSync("data.json");
      const data = JSON.parse(jsonData);
      return data;
    } catch (err) {
      console.log(err);
      return;
    };
}

function getCustomerBaskets({shoppingBaskets, email}) {
    const customerBaskets = [];
    for(let index in shoppingBaskets) {
        if(email === shoppingBaskets[index].email) {
            let basket = {};
            basket.email = shoppingBaskets[index].email;
            basket.status = shoppingBaskets[index].status;
            basket.items = [];
            shoppingBaskets[index].items.forEach(item => {
                basket.items.push(item);
            });
            customerBaskets.push(basket);
            basket = {};
        };
    }
    return customerBaskets;
}

function getAllCustomers({shoppingBaskets}) {
    const customerEmails = [];
    for(let index in shoppingBaskets) {
        if(customerEmails.includes(shoppingBaskets[index].email)) {
            continue;
        } 
        customerEmails.push(shoppingBaskets[index].email);
    }
    return customerEmails;
}

function requiredStock({shoppingBaskets}) {
    const stockRequired = [];
    const emailCheck = [];
    for(let basketIndex in shoppingBaskets) {
        if(shoppingBaskets[basketIndex].status === "PAID") {
            for(let itemsIndex in shoppingBaskets[basketIndex].items){
                let stock = {};
                if(emailCheck.includes(shoppingBaskets[basketIndex].items[itemsIndex].name)) {
                    for(let i = 0; i < stockRequired.length; i++){
                        if(stockRequired[i].name === shoppingBaskets[basketIndex].items[itemsIndex].name){
                            stockRequired[i].quantity += shoppingBaskets[basketIndex].items[itemsIndex].quantity;
                        };

                    }
                    continue;
                }
                stock.name = shoppingBaskets[basketIndex].items[itemsIndex].name;
                stock.quantity = shoppingBaskets[basketIndex].items[itemsIndex].quantity;
                stockRequired.push(stock);
                emailCheck.push(shoppingBaskets[basketIndex].items[itemsIndex].name); 
            };
        };
    }
    return stockRequired;
}

function totalSpent({email, shoppingBaskets}) {
    let totalExpense = 0;
    for(let basketIndex in shoppingBaskets){
        if(shoppingBaskets[basketIndex].email === email && shoppingBaskets[basketIndex].status === "PAID" || shoppingBaskets[basketIndex].email === email && shoppingBaskets[basketIndex].status === "DELIVERED") {
            for(let itemsIndex in shoppingBaskets[basketIndex].items){
                totalExpense += shoppingBaskets[basketIndex].items[itemsIndex].price * shoppingBaskets[basketIndex].items[itemsIndex].quantity;
            };
        };
    } 
    return totalExpense;
}

function topCustomers({shoppingBaskets}) {
    const customerExpenditure = [];
    const emails = [];
    for(let index in shoppingBaskets) {
        let tempData = {};
        if(emails.includes(shoppingBaskets[index].email)) {
            continue;
        }
        emails.push(shoppingBaskets[index].email);
        tempData.email = shoppingBaskets[index].email;
        tempData.total = totalSpent({email: shoppingBaskets[index].email, shoppingBaskets});
        customerExpenditure.push(tempData);
        tempData = {};
    }
    customerExpenditure.sort((a, b) => parseFloat(b.total) - parseFloat(a.total));
    return customerExpenditure;
}

function getCustomersWithOpenBaskets({shoppingBaskets}) {
    const openBasketEmails = [];
    for(let index in shoppingBaskets) {
        if(shoppingBaskets[index].status === "OPEN") {
            openBasketEmails.push(shoppingBaskets[index].email)
        };
    }
    return openBasketEmails;
}
