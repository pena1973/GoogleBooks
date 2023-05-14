import Book from '.././src/Book.js';
// import '.././styles/style.css';
// корзина покупок
let cart = [];
// массив книг кеш книг чтоб заново не прогружать на повторе
let books = [];
// массив категорий
let categories = [
  'Whithout category',
  // 'Architecture',
  // 'Art & Fashion',
  // 'Biography',
  // 'Business',
  // 'Crafts & Hobbies',
  // 'Drama',
  // 'Fiction',
  // 'Food & Drink',
  // 'Health & Wellbeing',
  // 'History & Politics',
  // 'Humor',
  // 'Poetry',
  // 'Psychology',
  // 'Science',
  // 'Technology',
  // 'Travel & Maps'
];
// старт по умолчанию с первой
let currentCategory = categories[0];
// текущий индекс загрузки 6 книг
let currentCount = 0;
// кнопка подгрузить еще
const btn = document.querySelector('.catalog-download-btn');
// Элемент меню
const menu = document.querySelector('.catalog-menu-nav');
// Элемент где hазмещаю книгм
const catalog = document.querySelector('.catalog-show');
// Элемент где размещаю количество покупок
const purchase = document.querySelector('.header-icons-item-count');

// слайдер
let images = [{
  url: "./images/slide1.jpg",
  title: "Слайд1"
}, {
  url: "./images/slide2.jpg",
  title: "Слайд2"
}, {
  url: "./images/slide3.jpg",
  title: "Слайд3"
},];
// запуск слайдера
function initSlider(options) {
  if (!images || !images.length) return;

  options = options || {
    // titles: false,
    dots: true,
    autoplay: false
  };

  let sliderImages = document.querySelector(".slider-images");
  let sliderDots = document.querySelector(".slider-dots");

  initImages();

  if (options.dots) {
    initDots();
  }

  if (options.autoplay) {
    initAutoplay();
  }

  function initImages() {
    images.forEach((image, index) => {
      let imageDiv = `<div class="image n${index} ${index === 0 ? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
      sliderImages.innerHTML += imageDiv;
    });
  }


  function initDots() {
    images.forEach((image, index) => {
      let dot = `<div class="slider-dots-item n${index} ${index === 0 ? "active" : ""}" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });
    sliderDots.querySelectorAll(".slider-dots-item").forEach(dot => {
      dot.addEventListener("click", function () {
        moveSlider(this.dataset.index);
      })
    })
  }

  function moveSlider(num) {
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(".n" + num).classList.add("active");
    if (options.dots) {
      sliderDots.querySelector(".active").classList.remove("active");
      sliderDots.querySelector(".n" + num).classList.add("active");
    }
  }

  function initAutoplay() {
    setInterval(() => {
      let curNumber = +sliderImages.querySelector(".active").dataset.index;
      let nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
      moveSlider(nextNumber);
    }, options.autoplayInterval);
  }
}
// настройки слайдера
let sliderOptions = {
  dots: true,
  titles: true,
  autoplay: false,
  autoplayInterval: 5000
};

