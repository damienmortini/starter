import css from './index.css' assert { type: 'css' }

export class StarterMainElement extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.adoptedStyleSheets = [css]
    this.shadowRoot.innerHTML = `
      <h1>Ready, set, go!</h1>
    `
  }
}

customElements.define('starter-main', StarterMainElement)
