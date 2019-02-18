let loadProducts = function () {
    fetch(`${location.href}products`)
    .then(res => res.json())
    .then(response => {
        let root = document.getElementById('root');
        let productsContainer = document.createElement('div');
        productsContainer.classList.add('products-container');
        root.appendChild(productsContainer);
        let renderProduct = function(_name,_price,_src) {
            let cont = document.createElement('div');
            let imgCont = document.createElement('div');
            let price = document.createElement('div');
            let name = document.createElement('div');
            let img = document.createElement('img');
            cont.classList.add('product');
            imgCont.classList.add('product__img');
            price.classList.add('product__name');
            img.setAttribute('src',_src);
            price.innerHTML = 'Price: '+_price;
            name.innerHTML = 'Name: '+_name;
            imgCont.appendChild(img);
            cont.appendChild(imgCont);
            cont.appendChild(name);
            cont.appendChild(price);
            productsContainer.appendChild(cont);
        }
        response.products.forEach(product => {
            renderProduct(product.name,product.price,'https://picsum.photos/200/200');
        });
    })
    .catch(err => {
        console.error(err);
    })
}

let renderHeader = function() {
    let header = document.createElement('header');
    header.classList.add('main-header');
    let registerBtn = document.createElement('button');
    let loginBtn = document.createElement('button');
    registerBtn.innerHTML = 'Register';
    registerBtn.setAttribute('id','registerBtnTop');
    loginBtn.innerHTML = 'Login';
    loginBtn.setAttribute('id','loginBtn');
    header.appendChild(registerBtn);
    header.appendChild(loginBtn);
    root.appendChild(header);

    [registerBtn,loginBtn].forEach(btn => {
        btn.addEventListener('click',function(){
            let container = document.querySelector('.products-container');
            renderForms(container);
        });
    })
}


let userRegistration = function() {
    let email = document.getElementById('email');
    let pass = document.getElementById('password');
    let btn = document.getElementById('registerBtn');
    let output = document.getElementById('output');
    btn.addEventListener('click',function(e){
        e.preventDefault();
        fetch(`${location.href}user/signup`, {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                email:  email.value,
                password: pass.value
            })
        })
        .then(res => res.json())
        .then(info => {
            // console.log(info);
            output.innerHTML = info.message;
        })
        .catch(err => {
            console.error(err);
        })
    });
}

let productInsertion = function() { 
    let name = document.getElementById('productName');
    let price = document.getElementById('productPrice');
    let btn = document.getElementById('insertProductBtn');
    let output2 = document.getElementById('output2');
    btn.addEventListener('click',function(e){
        e.preventDefault();
        fetch(`${location.href}products`, {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                productName:  name.value,
                productPrice: price.value
            })
        })
        .then(res => res.json())
        .then(info => {
            // console.log(info);
            output2.innerHTML = info.message;
        })
        .catch(err => {
            console.error(err);
        })
    });
}

let renderForms = function(cont) {
    let forms = `<div class="user-form">
                    <h1>User Registration</h1>
                    <form>
                        <input type="text" name="email" id='email'>
                        <input type="password" name='password' id='password'>
                        <button id="registerBtn">Register</button>
                    </form>
                    <div id="output"></div>
                </div>
                <br><br>
                <div class="product-form">
                    <h1>Product Insertion</h1>
                    <form>
                        <input type="text" name="productName" id='productName'>
                        <input type="number" name='productPrice' id='productPrice'>
                        <button id="insertProductBtn">Insert</button>
                    </form>
                    <div id="output2"></div>
                </div>`;
        cont.innerHTML = forms;
        userRegistration();
        productInsertion();
}

// fetch(`${location.href}products`, {
//     method: "get",
//     headers: {
//         "Accept": "application/json",
//         "Content-Type": "application/json"
//     }
// })
// .then(res => res.json())
// .then(info => {
//     // console.log(info);
//     console.log(res)
// })
// .catch(err => {
//     console.error(err);
// })


// tk.addEventListener('click',function(){
//     fetch(`${location.href}products`)
//     .then(res => res.json())
//     .then(products => {
//         console.log(products);
//         // products.forEach(product => {
//         //     console.log(product)            
//         // });

//     })
//     .catch(err => {
//         console.error(err);
//     })
// }); 



renderHeader();
loadProducts();
// userRegistration();
// productInsertion();