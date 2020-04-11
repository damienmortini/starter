import AnimationTickerElement from '@damienmortini/element-animation-ticker/index.js';
import Camera from '@damienmortini/lib/3d/Camera.js';
import GLBoxObject from '@damienmortini/lib/gl/objects/GLBoxObject.js';
import TrackballController from '@damienmortini/lib/3d/controllers/TrackballController.js';
import GLProgram from '@damienmortini/lib/gl/GLProgram.js';
import BasicShader from '@damienmortini/lib/shader/BasicShader.js';

class View {
  constructor({
    canvas,
  }) {
    this.canvas = canvas;

    const webGLOptions = {
      depth: true,
      alpha: false,
      antialias: true,
    };

    if (!/\bforcewebgl1\b/.test(window.location.search)) {
      this.gl = this.canvas.getContext('webgl2', webGLOptions);
    }
    if (!this.gl) {
      this.gl = this.canvas.getContext('webgl', webGLOptions) || this.canvas.getContext('experimental-webgl', webGLOptions);
    }

    this.camera = new Camera();

    this.cameraController = new TrackballController({
      domElement: this.canvas,
      matrix: this.camera.transform,
      distance: 5,
    });

    this.gl.clearColor(0, 0, 0, 1);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.enable(this.gl.DEPTH_TEST);

    this.object = new GLBoxObject({
      gl: this.gl,
      width: 1,
      height: 1,
      normals: true,
      program: new GLProgram({
        gl: this.gl,
        shader: new BasicShader({
          normals: true,
          fragmentChunks: [
            ['end', `
              fragColor = vec4(vNormal * .5 + .5, 1.);
            `],
          ],
        }),
      }),
    });
  }

  resize(width, height) {
    this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
    this.camera.aspectRatio = width / height;
    this.update();
  }

  update() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.cameraController.update();

    this.object.draw({
      uniforms: {
        projectionView: this.camera.projectionView,
      },
    });
  }
}

/**
 * Entry point element
 * @hideconstructor
 * @example
 * <starter-gl></starter-gl>
 */
class Main extends AnimationTickerElement {
  constructor() {
    super();

    this.autoplay = true;

    this._resizeBinded = this.resize.bind(this);

    this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>
        :host {
          display: block;
          touch-action: none;
        }
        
        canvas {
          width: 100%;
          height: 100%;
          max-height: 100%;
        }
      </style>
      <canvas></canvas>
    `;

    this.canvas = this.shadowRoot.querySelector('canvas');

    this.view = new View({ canvas: this.canvas });
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this._resizeBinded);
    this.resize();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this._resizeBinded);
  }

  resize() {
    const width = this.canvas.offsetWidth;
    const height = this.canvas.offsetHeight;

    this.canvas.width = width * window.devicePixelRatio;
    this.canvas.height = height * window.devicePixelRatio;

    this.view.resize(width, height);
  }

  update() {
    this.view.update();
  }
}

window.customElements.define('starter-gl', Main);
//# sourceMappingURL=index.js.map
