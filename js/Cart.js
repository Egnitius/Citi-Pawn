// open cart modal
const cart = document.querySelector('#cart');
const cartModalOverlay = document.querySelector('.cart-modal-overlay');

cart.addEventListener('click', () => {
  if (cartModalOverlay.style.transform === 'translateX(-200%)'){
    cartModalOverlay.style.transform = 'translateX(0)';
  } else {
    cartModalOverlay.style.transform = 'translateX(-200%)';
  }
})
// end of open cart modal

// close cart modal
const closeBtn = document.querySelector ('#close-btn');

closeBtn.addEventListener('click', () => {
  cartModalOverlay.style.transform = 'translateX(-200%)';
});

cartModalOverlay.addEventListener('click', (e) => {
  if (e.target.classList.contains('cart-modal-overlay')){
    cartModalOverlay.style.transform = 'translateX(-200%)'
  }
})
// end of close cart modal

// add products to cart and array

const cartItems = [];

const addToCart = document.getElementsByClassName('add-to-cart');
const productRow = document.getElementsByClassName('product-row');

for (var i = 0; i < addToCart.length; i++) {
  button = addToCart[i];
  button.addEventListener('click', addToCartClicked)
}

function addToCartClicked (event) {
  button = event.target;
  var cartItem = button.parentElement;
  var price = cartItem.getElementsByClassName('product-price')[0].innerText;
  var name = cartItem.getElementsByClassName('text-uppercase')[0].innerText;
  
  var imageSrc = cartItem.getElementsByClassName('product-image')[0].src;
  cartItems.push({ price: price, name: name, imageSrc: imageSrc });
  addItemToCart (price, name, imageSrc);
  updateCartPrice();

}

function addItemToCart (price, name, imageSrc) {
  var productRow = document.createElement('div');
  productRow.classList.add('product-row');
  var productRows = document.getElementsByClassName('product-rows')[0];
  var cartImage = document.getElementsByClassName('cart-image');
  
  for (var i = 0; i < cartImage.length; i++){
    if (cartImage[i].src == imageSrc){
      alert ('This item has already been added to the cart')
      return;
    }
  }
  
  var cartRowItems = `
  <div class="product-row">
        <img class="cart-image" src="${imageSrc}" alt="">
        <h5 style="color: white; font-size:16px; word-break: break-all;">${name}</h5>
        <span class ="cart-price">${price}</span>
        <input class="product-quantity" type="number" value="1">
        <button class="remove-btn">Remove</button>
        </div>
        
      `
  productRow.innerHTML = cartRowItems;
  productRows.append(productRow);
  productRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeItem)
  productRow.getElementsByClassName('product-quantity')[0].addEventListener('change', changeQuantity)
  updateCartPrice()
}
// end of add products to cart

// Remove products from cart
const removeBtn = document.getElementsByClassName('remove-btn');
for (var i = 0; i < removeBtn.length; i++) {
  button = removeBtn[i]
  button.addEventListener('click', removeItem)
}

function removeItem (event) {
  btnClicked = event.target
  btnClicked.parentElement.parentElement.remove()
  updateCartPrice()
}

// update quantity input
var quantityInput = document.getElementsByClassName('product-quantity')[0];

for (var i = 0; i < quantityInput; i++){
  input = quantityInput[i]
  input.addEventListener('change', changeQuantity)
}

function changeQuantity(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0){
    input.value = 1
  }
  updateCartPrice()
}
// end of update quantity input

// update total price
function updateCartPrice() {
  var total = 0
  for (var i = 0; i < productRow.length; i += 2) {
    cartRow = productRow[i]
  var priceElement = cartRow.getElementsByClassName('cart-price')[0]
  var quantityElement = cartRow.getElementsByClassName('product-quantity')[0]
  var price = parseFloat(priceElement.innerText.replace('R', ''))
  var quantity = quantityElement.value
  total = total + (price * quantity )
    
  }
  document.getElementsByClassName('total-price')[0].innerText =  'R' + total

document.getElementsByClassName('cart-quantity')[0].textContent = i /= 2
}
// end of update total price

// purchase items
const purchaseBtn = document.querySelector('.purchase-btn');

const closeCartModal = document.querySelector('.cart-modal');

purchaseBtn.addEventListener('click', purchaseBtnClicked)

function purchaseBtnClicked () {
  alert ('Thank you for your purchase');
  cartModalOverlay.style.transform= 'translateX(-100%)'
 var cartItems = document.getElementsByClassName('product-rows')[0]
 while (cartItems.hasChildNodes()) {
   cartItems.removeChild(cartItems.firstChild)
   
 }
  updateCartPrice()
}
// end of purchase items

//sending the email
function sendFormByEmail() {
  // Get the form fields
  var name = document.getElementById('fname').value;
  var email = document.getElementById('email').value;
  var address = document.getElementById('adr').value;
  var City = document.getElementById('city').value;
  var Province = document.getElementById('province').value;
  var Zip = document.getElementById('zip').value;

  // Build the email body
  var body = 'Name: ' + name + '\nEmail: ' + email + '\nAddress: ' + address + '\nCity: ' + City + '\nProvince: ' + Province + '\nZip: ' + Zip + '\n\n\nInvoice:';

  // Build the email link
  var subject = 'New form submission';
  var mailtoLink = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

  // Open the email client
  window.open(mailtoLink);
}
//end of sending the eamil

//generate an invoice

const invoiceBtn = document.getElementsByClassName('invoice-btn');
const invoiceTable = document.getElementById('invoice-table');

// create invoice table
function generateInvoice(cartItems) {
  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>Item Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Subtotal</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3">Total:</td>
        <td id="invoice-total"></td>
      </tr>
    </tfoot>
  `;

  const tbody = table.querySelector('tbody');
  let total = 0;

  for (const item of cartItems) {
    const row = document.createElement('tr');
    const price = parseFloat(item.price.replace('R', ''));
    const quantity = 1;
    const subtotal = price * quantity;
    total += subtotal;

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.price}</td>
      <td>${quantity}</td>
      <td>${subtotal.toFixed(2)}</td>
    `;

    tbody.appendChild(row);
  }

  const totalCell = table.querySelector('#invoice-total');
  totalCell.textContent = `R${total.toFixed(2)}`;

  return table;
}

//end generating an invoice



//add to invoice
// function generateInvoice() {
//   const invoiceItems = cartItems.map(item => {
//     return `
//       <div>
//         <img src="${item.imageSrc}" alt="${item.name}">
//         <div>
//           <h4>${item.name}</h4>
//           <p>Price: ${item.price}</p>
//         </div>
//       </div>
//     `;
//   }).join('');

//   const invoiceTotal = `
//     <div>
//       <h3>Total: ${document.querySelector('.total-price').textContent}</h3>
//     </div>
//   `;

//   const invoiceContent = `
//     <div>
//       <h2>Invoice</h2>
//       ${invoiceItems}
//       ${invoiceTotal}
//     </div>
//   `;

//   const invoiceModal = document.querySelector('.invoice-modal');
//   const invoiceOverlay = document.querySelector('.invoice-modal-overlay');

//   invoiceModal.innerHTML = invoiceContent;
//   invoiceOverlay.style.display = 'block';
// }
