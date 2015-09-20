import CustomElement from "dlib/dom/CustomElement.js";

import templateContent from "./template.html!text";
let template = document.createElement("template");
template.innerHTML = templateContent;

class DnitMain extends CustomElement {
  createdCallback() {
    super.createdCallback();
    Object.assign(this.style, {
      display: "block",
      position: "relative"
    });
  }
}

DnitMain.register("dnit-main", template);
