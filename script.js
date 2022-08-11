let modalQt = 1;

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

        // set pizzaJSON values at position X(key)
        s('.pizzaBig img').src = pizzaJson[key].img;
        s('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        s('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;  
        
        s('.pizzaInfo--size.selected').classList.remove('selected');
        // Set the size value for each pizzainfo--size
        sa('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if (sizeIndex == 2) {
                size.classList.add('selected');
            };

            s('.pizzaInfo--qt').innerHTML = modalQt;

            size.querySelector('span').innerHTML = pizzaJson[key].price[sizeIndex].size;
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