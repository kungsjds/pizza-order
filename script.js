const s = (el) => document.querySelector(el);
const sa = (el) => document.querySelectorAll(el);

// Fill the elements with values of the JSON
pizzaJson.map((item, index) =>{
    let pizzaItem = s('.models .pizza-item').cloneNode(true);

    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price[0].value.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        // Block default action. The "a" element when clicked will not refresh the page, will not execute the href="".
        e.preventDefault();

        let pizzaWindowArea = s('.pizzaWindowArea');

        pizzaWindowArea.style.opacity = 0;
        pizzaWindowArea.style.display = 'flex';
        setTimeout(()=>{
            pizzaWindowArea.style.opacity = 1;
        }, 200);
    });

    s('.pizza-area').append(pizzaItem);
});