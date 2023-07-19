/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  ("use strict");

  const select = {
    templateOf: {
      menuProduct: "#template-menu-product",
    },
    containerOf: {
      menu: "#product-list",
      cart: "#cart",
    },
    all: {
      menuProducts: "#product-list > .product",
      menuProductsActive: "#product-list > .product.active",
      formInputs: "input, select",
    },
    menuProduct: {
      clickable: ".product__header",
      form: ".product__order",
      priceElem: ".product__total-price .price",
      imageWrapper: ".product__images",
      amountWidget: ".widget-amount",
      cartButton: '[href="#add-to-cart"]',
    },
    widgets: {
      amount: {
        input: 'input[name="amount"]',
        linkDecrease: 'a[href="#less"]',
        linkIncrease: 'a[href="#more"]',
      },
    },
  };

  const classNames = {
    menuProduct: {
      wrapperActive: "active",
      imageVisible: "active",
    },
  };

  const settings = {
    amountWidget: {
      defaultValue: 1,
      defaultMin: 1,
      defaultMax: 9,
    },
  };

  const templates = {
    menuProduct: Handlebars.compile(
      document.querySelector(select.templateOf.menuProduct).innerHTML
    ),
  };

  class Product {
    constructor(id, data) {
      const thisProduct = this;
      thisProduct.id = id;
      thisProduct.data = data;
      
      thisProduct.renderInMenu();
      console.log('new Product:', thisProduct);

      thisProduct.initAccordion();
    }
  
renderInMenu(){
  const thisProduct = this;

  getElements(){
    const thisProduct = this;

    thisProduct.renderInMenu();

    thisProduct.accordionTrigger.addEventListener('click', function(event) {
  
    thisProduct.accordionTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
    thisProduct.form = thisProduct.element.querySelector(select.menuProduct.form);
    thisProduct.formInputs = thisProduct.form.querySelectorAll(select.all.formInputs);
    thisProduct.cartButton = thisProduct.element.querySelector(select.menuProduct.cartButton);
    thisProduct.priceElem = thisProduct.element.querySelector(select.menuProduct.priceElem);
    thisProduct.imageWrapper = thisProduct.element.querySelector(select.menuProduct.imageWrapper);
  }
}
  initAccordion(){
    const thisProduct = this;
  }

/* DONE find the clickable trigger (the element that should react to clicking) */
    // const clickableTrigger = thisProduct.element.querySelector(select.menuProduct.clickable); zmiana na thisProduct.accordionTrigger

    /* DONE START: add eventListener to clickable trigger on event click */
    thisProduct.dom.accordionTrigger.addEventListener('click', function(event){

      /* DONE prevent default action for event */
      event.preventDefault();

      /* DONE find active product (product that has active class) */
      const activeProducts = document.querySelectorAll(select.all.menuProductsActive);
         

      /* DONE START a loop for every active product */
      for(let activeProduct of activeProducts){

        /* DONE if there is active product and it's not thisProduct.element, remove class active from it */
        if(activeProduct !== thisProduct.element){
          activeProduct.classList.remove(classNames.menuProduct.wrapperActive);
        }
        /* DONE END a loop for every active product */
      }

      /* DONE toggle active class on thisProduct.element */
      thisProduct.element.classList.toggle(classNames.menuProduct.wrapperActive);
    });
  }

  initData: function(){
    const thisApp = this;

    thisApp.data = dataSource;
  },

  const app = {
    const thisApp = this;
    console.log('thisApp.data:', thisApp.data);
    
    for (let productData in thisApp.data.products) {
      new Product(productData, thisApp.data.products[productData]);
    }

    },
    init: function () {
      const thisApp = this;
      console.log("*** App starting ***");
      console.log("thisApp:", thisApp);
      console.log("classNames:", classNames);
      console.log("settings:", settings);
      console.log("templates:", templates);

      thisApp.initData();
      thisApp.initMenu();
    },
  };

  app.init();
}
