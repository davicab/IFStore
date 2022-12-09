let currentPage = page;

switch (currentPage){
    case 'home' :
        selectProd()
    break;

    case 'produto':
        callStored()
        getSelect()
    break
    case 'cart':    
        // getSelect()
        callStored()
        getSum()
    break
    case 'profile':
        handleProfile()
    break
    case 'checkout':
        checkout()
    break
    case 'account':
        handleAccount()
    break
}

let ball = document.querySelector('.mini-ball')

function openMenu(){
    let menu = document.querySelector(".menu-mobile")
    let side = document.querySelector(".side-bar")
    menu.classList.toggle("opened")

    if(menu.classList.contains("opened")){
        side.classList.add("show-side")
    }else{
        side.classList.remove("show-side")
    }
    
}
function selectProd(){
    let produto = document.querySelectorAll('.slider-item')
    produto.forEach((item, index) =>{
        item.addEventListener(("click"), () =>{
            const select = "selecionado";
            let selecionado = `${item.id}`;
            let storedCart = localStorage.getItem(select);
            if(!storedCart){
                storedCart = selecionado;
                localStorage.setItem(select, selecionado)
            }
        })

    })

}
function getSelect(){
    let produto = document.querySelectorAll('.slider-item')
    const select = "selecionado";
    let storedCart = localStorage.getItem(select);
    produto.forEach((item, index) =>{
        let idNonSelected = item.id
        if(idNonSelected != storedCart){
            let removeNonSelected = document.getElementById(idNonSelected)
            removeNonSelected.style.display = "none"
            let selectItem = document.querySelector(".select-item")
            selectItem.style.opacity = "1"
        }

    })
    let crumbsName = document.querySelector(".itemName")
    if(crumbsName){
        crumbsName.innerHTML = `${storedCart}`
    }
}
function goBack(){
    history.back();
    localStorage.removeItem("selecionado");
}
if(currentPage == "home"){
// Slide Lista de Exercícios ---------------------------------------
let totalSlides = document.querySelectorAll('.slider-item').length;
let size = document.querySelectorAll('.slider-item')[0].offsetWidth;
let currentSlide = 0;
document.querySelector('.slider-width').style.width = `calc(${size} * ${totalSlides})`;
function goPrev() {
    currentSlide--;
    if(currentSlide < 0) {
        currentSlide = totalSlides -1;
    }
    // console.log(currentSlide);
    updateMargin();
}
function goNext() {
    currentSlide++;
    if(currentSlide > (totalSlides-1)) {
        currentSlide = 0;
    }
    // console.log(currentSlide);
    updateMargin();
}
function updateMargin() {
    let sliderItemWidth = document.querySelector('.slider-item').clientWidth + 4;
    let newMargin = (currentSlide * sliderItemWidth);
    let marginSlider = document.querySelector('.slider-width');
    marginSlider.style.marginLeft = `-${newMargin}px`;
}
setInterval(function() {
    goNext()
}, 5000);
}
function store(e){
    const add = 'adicionado';
    let storedCart = localStorage.getItem("selecionado");
    
    localStorage.setItem(storedCart, add)

    ball.style.opacity = "1"

    let target = e;
    e.classList.add("activ")
}

function callStored(){
    if(localStorage.length > 0){
        for ( let i = 0; i < localStorage.length; ++i ) {
            let guardados = localStorage.getItem(localStorage.key( i ));

            if( guardados == "adicionado"){
                let ableItem = document.getElementById(localStorage.key( i ));
                ableItem.classList.remove("d-none")
            }
        }
    }
}
function deleteItem(e){
    let element = e.parentNode
    let parentElement = element.parentNode
    let textDel = document.querySelector(".getId")
    textDel.innerHTML = `${parentElement.id}`
    let popDel = document.querySelector(".popDelete")
    popDel.classList.remove("moveOut")

    let yesDel = document.querySelector(".del-yes")
    let noDel = document.querySelector(".del-no")

    yesDel.addEventListener(("click"), () =>{
        localStorage.removeItem(parentElement.id)
        window.location.reload();
        popDel.classList.add("moveOut")
    })

    noDel.addEventListener(("click"), () =>{
        popDel.classList.add("moveOut")
    })

}
setInterval(function() {
    for ( let i = 0; i < localStorage.length; ++i ) {
        let guardados = localStorage.getItem(localStorage.key( i ));
        if( guardados == "adicionado"){
            ball.style.opacity = "1"
            let cartAnim = document.querySelector(".shop-cart")
            cartAnim.classList.add("animated")
        }
        
    }
}, 500);

