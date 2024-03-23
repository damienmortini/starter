import style from './index.css' with { type: 'css' }
import { html, render } from 'lit-html'

export class StarterMain extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot!.adoptedStyleSheets = [style]
    this.#renderHTML()
  }

  #renderHTML() {
    render(html`<div>starter-main</div>`, this.shadowRoot!)
  }
}
customElements.define('starter-main', StarterMain)
