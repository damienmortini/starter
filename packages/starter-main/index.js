/**
 * Entry point element
 * @hideconstructor
 * @example
 * <starter-main></starter-main>
 */
window.customElements.define('starter-main', class extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>
        :host {
          display: grid;
          position: relative;
          contain: content;
          justify-content: center;
          align-items: center;
        }
        
        h1 {
          font-size: 32px;
        }
      </style>
      <h1>starter-main</h1>
    `;
  }
});
