import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './search.tpl.html';
import { SearchHint } from 'types';
import { addElement } from '../../utils/helpers';

export class Search {
  view: View;
  hints: SearchHint[];

  constructor() {
    this.view = new ViewTemplate(html).cloneView();
    this.hints = [];
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  update(hints: SearchHint[]) {
    this.hints = hints.filter((hint) => hint.product !== undefined && hint.link !== undefined);
    this.render();
  }

  render() {
    this.view.root.innerHTML = '';

    addElement(this.view.root, 'span', { className: 'search__text', innerText: 'Нампример,' });

    this.hints.forEach((hint, index) => {
      addElement(this.view.root, 'a', { className: 'search__hint', innerText: hint.product, href: hint.link });

      if (index === 0) {
        addElement(this.view.root, 'span', { className: 'search__text', innerText: ',' });
      } else if (index === 1) {
        addElement(this.view.root, 'span', { className: 'search__text', innerText: 'или' });
      }
    });
  }
}
