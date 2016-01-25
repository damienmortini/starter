import CustomElement from "dlib/dom/CustomElement.js";

import templateHTML from "./template.html!text";
let template = document.createElement("template");
template.innerHTML = templateHTML;

class Main extends CustomElement {
  createdCallback() {
    super.createdCallback();

    let templateClone = document.importNode(template.content, true);
    this.appendChild(templateClone);
  }
}

Main.register("dnit-main");
