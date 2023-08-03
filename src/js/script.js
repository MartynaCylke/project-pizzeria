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
      thisProduct.initAmountWidget();
      thisProduct.processOrder();
      //console.log("new Product:", thisProduct);
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
        imageWrapper: (thisProduct.imageWrapper =
          thisProduct.element.querySelector(select.menuProduct.imageWrapper)),

        amountWidget: (thisProduct.amountWidgetElem =
          thisProduct.element.querySelector(select.menuProduct.amountWidget)),
      };
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
      //console.log(this.initOrderForm);

      thisProduct.dom.form.addEventListener("submit", function (event) {
        event.preventDefault();
        thisProduct.processOrder();
        //console.log("Form Event Lintener added");
      });

      for (let input of thisProduct.dom.formInputs) {
        input.addEventListener("change", function () {
          thisProduct.processOrder();
          //console.log("Process after change in form");
        });
      }

      thisProduct.dom.cartButton.addEventListener("click", function (event) {
        event.preventDefault();
        thisProduct.processOrder();
        // console.log("Process after click");
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
          //find images that passt to category-option
          const optionImage = thisProduct.imageWrapper.querySelector(
            "." + paramId + "-" + optionId
          ); //(paramId + optionId) - nie dziala;
          // check if you found the image
          if (optionImage) {
            if (formData[paramId] && formData[paramId].includes(optionId)) {
              optionImage.classList.add("active"); //add class active
            } else {
              optionImage.classList.remove("active"); //remove classactive
            }
          }
        }
      }
      //multiply price by amount
      price *= thisProduct.amountWidget.value;

      // update calculated price in the HTML
      thisProduct.dom.priceElem.innerHTML = price;
    }
    initAmountWidget() {
      const thisProduct = this;
      thisProduct.amountWidget = new AmountWidget(thisProduct.amountWidgetElem);
      thisProduct.amountWidgetElem.addEventListener("updated", function () {
        thisProduct.processOrder();
      });
    }
  }
  class AmountWidget {
    constructor(element) {
      const thisWidget = this;

      //console.log('AmountWidget:', thisWidget);
      //console.log('constructor arguments:' element);

      thisWidget.getElements(element);
      thisWidget.setValue(thisWidget.input.value);
      thisWidget.initActions();
    }

    getElements(element) {
      const thisWidget = this;

      thisWidget.element = element;
      thisWidget.input = thisWidget.element.querySelector(
        select.widgets.amount.input
      );
      thisWidget.linkDecrease = thisWidget.element.querySelector(
        select.widgets.amount.linkDecrease
      );
      thisWidget.linkIncrease = thisWidget.element.querySelector(
        select.widgets.amount.linkIncrease
      );
    }

    setValue(value) {
      const thisWidget = this;
      const newValue = parseInt(value);

      /* TODO : Add validation */
      if (
        thisWidget.value !== newValue &&
        !isNaN(newValue) &&
        newValue >= settings.amountWidget.defaultMin &&
        newValue <= settings.amountWidget.defaultMax
      ) {
        thisWidget.value = newValue;
      }
      thisWidget.input.value = thisWidget.value;
      this.announce();
    }

    initActions() {
      const thisWidget = this;
      thisWidget.input.addEventListener("change", function () {
        thisWidget.setValue(thisWidget.input.value);
      });
      thisWidget.linkDecrease.addEventListener("click", function (event) {
        event.preventDefault();
        // Add a check to prevent the value from going below zero
        thisWidget.setValue(thisWidget.value - 1);
      });
      thisWidget.linkIncrease.addEventListener("click", function (event) {
        event.preventDefault();
        thisWidget.setValue(thisWidget.value + 1);
      });
    }
    announce() {
      const thisWidget = this;

      const event = new Event("updated");
      thisWidget.element.dispatchEvent(event);
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
