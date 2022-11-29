let currentPage = page;

switch (currentPage){
    case 'home' :
        selectProd()
    break;

    case 'produto':
        // store()
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
    var produto = document.querySelectorAll('.slider-item')
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
    var produto = document.querySelectorAll('.slider-item')
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
function store(){
    const add = 'adicionado';
    const notYet = 'nao'
    let storedCart = localStorage.getItem("selecionado");
    
    localStorage.setItem(storedCart, add)

    ball.style.opacity = "1"

}
function callStored(){
    if(localStorage.length > 0){
        for ( var i = 0; i < localStorage.length; ++i ) {
            let guardados = localStorage.getItem(localStorage.key( i ));
            let notific = document.querySelector(".notification")
            let total = document.querySelector(".cart-items")

            if( guardados == "adicionado"){
                var ableItem = document.getElementById(localStorage.key( i ));
                ableItem.classList.remove("d-none")
                if(notific){
                    notific.classList.add("d-none")
                    total.classList.remove("d-none")
                }
            }if( guardados == "selecionado"){
                if(notific){
                    notific.classList.remove("d-none")
                    total.classList.add("d-none")
                }
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
    for ( var i = 0; i < localStorage.length; ++i ) {
        let guardados = localStorage.getItem(localStorage.key( i ));
        if( guardados == "adicionado"){
            ball.style.opacity = "1"
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
    console.log(valor)
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