function getSum(){
    let all_items = document.querySelectorAll(".selected-item")
    let valor = null;
    parseInt(valor)
    if(!all_items[0].classList.contains("d-none")){
        let value0 = all_items[0].dataset.value
        let string0 = parseInt(value0)
        valor += string0
    }
    if(!all_items[1].classList.contains("d-none")){
        let value1 = all_items[1].dataset.value
        let string1 = parseInt(value1)
        valor += string1
    }
    if(!all_items[2].classList.contains("d-none")){
        let value2 = all_items[2].dataset.value
        let string2 = parseInt(value2)
        valor += string2
    }
    let send_value = document.getElementById("receive-value")
    send_value.innerHTML = valor
    localStorage.setItem("valor", valor)

    let notific = document.querySelector(".notification")
    let total = document.querySelector(".cart-items")

    if(localStorage.getItem("valor") != "null"){
        total.classList.remove("d-none")
        notific.classList.add("d-none")
    }else{
        total.classList.add("d-none")
        notific.classList.remove("d-none")
    }
}

function handleProfile(){
    let adress = document.getElementById("adress")
    let payment = document.getElementById("payment")

    let form_adress = document.querySelector(".adress-form")
    let form_payment = document.querySelector(".payment-form")

    adress.addEventListener(("click"), () =>{
        if(!form_payment.classList.contains("invisible")){
            form_payment.classList.add("invisible")
        }
        form_adress.classList.remove("invisible")
    })
    payment.addEventListener(("click"), () =>{
        if(!form_adress.classList.contains("invisible")){
            form_adress.classList.add("invisible")
        }
        form_payment.classList.remove("invisible")
    })
}
function checkout(){
    let valueTo = localStorage.getItem("valor")
    let GoogleCharts = 'https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=';
    let imagemQRCode = GoogleCharts + "paga isso aqui no peaks, R$" + valueTo + " em: 00594950147";
    let box_img = document.getElementById("imageQRCode")
    box_img.src = imagemQRCode

    if(localStorage.getItem("logged") == "no"){
        window.location = "cart.html"
    }
}
function tryLog(){
    let isLogged = localStorage.getItem("logged")

    if(!isLogged){
        localStorage.setItem("logged" , "no")
    }
    
    if(isLogged == "no"){
        window.alert("Faca login")
        window.location = "account.html"
    }else{
        window.location = "checkout.html"
    }
}

function signIn(){
    if(localStorage.getItem("logged") != "null" || localStorage.getItem("logged") != "yes"){
        let email = document.getElementById("signEmail")
        let senha = document.getElementById("signPass")
        let popText = document.getElementById("receive-text")
        let popUpSign = document.querySelector(".popUp-account")
        
        let listUser = JSON.parse(localStorage.getItem('listaUser') || '[]')
        
        if(listUser && listUser != null && listUser.length > 0){
            for(let i = 0; i < listUser.length; i++){

                let storedEmail = listUser[i].email

                if(storedEmail == email.value){
                    
                    popText.innerHTML = "email ja cadastrado"
                    popUpSign.style.backgroundColor = "#ff2525"
                    return runPop();
                }
            }
        }
        listUser.push(
        {
            "email" : [email.value],
            "senha" : [senha.value]
        }
        )

        popText.innerHTML = "Cadastrado com sucesso"
        popUpSign.style.backgroundColor = "#a5ffa5"
        runPop()
    
        localStorage.setItem("listaUser", JSON.stringify(listUser))

        let logForm = document.querySelector(".loggin")
        if(logForm.classList.contains("d-none")){
            logForm.classList.remove("d-none")
        }
    }
}
function runPop(){
    let popUpSign = document.querySelector(".popUp-account")
    popUpSign.classList.remove("moveOut")

    setTimeout(() => {
        popUpSign.classList.add("moveOut")
    }, 3000)
}

function logIn(){
    let email = document.getElementById("logEmail")
    let senha = document.getElementById("logPass")

    let valEmail = email.value
    let valSenha = senha.value

    let listUser = JSON.parse(localStorage.getItem('listaUser'))
    
    if(listUser != null && listUser.length > 0){
        
        
        for(let i = 0; i < listUser.length; i++){

            let storedEmail = listUser[i].email
            let storedSenha = listUser[i].senha
            
            if(valEmail == storedEmail && valSenha != storedSenha){
                return window.alert("email ou senha errada")
            }
    
            if(valEmail != storedEmail && valSenha == storedSenha){
                return window.alert("email ou senha errada")
            }
    
            if(valEmail == storedEmail && valSenha == storedSenha){
                localStorage.setItem("logged", "yes")
                if(localStorage.getItem("valor") && localStorage.getItem("valor") != null){
                    window.location = "checkout.html"
                }else{
                    window.location = "index.html"
                }
            }
        }

    }
}


let logOut = document.querySelector(".logout-button")

if(localStorage.getItem("logged") == "yes"){
    logOut.classList.remove("d-none")
}
logOut.addEventListener(("click"), () =>{
    localStorage.setItem("logged" , "no")
    window.location.reload()
})

let breadClear = document.querySelector(".back-home")
if(breadClear){
    breadClear.addEventListener(("click") , () =>{
        localStorage.removeItem("selecionado")
    })
}

function handleAccount(){
    let logForm = document.querySelector(".loggin")
    let signForm = document.querySelector(".sign")

    if(localStorage.getItem("listaUser")){
        logForm.classList.remove("d-none")
    }

}