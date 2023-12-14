document.addEventListener('DOMContentLoaded', () => {
  const addBuyElement = (el) => {
    const buyElement = document.createElement('li'),
      imgBox = document.createElement('div'),
      img = document.createElement('img'),
      descrBox = document.createElement('div'),
      descrSp = document.createElement('span'),
      countSp = document.createElement('span');

    buyElement.classList.add('buy__item', 'flex');
    imgBox.classList.add('buy__img-block');
    img.classList.add('buy__img');
    descrBox.classList.add('buy__descr');
    countSp.classList.add('buy__count');

    img.setAttribute('src', el.picture.src);
    img.setAttribute('alt', el.picture.alt);
    descrSp.textContent = el.description;
    countSp.textContent = el.count;

    descrBox.appendChild(descrSp);
    imgBox.appendChild(img);
    buyElement.appendChild(imgBox);
    buyElement.appendChild(descrBox);
    buyElement.appendChild(countSp);

    return buyElement;
  };

  const showStore = () => {
    const buyBlock = document.querySelector('.buy-block'),
      body = document.body,
      buyBox = document.createElement('div'),
      buyClose = document.createElement('button'),
      buyList = document.createElement('ul'),
      buyForm = document.createElement('form'),
      buyLabel = document.createElement('label'),
      buyInp = document.createElement('input'),
      buyBnt = document.createElement('button');

    buyBox.classList.add('buy');
    buyClose.classList.add('btn-reset', 'btn', 'buy__close');
    buyList.classList.add('list-reset', 'buy__list');
    buyForm.classList.add('buy__form', 'flex');
    buyLabel.classList.add('buy__label');
    buyBnt.classList.add('btn-reset', 'btn', 'buy__button');

    buyInp.setAttribute('type', 'checkbox');
    buyInp.setAttribute('required', true);

    buyBox.appendChild(buyClose);
    productArray.forEach((el) => {
      buyList.appendChild(addBuyElement(el));
    });
    buyBox.appendChild(buyList);
    buyLabel.appendChild(buyInp);
    buyLabel.appendChild(document.createTextNode('Заказ оформлен правильно'));
    buyForm.appendChild(buyLabel);
    buyForm.appendChild(buyBnt);
    buyBox.appendChild(buyForm);
    buyBlock.appendChild(buyBox);

    buyBnt.textContent = 'Оформить заказ';

    buyClose.addEventListener('click', () => {
      buyBlock.classList.add('none');
      buyBox.remove();
      body.classList.remove('hidden');
    });
    buyBnt.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Заказ отправлен');
    });

    body.classList.add('hidden');
    buyBlock.classList.remove('none');
  };

  const cleanUp = (index, parent, childPrice, notif) => {
    productArray.splice(index, 1);
    parent.removeAttribute('count-product');
    parent.classList.remove('visible');
    childPrice.classList.remove('new-gradient');
    const listShopCart = document.querySelectorAll(`.shopping-cart__item`);
    if (!listShopCart.length) {
      notif.classList.remove('none');
    }
  };

  const addProductToShopCart = (productObj) => {
    const product = document.createElement('li'),
      imgBox = document.createElement('div'),
      img = document.createElement('img'),
      deleteProduct = document.createElement('button'),
      mainBox = document.createElement('div'),
      productName = document.createElement('h3'),
      countBox = document.createElement('div'),
      scoreBox = document.createElement('div'),
      btnLeftArrow = document.createElement('button'),
      scoreDigit = document.createElement('span'),
      btnRightArrow = document.createElement('button'),
      productPrice = document.createElement('span'),
      shopCartList = document.querySelector('.shopping-cart__list'),
      notif = document.querySelector('.shopping-cart__notification'),
      amount = document.querySelector('.shopping-cart__total');

    product.classList.add('shopping-cart__item', 'flex');
    imgBox.classList.add('shopping-cart__img-box');
    img.classList.add('shopping-cart__img');
    deleteProduct.classList.add('btn-reset', 'btn', 'delete-product');
    mainBox.classList.add('shopping-cart__box');
    productName.classList.add('margin-reset', 'shopping-cart__name');
    countBox.classList.add('shopping-cart__count', 'flex');
    scoreBox.classList.add('score', 'flex');
    btnLeftArrow.classList.add(
      'btn-reset',
      'score__arrow',
      'score__left-arrow'
    );
    scoreDigit.classList.add('score__digit');
    btnRightArrow.classList.add(
      'btn-reset',
      'score__arrow',
      'score__right-arrow'
    );
    productPrice.classList.add('shopping-cart__price');

    product.setAttribute('id', productObj.id);
    img.setAttribute('src', productObj.picture.src);
    img.setAttribute('alt', `Аватарка - ${productObj.picture.alt}`);

    imgBox.appendChild(img);
    imgBox.appendChild(deleteProduct);
    productName.textContent = productObj.name;
    scoreDigit.textContent = productObj.count;
    scoreBox.appendChild(btnLeftArrow);
    scoreBox.appendChild(scoreDigit);
    scoreBox.appendChild(btnRightArrow);
    productPrice.textContent = `${+(
      productObj.count * productObj.price
    ).toFixed(2)}${productObj.currency}`;
    countBox.appendChild(scoreBox);
    countBox.appendChild(productPrice);
    mainBox.appendChild(productName);
    mainBox.appendChild(countBox);
    product.appendChild(imgBox);
    product.appendChild(mainBox);

    shopCartList.appendChild(product);
    const list = document.querySelectorAll('.shopping-cart__price');
    notif.classList.add('none');
    amount.textContent = `${+Array.from(list)
      .reduce((acc, el) => {
        const price = parseFloat(el.textContent);
        return acc + price;
      }, 0)
      .toFixed(2)} ${productObj.currency}`;

    deleteProduct.addEventListener('click', () => {
      const parent = document.querySelector(
        `img[src="${productObj.picture.src}"]`
      ).parentElement;
      const childPrice = parent.querySelector('.product-card__price');
      product.remove();
      productArray.forEach((el, index) => {
        if (+el.id === +productObj.id) {
          cleanUp(index, parent, childPrice, notif);
          localStorage.setItem('shoppingСart', JSON.stringify(productArray));
          const newList = document.querySelectorAll('.shopping-cart__price');
          amount.textContent = `${+Array.from(newList)
            .reduce((acc, elem) => {
              console.log(`${acc} b ${elem.textContent}`);
              const price = parseFloat(elem.textContent);
              return acc + price;
            }, 0)
            .toFixed(2)} ${productObj.currency}`;
          return;
        }
      });
    });

    btnLeftArrow.addEventListener('click', () => {
      const parent = document.querySelector(
        `img[src="${productObj.picture.src}"]`
      ).parentElement;
      const childPrice = parent.querySelector('.product-card__price');
      productArray.forEach((el, index) => {
        if (+el.id === +productObj.id) {
          el.count -= 1;
          parent.setAttribute('count-product', el.count);
          if (!el.count) {
            product.remove();
            cleanUp(index, parent, childPrice, notif);
            localStorage.setItem('shoppingСart', JSON.stringify(productArray));
          }
          scoreDigit.textContent = el.count;
          productPrice.textContent = `${+(
            productObj.count * productObj.price
          ).toFixed(2)}${productObj.currency}`;
          amount.textContent = `${+Array.from(list)
            .reduce((acc, el) => {
              const price = parseFloat(el.textContent);
              return acc + price;
            }, 0)
            .toFixed(2)} ${productObj.currency}`;
          localStorage.setItem('shoppingСart', JSON.stringify(productArray));
          return;
        }
      });
    });

    btnRightArrow.addEventListener('click', () => {
      const parent = document.querySelector(
        `img[src="${productObj.picture.src}"]`
      ).parentElement;
      productArray.forEach((el) => {
        if (+el.id === +productObj.id) {
          el.count += 1;
          parent.setAttribute('count-product', el.count);
          scoreDigit.textContent = el.count;
          productPrice.textContent = `${+(
            productObj.count * productObj.price
          ).toFixed(2)}${productObj.currency}`;
          amount.textContent = `${+Array.from(list)
            .reduce((acc, el) => {
              const price = parseFloat(el.textContent);
              return acc + price;
            }, 0)
            .toFixed(2)} ${productObj.currency}`;
          localStorage.setItem('shoppingСart', JSON.stringify(productArray));
          return;
        }
      });
    });
  };

  const choiceSort = async (e) => {
    const response = await fetch(`http://localhost:3000/products`);
    const mainArray = await response.json();
    const selectedOption = +e.target.selectedIndex;
    const sotrObj = {
      1: (a, b) => a.name.localeCompare(b.name),
      2: (a, b) => +a.price - +b.price,
      3: (a, b) => +b.price - +a.price,
      4: () => -1,
    };
    sortArray = mainArray.sort(sotrObj[selectedOption]);
    listProducts.innerHTML = '';
    sortArray.forEach((el) => {
      addProduct(el);
    });
  };

  const filter = async (e) => {
    const response = await fetch(`http://localhost:3000/products`);
    const mainArray = await response.json();
    const ctg = e.target.id;
    if (ctg === 'All') {
      listProducts.innerHTML = '';
      mainArray.forEach((el) => {
        addProduct(el);
      });
    } else {
      const newArray = mainArray.filter((el) => el.category === ctg);
      listProducts.innerHTML = '';
      newArray.forEach((el) => {
        addProduct(el);
      });
    }
  };

  const getProducts = async () => {
    const response = await fetch(`http://localhost:3000/products`);
    const mainArray = await response.json();
    mainArray.forEach((el) => {
      startCode(el);
    });
  };

  const addProduct = (productCard) => {
    const newProductCard = document.createElement('li');
    const img = document.createElement('img');
    const price = document.createElement('button');
    const title = document.createElement('h2');
    const descr = document.createElement('p');

    newProductCard.classList.add('main-body__item', 'product-card');

    img.classList.add('product-card__picture');
    img.setAttribute('src', productCard.picture.src);
    img.setAttribute('alt', productCard.picture.alt);
    newProductCard.appendChild(img);

    price.classList.add('btn-reset', 'product-card__price');
    price.innerText = `${productCard.currency}${productCard.price}`;
    price.addEventListener('click', (e) => {
      let success = true;
      productArray.forEach((el, index) => {
        if (+el.id === +productCard.id) {
          const buttonRect = price.getBoundingClientRect();
          const clickPosition = e.clientX - buttonRect.left;
          const halfWidth = buttonRect.width / 2;
          if (clickPosition < halfWidth) {
            el.count -= 1;
            newProductCard.setAttribute('count-product', el.count);
            if (!el.count) {
              const notif = document.querySelector(
                '.shopping-cart__notification'
              );
              const elemShopCart = document.getElementById(`${el.id}`);
              elemShopCart.remove();
              cleanUp(index, newProductCard, price, notif);
            }
          } else {
            el.count += 1;
            newProductCard.setAttribute('count-product', el.count);
          }

          const shopCartElem = document.getElementById(`${el.id}`);
          if (shopCartElem) {
            const scoreElem = shopCartElem.querySelector('.score__digit');
            const priceElem = shopCartElem.querySelector(
              '.shopping-cart__price'
            );
            scoreElem.textContent = el.count;
            priceElem.textContent = `${+(el.count * el.price).toFixed(2)}${
              el.currency
            }`;
          }

          const amount = document.querySelector('.shopping-cart__total');
          const list = document.querySelectorAll('.shopping-cart__price');
          amount.textContent = `${+Array.from(list)
            .reduce((acc, elem) => {
              const price = parseFloat(elem.textContent);
              return acc + price;
            }, 0)
            .toFixed(2)} ${el.currency}`;
          localStorage.setItem('shoppingСart', JSON.stringify(productArray));
          success = false;
          return;
        }
      });
      if (success) {
        productCard.count = 1;
        newProductCard.setAttribute('count-product', productCard.count);

        price.classList.add('new-gradient');
        newProductCard.classList.add('visible');
        productArray.push(productCard);
        addProductToShopCart(productCard);
        localStorage.setItem('shoppingСart', JSON.stringify(productArray));
      }
    });
    newProductCard.appendChild(price);

    title.classList.add('margin-reset', 'product-card__name');
    title.innerText = `${productCard.name}`;
    newProductCard.appendChild(title);

    descr.classList.add('margin-reset', 'product-card__descr');
    descr.innerText = `${productCard.description}`;
    newProductCard.appendChild(descr);

    listProducts.appendChild(newProductCard);

    productArray.forEach((el) => {
      if (+el.id === +productCard.id) {
        newProductCard.setAttribute('count-product', el.count);
        price.classList.add('new-gradient');
        newProductCard.classList.add('visible');
      }
    });
  };

  const startCode = (productCard) => {
    addProduct(productCard);
    productArray.forEach((el) => {
      if (+el.id === +productCard.id) {
        addProductToShopCart(el);
      }
    });
  };

  const listProducts = document.querySelector('.main-body__list'),
    buttonFilter = document.querySelectorAll('.filter-btn'),
    choice = document.querySelector('select'),
    storedData = localStorage.getItem('shoppingСart'),
    orderBtn = document.querySelector('.order-btn');

  let productArray = storedData ? JSON.parse(storedData) : [];

  buttonFilter.forEach((el) => {
    el.addEventListener('click', filter);
  });
  choice.addEventListener('change', choiceSort);
  orderBtn.addEventListener('click', () => {
    if (productArray.length) {
      showStore();
    } else {
      return;
    }
  });

  getProducts();
});
