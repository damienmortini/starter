window.customElements.define("dnit-main", class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        @import "src/main/index.css";
      </style>
      <h1>dnit-main</h1>
    `;
    this.querySelector("style").addEventListener("load", () => {
      this.dispatchEvent(new Event("load"));
    });
  }
});
