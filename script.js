async function getMenu() {
    const response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
    const menuItems = await response.json();

    const menuDiv = document.getElementById('menu');

    menuItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('menu-item');
        
        
        const img = document.createElement('img');
        img.src = item.imgSrc;
        img.alt = item.name;
        
        const name = document.createElement('h3');
        name.innerText = item.name;

        const price = document.createElement('p');
        price.innerText = `$${item.price.toFixed(2)}`;

        const addButton = document.createElement('button');
        addButton.innerHTML = '<i class="fa-solid fa-plus"></i>';
        addButton.classList.add('add-btn');
        
        itemDiv.appendChild(img);
        itemDiv.appendChild(name);
        itemDiv.appendChild(price);
        itemDiv.appendChild(addButton);
        
        menuDiv.appendChild(itemDiv);
    });
}

function TakeOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const order = {
                burgers: ["Burger1", "Burger2", "Burger3"], 
            };
            resolve(order);
        }, 2500);
    });
}

function orderPrep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1500);
    });
}

function payOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}

function thankyouFnc() {
    alert('Thank you for eating with us today!');
}

function handleOrderProcess() {
    TakeOrder()
        .then(order => {
            console.log('Order taken:', order);
            return orderPrep();
        })
        .then(orderStatus => {
            console.log('Order prepared:', orderStatus);
            return payOrder();
        })
        .then(paymentStatus => {
            console.log('Payment complete:', paymentStatus);
            if (paymentStatus.paid) {
                thankyouFnc();
            }
        })
        .catch(error => console.error('Error:', error));
}

document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('add-btn')) {
        handleOrderProcess();
    }
});

window.onload = function() {
    getMenu();
};