// Нарисуем меню
function initMenu() {
  menu.innerHTML = '';
  let active = false;
  categories.forEach(element => {
    active = (currentCategory === element);
    if (active) {
      menu.innerHTML += `<li class="catalog-menu-nav-item active" data-category="${element}"><a href="#a1" data-category="${element}">${element}</a></li>`;
      //  active = false;
    }
    else menu.innerHTML += `<li class="catalog-menu-nav-item" data-category="${element}"><a href="#a1" data-category="${element}">${element}</a></li>`;
  }
  );
}
// работа с АПИ  
const useRequest = () => {  
  
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=""subject:${(currentCategory ==='Whithout category')?'':currentCategory}""&key=AIzaSyCCjrE5pqwH7hoFMHZ3IhEcNp8U-Imtu3w&printType=books&startIndex=${currentCount}&maxResults=6&langRestrict=en`)
    .then((response) => {
      return response.json();
    })
    .then((json) => { return json; })
    .catch(
      (e) => { console.log('error'+ e) 
    });
}

// загружаем 6 книг из апи
async function load6books() {
  const requestResult = await useRequest();
  processRequestResult(requestResult);
  currentCount += 6;
  renderBooks();
}

// обработка результата загрузки очередной партии
function processRequestResult(requestResult) {
  // данные апи по 6 книгам
  
  let newItems = requestResult.items;  
  // если результат не удался выхожу
    if (!newItems) return; 
  // обрабатываю
  newItems.forEach(element => {
    let id = element?.id;
    let selfLink = element?.selfLink;
    //название
    let title = element?.volumeInfo?.title;
    title = (title.length>40)? title.slice(0, 40)+'...':title;
   // описание
    let description = (!element?.volumeInfo?.subtitle)? '':element?.volumeInfo?.subtitle;
    description = (description.length>100)? description.slice(0, 100)+'...':description;
    // авторы в строку
    let authorsArray = element?.volumeInfo?.authors;
    let authors = '';
    if (authorsArray) {
      authors = authorsArray.join(',');
    }
    // обложка ссылка если нет заменяю на свою картинку
    let imageLinks = (!element?.volumeInfo?.imageLinks?.smallThumbnail)? './images/book.jpg':element?.volumeInfo?.imageLinks?.smallThumbnail;
    //let imageLinks = element?.volumeInfo?.imageLinks?.smallThumbnail;
    // оценку в ответе апи не нашла
    let esteeme = -1;
    // отзывы заменила страницами книги 
    let review =(!element?.volumeInfo?.pageCount)? -1:element?.volumeInfo?.pageCount;
    //let review = element?.volumeInfo?.pageCount;
    
    //цена и валюта
    let price = -1;
    let currency = '';
    if (element?.saleInfo?.saleability != "NOT_FOR_SALE") {
      price =(!element?.saleInfo?.retailPrice?.amount)? -1:element?.saleInfo?.retailPrice?.amount;
      //price = element?.saleInfo?.retailPrice?.amount;
      currency =(!element?.saleInfo?.retailPrice?.currencyCode)? '':element?.saleInfo?.retailPrice?.currencyCode;
      //currency = element?.saleInfo?.retailPrice?.currencyCode;
    }

    let bookCategories = element?.volumeInfo?.categories;
    if (!bookCategories){
      // categories.push('Whithout category');
      bookCategories = ['Whithout category']
    }
    else
      bookCategories.forEach(category => { if (!categories.includes(category)) categories.push(category); });
    
    // перерисую потому что добавляются новые категории при загрузе
    initMenu();
    let book = new Book(id, selfLink, title, description, authors, imageLinks, esteeme, review, price, currency, bookCategories);
    // если нет такой книги то добавим в массив
    let found = books.find(element => element.id === id);
    if (!found) { books.push(book); }

  });
  // сортирую книги по id
  books.sort((a, b) => {
    const idA = a.getid();
    const idB = b.getid();
    if (idA > idB) {
      return -1;
    }
    if (idA < idB) {
      return 1;
    }
    // names must be equal
    return 0;
  })

}
// прорисовка  массива книг c фильтром на категорию
function renderBooks() {
  //  console.log(books); 
  catalog.innerHTML = '';
  let filteredBook = books.filter(book => book.categoryIncluded(currentCategory));

  filteredBook.forEach(book => {
    book.render(catalog,cart);
  });
}

function putToCart(id, bookBtn) {
  if (cart.includes(id)) {
    cart = cart.filter((element) => element !== id)    
    bookBtn.innerHTML = 'by now';
  }
  else {
    cart.push(id)
    bookBtn.innerHTML = 'in the cart';
  }
  purchase.innerHTML = cart.length;
}


document.addEventListener("DOMContentLoaded", function () {
  initSlider(sliderOptions);
  initMenu();
  load6books();
});

// нажатие на меню категорий , меню динамическое подгружаемое
document.addEventListener("click", function (ev) {
  if (ev.target.dataset.category != undefined) { // если есть атрибут...
    currentCategory = ev.target.dataset.category;
    initMenu(); // отобразим меню
    renderBooks();// перерисовываю загруженые книги
  }
  
  if (ev.target.dataset.id != undefined) { // если есть атрибут...
    putToCart(ev.target.dataset.id,ev.target);     
  }
});


// Загруз 6 книг по  кнопке больше внизу
// загружается без категорий потому что это в апи не работает
btn.addEventListener("click", function () {
  load6books();
})