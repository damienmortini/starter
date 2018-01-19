import Loader from "dlib/utils/Loader.js";

const LOAD_PROMISE = Promise.all([
  Loader.load({ value: "src/main/template.html", type: "template" }),
  Loader.load("src/main/index.css")
]);

window.customElements.define("dnit-main", class extends HTMLElement {
  connectedCallback() {
    LOAD_PROMISE.then(([template]) => {
      let templateClone = document.importNode(template.content, true);
      this.appendChild(templateClone);
    });
  }
});
