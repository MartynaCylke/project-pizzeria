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
      thisProduct.getElements();
      thisProduct.initAccordion();
      thisProduct.initOrderForm();
      thisProduct.processOrder();
      console.log("new Product:", thisProduct);
    }

    renderInMenu() {
      const thisProduct = this;

      /*generate HTML based on template */
      const generateHTML = templates.menuProduct(thisProduct.data);

      /*create element using utils.createElementFromHTML */
      thisProduct.element = utils.createDOMFromHTML(generateHTML);

      /*find menu container */
      const menuContainer = document.querySelector(select.containerOf.menu);

      /*add element to menu */
      menuContainer.appendChild(thisProduct.element);
    }
<<<<<<< HEAD
    getElements() {
      const thisProduct = this;

      thisProduct.dom = {
        accordionTrigger: thisProduct.element.querySelector(
          select.menuProduct.clickable
        ),
        cartButton: thisProduct.element.querySelector(
          select.menuProduct.cartButton
        ),
        priceElem: thisProduct.element.querySelector(
          select.menuProduct.priceElem
        ),
        form: thisProduct.element.querySelector(select.menuProduct.form),
        formInputs: thisProduct.element.querySelectorAll(
          select.menuProduct.form,
          select.all.formInputs
        ),
      };
=======

    getElements() {
      const thisProduct = this;

      thisProduct.accordionTrigger = thisProduct.element.querySelector(
        select.menuProduct.clickable
      );
      thisProduct.form = thisProduct.element.querySelector(
        select.menuProduct.form
      );
      thisProduct.formInputs = thisProduct.form.querySelectorAll(
        select.all.formInputs
      );
      thisProduct.cartButton = thisProduct.element.querySelector(
        select.menuProduct.cartButton
      );
      thisProduct.priceElem = thisProduct.element.querySelector(
        select.menuProduct.priceElem
      );
>>>>>>> 38b9abafa9077b957d6a01c1eff8629a048421a5
    }

    initAccordion() {
      const thisProduct = this;

      thisProduct.dom.accordionTrigger.addEventListener(
        "click",
        function (event) {
          event.preventDefault();

          const activeProduct = document.querySelector(
            select.all.menuProductsActive
          );

          if (activeProduct && activeProduct != thisProduct.element) {
            activeProduct.classList.remove(
              classNames.menuProduct.wrapperActive
            );
          }

          thisProduct.element.classList.toggle(
            classNames.menuProduct.wrapperActive
          );
        }
      );
    }

    initOrderForm() {
      const thisProduct = this;
<<<<<<< HEAD
      //console.log(this.initOrderForm);
=======
      console.log(this.initOrderForm);
>>>>>>> 38b9abafa9077b957d6a01c1eff8629a048421a5

      thisProduct.dom.form.addEventListener("submit", function (event) {
        event.preventDefault();
        thisProduct.processOrder();
<<<<<<< HEAD
        //console.log("Form Event Lintener added");
=======
        console.log("Form Event Lintener added");
>>>>>>> 38b9abafa9077b957d6a01c1eff8629a048421a5
      });

      for (let input of thisProduct.dom.formInputs) {
        input.addEventListener("change", function () {
          thisProduct.processOrder();
<<<<<<< HEAD
          //console.log("Process after change in form");
=======
          console.log("Process after change in form");
>>>>>>> 38b9abafa9077b957d6a01c1eff8629a048421a5
        });
      }

      thisProduct.dom.cartButton.addEventListener("click", function (event) {
        event.preventDefault();
        thisProduct.processOrder();
<<<<<<< HEAD
        // console.log("Process after click");
=======
        console.log("Process after click");
>>>>>>> 38b9abafa9077b957d6a01c1eff8629a048421a5
      });
    }
    processOrder() {
      const thisProduct = this;

      // covert form to object structure e.g. { sauce: ['tomato'], toppings: ['olives', 'redPeppers']
      const formData = utils.serializeFormToObject(thisProduct.dom.form);
      //console.log("formData", formData);

      // set price to default price
      let price = thisProduct.data.price;

      // for every category (param)...
      for (let paramId in thisProduct.data.params) {
        // determine param value, e.g. paramId = 'toppings', param = { label: 'Toppings', type: 'checkboxes'... }
        const param = thisProduct.data.params[paramId];
        //console.log(paramId, param);

        // for every option in this category
        for (let optionId in param.options) {
          // determine option value, e.g. optionId = 'olives', option = { label: 'Olives', price: 2, default: true }
          const option = param.options[optionId];
          //console.log(optionId, option);
          // check if there is param with a name of paramId in formData and if it includes optionId
          if (formData[paramId] && formData[paramId].includes(optionId)) {
            // check if the option is not default
            if (!option.default == true) {
              // add option price to price variable
              price = option.price + price;
            }
          } else {
            // check if the option is default
            if (option.default == true) {
              // reduce price variable
              price = price - option.price;
            }
          }
        }
      }
      // update calculated price in the HTML
      thisProduct.priceElem.innerHTML = price;
    }
  }

  const app = {
    initData: function () {
      const thisApp = this;
      thisApp.data = dataSource;
    },
    initMenu: function () {
      const thisApp = this;
      console.log("thisApp.data:", thisApp.data);
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
