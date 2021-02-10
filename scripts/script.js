// Script.js
function update(elem) {
  const shadow = elem.shadowRoot;
  shadow.querySelector('img').setAttribute('src', elem.getAttribute('img'))
  shadow.querySelector('img').setAttribute('alt', elem.getAttribute('alt'));
  shadow.querySelector('.title').textContent = elem.getAttribute('title')
  shadow.querySelector('.price').textContent = elem.getAttribute('price')
  shadow.querySelector('.product').setAttribute('data-id', elem.getAttribute('data-id'))
  let cart = JSON.parse(window.localStorage.getItem('cart'))
  if (cart && cart.includes(elem.getAttribute('data-id'))) {
    shadow.querySelector('button').textContent = 'Remove from Cart'
    let temp = document.getElementById('cart-count').textContent
    document.getElementById('cart-count').textContent = parseInt(temp) + 1
    shadow.querySelector('button').setAttribute('onclick', "alert('Removed from Cart!')")
  }
}

function addItem(elem) {
  let myStorage = window.localStorage;
  if (!myStorage.getItem('cart')) {
    cart = [elem.getAttribute('data-id')]
    myStorage.setItem('cart', JSON.stringify(cart));
  } else {
    cart = JSON.parse(myStorage.getItem('cart'));
    cart.push(elem.getAttribute('data-id'))
    myStorage.setItem('cart', JSON.stringify(cart));
  }
}

function removeItem(elem) {
  let myStorage = window.localStorage;
  if (!myStorage.getItem('cart')) {
  } else {
    cart = JSON.parse(myStorage.getItem('cart'));
    cart.forEach(item => {
      if (item === elem.getAttribute('data-id').toString()) {
        cart.splice(cart.indexOf(item), 1);
        return
      }
    })
    myStorage.setItem('cart', JSON.stringify(cart));
  }
}


window.addEventListener('DOMContentLoaded', () => {
  // TODO
  let myStorage = window.localStorage;
  if (!myStorage.getItem('products')) {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        myStorage.setItem('products', JSON.stringify(data));
        const products = JSON.parse(myStorage.getItem('products'));
        products.forEach(product => {
          let temp = document.createElement('product-item');
          temp.setAttribute('price', '$' + product.price);
          temp.setAttribute('title', product.title);
          temp.setAttribute('img', product.image);
          temp.setAttribute('alt', product.title);
          temp.setAttribute('data-id', product.id)
          document.getElementById('product-list').appendChild(temp);
        })
      });
  } else {
    const products = JSON.parse(myStorage.getItem('products'));
    products.forEach(product => {
      let temp = document.createElement('product-item');
      temp.setAttribute('price', '$' + product.price);
      temp.setAttribute('title', product.title);
      temp.setAttribute('img', product.image);
      temp.setAttribute('alt', product.title);
      temp.setAttribute('data-id', product.id)
      document.getElementById('product-list').appendChild(temp);
    })
  }

});

