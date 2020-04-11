/**
 * Entry point element
 * @hideconstructor
 * @example
 * <starter-element></starter-element>
 */
class Main extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>
        :host {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        h1 {
          font-size: 32px;
        }
      </style>
      <h1>starter-element</h1>
    `;
  }
}

window.customElements.define('starter-element', Main);
