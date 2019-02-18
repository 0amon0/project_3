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
    let output = document.getElementById('output2');

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


userRegistration();
productInsertion();