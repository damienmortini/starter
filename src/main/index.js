import AnimationTickerElement from '../../node_modules/@damienmortini/elements/src/animation-ticker/index.js';

import { WebGLRenderer } from '../../node_modules/three/src/renderers/WebGLRenderer.js';
import Scene from './Scene.js';

/**
 * Entry point element
 * @hideconstructor
 * @example
 * <starter-main></starter-main>
 */
class Main extends AnimationTickerElement {
  constructor() {
    super({ autoplay: true });

    this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        canvas {
          width: 100%;
          height: 100%;
        }
      </style>
      <canvas></canvas>
    `;

    this.canvas = this.shadowRoot.querySelector('canvas');

    if (window.WebGL2RenderingContext !== undefined && !/\bforcewebgl1\b/.test(window.location.search)) {
      this.renderer = new WebGLRenderer({
        canvas: this.canvas,
        context: this.canvas.getContext('webgl2', {
          alpha: false,
          powerPreference: 'high-performance',
          antialias: true,
        }),
      });
    } else {
      this.renderer = new WebGLRenderer({
        canvas: this.canvas,
        powerPreference: 'high-performance',
        antialias: true,
      });
    }
    if (/\bdev\b/.test(window.location.search)) {
      this.renderer.debug.checkShaderErrors = true;
    }
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.scene = new Scene({ canvas: this.canvas });
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this._resizeBinded = this.resize.bind(this));
    this.resize();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this._resizeBinded);
  }

  resize() {
    const width = this.canvas.offsetWidth;
    const height = this.canvas.offsetHeight;
    this.scene.resize(width, height);
    this.renderer.setSize(width, height, false);
    this.renderer.render(this.scene, this.scene.camera);
  }

  update() {
    this.scene.update();
    this.renderer.render(this.scene, this.scene.camera);
  }
}

window.customElements.define('starter-main', Main);
