/**
 * Entry point element
 * @hideconstructor
 * @example
 * <starter-main></starter-main>
 */
class Main extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" }).innerHTML = `
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
      <h1>starter-main</h1>
    `;
  }
}

window.customElements.define("starter-main", Main);
