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
}
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
}
function callStored(){
    for ( var i = 0; i < localStorage.length; ++i ) {
        let guardados = localStorage.getItem(localStorage.key( i ));
        if( guardados == "adicionado"){
            let ableItem = document.getElementById(localStorage.key( i ));
            ableItem.style.display = "flex"
            console.log(ableItem)
        }
    }
}