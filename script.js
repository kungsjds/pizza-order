let modalQt = 1;
let modalKey = 0;
let cart = [];

const s = (el) => document.querySelector(el);
const sa = (el) => document.querySelectorAll(el);

// Fill the elements with values of the JSON
pizzaJson.map((item, index) =>{
    let pizzaItem = s('.models .pizza-item').cloneNode(true);

    // Set new attribute with the index number
    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price[2].value.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        // Block default action. The "a" element when clicked will not refresh the page, will not execute the href="".
        e.preventDefault();
        // .target is the selected element('a'). | .closest get the closest element of the target and after that get the attribute data-key
        let key = e.target.closest('.pizza-item').getAttribute('data-key');        
        modalQt = 1;
        modalKey = key;

        // set pizzaJSON values at position X(key)
        s('.pizzaBig img').src = pizzaJson[key].img;
        s('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        s('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;  
        
        s('.pizzaInfo--size.selected').classList.remove('selected');
        // Set the size value for each pizzainfo--size
        sa('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if (sizeIndex == 2) {
                size.classList.add('selected');
                s('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price[sizeIndex].value.toFixed(2)}`;
            };

            s('.pizzaInfo--qt').innerHTML = modalQt;

            size.querySelector('span').innerHTML = pizzaJson[key].price[sizeIndex].size;

            size.addEventListener('click', ()=>{
                // get the data-key attribute value from the clicked element
                let sizeKey = size.getAttribute('data-key');

                // Removes the 'selected' class and set to current element
                s('.pizzaInfo--size.selected').classList.remove('selected');
                size.classList.add('selected');                                

                s('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price[sizeKey].value.toFixed(2)}`;
            });
        });

        let pizzaWindowArea = s('.pizzaWindowArea');

        pizzaWindowArea.style.opacity = 0;
        pizzaWindowArea.style.display = 'flex';
        setTimeout(()=>{
            pizzaWindowArea.style.opacity = 1;
        }, 200);
    });

    s('.pizza-area').append(pizzaItem);
});

// Close pizza window area
function closeModal() {
    s('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        s('.pizzaWindowArea').style.display = 'none';
    }, 500);
};

// Set click event for each button
sa('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

s('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if (modalQt > 1) {
        modalQt--  
        s('.pizzaInfo--qt').innerHTML = modalQt;
    };
});

s('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    s('.pizzaInfo--qt').innerHTML = modalQt;
});

s('.pizzaInfo--addButton').addEventListener('click', ()=>{
    let size = parseInt(s('.pizzaInfo--size.selected').getAttribute('data-key'));
    let identifier = `${pizzaJson[modalKey].id}@${size}`;
    let key = cart.findIndex((item) => item.identifier == identifier);

    if (key > -1){
        cart[key].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalQt
        });
    }

    updateCart();
    closeModal();
});

function updateCart() {
    if (cart.length > 0) {      
        s('.cart').innerHTML = '';

        let subtotal = 0;
        let discount = 0;
        let total = 0;

        for (let i in cart) {
            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id);
            let cartItem = s('.models .cart--item').cloneNode(true);
            let cartSize = cart[i].size;

            let pizzaSize = '';

            switch(cartSize){
                case 0:
                    pizzaSize = 'P';
                    break;
                case 1:
                    pizzaSize = 'M';
                    break;
                case 2:
                    pizzaSize = 'G';
                    break;
            };

            let pizzaName = `${pizzaItem.name} (${pizzaSize})`;

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if (cart[i].qt > 1) {
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }

                updateCart();
            });

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++;
                updateCart();
            });

            subtotal += pizzaItem.price[cartSize].value * cart[i].qt;
            discount = subtotal * 0.1;
            total = subtotal - discount;

            s('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
            s('.desconto span:last-child').innerHTML = `R$ ${discount.toFixed(2)}`;
            s('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

            s('.cart').append(cartItem);
        };

        s('aside').classList.add('show');
    } else {
        s('aside').classList.remove('show');
    };
};