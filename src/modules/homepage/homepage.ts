import { addElement } from '../../utils/helpers';
import { Component } from '../component';
import html from './homepage.tpl.html';

import { ProductList } from '../productList/productList';
import { Search } from '../search/search';

class Homepage extends Component {
  popularProducts: ProductList;
  searchHints: Search;

  constructor(props: any) {
    super(props);

    this.popularProducts = new ProductList();
    this.popularProducts.attach(this.view.popular);
    this.searchHints = new Search();
    this.searchHints.attach(this.view.searchHints);
  }

  render() {
    fetch('/api/getPopularProducts')
      .then((res) => res.json())
      .then((products) => {
        this.popularProducts.update(products);
      });

    //Массив с подсказками
    const hintsList: any[] = [
      {
        product: 'чехол iphone 13 pro',
        link: 'http://localhost:3000/product?id=68988778',
      },
      {
        product: 'коляски agex',
        link: 'http://localhost:3000/product?id=23119804',
      },
      {
        product: 'яндекс станция 2',
        link: 'http://localhost:3000/product?id=90466699',
      },
    ]

    //Если получили подсказки
    if (hintsList.length) {
      this.searchHints.update(hintsList);
    };

    const isSuccessOrder = new URLSearchParams(window.location.search).get('isSuccessOrder');
    if (isSuccessOrder != null) {
      const $notify = addElement(this.view.notifies, 'div', { className: 'notify' });
      addElement($notify, 'p', {
        innerText:
          'Заказ оформлен. Деньги спишутся с вашей карты, менеджер может позвонить, чтобы уточнить детали доставки'
      });
    }
  }
}

export const homepageComp = new Homepage(html);
