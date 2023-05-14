
export default class Book {
    #id = '';
    #selfLink = '';
    #title = '';
    #description = '';
    #authors = '';
    #imageLinks = '';
    // -1 - считаю что его нет по умолчанию
    #esteeme = -1;
    #review = -1;
    #price = -1;
    #currency = '';
    #categories = [];

    constructor(id, selfLink, title, description, authors, imageLinks, esteeme, review, price, currency,categories) {
        this.#id = id;
        this.#selfLink = selfLink;
        this.#title = title;
        this.#description = description;
        this.#authors = authors;
        this.#imageLinks = imageLinks;
        this.#esteeme = esteeme;
        this.#review = review;
        this.#price = price;
        this.#currency = currency;
        this.#categories.push(...categories);
    }

    getid() {
        return this.#id;
    }
    categoryIncluded(currentCategory) {
        return this.#categories.includes(currentCategory);
    }
    render(catalog,cart) {
       cart.includes(this.#id) 

        let imageLinks = (!this.#imageLinks)? './images/book.jpg':this.#imageLinks;
let innerHTML =
    `<div class="catalog-show-block" data-id="${this.#id}">
        <div class="catalog-show-block-frame"><img class="catalog-show-block-img" src="${imageLinks}" alt="book.jpg">
        </div>
        
        <div class="catalog-show-block-info">
           <p class="catalog-show-block-info-autor">${this.#authors}</p>
           <p class="catalog-show-block-info-name"></span>${this.#title}</p>
        
           <div class="catalog-show-block-info-esteeme">`;
           // звездочки
           if(this.#esteeme!=-1) innerHTML+=` <div class="catalog-show-block-info-esteeme-stars">
                  <img class="catalog-show-block-info-esteeme-star" src="${(this.#esteeme > 0 ? './images/star_gold.svg' : './images/star_gray.svg')}"
                       alt="star_gold.svg">
                  <img class="catalog-show-block-info-esteeme-star" src="${(this.#esteeme > 1 ? './images/star_gold.svg' : './images/star_gray.svg')}"
                       alt="star_gold.svg">
                  <img class="catalog-show-block-info-esteeme-star" src="${(this.#esteeme > 2 ? './images/star_gold.svg' : './images/star_gray.svg')}"
                       alt="star_gray.svg">
                  <img class="catalog-show-block-info-esteeme-star" src="${(this.#esteeme > 3 ? './images/star_gold.svg' : './images/star_gray.svg')}"
                       alt="star_gray.svg">
                  <img class="catalog-show-block-info-esteeme-star" src="${(this.#esteeme > 4 ? './images/star_gold.svg' : './images/star_gray.svg')}"
                       alt="star_gray.svg">
               </div>`;
               // отзывы
             if(this.#review!=-1) innerHTML+=`<p class="catalog-show-block-info-esteeme-review">${this.#review} review</p>`;
           
               
           innerHTML+=`</div>
                
           <p class="catalog-show-block-info-description"></span>${this.#description}</p>`;
           // цена
           if(this.#price!=-1) innerHTML+=`<p class="catalog-show-block-info-price"></span>${this.#price+' '+ this.#currency}</p>`;
        
        innerHTML+= `<button class="catalog-show-block-info-btn" data-id="${this.#id}" >${cart.includes(this.#id)?'in the cart':'buy now' }</button>
        </div>
    </div>`;
        catalog.innerHTML += innerHTML;
    }
  
}
