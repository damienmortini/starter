import CustomElement from "dlib/dom/CustomElement.js";
import Loader from "dlib/utils/Loader.js";

let template = document.createElement("template");
Loader.load("src/main/template.html").then((value) => {
  template.innerHTML = value;
});

class Main extends CustomElement {
  createdCallback() {
    super.createdCallback();

    let templateClone = document.importNode(template.content, true);
    this.appendChild(templateClone);
  }
}

Loader.onLoad.then(() => {
  Main.register("dnit-main");
});
