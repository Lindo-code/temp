const fs = require("fs");
const customer = {
    shoppingBaskets: {data: fetchData()}, 
    email: {address:"tshepo@umuzi.org"}
};
const {shoppingBaskets, email} = customer;

function fetchData() {
    try {
      const jsonData = fs.readFileSync("./data.json");
      const data = JSON.parse(jsonData);
      return data;
    } catch (err) {
      console.log(err);
      return;
    };
}

function getCustomerBaskets({shoppingBaskets, email}) {
    const customerBaskets = [];
    for(let index in shoppingBaskets.data) {
        if(email.address === shoppingBaskets.data[index].email) {
            let basket = {};
            basket.email = shoppingBaskets.data[index].email;
            basket.status = shoppingBaskets.data[index].status;
            basket.items = [];
            shoppingBaskets.data[index].items.forEach(item => {
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
    for(let index in shoppingBaskets.data) {
        if(customerEmails.includes(shoppingBaskets.data[index].email)) {
            continue;
        } 
        customerEmails.push(shoppingBaskets.data[index].email);
    }
    return customerEmails;
}

function requiredStock({shoppingBaskets}) {
    const stockRequired = [];
    const emailCheck = [];
    for(let basketIndex in shoppingBaskets.data) {
        if(shoppingBaskets.data[basketIndex].status === "PAID") {
            for(let itemsIndex in shoppingBaskets.data[basketIndex].items){
                let stock = {};
                if(emailCheck.includes(shoppingBaskets.data[basketIndex].items[itemsIndex].name)) {
                    for(let i = 0; i < stockRequired.length; i++){
                        if(stockRequired[i].name === shoppingBaskets.data[basketIndex].items[itemsIndex].name){
                            stockRequired[i].quantity += shoppingBaskets.data[basketIndex].items[itemsIndex].quantity;
                        };

                    }
                    continue;
                }
                stock.name = shoppingBaskets.data[basketIndex].items[itemsIndex].name;
                stock.quantity = shoppingBaskets.data[basketIndex].items[itemsIndex].quantity;
                stockRequired.push(stock);
                emailCheck.push(shoppingBaskets.data[basketIndex].items[itemsIndex].name); 
            };
        };
    }
    return stockRequired;
}

function totalSpent({email, shoppingBaskets}) {
    let totalExpense = 0;
    for(let basketIndex in shoppingBaskets.data){
        if(shoppingBaskets.data[basketIndex].email === email.address && shoppingBaskets.data[basketIndex].status === "PAID" || shoppingBaskets.data[basketIndex].email === email.address && shoppingBaskets.data[basketIndex].status === "DELIVERED") {
            for(let itemsIndex in shoppingBaskets.data[basketIndex].items){
                totalExpense += shoppingBaskets.data[basketIndex].items[itemsIndex].price * shoppingBaskets.data[basketIndex].items[itemsIndex].quantity;
            };
        };
    } 
    return totalExpense;
}

function topCustomers({shoppingBaskets}) {
    const customerExpentiture = [];
    const emails = [];
    for(let index in shoppingBaskets.data) {
        let tempData = {};
        if(emails.includes(shoppingBaskets.data[index].email)) {
            continue;
        }
        emails.push(shoppingBaskets.data[index].email);
        tempData.email = shoppingBaskets.data[index].email;
        tempData.total = totalSpent({email: {address: shoppingBaskets.data[index].email}, shoppingBaskets: {data: shoppingBaskets.data}});
        customerExpentiture.push(tempData);
        tempData = {};
    }
    customerExpentiture.sort((a, b) => parseFloat(b.total) - parseFloat(a.total));
    return customerExpentiture;
}

function getCustomersWithOpenBaskets({shoppingBaskets}) {
    const openBasketEmails = [];
    for(let index in shoppingBaskets.data) {
        if(shoppingBaskets.data[index].status === "OPEN") {
            openBasketEmails.push(shoppingBaskets.data[index].email)
        };
    }
    return openBasketEmails;
}
