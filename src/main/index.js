import CustomElement from "dlib/dom/CustomElement.js";

import templateContent from "./template.html!text";
let template = document.createElement("template");
template.innerHTML = templateContent;

class Main extends CustomElement {
  createdCallback() {
    super.createdCallback();

    let templateClone = document.importNode(template.content, true);
    this.appendChild(templateClone);
  }
}

Main.register("dnit-main");
