// NAVBAR

let logo = document.querySelector(".logoPresto");
let nav = document.querySelector(".stik-navbar");
let navbar = document.querySelector(".navbarPresto");

window.addEventListener( "scroll", ()=>{
    let scrolled = window.scrollY;
    if (scrolled > 0) {
        logo.src = "../img/shop_logo.png";
        logo.style.transform = "rotateY(180deg)";
        nav.style.backgroundColor = "#f1f1f1";
        navbar.style.backgroundColor = "#f1f1f1";
    } else {
        logo.src = "../img/shop_logo.png";
        logo.style.transform = "rotateY(0deg)";
        nav.style.backgroundColor = "white";
        navbar.style.backgroundColor = "white";
    }
})







fetch("../annunci.json")
.then(response => response.json())
.then(data => {
        console.log(data);

        let cardsWrapper = document.querySelector("#cardsWrapper");
        let wordInput = document.querySelector("#wordInput");
        let inputRange = document.querySelector("#inputRange");
        let numberPrice = document.querySelector("#numberPrice");
        let radioWrapper = document.querySelector("#radioWrapper");

    function setCategory() {
        let uniqueCategories = [];

        data.forEach(annuncio => {
            if(!uniqueCategories.includes(annuncio.category)){
            uniqueCategories.push(annuncio.category)
        }
        
        });
        uniqueCategories.forEach(category => {
            let div = document.createElement("div");
            div.classList.add("form-check");
            div.innerHTML = ` 
            <input class="form-check-input" type="radio" name="categories"
            id="${category}" checked>
            <label class="form-check-label" for="${category}">
            ${category}
            </label>
            `
            radioWrapper.appendChild(div);
        });
    }
    
    function createCards(array) {

        cardsWrapper.innerHTML = ``

        array.forEach(annuncio => {
            let div = document.createElement("div");
            div.classList.add("col-12", "col-md-3", "my-2");
            div.innerHTML = `
            <div class="card">
            
            <div class="position-relative overflow-hidden">
            <a href="#">
            <img src="../img/property-2.jpg" class="card-img-top card-zoom" alt="Villa">
            </a>
            
            <div class="position-absolute bottom-0 start-0 bg-white rounded-top mx-3 text-category">
            ${annuncio.category}
            </div>
            </div>
            
            <div class="card-body">
            <p class="text-price">
            $ ${annuncio.price}
            </p>
            <a href="#" class="text-decoration-none">
            <h5 class="card-title">${annuncio.name}</h5>
            </a>
            </div>
            </div>
            `
            cardsWrapper.appendChild(div);
        })
    }
    
    let radioCategories = document.querySelectorAll(".form-check-input");
    // Filtro categoria
    function filterByCategory(array) {



        let arrayFromNodelist = Array.from(radioCategories);
    
    
        let checkedCategory = arrayFromNodelist.find(radioButton => radioButton.checked);
        let category = checkedCategory.id;
        


        if (category == "All") {
            return array;
        } else {
        let filtered = array.filter(annuncio => annuncio.category == category);
            return filtered;
        }
    }
    
    
    
    createCards(data);
    setCategory();
    
    

    radioCategories.forEach(radioButton => {


        radioButton.addEventListener("click", () => {
            globalFilter();
        })

        let category = radioButton.id;
        filterByCategory(category);
    })

    function setInputPrice() {
        let prices = data.map(annuncio => Number(annuncio.price))

        prices.sort((a, b)=> a-b)
        let maxPrice = prices.pop();

        // prices,sort((a, b)=> b-a)
        // let minPrice = prices.pop();
        // console.log(maxPrice, minPrice);

        inputRange.max = maxPrice;
        inputRange.value = maxPrice;
        numberPrice.innerHTML = `${maxPrice} $`
    }



    function filterByPrice(array) {
        let filtered = array.filter( annuncio => Number(annuncio.price) <= Number(numero))
        return filtered;
    }

    setInputPrice();

    function filterByPrice(numero) {
        
    }



    inputRange.addEventListener("input", ()=>{
        globalFilter();
        numberPrice.innerHTML = `${inputRange.value} $`
    })


    setInputPrice();



    function filterByWord(array) {
        let filtered = array.filter (annuncio => annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase()));
        return filtered;
    }


        wordInput.addEventListener("input", ()=> {
            setTimeout(()=> {
                globalFilter();

            }, 700)
        })

        function globalFilter() {
            let resultFilteredByCategory = filterByCategory(data);
            let resultFilteredByPrice = filterByPrice(resultFilteredByCategory);
            let resultFilteredByWord = filterByWord(resultFilteredByPrice);
            createCards(resultFilteredByWord);
        }


})