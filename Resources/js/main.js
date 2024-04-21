let logo = document.querySelector(".logoPresto");
let nav = document.querySelector(".stik-navbar");
let navbar = document.querySelector(".navbarPresto");

window.addEventListener( "scroll", ()=>{
    let scrolled = window.scrollY;
    if (scrolled > 0) {
        logo.src = "../resources/img/shop_logo.png";
        logo.style.transform = "rotateY(180deg)";
        nav.style.backgroundColor = "#f1f1f1";
        navbar.style.backgroundColor = "#f1f1f1";
    } else {
        logo.src = "././resources/img/shop_logo.png";
        logo.style.transform = "rotateY(0deg)";
        nav.style.backgroundColor = "white";
        navbar.style.backgroundColor = "white";
    }
})


// Incremento numeri

if(document.querySelector("#firstNumber") != null){

    
    let counter = 0;
    let firstNumber = document.querySelector("#firstNumber");
    let secondNumber = document.querySelector("#secondNumber");
    let thirdNumber = document.querySelector("#thirdNumber");
    
    
    function createInterval(element, final, number) {
        let interval = setInterval ( ()=> {
            if (counter < final){
                counter++;
                element.innerHTML = counter;
            } else {
                clearInterval(interval);
            }
        }, number)
    }
    
    
    // Intersection
    let checked = false;
    
    let observer = new IntersectionObserver ( (el)=>{
        el.forEach( (el)=> {
            if(el.isIntersecting && checked == false){
                createInterval(firstNumber, 100, 10);
                createInterval(secondNumber, 500, 10);
                createInterval(thirdNumber, 1000, 10);
                checked = true;
            }
        })
    } )
    
    observer.observe(thirdNumber);
}