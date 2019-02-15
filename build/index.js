class Signal extends Set{constructor(){super(),this._onceCallbacksMap=new Map}add(e,{once:t=!1}={}){if(t){const t=(...t)=>{e(...t),this.delete(e)};return this._onceCallbacksMap.set(e,t),super.add(t)}return super.add(e)}delete(e){return this._onceCallbacksMap.delete(e),super.delete(this._onceCallbacksMap.get(e)||e)}dispatch(e){for(const t of this)t(e)}}const DELTA_TIME_BASE=1/60;class Ticker extends Signal{constructor(){super(),this._updateBinded=this._update.bind(this),this.time=.001*window.performance.now(),this.reset(),document.addEventListener("visibilitychange",()=>{this.reset()}),this._update()}reset(){this._previousTime=.001*window.performance.now(),this.deltaTime=DELTA_TIME_BASE,this.smoothDeltatime=this.deltaTime,this.timeScale=1,this.smoothTimeScale=this.timeScale}_update(){requestAnimationFrame(this._updateBinded),this.time=.001*window.performance.now(),this.deltaTime=this.time-this._previousTime,this.smoothDeltatime+=.05*(this.deltaTime-this.smoothDeltatime),this.timeScale=this.deltaTime/DELTA_TIME_BASE,this.smoothTimeScale=this.smoothDeltatime/DELTA_TIME_BASE,this._previousTime=this.time,this.dispatch()}}var Ticker$1=new Ticker;class TickerElement extends HTMLElement{constructor({autoplay:e=!1,background:t=!1}={}){super(),this._autoplay=e||this.hasAttribute("autoplay"),this._background=t||this.hasAttribute("background"),this._paused=!0,this._pausedByUser=!0,this._pausedByBlur=!1,this._updateBinded=this.update.bind(this),this._onFocusChangeBinded=this._onFocusChange.bind(this)}connectedCallback(){this._background||(window.top.addEventListener("blur",this._onFocusChangeBinded),window.top.addEventListener("focus",this._onFocusChangeBinded),document.addEventListener("visibilitychange",this._onFocusChangeBinded)),this._autoplay&&(!window.top.document.hasFocus()&&!this._background&&(this._pausedByBlur=!0,requestAnimationFrame(this._updateBinded)),this.play())}disconnectedCallback(){this._pausedByBlur=!0,window.top.removeEventListener("blur",this._onFocusChangeBinded),window.top.removeEventListener("focus",this._onFocusChangeBinded),document.removeEventListener("visibilitychange",this._onFocusChangeBinded)}get paused(){return this._paused}get _pausedByUser(){return this.__pausedByUser}set _pausedByUser(e){this.__pausedByUser=e,this._updatePlaybackState()}get _pausedByBlur(){return this.__pausedByBlur}set _pausedByBlur(e){this.__pausedByBlur=e,this._updatePlaybackState()}_onFocusChange(e){switch(e.type){case"visibilitychange":"visible"!==document.visibilityState&&(this._pausedByBlur=!0);break;case"blur":this._pausedByBlur=!0;break;case"focus":this._pausedByBlur=!1;}}_updatePlaybackState(){const e=this._pausedByUser||this._pausedByBlur;e===this._paused||(this._paused=e,this._paused?(Ticker$1.delete(this._updateBinded),this.dispatchEvent(new Event("pause"))):(Ticker$1.add(this._updateBinded),this.dispatchEvent(new Event("play"))))}play(){this._pausedByUser=!1}pause(){this._pausedByUser=!0}update(){}}var _Math={DEG2RAD:Math.PI/180,RAD2DEG:180/Math.PI,generateUUID:function(){for(var e=[],t=0;256>t;t++)e[t]=(16>t?"0":"")+t.toString(16);return function(){var t=0|4294967295*Math.random(),r=0|4294967295*Math.random(),a=0|4294967295*Math.random(),n=0|4294967295*Math.random(),i=e[255&t]+e[255&t>>8]+e[255&t>>16]+e[255&t>>24]+"-"+e[255&r]+e[255&r>>8]+"-"+e[64|15&r>>16]+e[255&r>>24]+"-"+e[128|63&a]+e[255&a>>8]+"-"+e[255&a>>16]+e[255&a>>24]+e[255&n]+e[255&n>>8]+e[255&n>>16]+e[255&n>>24];return i.toUpperCase()}}(),clamp:function(e,t,r){return Math.max(t,Math.min(r,e))},euclideanModulo:function(e,t){return(e%t+t)%t},mapLinear:function(e,t,r,a,n){return a+(e-t)*(n-a)/(r-t)},lerp:function(e,r,a){return(1-a)*e+a*r},smoothstep:function(e,t,r){return e<=t?0:e>=r?1:(e=(e-t)/(r-t),e*e*(3-2*e))},smootherstep:function(e,t,r){return e<=t?0:e>=r?1:(e=(e-t)/(r-t),e*e*e*(e*(6*e-15)+10))},randInt:function(e,t){return e+Math.floor(Math.random()*(t-e+1))},randFloat:function(e,t){return e+Math.random()*(t-e)},randFloatSpread:function(e){return e*(.5-Math.random())},degToRad:function(e){return e*_Math.DEG2RAD},radToDeg:function(e){return e*_Math.RAD2DEG},isPowerOfTwo:function(e){return 0==(e&e-1)&&0!==e},ceilPowerOfTwo:function(e){return Math.pow(2,Math.ceil(Math.log(e)/Math.LN2))},floorPowerOfTwo:function(e){return Math.pow(2,Math.floor(Math.log(e)/Math.LN2))}};function Matrix4(){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],0<arguments.length&&console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")}Object.assign(Matrix4.prototype,{isMatrix4:!0,set:function(e,t,r,a,n,i,o,s,d,l,p,m,u,c,g,h){var f=this.elements;return f[0]=e,f[4]=t,f[8]=r,f[12]=a,f[1]=n,f[5]=i,f[9]=o,f[13]=s,f[2]=d,f[6]=l,f[10]=p,f[14]=m,f[3]=u,f[7]=c,f[11]=g,f[15]=h,this},identity:function(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this},clone:function(){return new Matrix4().fromArray(this.elements)},copy:function(e){var t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],t[9]=r[9],t[10]=r[10],t[11]=r[11],t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15],this},copyPosition:function(e){var t=this.elements,r=e.elements;return t[12]=r[12],t[13]=r[13],t[14]=r[14],this},extractBasis:function(e,t,r){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this},makeBasis:function(e,t,r){return this.set(e.x,t.x,r.x,0,e.y,t.y,r.y,0,e.z,t.z,r.z,0,0,0,0,1),this},extractRotation:function(){var e=new Vector3;return function(t){var r=this.elements,a=t.elements,n=1/e.setFromMatrixColumn(t,0).length(),i=1/e.setFromMatrixColumn(t,1).length(),o=1/e.setFromMatrixColumn(t,2).length();return r[0]=a[0]*n,r[1]=a[1]*n,r[2]=a[2]*n,r[3]=0,r[4]=a[4]*i,r[5]=a[5]*i,r[6]=a[6]*i,r[7]=0,r[8]=a[8]*o,r[9]=a[9]*o,r[10]=a[10]*o,r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1,this}}(),makeRotationFromEuler:function(t){var r=Math.sin,n=Math.cos;t&&t.isEuler||console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");var i=this.elements,o=t.x,s=t.y,l=t.z,p=n(o),a=r(o),m=n(s),u=r(s),d=n(l),e=r(l);if("XYZ"===t.order){var c=p*d,g=p*e,h=a*d,f=a*e;i[0]=m*d,i[4]=-m*e,i[8]=u,i[1]=g+h*u,i[5]=c-f*u,i[9]=-a*m,i[2]=f-c*u,i[6]=h+g*u,i[10]=p*m}else if("YXZ"===t.order){var x=m*d,y=m*e,_=u*d,b=u*e;i[0]=x+b*a,i[4]=_*a-y,i[8]=p*u,i[1]=p*e,i[5]=p*d,i[9]=-a,i[2]=y*a-_,i[6]=b+x*a,i[10]=p*m}else if("ZXY"===t.order){var x=m*d,y=m*e,_=u*d,b=u*e;i[0]=x-b*a,i[4]=-p*e,i[8]=_+y*a,i[1]=y+_*a,i[5]=p*d,i[9]=b-x*a,i[2]=-p*u,i[6]=a,i[10]=p*m}else if("ZYX"===t.order){var c=p*d,g=p*e,h=a*d,f=a*e;i[0]=m*d,i[4]=h*u-g,i[8]=c*u+f,i[1]=m*e,i[5]=f*u+c,i[9]=g*u-h,i[2]=-u,i[6]=a*m,i[10]=p*m}else if("YZX"===t.order){var E=p*m,v=p*u,T=a*m,M=a*u;i[0]=m*d,i[4]=M-E*e,i[8]=T*e+v,i[1]=e,i[5]=p*d,i[9]=-a*d,i[2]=-u*d,i[6]=v*e+T,i[10]=E-M*e}else if("XZY"===t.order){var E=p*m,v=p*u,T=a*m,M=a*u;i[0]=m*d,i[4]=-e,i[8]=u*d,i[1]=E*e+M,i[5]=p*d,i[9]=v*e-T,i[2]=T*e-v,i[6]=a*d,i[10]=M*e+E}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this},makeRotationFromQuaternion:function(){var e=new Vector3(0,0,0),t=new Vector3(1,1,1);return function(r){return this.compose(e,r,t)}}(),lookAt:function(){var e=Math.abs,t=new Vector3,r=new Vector3,a=new Vector3;return function(n,i,o){var s=this.elements;return a.subVectors(n,i),0===a.lengthSq()&&(a.z=1),a.normalize(),t.crossVectors(o,a),0===t.lengthSq()&&(1===e(o.z)?a.x+=1e-4:a.z+=1e-4,a.normalize(),t.crossVectors(o,a)),t.normalize(),r.crossVectors(a,t),s[0]=t.x,s[4]=r.x,s[8]=a.x,s[1]=t.y,s[5]=r.y,s[9]=a.y,s[2]=t.z,s[6]=r.z,s[10]=a.z,this}}(),multiply:function(e,t){return void 0===t?this.multiplyMatrices(this,e):(console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),this.multiplyMatrices(e,t))},premultiply:function(e){return this.multiplyMatrices(e,this)},multiplyMatrices:function(e,t){var r=e.elements,a=t.elements,n=this.elements,i=r[0],o=r[4],s=r[8],d=r[12],l=r[1],p=r[5],m=r[9],u=r[13],c=r[2],g=r[6],h=r[10],f=r[14],x=r[3],y=r[7],_=r[11],b=r[15],E=a[0],v=a[4],T=a[8],M=a[12],S=a[1],A=a[5],w=a[9],R=a[13],L=a[2],P=a[6],C=a[10],B=a[14],U=a[3],F=a[7],z=a[11],N=a[15];return n[0]=i*E+o*S+s*L+d*U,n[4]=i*v+o*A+s*P+d*F,n[8]=i*T+o*w+s*C+d*z,n[12]=i*M+o*R+s*B+d*N,n[1]=l*E+p*S+m*L+u*U,n[5]=l*v+p*A+m*P+u*F,n[9]=l*T+p*w+m*C+u*z,n[13]=l*M+p*R+m*B+u*N,n[2]=c*E+g*S+h*L+f*U,n[6]=c*v+g*A+h*P+f*F,n[10]=c*T+g*w+h*C+f*z,n[14]=c*M+g*R+h*B+f*N,n[3]=x*E+y*S+_*L+b*U,n[7]=x*v+y*A+_*P+b*F,n[11]=x*T+y*w+_*C+b*z,n[15]=x*M+y*R+_*B+b*N,this},multiplyScalar:function(e){var t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this},applyToBufferAttribute:function(){var e=new Vector3;return function(t){for(var r=0,a=t.count;r<a;r++)e.x=t.getX(r),e.y=t.getY(r),e.z=t.getZ(r),e.applyMatrix4(this),t.setXYZ(r,e.x,e.y,e.z);return t}}(),determinant:function(){var e=this.elements,t=e[0],r=e[4],a=e[8],n=e[12],i=e[1],o=e[5],s=e[9],d=e[13],l=e[2],p=e[6],m=e[10],u=e[14],c=e[3],g=e[7],h=e[11],f=e[15];return c*(+n*s*p-a*d*p-n*o*m+r*d*m+a*o*u-r*s*u)+g*(+t*s*u-t*d*m+n*i*m-a*i*u+a*d*l-n*s*l)+h*(+t*d*p-t*o*u-n*i*p+r*i*u+n*o*l-r*d*l)+f*(-a*o*l-t*s*p+t*o*m+a*i*p-r*i*m+r*s*l)},transpose:function(){var e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this},setPosition:function(e){var t=this.elements;return t[12]=e.x,t[13]=e.y,t[14]=e.z,this},getInverse:function(e,t){var r=this.elements,a=e.elements,n=a[0],i=a[1],o=a[2],s=a[3],d=a[4],l=a[5],p=a[6],m=a[7],u=a[8],c=a[9],g=a[10],h=a[11],f=a[12],x=a[13],y=a[14],_=a[15],b=c*y*m-x*g*m+x*p*h-l*y*h-c*p*_+l*g*_,E=f*g*m-u*y*m-f*p*h+d*y*h+u*p*_-d*g*_,v=u*x*m-f*c*m+f*l*h-d*x*h-u*l*_+d*c*_,T=f*c*p-u*x*p-f*l*g+d*x*g+u*l*y-d*c*y,M=n*b+i*E+o*v+s*T;if(0===M){if(!0===t)throw new Error("THREE.Matrix4: .getInverse() can't invert matrix, determinant is 0");else console.warn("THREE.Matrix4: .getInverse() can't invert matrix, determinant is 0");return this.identity()}var S=1/M;return r[0]=b*S,r[1]=(x*g*s-c*y*s-x*o*h+i*y*h+c*o*_-i*g*_)*S,r[2]=(l*y*s-x*p*s+x*o*m-i*y*m-l*o*_+i*p*_)*S,r[3]=(c*p*s-l*g*s-c*o*m+i*g*m+l*o*h-i*p*h)*S,r[4]=E*S,r[5]=(u*y*s-f*g*s+f*o*h-n*y*h-u*o*_+n*g*_)*S,r[6]=(f*p*s-d*y*s-f*o*m+n*y*m+d*o*_-n*p*_)*S,r[7]=(d*g*s-u*p*s+u*o*m-n*g*m-d*o*h+n*p*h)*S,r[8]=v*S,r[9]=(f*c*s-u*x*s-f*i*h+n*x*h+u*i*_-n*c*_)*S,r[10]=(d*x*s-f*l*s+f*i*m-n*x*m-d*i*_+n*l*_)*S,r[11]=(u*l*s-d*c*s-u*i*m+n*c*m+d*i*h-n*l*h)*S,r[12]=T*S,r[13]=(u*x*o-f*c*o+f*i*g-n*x*g-u*i*y+n*c*y)*S,r[14]=(f*l*o-d*x*o-f*i*p+n*x*p+d*i*y-n*l*y)*S,r[15]=(d*c*o-u*l*o+u*i*p-n*c*p-d*i*g+n*l*g)*S,this},scale:function(e){var t=this.elements,r=e.x,a=e.y,n=e.z;return t[0]*=r,t[4]*=a,t[8]*=n,t[1]*=r,t[5]*=a,t[9]*=n,t[2]*=r,t[6]*=a,t[10]*=n,t[3]*=r,t[7]*=a,t[11]*=n,this},getMaxScaleOnAxis:function(){var e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,r,a))},makeTranslation:function(e,t,r){return this.set(1,0,0,e,0,1,0,t,0,0,1,r,0,0,0,1),this},makeRotationX:function(e){var t=Math.sin,r=Math.cos,a=r(e),n=t(e);return this.set(1,0,0,0,0,a,-n,0,0,n,a,0,0,0,0,1),this},makeRotationY:function(e){var t=Math.sin,r=Math.cos,a=r(e),n=t(e);return this.set(a,0,n,0,0,1,0,0,-n,0,a,0,0,0,0,1),this},makeRotationZ:function(e){var t=Math.sin,r=Math.cos,a=r(e),n=t(e);return this.set(a,-n,0,0,n,a,0,0,0,0,1,0,0,0,0,1),this},makeRotationAxis:function(e,r){var a=Math.sin,n=Math.cos,i=n(r),o=a(r),s=1-i,t=e.x,d=e.y,l=e.z,p=s*t,m=s*d;return this.set(p*t+i,p*d-o*l,p*l+o*d,0,p*d+o*l,m*d+i,m*l-o*t,0,p*l-o*d,m*l+o*t,s*l*l+i,0,0,0,0,1),this},makeScale:function(e,t,r){return this.set(e,0,0,0,0,t,0,0,0,0,r,0,0,0,0,1),this},makeShear:function(e,t,r){return this.set(1,t,r,0,e,1,r,0,e,t,1,0,0,0,0,1),this},compose:function(e,t,r){var a=this.elements,n=t._x,i=t._y,o=t._z,s=t._w,d=n+n,l=i+i,p=o+o,m=n*d,u=n*l,c=n*p,g=i*l,h=i*p,f=o*p,x=s*d,y=s*l,_=s*p,b=r.x,E=r.y,v=r.z;return a[0]=(1-(g+f))*b,a[1]=(u+_)*b,a[2]=(c-y)*b,a[3]=0,a[4]=(u-_)*E,a[5]=(1-(m+f))*E,a[6]=(h+x)*E,a[7]=0,a[8]=(c+y)*v,a[9]=(h-x)*v,a[10]=(1-(m+g))*v,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this},decompose:function(){var e=new Vector3,t=new Matrix4;return function(r,a,n){var i=this.elements,o=e.set(i[0],i[1],i[2]).length(),s=e.set(i[4],i[5],i[6]).length(),d=e.set(i[8],i[9],i[10]).length(),l=this.determinant();0>l&&(o=-o),r.x=i[12],r.y=i[13],r.z=i[14],t.copy(this);var p=1/o,m=1/s,u=1/d;return t.elements[0]*=p,t.elements[1]*=p,t.elements[2]*=p,t.elements[4]*=m,t.elements[5]*=m,t.elements[6]*=m,t.elements[8]*=u,t.elements[9]*=u,t.elements[10]*=u,a.setFromRotationMatrix(t),n.x=o,n.y=s,n.z=d,this}}(),makePerspective:function(e,t,r,a,n,i){void 0===i&&console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");var o=this.elements;return o[0]=2*n/(t-e),o[4]=0,o[8]=(t+e)/(t-e),o[12]=0,o[1]=0,o[5]=2*n/(r-a),o[9]=(r+a)/(r-a),o[13]=0,o[2]=0,o[6]=0,o[10]=-(i+n)/(i-n),o[14]=-2*i*n/(i-n),o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this},makeOrthographic:function(e,t,r,a,n,i){var o=this.elements,s=1/(t-e),d=1/(r-a),l=1/(i-n);return o[0]=2*s,o[4]=0,o[8]=0,o[12]=-((t+e)*s),o[1]=0,o[5]=2*d,o[9]=0,o[13]=-((r+a)*d),o[2]=0,o[6]=0,o[10]=-2*l,o[14]=-((i+n)*l),o[3]=0,o[7]=0,o[11]=0,o[15]=1,this},equals:function(e){for(var t=this.elements,r=e.elements,a=0;16>a;a++)if(t[a]!==r[a])return!1;return!0},fromArray:function(e,t){t===void 0&&(t=0);for(var r=0;16>r;r++)this.elements[r]=e[r+t];return this},toArray:function(e,t){void 0===e&&(e=[]),void 0===t&&(t=0);var r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e[t+9]=r[9],e[t+10]=r[10],e[t+11]=r[11],e[t+12]=r[12],e[t+13]=r[13],e[t+14]=r[14],e[t+15]=r[15],e}});function Vector3(e,t,r){this.x=e||0,this.y=t||0,this.z=r||0}Object.assign(Vector3.prototype,{isVector3:!0,set:function(e,t,r){return this.x=e,this.y=t,this.z=r,this},setScalar:function(e){return this.x=e,this.y=e,this.z=e,this},setX:function(e){return this.x=e,this},setY:function(e){return this.y=e,this},setZ:function(e){return this.z=e,this},setComponent:function(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e);}return this},getComponent:function(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e);}},clone:function(){return new this.constructor(this.x,this.y,this.z)},copy:function(e){return this.x=e.x,this.y=e.y,this.z=e.z,this},add:function(e,t){return void 0===t?(this.x+=e.x,this.y+=e.y,this.z+=e.z,this):(console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(e,t))},addScalar:function(e){return this.x+=e,this.y+=e,this.z+=e,this},addVectors:function(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this},addScaledVector:function(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this},sub:function(e,t){return void 0===t?(this.x-=e.x,this.y-=e.y,this.z-=e.z,this):(console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(e,t))},subScalar:function(e){return this.x-=e,this.y-=e,this.z-=e,this},subVectors:function(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this},multiply:function(e,t){return void 0===t?(this.x*=e.x,this.y*=e.y,this.z*=e.z,this):(console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),this.multiplyVectors(e,t))},multiplyScalar:function(e){return this.x*=e,this.y*=e,this.z*=e,this},multiplyVectors:function(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this},applyEuler:function(){var e=new Quaternion;return function(t){return t&&t.isEuler||console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."),this.applyQuaternion(e.setFromEuler(t))}}(),applyAxisAngle:function(){var e=new Quaternion;return function(t,r){return this.applyQuaternion(e.setFromAxisAngle(t,r))}}(),applyMatrix3:function(t){var r=this.x,a=this.y,n=this.z,i=t.elements;return this.x=i[0]*r+i[3]*a+i[6]*n,this.y=i[1]*r+i[4]*a+i[7]*n,this.z=i[2]*r+i[5]*a+i[8]*n,this},applyMatrix4:function(t){var r=this.x,a=this.y,n=this.z,i=t.elements,e=1/(i[3]*r+i[7]*a+i[11]*n+i[15]);return this.x=(i[0]*r+i[4]*a+i[8]*n+i[12])*e,this.y=(i[1]*r+i[5]*a+i[9]*n+i[13])*e,this.z=(i[2]*r+i[6]*a+i[10]*n+i[14])*e,this},applyQuaternion:function(e){var t=this.x,r=this.y,a=this.z,n=e.x,i=e.y,o=e.z,s=e.w,d=s*t+i*a-o*r,l=s*r+o*t-n*a,p=s*a+n*r-i*t,m=-n*t-i*r-o*a;return this.x=d*s+m*-n+l*-o-p*-i,this.y=l*s+m*-i+p*-n-d*-o,this.z=p*s+m*-o+d*-i-l*-n,this},project:function(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)},unproject:function(){var e=new Matrix4;return function(t){return this.applyMatrix4(e.getInverse(t.projectionMatrix)).applyMatrix4(t.matrixWorld)}}(),transformDirection:function(t){var r=this.x,a=this.y,n=this.z,i=t.elements;return this.x=i[0]*r+i[4]*a+i[8]*n,this.y=i[1]*r+i[5]*a+i[9]*n,this.z=i[2]*r+i[6]*a+i[10]*n,this.normalize()},divide:function(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this},divideScalar:function(e){return this.multiplyScalar(1/e)},min:function(e){var t=Math.min;return this.x=t(this.x,e.x),this.y=t(this.y,e.y),this.z=t(this.z,e.z),this},max:function(e){var t=Math.max;return this.x=t(this.x,e.x),this.y=t(this.y,e.y),this.z=t(this.z,e.z),this},clamp:function(e,t){var r=Math.max,a=Math.min;return this.x=r(e.x,a(t.x,this.x)),this.y=r(e.y,a(t.y,this.y)),this.z=r(e.z,a(t.z,this.z)),this},clampScalar:function(){var e=new Vector3,t=new Vector3;return function(r,a){return e.set(r,r,r),t.set(a,a,a),this.clamp(e,t)}}(),clampLength:function(e,t){var r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))},floor:function(){var e=Math.floor;return this.x=e(this.x),this.y=e(this.y),this.z=e(this.z),this},ceil:function(){var e=Math.ceil;return this.x=e(this.x),this.y=e(this.y),this.z=e(this.z),this},round:function(){var e=Math.round;return this.x=e(this.x),this.y=e(this.y),this.z=e(this.z),this},roundToZero:function(){var e=Math.ceil,t=Math.floor;return this.x=0>this.x?e(this.x):t(this.x),this.y=0>this.y?e(this.y):t(this.y),this.z=0>this.z?e(this.z):t(this.z),this},negate:function(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this},dot:function(e){return this.x*e.x+this.y*e.y+this.z*e.z},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},manhattanLength:function(){var e=Math.abs;return e(this.x)+e(this.y)+e(this.z)},normalize:function(){return this.divideScalar(this.length()||1)},setLength:function(e){return this.normalize().multiplyScalar(e)},lerp:function(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this},lerpVectors:function(e,t,r){return this.subVectors(t,e).multiplyScalar(r).add(e)},cross:function(e,t){return void 0===t?this.crossVectors(this,e):(console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),this.crossVectors(e,t))},crossVectors:function(e,t){var r=e.x,a=e.y,n=e.z,i=t.x,o=t.y,s=t.z;return this.x=a*s-n*o,this.y=n*i-r*s,this.z=r*o-a*i,this},projectOnVector:function(e){var t=e.dot(this)/e.lengthSq();return this.copy(e).multiplyScalar(t)},projectOnPlane:function(){var e=new Vector3;return function(t){return e.copy(this).projectOnVector(t),this.sub(e)}}(),reflect:function(){var e=new Vector3;return function(t){return this.sub(e.copy(t).multiplyScalar(2*this.dot(t)))}}(),angleTo:function(e){var t=this.dot(e)/Math.sqrt(this.lengthSq()*e.lengthSq());return Math.acos(_Math.clamp(t,-1,1))},distanceTo:function(e){return Math.sqrt(this.distanceToSquared(e))},distanceToSquared:function(e){var t=this.x-e.x,r=this.y-e.y,a=this.z-e.z;return t*t+r*r+a*a},manhattanDistanceTo:function(e){var t=Math.abs;return t(this.x-e.x)+t(this.y-e.y)+t(this.z-e.z)},setFromSpherical:function(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)},setFromSphericalCoords:function(e,t,r){var a=Math.sin,n=Math.cos,i=a(t)*e;return this.x=i*a(r),this.y=n(t)*e,this.z=i*n(r),this},setFromCylindrical:function(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)},setFromCylindricalCoords:function(e,t,r){var a=Math.sin,n=Math.cos;return this.x=e*a(t),this.y=r,this.z=e*n(t),this},setFromMatrixPosition:function(t){var r=t.elements;return this.x=r[12],this.y=r[13],this.z=r[14],this},setFromMatrixScale:function(e){var t=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=r,this.z=a,this},setFromMatrixColumn:function(e,t){return this.fromArray(e.elements,4*t)},equals:function(e){return e.x===this.x&&e.y===this.y&&e.z===this.z},fromArray:function(e,t){return void 0===t&&(t=0),this.x=e[t],this.y=e[t+1],this.z=e[t+2],this},toArray:function(e,t){return void 0===e&&(e=[]),void 0===t&&(t=0),e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e},fromBufferAttribute:function(e,t,r){return void 0!==r&&console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."),this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}});function Quaternion(e,t,r,a){this._x=e||0,this._y=t||0,this._z=r||0,this._w=a===void 0?1:a}Object.assign(Quaternion,{slerp:function(e,r,a,n){return a.copy(e).slerp(r,n)},slerpFlat:function(e,r,a,n,i,o,d){var l=Math.atan2,p=Number.EPSILON,m=Math.sqrt,u=Math.sin,c=a[n+0],g=a[n+1],h=a[n+2],x=a[n+3],y=i[o+0],_=i[o+1],b=i[o+2],E=i[o+3];if(x!==E||c!==y||g!==_||h!==b){var v=1-d,T=c*y+g*_+h*b+x*E,M=0<=T?1:-1,S=1-T*T;if(S>p){var A=m(S),w=l(A,T*M);v=u(v*w)/A,d=u(d*w)/A}var R=d*M;if(c=c*v+y*R,g=g*v+_*R,h=h*v+b*R,x=x*v+E*R,v==1-d){var L=1/m(c*c+g*g+h*h+x*x);c*=L,g*=L,h*=L,x*=L}}e[r]=c,e[r+1]=g,e[r+2]=h,e[r+3]=x}}),Object.defineProperties(Quaternion.prototype,{x:{get:function(){return this._x},set:function(e){this._x=e,this.onChangeCallback()}},y:{get:function(){return this._y},set:function(e){this._y=e,this.onChangeCallback()}},z:{get:function(){return this._z},set:function(e){this._z=e,this.onChangeCallback()}},w:{get:function(){return this._w},set:function(e){this._w=e,this.onChangeCallback()}}}),Object.assign(Quaternion.prototype,{isQuaternion:!0,set:function(e,t,r,a){return this._x=e,this._y=t,this._z=r,this._w=a,this.onChangeCallback(),this},clone:function(){return new this.constructor(this._x,this._y,this._z,this._w)},copy:function(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this.onChangeCallback(),this},setFromEuler:function(e,t){var r=Math.sin,a=Math.cos;if(!(e&&e.isEuler))throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");var n=e._x,i=e._y,o=e._z,s=e.order,d=a,l=r,p=d(n/2),m=d(i/2),u=d(o/2),c=l(n/2),g=l(i/2),h=l(o/2);return"XYZ"===s?(this._x=c*m*u+p*g*h,this._y=p*g*u-c*m*h,this._z=p*m*h+c*g*u,this._w=p*m*u-c*g*h):"YXZ"===s?(this._x=c*m*u+p*g*h,this._y=p*g*u-c*m*h,this._z=p*m*h-c*g*u,this._w=p*m*u+c*g*h):"ZXY"===s?(this._x=c*m*u-p*g*h,this._y=p*g*u+c*m*h,this._z=p*m*h+c*g*u,this._w=p*m*u-c*g*h):"ZYX"===s?(this._x=c*m*u-p*g*h,this._y=p*g*u+c*m*h,this._z=p*m*h-c*g*u,this._w=p*m*u+c*g*h):"YZX"===s?(this._x=c*m*u+p*g*h,this._y=p*g*u+c*m*h,this._z=p*m*h-c*g*u,this._w=p*m*u-c*g*h):"XZY"===s&&(this._x=c*m*u-p*g*h,this._y=p*g*u-c*m*h,this._z=p*m*h+c*g*u,this._w=p*m*u+c*g*h),!1!==t&&this.onChangeCallback(),this},setFromAxisAngle:function(e,t){var r=Math.sin,a=Math.cos,n=t/2,i=r(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=a(n),this.onChangeCallback(),this},setFromRotationMatrix:function(e){var t=Math.sqrt,r=e.elements,a=r[0],n=r[4],i=r[8],o=r[1],d=r[5],l=r[9],p=r[2],m=r[6],u=r[10],c=a+d+u,g;return 0<c?(g=.5/t(c+1),this._w=.25/g,this._x=(m-l)*g,this._y=(i-p)*g,this._z=(o-n)*g):a>d&&a>u?(g=2*t(1+a-d-u),this._w=(m-l)/g,this._x=.25*g,this._y=(n+o)/g,this._z=(i+p)/g):d>u?(g=2*t(1+d-a-u),this._w=(i-p)/g,this._x=(n+o)/g,this._y=.25*g,this._z=(l+m)/g):(g=2*t(1+u-a-d),this._w=(o-n)/g,this._x=(i+p)/g,this._y=(l+m)/g,this._z=.25*g),this.onChangeCallback(),this},setFromUnitVectors:function(){var e=Math.abs,t=new Vector3,a;return function(r,n){return void 0===t&&(t=new Vector3),a=r.dot(n)+1,a<1e-6?(a=0,e(r.x)>e(r.z)?t.set(-r.y,r.x,0):t.set(0,-r.z,r.y)):t.crossVectors(r,n),this._x=t.x,this._y=t.y,this._z=t.z,this._w=a,this.normalize()}}(),angleTo:function(e){return 2*Math.acos(Math.abs(_Math.clamp(this.dot(e),-1,1)))},rotateTowards:function(e,r){var a=Math.min,n=this.angleTo(e);if(0===n)return this;var i=a(1,r/n);return this.slerp(e,i),this},inverse:function(){return this.conjugate()},conjugate:function(){return this._x*=-1,this._y*=-1,this._z*=-1,this.onChangeCallback(),this},dot:function(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w},lengthSq:function(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w},length:function(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)},normalize:function(){var e=this.length();return 0===e?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this.onChangeCallback(),this},multiply:function(e,t){return void 0===t?this.multiplyQuaternions(this,e):(console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(e,t))},premultiply:function(e){return this.multiplyQuaternions(e,this)},multiplyQuaternions:function(e,t){var r=e._x,a=e._y,n=e._z,i=e._w,o=t._x,s=t._y,d=t._z,l=t._w;return this._x=r*l+i*o+a*d-n*s,this._y=a*l+i*s+n*o-r*d,this._z=n*l+i*d+r*s-a*o,this._w=i*l-r*o-a*s-n*d,this.onChangeCallback(),this},slerp:function(e,r){var t=Math.atan2,a=Number.EPSILON,n=Math.sqrt,i=Math.sin;if(0===r)return this;if(1===r)return this.copy(e);var o=this._x,d=this._y,l=this._z,p=this._w,m=p*e._w+o*e._x+d*e._y+l*e._z;if(0>m?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,m=-m):this.copy(e),1<=m)return this._w=p,this._x=o,this._y=d,this._z=l,this;var u=1-m*m;if(u<=a){var c=1-r;return this._w=c*p+r*this._w,this._x=c*o+r*this._x,this._y=c*d+r*this._y,this._z=c*l+r*this._z,this.normalize()}var s=n(u),g=t(s,m),h=i((1-r)*g)/s,f=i(r*g)/s;return this._w=p*h+this._w*f,this._x=o*h+this._x*f,this._y=d*h+this._y*f,this._z=l*h+this._z*f,this.onChangeCallback(),this},equals:function(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w},fromArray:function(e,t){return void 0===t&&(t=0),this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this.onChangeCallback(),this},toArray:function(e,t){return void 0===e&&(e=[]),void 0===t&&(t=0),e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e},onChange:function(e){return this.onChangeCallback=e,this},onChangeCallback:function(){}});function EventDispatcher(){}Object.assign(EventDispatcher.prototype,{addEventListener:function(e,t){this._listeners===void 0&&(this._listeners={});var r=this._listeners;r[e]===void 0&&(r[e]=[]),-1===r[e].indexOf(t)&&r[e].push(t)},hasEventListener:function(e,t){if(this._listeners===void 0)return!1;var r=this._listeners;return r[e]!==void 0&&-1!==r[e].indexOf(t)},removeEventListener:function(e,t){if(void 0!==this._listeners){var r=this._listeners,a=r[e];if(void 0!==a){var n=a.indexOf(t);-1!==n&&a.splice(n,1)}}},dispatchEvent:function(e){if(void 0!==this._listeners){var t=this._listeners,r=t[e.type];if(void 0!==r){e.target=this;for(var a=r.slice(0),n=0,o=a.length;n<o;n++)a[n].call(this,e)}}}});function Euler(e,t,r,a){this._x=e||0,this._y=t||0,this._z=r||0,this._order=a||Euler.DefaultOrder}Euler.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"],Euler.DefaultOrder="XYZ",Object.defineProperties(Euler.prototype,{x:{get:function(){return this._x},set:function(e){this._x=e,this.onChangeCallback()}},y:{get:function(){return this._y},set:function(e){this._y=e,this.onChangeCallback()}},z:{get:function(){return this._z},set:function(e){this._z=e,this.onChangeCallback()}},order:{get:function(){return this._order},set:function(e){this._order=e,this.onChangeCallback()}}}),Object.assign(Euler.prototype,{isEuler:!0,set:function(e,t,r,a){return this._x=e,this._y=t,this._z=r,this._order=a||this._order,this.onChangeCallback(),this},clone:function(){return new this.constructor(this._x,this._y,this._z,this._order)},copy:function(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this.onChangeCallback(),this},setFromRotationMatrix:function(e,t,r){var a=Math.asin,n=Math.atan2,i=Math.abs,o=_Math.clamp,s=e.elements,d=s[0],l=s[4],p=s[8],m=s[1],u=s[5],c=s[9],g=s[2],h=s[6],f=s[10];return t=t||this._order,"XYZ"===t?(this._y=a(o(p,-1,1)),.99999>i(p)?(this._x=n(-c,f),this._z=n(-l,d)):(this._x=n(h,u),this._z=0)):"YXZ"===t?(this._x=a(-o(c,-1,1)),.99999>i(c)?(this._y=n(p,f),this._z=n(m,u)):(this._y=n(-g,d),this._z=0)):"ZXY"===t?(this._x=a(o(h,-1,1)),.99999>i(h)?(this._y=n(-g,f),this._z=n(-l,u)):(this._y=0,this._z=n(m,d))):"ZYX"===t?(this._y=a(-o(g,-1,1)),.99999>i(g)?(this._x=n(h,f),this._z=n(m,d)):(this._x=0,this._z=n(-l,u))):"YZX"===t?(this._z=a(o(m,-1,1)),.99999>i(m)?(this._x=n(-c,u),this._y=n(-g,d)):(this._x=0,this._y=n(p,f))):"XZY"===t?(this._z=a(-o(l,-1,1)),.99999>i(l)?(this._x=n(h,u),this._y=n(p,d)):(this._x=n(-c,f),this._y=0)):console.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: "+t),this._order=t,!1!==r&&this.onChangeCallback(),this},setFromQuaternion:function(){var e=new Matrix4;return function(t,r,a){return e.makeRotationFromQuaternion(t),this.setFromRotationMatrix(e,r,a)}}(),setFromVector3:function(e,t){return this.set(e.x,e.y,e.z,t||this._order)},reorder:function(){var e=new Quaternion;return function(t){return e.setFromEuler(this),this.setFromQuaternion(e,t)}}(),equals:function(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order},fromArray:function(e){return this._x=e[0],this._y=e[1],this._z=e[2],void 0!==e[3]&&(this._order=e[3]),this.onChangeCallback(),this},toArray:function(e,t){return void 0===e&&(e=[]),void 0===t&&(t=0),e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e},toVector3:function(e){return e?e.set(this._x,this._y,this._z):new Vector3(this._x,this._y,this._z)},onChange:function(e){return this.onChangeCallback=e,this},onChangeCallback:function(){}});function Layers(){this.mask=1}Object.assign(Layers.prototype,{set:function(e){this.mask=0|1<<e},enable:function(e){this.mask|=0|1<<e},toggle:function(e){this.mask^=0|1<<e},disable:function(e){this.mask&=~(0|1<<e)},test:function(e){return 0!=(this.mask&e.mask)}});function Matrix3(){this.elements=[1,0,0,0,1,0,0,0,1],0<arguments.length&&console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")}Object.assign(Matrix3.prototype,{isMatrix3:!0,set:function(e,t,r,a,n,i,o,s,d){var l=this.elements;return l[0]=e,l[1]=a,l[2]=o,l[3]=t,l[4]=n,l[5]=s,l[6]=r,l[7]=i,l[8]=d,this},identity:function(){return this.set(1,0,0,0,1,0,0,0,1),this},clone:function(){return new this.constructor().fromArray(this.elements)},copy:function(e){var t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],this},setFromMatrix4:function(e){var t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this},applyToBufferAttribute:function(){var e=new Vector3;return function(t){for(var r=0,a=t.count;r<a;r++)e.x=t.getX(r),e.y=t.getY(r),e.z=t.getZ(r),e.applyMatrix3(this),t.setXYZ(r,e.x,e.y,e.z);return t}}(),multiply:function(e){return this.multiplyMatrices(this,e)},premultiply:function(e){return this.multiplyMatrices(e,this)},multiplyMatrices:function(e,t){var r=e.elements,a=t.elements,n=this.elements,i=r[0],o=r[3],s=r[6],d=r[1],l=r[4],p=r[7],m=r[2],u=r[5],c=r[8],g=a[0],h=a[3],f=a[6],x=a[1],y=a[4],_=a[7],b=a[2],E=a[5],v=a[8];return n[0]=i*g+o*x+s*b,n[3]=i*h+o*y+s*E,n[6]=i*f+o*_+s*v,n[1]=d*g+l*x+p*b,n[4]=d*h+l*y+p*E,n[7]=d*f+l*_+p*v,n[2]=m*g+u*x+c*b,n[5]=m*h+u*y+c*E,n[8]=m*f+u*_+c*v,this},multiplyScalar:function(e){var t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this},determinant:function(){var t=this.elements,r=t[0],a=t[1],n=t[2],o=t[3],s=t[4],e=t[5],d=t[6],l=t[7],p=t[8];return r*s*p-r*e*l-a*o*p+a*e*d+n*o*l-n*s*d},getInverse:function(e,t){e&&e.isMatrix4&&console.error("THREE.Matrix3: .getInverse() no longer takes a Matrix4 argument.");var r=e.elements,a=this.elements,n=r[0],i=r[1],o=r[2],s=r[3],d=r[4],l=r[5],p=r[6],m=r[7],u=r[8],c=u*d-l*m,g=l*p-u*s,h=m*s-d*p,f=n*c+i*g+o*h;if(0==f){if(!0===t)throw new Error("THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0");else console.warn("THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0");return this.identity()}var x=1/f;return a[0]=c*x,a[1]=(o*m-u*i)*x,a[2]=(l*i-o*d)*x,a[3]=g*x,a[4]=(u*n-o*p)*x,a[5]=(o*s-l*n)*x,a[6]=h*x,a[7]=(i*p-m*n)*x,a[8]=(d*n-i*s)*x,this},transpose:function(){var e=this.elements,t;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this},getNormalMatrix:function(e){return this.setFromMatrix4(e).getInverse(this).transpose()},transposeIntoArray:function(e){var t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this},setUvTransform:function(e,t,r,a,n,i,o){var d=Math.cos(n),l=Math.sin(n);this.set(r*d,r*l,-r*(d*i+l*o)+i+e,-a*l,a*d,-a*(-l*i+d*o)+o+t,0,0,1)},scale:function(e,t){var r=this.elements;return r[0]*=e,r[3]*=e,r[6]*=e,r[1]*=t,r[4]*=t,r[7]*=t,this},rotate:function(e){var t=Math.sin,r=Math.cos,a=r(e),n=t(e),i=this.elements,o=i[0],s=i[3],d=i[6],l=i[1],p=i[4],m=i[7];return i[0]=a*o+n*l,i[3]=a*s+n*p,i[6]=a*d+n*m,i[1]=-n*o+a*l,i[4]=-n*s+a*p,i[7]=-n*d+a*m,this},translate:function(e,t){var r=this.elements;return r[0]+=e*r[2],r[3]+=e*r[5],r[6]+=e*r[8],r[1]+=t*r[2],r[4]+=t*r[5],r[7]+=t*r[8],this},equals:function(e){for(var t=this.elements,r=e.elements,a=0;9>a;a++)if(t[a]!==r[a])return!1;return!0},fromArray:function(e,t){t===void 0&&(t=0);for(var r=0;9>r;r++)this.elements[r]=e[r+t];return this},toArray:function(e,t){void 0===e&&(e=[]),void 0===t&&(t=0);var r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e}});var REVISION="101",CullFaceNone=0,CullFaceBack=1,CullFaceFront=2,PCFShadowMap=1,PCFSoftShadowMap=2,FrontSide=0,BackSide=1,DoubleSide=2,FlatShading=1,NoColors=0,NoBlending=0,NormalBlending=1,AdditiveBlending=2,SubtractiveBlending=3,MultiplyBlending=4,CustomBlending=5,AddEquation=100,SubtractEquation=101,ReverseSubtractEquation=102,MinEquation=103,MaxEquation=104,ZeroFactor=200,OneFactor=201,SrcColorFactor=202,OneMinusSrcColorFactor=203,SrcAlphaFactor=204,OneMinusSrcAlphaFactor=205,DstAlphaFactor=206,OneMinusDstAlphaFactor=207,DstColorFactor=208,OneMinusDstColorFactor=209,SrcAlphaSaturateFactor=210,NeverDepth=0,AlwaysDepth=1,LessDepth=2,LessEqualDepth=3,EqualDepth=4,GreaterEqualDepth=5,GreaterDepth=6,NotEqualDepth=7,MultiplyOperation=0,MixOperation=1,AddOperation=2,NoToneMapping=0,LinearToneMapping=1,ReinhardToneMapping=2,Uncharted2ToneMapping=3,CineonToneMapping=4,ACESFilmicToneMapping=5,UVMapping=300,CubeReflectionMapping=301,CubeRefractionMapping=302,EquirectangularReflectionMapping=303,EquirectangularRefractionMapping=304,SphericalReflectionMapping=305,CubeUVReflectionMapping=306,CubeUVRefractionMapping=307,RepeatWrapping=1e3,ClampToEdgeWrapping=1001,MirroredRepeatWrapping=1002,NearestFilter=1003,NearestMipMapNearestFilter=1004,NearestMipMapLinearFilter=1005,LinearFilter=1006,LinearMipMapNearestFilter=1007,LinearMipMapLinearFilter=1008,UnsignedByteType=1009,ByteType=1010,ShortType=1011,UnsignedShortType=1012,IntType=1013,UnsignedIntType=1014,FloatType=1015,HalfFloatType=1016,UnsignedShort4444Type=1017,UnsignedShort5551Type=1018,UnsignedShort565Type=1019,UnsignedInt248Type=1020,AlphaFormat=1021,RGBFormat=1022,RGBAFormat=1023,LuminanceFormat=1024,LuminanceAlphaFormat=1025,DepthFormat=1026,DepthStencilFormat=1027,RedFormat=1028,RGB_S3TC_DXT1_Format=33776,RGBA_S3TC_DXT1_Format=33777,RGBA_S3TC_DXT3_Format=33778,RGBA_S3TC_DXT5_Format=33779,RGB_PVRTC_4BPPV1_Format=35840,RGB_PVRTC_2BPPV1_Format=35841,RGBA_PVRTC_4BPPV1_Format=35842,RGBA_PVRTC_2BPPV1_Format=35843,RGB_ETC1_Format=36196,RGBA_ASTC_4x4_Format=37808,RGBA_ASTC_5x4_Format=37809,RGBA_ASTC_5x5_Format=37810,RGBA_ASTC_6x5_Format=37811,RGBA_ASTC_6x6_Format=37812,RGBA_ASTC_8x5_Format=37813,RGBA_ASTC_8x6_Format=37814,RGBA_ASTC_8x8_Format=37815,RGBA_ASTC_10x5_Format=37816,RGBA_ASTC_10x6_Format=37817,RGBA_ASTC_10x8_Format=37818,RGBA_ASTC_10x10_Format=37819,RGBA_ASTC_12x10_Format=37820,RGBA_ASTC_12x12_Format=37821,TrianglesDrawMode=0,TriangleStripDrawMode=1,TriangleFanDrawMode=2,LinearEncoding=3e3,sRGBEncoding=3001,GammaEncoding=3007,RGBEEncoding=3002,RGBM7Encoding=3004,RGBM16Encoding=3005,RGBDEncoding=3006,BasicDepthPacking=3200,RGBADepthPacking=3201,TangentSpaceNormalMap=0,ObjectSpaceNormalMap=1,object3DId=0;function Object3D(){Object.defineProperty(this,"id",{value:object3DId++}),this.uuid=_Math.generateUUID(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Object3D.DefaultUp.clone();var e=new Vector3,t=new Euler,r=new Quaternion,a=new Vector3(1,1,1);t.onChange(function(){r.setFromEuler(t,!1)}),r.onChange(function(){t.setFromQuaternion(r,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new Matrix4},normalMatrix:{value:new Matrix3}}),this.matrix=new Matrix4,this.matrixWorld=new Matrix4,this.matrixAutoUpdate=Object3D.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.layers=new Layers,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.userData={}}Object3D.DefaultUp=new Vector3(0,1,0),Object3D.DefaultMatrixAutoUpdate=!0,Object3D.prototype=Object.assign(Object.create(EventDispatcher.prototype),{constructor:Object3D,isObject3D:!0,onBeforeRender:function(){},onAfterRender:function(){},applyMatrix:function(e){this.matrix.multiplyMatrices(e,this.matrix),this.matrix.decompose(this.position,this.quaternion,this.scale)},applyQuaternion:function(e){return this.quaternion.premultiply(e),this},setRotationFromAxisAngle:function(e,t){this.quaternion.setFromAxisAngle(e,t)},setRotationFromEuler:function(e){this.quaternion.setFromEuler(e,!0)},setRotationFromMatrix:function(e){this.quaternion.setFromRotationMatrix(e)},setRotationFromQuaternion:function(e){this.quaternion.copy(e)},rotateOnAxis:function(){var e=new Quaternion;return function(t,r){return e.setFromAxisAngle(t,r),this.quaternion.multiply(e),this}}(),rotateOnWorldAxis:function(){var e=new Quaternion;return function(t,r){return e.setFromAxisAngle(t,r),this.quaternion.premultiply(e),this}}(),rotateX:function(){var e=new Vector3(1,0,0);return function(t){return this.rotateOnAxis(e,t)}}(),rotateY:function(){var e=new Vector3(0,1,0);return function(t){return this.rotateOnAxis(e,t)}}(),rotateZ:function(){var e=new Vector3(0,0,1);return function(t){return this.rotateOnAxis(e,t)}}(),translateOnAxis:function(){var e=new Vector3;return function(t,r){return e.copy(t).applyQuaternion(this.quaternion),this.position.add(e.multiplyScalar(r)),this}}(),translateX:function(){var e=new Vector3(1,0,0);return function(t){return this.translateOnAxis(e,t)}}(),translateY:function(){var e=new Vector3(0,1,0);return function(t){return this.translateOnAxis(e,t)}}(),translateZ:function(){var e=new Vector3(0,0,1);return function(t){return this.translateOnAxis(e,t)}}(),localToWorld:function(e){return e.applyMatrix4(this.matrixWorld)},worldToLocal:function(){var e=new Matrix4;return function(t){return t.applyMatrix4(e.getInverse(this.matrixWorld))}}(),lookAt:function(){var e=new Quaternion,t=new Matrix4,r=new Vector3,a=new Vector3;return function(n,i,o){n.isVector3?r.copy(n):r.set(n,i,o);var s=this.parent;this.updateWorldMatrix(!0,!1),a.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?t.lookAt(a,r,this.up):t.lookAt(r,a,this.up),this.quaternion.setFromRotationMatrix(t),s&&(t.extractRotation(s.matrixWorld),e.setFromRotationMatrix(t),this.quaternion.premultiply(e.inverse()))}}(),add:function(e){if(1<arguments.length){for(var t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(null!==e.parent&&e.parent.remove(e),e.parent=this,e.dispatchEvent({type:"added"}),this.children.push(e)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)},remove:function(e){if(1<arguments.length){for(var t=0;t<arguments.length;t++)this.remove(arguments[t]);return this}var r=this.children.indexOf(e);return-1!==r&&(e.parent=null,e.dispatchEvent({type:"removed"}),this.children.splice(r,1)),this},getObjectById:function(e){return this.getObjectByProperty("id",e)},getObjectByName:function(e){return this.getObjectByProperty("name",e)},getObjectByProperty:function(e,t){if(this[e]===t)return this;for(var r=0,a=this.children.length;r<a;r++){var n=this.children[r],o=n.getObjectByProperty(e,t);if(o!==void 0)return o}},getWorldPosition:function(e){return void 0===e&&(console.warn("THREE.Object3D: .getWorldPosition() target is now required"),e=new Vector3),this.updateMatrixWorld(!0),e.setFromMatrixPosition(this.matrixWorld)},getWorldQuaternion:function(){var e=new Vector3,t=new Vector3;return function(r){return void 0===r&&(console.warn("THREE.Object3D: .getWorldQuaternion() target is now required"),r=new Quaternion),this.updateMatrixWorld(!0),this.matrixWorld.decompose(e,r,t),r}}(),getWorldScale:function(){var e=new Vector3,t=new Quaternion;return function(r){return void 0===r&&(console.warn("THREE.Object3D: .getWorldScale() target is now required"),r=new Vector3),this.updateMatrixWorld(!0),this.matrixWorld.decompose(e,t,r),r}}(),getWorldDirection:function(t){t===void 0&&(console.warn("THREE.Object3D: .getWorldDirection() target is now required"),t=new Vector3),this.updateMatrixWorld(!0);var r=this.matrixWorld.elements;return t.set(r[8],r[9],r[10]).normalize()},raycast:function(){},traverse:function(e){e(this);for(var t=this.children,r=0,a=t.length;r<a;r++)t[r].traverse(e)},traverseVisible:function(e){if(!1!==this.visible){e(this);for(var t=this.children,r=0,a=t.length;r<void 0;r++)t[r].traverseVisible(e)}},traverseAncestors:function(e){var t=this.parent;null!==t&&(e(t),t.traverseAncestors(e))},updateMatrix:function(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0},updateMatrixWorld:function(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(null===this.parent?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);for(var t=this.children,r=0,a=t.length;r<a;r++)t[r].updateMatrixWorld(e)},updateWorldMatrix:function(e,t){var r=this.parent;if(!0===e&&null!==r&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),null===this.parent?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),!0===t)for(var a=this.children,n=0,o=a.length;n<o;n++)a[n].updateWorldMatrix(!1,!0)},toJSON:function(e){function t(t,r){return void 0===t[r.uuid]&&(t[r.uuid]=r.toJSON(e)),r.uuid}function r(e){var t=[];for(var r in e){var a=e[r];delete a.metadata,t.push(a)}return t}var a=void 0===e||"string"==typeof e,n={};a&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});var o={};if(o.uuid=this.uuid,o.type=this.type,""!==this.name&&(o.name=this.name),!0===this.castShadow&&(o.castShadow=!0),!0===this.receiveShadow&&(o.receiveShadow=!0),!1===this.visible&&(o.visible=!1),!1===this.frustumCulled&&(o.frustumCulled=!1),0!==this.renderOrder&&(o.renderOrder=this.renderOrder),"{}"!==JSON.stringify(this.userData)&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),!1===this.matrixAutoUpdate&&(o.matrixAutoUpdate=!1),this.isMesh&&this.drawMode!==TrianglesDrawMode&&(o.drawMode=this.drawMode),this.isMesh||this.isLine||this.isPoints){o.geometry=t(e.geometries,this.geometry);var s=this.geometry.parameters;if(void 0!==s&&void 0!==s.shapes){var d=s.shapes;if(Array.isArray(d))for(var p=0,m=d.length,u;p<m;p++)u=d[p],t(e.shapes,u);else t(e.shapes,d)}}if(void 0!==this.material)if(Array.isArray(this.material)){for(var c=[],p=0,m=this.material.length;p<m;p++)c.push(t(e.materials,this.material[p]));o.material=c}else o.material=t(e.materials,this.material);if(0<this.children.length){o.children=[];for(var p=0;p<this.children.length;p++)o.children.push(this.children[p].toJSON(e).object)}if(a){var g=r(e.geometries),h=r(e.materials),f=r(e.textures),x=r(e.images),d=r(e.shapes);0<g.length&&(n.geometries=g),0<h.length&&(n.materials=h),0<f.length&&(n.textures=f),0<x.length&&(n.images=x),0<d.length&&(n.shapes=d)}return n.object=o,n},clone:function(e){return new this.constructor().copy(this,e)},copy:function(e,t){if(void 0===t&&(t=!0),this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.userData=JSON.parse(JSON.stringify(e.userData)),!0===t)for(var r=0,a;r<e.children.length;r++)a=e.children[r],this.add(a.clone());return this}});function Scene(){Object3D.call(this),this.type="Scene",this.background=null,this.fog=null,this.overrideMaterial=null,this.autoUpdate=!0}Scene.prototype=Object.assign(Object.create(Object3D.prototype),{constructor:Scene,isScene:!0,copy:function(e,t){return Object3D.prototype.copy.call(this,e,t),null!==e.background&&(this.background=e.background.clone()),null!==e.fog&&(this.fog=e.fog.clone()),null!==e.overrideMaterial&&(this.overrideMaterial=e.overrideMaterial.clone()),this.autoUpdate=e.autoUpdate,this.matrixAutoUpdate=e.matrixAutoUpdate,this},toJSON:function(e){var t=Object3D.prototype.toJSON.call(this,e);return null!==this.background&&(t.object.background=this.background.toJSON(e)),null!==this.fog&&(t.object.fog=this.fog.toJSON()),t},dispose:function(){this.dispatchEvent({type:"dispose"})}});function Camera(){Object3D.call(this),this.type="Camera",this.matrixWorldInverse=new Matrix4,this.projectionMatrix=new Matrix4,this.projectionMatrixInverse=new Matrix4}Camera.prototype=Object.assign(Object.create(Object3D.prototype),{constructor:Camera,isCamera:!0,copy:function(e,t){return Object3D.prototype.copy.call(this,e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this},getWorldDirection:function(t){t===void 0&&(console.warn("THREE.Camera: .getWorldDirection() target is now required"),t=new Vector3),this.updateMatrixWorld(!0);var r=this.matrixWorld.elements;return t.set(-r[8],-r[9],-r[10]).normalize()},updateMatrixWorld:function(e){Object3D.prototype.updateMatrixWorld.call(this,e),this.matrixWorldInverse.getInverse(this.matrixWorld)},clone:function(){return new this.constructor().copy(this)}});function PerspectiveCamera(e,t,r,a){Camera.call(this),this.type="PerspectiveCamera",this.fov=e===void 0?50:e,this.zoom=1,this.near=r===void 0?.1:r,this.far=a===void 0?2e3:a,this.focus=10,this.aspect=t===void 0?1:t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}PerspectiveCamera.prototype=Object.assign(Object.create(Camera.prototype),{constructor:PerspectiveCamera,isPerspectiveCamera:!0,copy:function(e,t){return Camera.prototype.copy.call(this,e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=null===e.view?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this},setFocalLength:function(e){var t=.5*this.getFilmHeight()/e;this.fov=2*_Math.RAD2DEG*Math.atan(t),this.updateProjectionMatrix()},getFocalLength:function(){var e=Math.tan(.5*_Math.DEG2RAD*this.fov);return .5*this.getFilmHeight()/e},getEffectiveFOV:function(){return 2*_Math.RAD2DEG*Math.atan(Math.tan(.5*_Math.DEG2RAD*this.fov)/this.zoom)},getFilmWidth:function(){return this.filmGauge*Math.min(this.aspect,1)},getFilmHeight:function(){return this.filmGauge/Math.max(this.aspect,1)},setViewOffset:function(e,t,r,a,n,i){this.aspect=e/t,null===this.view&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=a,this.view.width=n,this.view.height=i,this.updateProjectionMatrix()},clearViewOffset:function(){null!==this.view&&(this.view.enabled=!1),this.updateProjectionMatrix()},updateProjectionMatrix:function(){var e=this.near,t=e*Math.tan(.5*_Math.DEG2RAD*this.fov)/this.zoom,r=2*t,a=this.aspect*r,n=-.5*a,i=this.view;if(null!==this.view&&this.view.enabled){var o=i.fullWidth,s=i.fullHeight;n+=i.offsetX*a/o,t-=i.offsetY*r/s,a*=i.width/o,r*=i.height/s}var d=this.filmOffset;0!==d&&(n+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(n,n+a,t,t-r,e,this.far),this.projectionMatrixInverse.getInverse(this.projectionMatrix)},toJSON:function(e){var t=Object3D.prototype.toJSON.call(this,e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,null!==this.view&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}});function Vector2(e,t){this.x=e||0,this.y=t||0}Object.defineProperties(Vector2.prototype,{width:{get:function(){return this.x},set:function(e){this.x=e}},height:{get:function(){return this.y},set:function(e){this.y=e}}}),Object.assign(Vector2.prototype,{isVector2:!0,set:function(e,t){return this.x=e,this.y=t,this},setScalar:function(e){return this.x=e,this.y=e,this},setX:function(e){return this.x=e,this},setY:function(e){return this.y=e,this},setComponent:function(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e);}return this},getComponent:function(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e);}},clone:function(){return new this.constructor(this.x,this.y)},copy:function(e){return this.x=e.x,this.y=e.y,this},add:function(e,t){return void 0===t?(this.x+=e.x,this.y+=e.y,this):(console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(e,t))},addScalar:function(e){return this.x+=e,this.y+=e,this},addVectors:function(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this},addScaledVector:function(e,t){return this.x+=e.x*t,this.y+=e.y*t,this},sub:function(e,t){return void 0===t?(this.x-=e.x,this.y-=e.y,this):(console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(e,t))},subScalar:function(e){return this.x-=e,this.y-=e,this},subVectors:function(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this},multiply:function(e){return this.x*=e.x,this.y*=e.y,this},multiplyScalar:function(e){return this.x*=e,this.y*=e,this},divide:function(e){return this.x/=e.x,this.y/=e.y,this},divideScalar:function(e){return this.multiplyScalar(1/e)},applyMatrix3:function(t){var r=this.x,a=this.y,n=t.elements;return this.x=n[0]*r+n[3]*a+n[6],this.y=n[1]*r+n[4]*a+n[7],this},min:function(e){var t=Math.min;return this.x=t(this.x,e.x),this.y=t(this.y,e.y),this},max:function(e){var t=Math.max;return this.x=t(this.x,e.x),this.y=t(this.y,e.y),this},clamp:function(e,t){var r=Math.max,a=Math.min;return this.x=r(e.x,a(t.x,this.x)),this.y=r(e.y,a(t.y,this.y)),this},clampScalar:function(){var e=new Vector2,t=new Vector2;return function(r,a){return e.set(r,r),t.set(a,a),this.clamp(e,t)}}(),clampLength:function(e,t){var r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))},floor:function(){var e=Math.floor;return this.x=e(this.x),this.y=e(this.y),this},ceil:function(){var e=Math.ceil;return this.x=e(this.x),this.y=e(this.y),this},round:function(){var e=Math.round;return this.x=e(this.x),this.y=e(this.y),this},roundToZero:function(){var e=Math.ceil,t=Math.floor;return this.x=0>this.x?e(this.x):t(this.x),this.y=0>this.y?e(this.y):t(this.y),this},negate:function(){return this.x=-this.x,this.y=-this.y,this},dot:function(e){return this.x*e.x+this.y*e.y},cross:function(e){return this.x*e.y-this.y*e.x},lengthSq:function(){return this.x*this.x+this.y*this.y},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},manhattanLength:function(){var e=Math.abs;return e(this.x)+e(this.y)},normalize:function(){return this.divideScalar(this.length()||1)},angle:function(){var e=Math.PI,t=Math.atan2,r=t(this.y,this.x);return 0>r&&(r+=2*e),r},distanceTo:function(e){return Math.sqrt(this.distanceToSquared(e))},distanceToSquared:function(e){var t=this.x-e.x,r=this.y-e.y;return t*t+r*r},manhattanDistanceTo:function(e){var t=Math.abs;return t(this.x-e.x)+t(this.y-e.y)},setLength:function(e){return this.normalize().multiplyScalar(e)},lerp:function(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this},lerpVectors:function(e,t,r){return this.subVectors(t,e).multiplyScalar(r).add(e)},equals:function(e){return e.x===this.x&&e.y===this.y},fromArray:function(e,t){return void 0===t&&(t=0),this.x=e[t],this.y=e[t+1],this},toArray:function(e,t){return void 0===e&&(e=[]),void 0===t&&(t=0),e[t]=this.x,e[t+1]=this.y,e},fromBufferAttribute:function(e,t,r){return void 0!==r&&console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."),this.x=e.getX(t),this.y=e.getY(t),this},rotateAround:function(e,t){var r=Math.sin,a=Math.cos,n=a(t),i=r(t),o=this.x-e.x,s=this.y-e.y;return this.x=o*n-s*i+e.x,this.y=o*i+s*n+e.y,this}});function Box3(e,t){this.min=e===void 0?new Vector3(+Infinity,+Infinity,+Infinity):e,this.max=t===void 0?new Vector3(-Infinity,-Infinity,-Infinity):t}Object.assign(Box3.prototype,{isBox3:!0,set:function(e,t){return this.min.copy(e),this.max.copy(t),this},setFromArray:function(e){for(var t=+Infinity,r=+Infinity,a=+Infinity,n=-Infinity,o=-Infinity,s=-Infinity,d=0,p=e.length;d<p;d+=3){var l=e[d],m=e[d+1],u=e[d+2];l<t&&(t=l),m<r&&(r=m),u<a&&(a=u),l>n&&(n=l),m>o&&(o=m),u>s&&(s=u)}return this.min.set(t,r,a),this.max.set(n,o,s),this},setFromBufferAttribute:function(e){for(var t=+Infinity,r=+Infinity,a=+Infinity,n=-Infinity,o=-Infinity,s=-Infinity,d=0,p=e.count;d<p;d++){var l=e.getX(d),m=e.getY(d),u=e.getZ(d);l<t&&(t=l),m<r&&(r=m),u<a&&(a=u),l>n&&(n=l),m>o&&(o=m),u>s&&(s=u)}return this.min.set(t,r,a),this.max.set(n,o,s),this},setFromPoints:function(e){this.makeEmpty();for(var t=0,r=e.length;t<r;t++)this.expandByPoint(e[t]);return this},setFromCenterAndSize:function(){var e=new Vector3;return function(t,r){var a=e.copy(r).multiplyScalar(.5);return this.min.copy(t).sub(a),this.max.copy(t).add(a),this}}(),setFromObject:function(e){return this.makeEmpty(),this.expandByObject(e)},clone:function(){return new this.constructor().copy(this)},copy:function(e){return this.min.copy(e.min),this.max.copy(e.max),this},makeEmpty:function(){return this.min.x=this.min.y=this.min.z=+Infinity,this.max.x=this.max.y=this.max.z=-Infinity,this},isEmpty:function(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z},getCenter:function(e){return void 0===e&&(console.warn("THREE.Box3: .getCenter() target is now required"),e=new Vector3),this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)},getSize:function(e){return void 0===e&&(console.warn("THREE.Box3: .getSize() target is now required"),e=new Vector3),this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)},expandByPoint:function(e){return this.min.min(e),this.max.max(e),this},expandByVector:function(e){return this.min.sub(e),this.max.add(e),this},expandByScalar:function(e){return this.min.addScalar(-e),this.max.addScalar(e),this},expandByObject:function(){function e(e){var i=e.geometry;if(i!==void 0)if(i.isGeometry){var o=i.vertices;for(a=0,n=o.length;a<n;a++)t.copy(o[a]),t.applyMatrix4(e.matrixWorld),r.expandByPoint(t)}else if(i.isBufferGeometry){var s=i.attributes.position;if(void 0!==s)for(a=0,n=s.count;a<n;a++)t.fromBufferAttribute(s,a).applyMatrix4(e.matrixWorld),r.expandByPoint(t)}}var t=new Vector3,r,a,n;return function(t){return r=this,t.updateMatrixWorld(!0),t.traverse(e),this}}(),containsPoint:function(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)},containsBox:function(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z},getParameter:function(e,t){return void 0===t&&(console.warn("THREE.Box3: .getParameter() target is now required"),t=new Vector3),t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))},intersectsBox:function(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)},intersectsSphere:function(){var e=new Vector3;return function(t){return this.clampPoint(t.center,e),e.distanceToSquared(t.center)<=t.radius*t.radius}}(),intersectsPlane:function(e){var t,r;return 0<e.normal.x?(t=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,r=e.normal.x*this.min.x),0<e.normal.y?(t+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),0<e.normal.z?(t+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),t<=-e.constant&&r>=-e.constant},intersectsTriangle:function(){var t=Math.abs,a=Math.max;function e(e){var d,p;for(d=0,p=e.length-3;d<=p;d+=3){l.fromArray(e,d);var u=m.x*t(l.x)+m.y*t(l.y)+m.z*t(l.z),r=n.dot(l),c=o.dot(l),g=s.dot(l);if(a(-a(r,c,g),Math.min(r,c,g))>u)return!1}return!0}var n=new Vector3,o=new Vector3,s=new Vector3,r=new Vector3,i=new Vector3,d=new Vector3,l=new Vector3,p=new Vector3,m=new Vector3,u=new Vector3;return function(t){if(this.isEmpty())return!1;this.getCenter(p),m.subVectors(this.max,p),n.subVectors(t.a,p),o.subVectors(t.b,p),s.subVectors(t.c,p),r.subVectors(o,n),i.subVectors(s,o),d.subVectors(n,s);var a=[0,-r.z,r.y,0,-i.z,i.y,0,-d.z,d.y,r.z,0,-r.x,i.z,0,-i.x,d.z,0,-d.x,-r.y,r.x,0,-i.y,i.x,0,-d.y,d.x,0];return!!e(a)&&(a=[1,0,0,0,1,0,0,0,1],!!e(a))&&(u.crossVectors(r,i),a=[u.x,u.y,u.z],e(a))}}(),clampPoint:function(e,t){return void 0===t&&(console.warn("THREE.Box3: .clampPoint() target is now required"),t=new Vector3),t.copy(e).clamp(this.min,this.max)},distanceToPoint:function(){var e=new Vector3;return function(t){var r=e.copy(t).clamp(this.min,this.max);return r.sub(t).length()}}(),getBoundingSphere:function(){var e=new Vector3;return function(t){return void 0===t&&(console.warn("THREE.Box3: .getBoundingSphere() target is now required"),t=new Sphere),this.getCenter(t.center),t.radius=.5*this.getSize(e).length(),t}}(),intersect:function(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this},union:function(e){return this.min.min(e.min),this.max.max(e.max),this},applyMatrix4:function(){var e=[new Vector3,new Vector3,new Vector3,new Vector3,new Vector3,new Vector3,new Vector3,new Vector3];return function(t){return this.isEmpty()?this:(e[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),e[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),e[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),e[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),e[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),e[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),e[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),e[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(e),this)}}(),translate:function(e){return this.min.add(e),this.max.add(e),this},equals:function(e){return e.min.equals(this.min)&&e.max.equals(this.max)}});function Sphere(e,t){this.center=e===void 0?new Vector3:e,this.radius=t===void 0?0:t}Object.assign(Sphere.prototype,{set:function(e,t){return this.center.copy(e),this.radius=t,this},setFromPoints:function(){var e=Math.sqrt,t=Math.max,r=new Box3;return function(a,n){var o=this.center;void 0===n?r.setFromPoints(a).getCenter(o):o.copy(n);for(var s=0,d=0,l=a.length;d<l;d++)s=t(s,o.distanceToSquared(a[d]));return this.radius=e(s),this}}(),clone:function(){return new this.constructor().copy(this)},copy:function(e){return this.center.copy(e.center),this.radius=e.radius,this},empty:function(){return 0>=this.radius},containsPoint:function(e){return e.distanceToSquared(this.center)<=this.radius*this.radius},distanceToPoint:function(e){return e.distanceTo(this.center)-this.radius},intersectsSphere:function(e){var t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t},intersectsBox:function(e){return e.intersectsSphere(this)},intersectsPlane:function(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius},clampPoint:function(e,t){var r=this.center.distanceToSquared(e);return void 0===t&&(console.warn("THREE.Sphere: .clampPoint() target is now required"),t=new Vector3),t.copy(e),r>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t},getBoundingBox:function(e){return void 0===e&&(console.warn("THREE.Sphere: .getBoundingBox() target is now required"),e=new Box3),e.set(this.center,this.center),e.expandByScalar(this.radius),e},applyMatrix4:function(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this},translate:function(e){return this.center.add(e),this},equals:function(e){return e.center.equals(this.center)&&e.radius===this.radius}});function Ray(e,t){this.origin=e===void 0?new Vector3:e,this.direction=t===void 0?new Vector3:t}Object.assign(Ray.prototype,{set:function(e,t){return this.origin.copy(e),this.direction.copy(t),this},clone:function(){return new this.constructor().copy(this)},copy:function(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this},at:function(e,t){return void 0===t&&(console.warn("THREE.Ray: .at() target is now required"),t=new Vector3),t.copy(this.direction).multiplyScalar(e).add(this.origin)},lookAt:function(e){return this.direction.copy(e).sub(this.origin).normalize(),this},recast:function(){var e=new Vector3;return function(r){return this.origin.copy(this.at(r,e)),this}}(),closestPointToPoint:function(e,t){t===void 0&&(console.warn("THREE.Ray: .closestPointToPoint() target is now required"),t=new Vector3),t.subVectors(e,this.origin);var r=t.dot(this.direction);return 0>r?t.copy(this.origin):t.copy(this.direction).multiplyScalar(r).add(this.origin)},distanceToPoint:function(e){return Math.sqrt(this.distanceSqToPoint(e))},distanceSqToPoint:function(){var e=new Vector3;return function(t){var r=e.subVectors(t,this.origin).dot(this.direction);return 0>r?this.origin.distanceToSquared(t):(e.copy(this.direction).multiplyScalar(r).add(this.origin),e.distanceToSquared(t))}}(),distanceSqToSegment:function(){var e=Math.abs,t=Math.max,r=Math.min,a=new Vector3,n=new Vector3,i=new Vector3;return function(o,s,d,l){a.copy(o).add(s).multiplyScalar(.5),n.copy(s).sub(o).normalize(),i.copy(this.origin).sub(a);var p=.5*o.distanceTo(s),m=-this.direction.dot(n),u=i.dot(this.direction),g=-i.dot(n),h=i.lengthSq(),c=e(1-m*m),f,x,y,_;if(!(0<c))x=0<m?-p:p,f=t(0,-(m*x+u)),y=-f*f+x*(x+2*g)+h;else if(f=m*g-u,x=m*u-g,_=p*c,!(0<=f))x<=-_?(f=t(0,-(-m*p+u)),x=0<f?-p:r(t(-p,-g),p),y=-f*f+x*(x+2*g)+h):x<=_?(f=0,x=r(t(-p,-g),p),y=x*(x+2*g)+h):(f=t(0,-(m*p+u)),x=0<f?p:r(t(-p,-g),p),y=-f*f+x*(x+2*g)+h);else if(!(x>=-_))x=-p,f=t(0,-(m*x+u)),y=-f*f+x*(x+2*g)+h;else if(x<=_){var b=1/c;f*=b,x*=b,y=f*(f+m*x+2*u)+x*(m*f+x+2*g)+h}else x=p,f=t(0,-(m*x+u)),y=-f*f+x*(x+2*g)+h;return d&&d.copy(this.direction).multiplyScalar(f).add(this.origin),l&&l.copy(n).multiplyScalar(x).add(a),y}}(),intersectSphere:function(){var e=new Vector3;return function(t,r){e.subVectors(t.center,this.origin);var a=e.dot(this.direction),n=e.dot(e)-a*a,i=t.radius*t.radius;if(n>i)return null;var o=Math.sqrt(i-n),s=a-o,d=a+o;return 0>s&&0>d?null:0>s?this.at(d,r):this.at(s,r)}}(),intersectsSphere:function(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius},distanceToPlane:function(e){var r=e.normal.dot(this.direction);if(0===r)return 0===e.distanceToPoint(this.origin)?0:null;var a=-(this.origin.dot(e.normal)+e.constant)/r;return 0<=a?a:null},intersectPlane:function(e,r){var a=this.distanceToPlane(e);return null===a?null:this.at(a,r)},intersectsPlane:function(e){var t=e.distanceToPoint(this.origin);if(0===t)return!0;var r=e.normal.dot(this.direction);return!!(0>r*t)},intersectBox:function(e,t){var r=1/this.direction.x,a=1/this.direction.y,n=1/this.direction.z,i=this.origin,o,s,d,l,p,m;return(0<=r?(o=(e.min.x-i.x)*r,s=(e.max.x-i.x)*r):(o=(e.max.x-i.x)*r,s=(e.min.x-i.x)*r),0<=a?(d=(e.min.y-i.y)*a,l=(e.max.y-i.y)*a):(d=(e.max.y-i.y)*a,l=(e.min.y-i.y)*a),o>l||d>s)?null:((d>o||o!=o)&&(o=d),(l<s||s!=s)&&(s=l),0<=n?(p=(e.min.z-i.z)*n,m=(e.max.z-i.z)*n):(p=(e.max.z-i.z)*n,m=(e.min.z-i.z)*n),o>m||p>s)?null:((p>o||o!=o)&&(o=p),(m<s||s!=s)&&(s=m),0>s?null:this.at(0<=o?o:s,t))},intersectsBox:function(){var e=new Vector3;return function(t){return null!==this.intersectBox(t,e)}}(),intersectTriangle:function(){var e=new Vector3,t=new Vector3,r=new Vector3,n=new Vector3;return function(i,a,o,s,d){t.subVectors(a,i),r.subVectors(o,i),n.crossVectors(t,r);var l=this.direction.dot(n),p;if(0<l){if(s)return null;p=1}else if(0>l)p=-1,l=-l;else return null;e.subVectors(this.origin,i);var m=p*this.direction.dot(r.crossVectors(e,r));if(0>m)return null;var u=p*this.direction.dot(t.cross(e));if(0>u)return null;if(m+u>l)return null;var c=-p*e.dot(n);return 0>c?null:this.at(c/l,d)}}(),applyMatrix4:function(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this},equals:function(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}});function Triangle(e,t,r){this.a=e===void 0?new Vector3:e,this.b=t===void 0?new Vector3:t,this.c=r===void 0?new Vector3:r}Object.assign(Triangle,{getNormal:function(){var e=Math.sqrt,t=new Vector3;return function(r,a,n,i){i===void 0&&(console.warn("THREE.Triangle: .getNormal() target is now required"),i=new Vector3),i.subVectors(n,a),t.subVectors(r,a),i.cross(t);var o=i.lengthSq();return 0<o?i.multiplyScalar(1/e(o)):i.set(0,0,0)}}(),getBarycoord:function(){var e=new Vector3,t=new Vector3,r=new Vector3;return function(n,i,a,o,s){e.subVectors(o,i),t.subVectors(a,i),r.subVectors(n,i);var d=e.dot(e),l=e.dot(t),p=e.dot(r),m=t.dot(t),c=t.dot(r),g=d*m-l*l;if(void 0===s&&(console.warn("THREE.Triangle: .getBarycoord() target is now required"),s=new Vector3),0===g)return s.set(-2,-1,-1);var h=1/g,f=(m*p-l*c)*h,u=(d*c-l*p)*h;return s.set(1-f-u,u,f)}}(),containsPoint:function(){var e=new Vector3;return function(t,r,a,n){return Triangle.getBarycoord(t,r,a,n,e),0<=e.x&&0<=e.y&&1>=e.x+e.y}}(),getUV:function(){var e=new Vector3;return function(t,r,a,n,i,o,s,d){return this.getBarycoord(t,r,a,n,e),d.set(0,0),d.addScaledVector(i,e.x),d.addScaledVector(o,e.y),d.addScaledVector(s,e.z),d}}()}),Object.assign(Triangle.prototype,{set:function(e,t,r){return this.a.copy(e),this.b.copy(t),this.c.copy(r),this},setFromPointsAndIndices:function(e,t,r,a){return this.a.copy(e[t]),this.b.copy(e[r]),this.c.copy(e[a]),this},clone:function(){return new this.constructor().copy(this)},copy:function(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this},getArea:function(){var e=new Vector3,t=new Vector3;return function(){return e.subVectors(this.c,this.b),t.subVectors(this.a,this.b),.5*e.cross(t).length()}}(),getMidpoint:function(e){return void 0===e&&(console.warn("THREE.Triangle: .getMidpoint() target is now required"),e=new Vector3),e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)},getNormal:function(e){return Triangle.getNormal(this.a,this.b,this.c,e)},getPlane:function(e){return void 0===e&&(console.warn("THREE.Triangle: .getPlane() target is now required"),e=new Vector3),e.setFromCoplanarPoints(this.a,this.b,this.c)},getBarycoord:function(e,t){return Triangle.getBarycoord(e,this.a,this.b,this.c,t)},containsPoint:function(e){return Triangle.containsPoint(e,this.a,this.b,this.c)},getUV:function(e,t,r,a,n){return Triangle.getUV(e,this.a,this.b,this.c,t,r,a,n)},intersectsBox:function(e){return e.intersectsTriangle(this)},closestPointToPoint:function(){var e=new Vector3,t=new Vector3,r=new Vector3,n=new Vector3,i=new Vector3,o=new Vector3;return function(s,d){void 0===d&&(console.warn("THREE.Triangle: .closestPointToPoint() target is now required"),d=new Vector3);var l=this.a,a=this.b,p=this.c,m,u;e.subVectors(a,l),t.subVectors(p,l),n.subVectors(s,l);var c=e.dot(n),g=t.dot(n);if(0>=c&&0>=g)return d.copy(l);i.subVectors(s,a);var h=e.dot(i),f=t.dot(i);if(0<=h&&f<=h)return d.copy(a);var x=c*f-h*g;if(0>=x&&0<=c&&0>=h)return m=c/(c-h),d.copy(l).addScaledVector(e,m);o.subVectors(s,p);var y=e.dot(o),_=t.dot(o);if(0<=_&&y<=_)return d.copy(p);var b=y*g-c*_;if(0>=b&&0<=g&&0>=_)return u=g/(g-_),d.copy(l).addScaledVector(t,u);var E=h*_-y*f;if(0>=E&&0<=f-h&&0<=y-_)return r.subVectors(p,a),u=(f-h)/(f-h+(y-_)),d.copy(a).addScaledVector(r,u);var T=1/(E+b+x);return m=b*T,u=x*T,d.copy(l).addScaledVector(e,m).addScaledVector(t,u)}}(),equals:function(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}});var ColorKeywords={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function Color(e,t,r){return void 0===t&&void 0===r?this.set(e):this.setRGB(e,t,r)}Object.assign(Color.prototype,{isColor:!0,r:1,g:1,b:1,set:function(e){return e&&e.isColor?this.copy(e):"number"==typeof e?this.setHex(e):"string"==typeof e&&this.setStyle(e),this},setScalar:function(e){return this.r=e,this.g=e,this.b=e,this},setHex:function(e){var t=Math.floor;return e=t(e),this.r=(255&e>>16)/255,this.g=(255&e>>8)/255,this.b=(255&e)/255,this},setRGB:function(e,t,r){return this.r=e,this.g=t,this.b=r,this},setHSL:function(){function e(e,r,a){return 0>a&&(a+=1),1<a&&(a-=1),a<1/6?e+6*(r-e)*a:a<1/2?r:a<2/3?e+6*(r-e)*(2/3-a):e}return function(t,r,a){if(t=_Math.euclideanModulo(t,1),r=_Math.clamp(r,0,1),a=_Math.clamp(a,0,1),0===r)this.r=this.g=this.b=a;else{var n=.5>=a?a*(1+r):a+r-a*r,i=2*a-n;this.r=e(i,n,t+1/3),this.g=e(i,n,t),this.b=e(i,n,t-1/3)}return this}}(),setStyle:function(e){var r=Math.min;function t(t){void 0===t||1>parseFloat(t)&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}var a;if(a=/^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(e)){var n=a[1],i=a[2],o;switch(n){case"rgb":case"rgba":if(o=/^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(i))return this.r=r(255,parseInt(o[1],10))/255,this.g=r(255,parseInt(o[2],10))/255,this.b=r(255,parseInt(o[3],10))/255,t(o[5]),this;if(o=/^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(i))return this.r=r(100,parseInt(o[1],10))/100,this.g=r(100,parseInt(o[2],10))/100,this.b=r(100,parseInt(o[3],10))/100,t(o[5]),this;break;case"hsl":case"hsla":if(o=/^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(i)){var d=parseFloat(o[1])/360,p=parseInt(o[2],10)/100,s=parseInt(o[3],10)/100;return t(o[5]),this.setHSL(d,p,s)}}}else if(a=/^\#([A-Fa-f0-9]+)$/.exec(e)){var l=a[1],u=l.length;if(3===u)return this.r=parseInt(l.charAt(0)+l.charAt(0),16)/255,this.g=parseInt(l.charAt(1)+l.charAt(1),16)/255,this.b=parseInt(l.charAt(2)+l.charAt(2),16)/255,this;if(6===u)return this.r=parseInt(l.charAt(0)+l.charAt(1),16)/255,this.g=parseInt(l.charAt(2)+l.charAt(3),16)/255,this.b=parseInt(l.charAt(4)+l.charAt(5),16)/255,this}if(e&&0<e.length){var l=ColorKeywords[e];void 0===l?console.warn("THREE.Color: Unknown color "+e):this.setHex(l)}return this},clone:function(){return new this.constructor(this.r,this.g,this.b)},copy:function(e){return this.r=e.r,this.g=e.g,this.b=e.b,this},copyGammaToLinear:function(e,t){var r=Math.pow;return void 0===t&&(t=2),this.r=r(e.r,t),this.g=r(e.g,t),this.b=r(e.b,t),this},copyLinearToGamma:function(e,t){var r=Math.pow;void 0===t&&(t=2);var a=0<t?1/t:1;return this.r=r(e.r,a),this.g=r(e.g,a),this.b=r(e.b,a),this},convertGammaToLinear:function(e){return this.copyGammaToLinear(this,e),this},convertLinearToGamma:function(e){return this.copyLinearToGamma(this,e),this},copySRGBToLinear:function(){function e(e){return .04045>e?.0773993808*e:Math.pow(.9478672986*e+.0521327014,2.4)}return function(t){return this.r=e(t.r),this.g=e(t.g),this.b=e(t.b),this}}(),copyLinearToSRGB:function(){function e(e){return .0031308>e?12.92*e:1.055*Math.pow(e,.41666)-.055}return function(t){return this.r=e(t.r),this.g=e(t.g),this.b=e(t.b),this}}(),convertSRGBToLinear:function(){return this.copySRGBToLinear(this),this},convertLinearToSRGB:function(){return this.copyLinearToSRGB(this),this},getHex:function(){return 255*this.r<<16^255*this.g<<8^255*this.b<<0},getHexString:function(){return("000000"+this.getHex().toString(16)).slice(-6)},getHSL:function(e){var t=Math.max,a=Math.min;void 0===e&&(console.warn("THREE.Color: .getHSL() target is now required"),e={h:0,s:0,l:0});var n=this.r,r=this.g,i=this.b,o=t(n,r,i),s=a(n,r,i),d=(s+o)/2,l,p;if(s===o)l=0,p=0;else{var m=o-s;p=.5>=d?m/(o+s):m/(2-o-s),o===n?l=(r-i)/m+(r<i?6:0):o===r?l=(i-n)/m+2:o===i?l=(n-r)/m+4:void 0,l/=6}return e.h=l,e.s=p,e.l=d,e},getStyle:function(){return"rgb("+(0|255*this.r)+","+(0|255*this.g)+","+(0|255*this.b)+")"},offsetHSL:function(){var e={};return function(t,r,a){return this.getHSL(e),e.h+=t,e.s+=r,e.l+=a,this.setHSL(e.h,e.s,e.l),this}}(),add:function(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this},addColors:function(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this},addScalar:function(e){return this.r+=e,this.g+=e,this.b+=e,this},sub:function(e){var t=Math.max;return this.r=t(0,this.r-e.r),this.g=t(0,this.g-e.g),this.b=t(0,this.b-e.b),this},multiply:function(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this},multiplyScalar:function(e){return this.r*=e,this.g*=e,this.b*=e,this},lerp:function(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this},lerpHSL:function(){var e={h:0,s:0,l:0},t={h:0,s:0,l:0};return function(r,a){this.getHSL(e),r.getHSL(t);var n=_Math.lerp(e.h,t.h,a),i=_Math.lerp(e.s,t.s,a),o=_Math.lerp(e.l,t.l,a);return this.setHSL(n,i,o),this}}(),equals:function(e){return e.r===this.r&&e.g===this.g&&e.b===this.b},fromArray:function(e,t){return void 0===t&&(t=0),this.r=e[t],this.g=e[t+1],this.b=e[t+2],this},toArray:function(e,t){return void 0===e&&(e=[]),void 0===t&&(t=0),e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e},toJSON:function(){return this.getHex()}});function Face3(e,t,r,a,n,i){this.a=e,this.b=t,this.c=r,this.normal=a&&a.isVector3?a:new Vector3,this.vertexNormals=Array.isArray(a)?a:[],this.color=n&&n.isColor?n:new Color,this.vertexColors=Array.isArray(n)?n:[],this.materialIndex=i===void 0?0:i}Object.assign(Face3.prototype,{clone:function(){return new this.constructor().copy(this)},copy:function(e){this.a=e.a,this.b=e.b,this.c=e.c,this.normal.copy(e.normal),this.color.copy(e.color),this.materialIndex=e.materialIndex;for(var t=0,r=e.vertexNormals.length;t<r;t++)this.vertexNormals[t]=e.vertexNormals[t].clone();for(var t=0,r=e.vertexColors.length;t<r;t++)this.vertexColors[t]=e.vertexColors[t].clone();return this}});var materialId=0;function Material(){Object.defineProperty(this,"id",{value:materialId++}),this.uuid=_Math.generateUUID(),this.name="",this.type="Material",this.fog=!0,this.lights=!0,this.blending=NormalBlending,this.side=FrontSide,this.flatShading=!1,this.vertexColors=NoColors,this.opacity=1,this.transparent=!1,this.blendSrc=SrcAlphaFactor,this.blendDst=OneMinusSrcAlphaFactor,this.blendEquation=AddEquation,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=LessEqualDepth,this.depthTest=!0,this.depthWrite=!0,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaTest=0,this.premultipliedAlpha=!1,this.visible=!0,this.userData={},this.needsUpdate=!0}Material.prototype=Object.assign(Object.create(EventDispatcher.prototype),{constructor:Material,isMaterial:!0,onBeforeCompile:function(){},setValues:function(e){if(void 0!==e)for(var t in e){var r=e[t];if(void 0===r){console.warn("THREE.Material: '"+t+"' parameter is undefined.");continue}if("shading"==t){console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=r===FlatShading;continue}var a=this[t];if(void 0===a){console.warn("THREE."+this.type+": '"+t+"' is not a property of this material.");continue}a&&a.isColor?a.set(r):a&&a.isVector3&&r&&r.isVector3?a.copy(r):this[t]=r}},toJSON:function(e){function t(e){var t=[];for(var r in e){var a=e[r];delete a.metadata,t.push(a)}return t}var r=void 0===e||"string"==typeof e;r&&(e={textures:{},images:{}});var a={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};if(a.uuid=this.uuid,a.type=this.type,""!==this.name&&(a.name=this.name),this.color&&this.color.isColor&&(a.color=this.color.getHex()),void 0!==this.roughness&&(a.roughness=this.roughness),void 0!==this.metalness&&(a.metalness=this.metalness),this.emissive&&this.emissive.isColor&&(a.emissive=this.emissive.getHex()),1!==this.emissiveIntensity&&(a.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(a.specular=this.specular.getHex()),void 0!==this.shininess&&(a.shininess=this.shininess),void 0!==this.clearCoat&&(a.clearCoat=this.clearCoat),void 0!==this.clearCoatRoughness&&(a.clearCoatRoughness=this.clearCoatRoughness),this.map&&this.map.isTexture&&(a.map=this.map.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(a.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(a.lightMap=this.lightMap.toJSON(e).uuid),this.aoMap&&this.aoMap.isTexture&&(a.aoMap=this.aoMap.toJSON(e).uuid,a.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(a.bumpMap=this.bumpMap.toJSON(e).uuid,a.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(a.normalMap=this.normalMap.toJSON(e).uuid,a.normalMapType=this.normalMapType,a.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(a.displacementMap=this.displacementMap.toJSON(e).uuid,a.displacementScale=this.displacementScale,a.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(a.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(a.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(a.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(a.specularMap=this.specularMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(a.envMap=this.envMap.toJSON(e).uuid,a.reflectivity=this.reflectivity,void 0!==this.combine&&(a.combine=this.combine),void 0!==this.envMapIntensity&&(a.envMapIntensity=this.envMapIntensity)),this.gradientMap&&this.gradientMap.isTexture&&(a.gradientMap=this.gradientMap.toJSON(e).uuid),void 0!==this.size&&(a.size=this.size),void 0!==this.sizeAttenuation&&(a.sizeAttenuation=this.sizeAttenuation),this.blending!==NormalBlending&&(a.blending=this.blending),!0===this.flatShading&&(a.flatShading=this.flatShading),this.side!==FrontSide&&(a.side=this.side),this.vertexColors!==NoColors&&(a.vertexColors=this.vertexColors),1>this.opacity&&(a.opacity=this.opacity),!0===this.transparent&&(a.transparent=this.transparent),a.depthFunc=this.depthFunc,a.depthTest=this.depthTest,a.depthWrite=this.depthWrite,0!==this.rotation&&(a.rotation=this.rotation),!0===this.polygonOffset&&(a.polygonOffset=!0),0!==this.polygonOffsetFactor&&(a.polygonOffsetFactor=this.polygonOffsetFactor),0!==this.polygonOffsetUnits&&(a.polygonOffsetUnits=this.polygonOffsetUnits),1!==this.linewidth&&(a.linewidth=this.linewidth),void 0!==this.dashSize&&(a.dashSize=this.dashSize),void 0!==this.gapSize&&(a.gapSize=this.gapSize),void 0!==this.scale&&(a.scale=this.scale),!0===this.dithering&&(a.dithering=!0),0<this.alphaTest&&(a.alphaTest=this.alphaTest),!0===this.premultipliedAlpha&&(a.premultipliedAlpha=this.premultipliedAlpha),!0===this.wireframe&&(a.wireframe=this.wireframe),1<this.wireframeLinewidth&&(a.wireframeLinewidth=this.wireframeLinewidth),"round"!==this.wireframeLinecap&&(a.wireframeLinecap=this.wireframeLinecap),"round"!==this.wireframeLinejoin&&(a.wireframeLinejoin=this.wireframeLinejoin),!0===this.morphTargets&&(a.morphTargets=!0),!0===this.skinning&&(a.skinning=!0),!1===this.visible&&(a.visible=!1),"{}"!==JSON.stringify(this.userData)&&(a.userData=this.userData),r){var n=t(e.textures),i=t(e.images);0<n.length&&(a.textures=n),0<i.length&&(a.images=i)}return a},clone:function(){return new this.constructor().copy(this)},copy:function(e){this.name=e.name,this.fog=e.fog,this.lights=e.lights,this.blending=e.blending,this.side=e.side,this.flatShading=e.flatShading,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.premultipliedAlpha=e.premultipliedAlpha,this.visible=e.visible,this.userData=JSON.parse(JSON.stringify(e.userData)),this.clipShadows=e.clipShadows,this.clipIntersection=e.clipIntersection;var t=e.clippingPlanes,r=null;if(null!==t){var a=t.length;r=Array(a);for(var n=0;n!==a;++n)r[n]=t[n].clone()}return this.clippingPlanes=r,this.shadowSide=e.shadowSide,this},dispose:function(){this.dispatchEvent({type:"dispose"})}});function MeshBasicMaterial(e){Material.call(this),this.type="MeshBasicMaterial",this.color=new Color(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=MultiplyOperation,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.lights=!1,this.setValues(e)}MeshBasicMaterial.prototype=Object.create(Material.prototype),MeshBasicMaterial.prototype.constructor=MeshBasicMaterial,MeshBasicMaterial.prototype.isMeshBasicMaterial=!0,MeshBasicMaterial.prototype.copy=function(e){return Material.prototype.copy.call(this,e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this};function Vector4(e,t,r,a){this.x=e||0,this.y=t||0,this.z=r||0,this.w=a===void 0?1:a}Object.assign(Vector4.prototype,{isVector4:!0,set:function(e,t,r,a){return this.x=e,this.y=t,this.z=r,this.w=a,this},setScalar:function(e){return this.x=e,this.y=e,this.z=e,this.w=e,this},setX:function(e){return this.x=e,this},setY:function(e){return this.y=e,this},setZ:function(e){return this.z=e,this},setW:function(e){return this.w=e,this},setComponent:function(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e);}return this},getComponent:function(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e);}},clone:function(){return new this.constructor(this.x,this.y,this.z,this.w)},copy:function(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=void 0===e.w?1:e.w,this},add:function(e,t){return void 0===t?(this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this):(console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(e,t))},addScalar:function(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this},addVectors:function(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this},addScaledVector:function(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this},sub:function(e,t){return void 0===t?(this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this):(console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(e,t))},subScalar:function(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this},subVectors:function(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this},multiplyScalar:function(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this},applyMatrix4:function(t){var r=this.x,a=this.y,n=this.z,i=this.w,o=t.elements;return this.x=o[0]*r+o[4]*a+o[8]*n+o[12]*i,this.y=o[1]*r+o[5]*a+o[9]*n+o[13]*i,this.z=o[2]*r+o[6]*a+o[10]*n+o[14]*i,this.w=o[3]*r+o[7]*a+o[11]*n+o[15]*i,this},divideScalar:function(e){return this.multiplyScalar(1/e)},setAxisAngleFromQuaternion:function(e){var t=Math.acos,r=Math.sqrt;this.w=2*t(e.w);var a=r(1-e.w*e.w);return 1e-4>a?(this.x=1,this.y=0,this.z=0):(this.x=e.x/a,this.y=e.y/a,this.z=e.z/a),this},setAxisAngleFromRotationMatrix:function(e){var t=Math.PI,r=Math.acos,a=Math.sqrt,n=Math.abs,i=.01,o=.1,d=e.elements,l=d[0],p=d[4],m=d[8],u=d[1],c=d[5],g=d[9],h=d[2],f=d[6],_=d[10],b,E,v,T;if(n(p-u)<i&&n(m-h)<i&&n(g-f)<i){if(n(p+u)<o&&n(m+h)<o&&n(g+f)<o&&n(l+c+_-3)<o)return this.set(1,0,0,0),this;b=t;var M=(l+1)/2,S=(c+1)/2,A=(_+1)/2,w=(p+u)/4,R=(m+h)/4,L=(g+f)/4;return M>S&&M>A?M<i?(E=0,v=.707106781,T=.707106781):(E=a(M),v=w/E,T=R/E):S>A?S<i?(E=.707106781,v=0,T=.707106781):(v=a(S),E=w/v,T=L/v):A<i?(E=.707106781,v=.707106781,T=0):(T=a(A),E=R/T,v=L/T),this.set(E,v,T,b),this}var P=a((f-g)*(f-g)+(m-h)*(m-h)+(u-p)*(u-p));return .001>n(P)&&(P=1),this.x=(f-g)/P,this.y=(m-h)/P,this.z=(u-p)/P,this.w=r((l+c+_-1)/2),this},min:function(e){var t=Math.min;return this.x=t(this.x,e.x),this.y=t(this.y,e.y),this.z=t(this.z,e.z),this.w=t(this.w,e.w),this},max:function(e){var t=Math.max;return this.x=t(this.x,e.x),this.y=t(this.y,e.y),this.z=t(this.z,e.z),this.w=t(this.w,e.w),this},clamp:function(e,t){var r=Math.max,a=Math.min;return this.x=r(e.x,a(t.x,this.x)),this.y=r(e.y,a(t.y,this.y)),this.z=r(e.z,a(t.z,this.z)),this.w=r(e.w,a(t.w,this.w)),this},clampScalar:function(){var e,t;return function(r,a){return null==e&&(e=new Vector4,t=new Vector4),e.set(r,r,r,r),t.set(a,a,a,a),this.clamp(e,t)}}(),clampLength:function(e,t){var r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))},floor:function(){var e=Math.floor;return this.x=e(this.x),this.y=e(this.y),this.z=e(this.z),this.w=e(this.w),this},ceil:function(){var e=Math.ceil;return this.x=e(this.x),this.y=e(this.y),this.z=e(this.z),this.w=e(this.w),this},round:function(){var e=Math.round;return this.x=e(this.x),this.y=e(this.y),this.z=e(this.z),this.w=e(this.w),this},roundToZero:function(){var e=Math.ceil,t=Math.floor;return this.x=0>this.x?e(this.x):t(this.x),this.y=0>this.y?e(this.y):t(this.y),this.z=0>this.z?e(this.z):t(this.z),this.w=0>this.w?e(this.w):t(this.w),this},negate:function(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this},dot:function(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)},manhattanLength:function(){var e=Math.abs;return e(this.x)+e(this.y)+e(this.z)+e(this.w)},normalize:function(){return this.divideScalar(this.length()||1)},setLength:function(e){return this.normalize().multiplyScalar(e)},lerp:function(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this},lerpVectors:function(e,t,r){return this.subVectors(t,e).multiplyScalar(r).add(e)},equals:function(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w},fromArray:function(e,t){return void 0===t&&(t=0),this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this},toArray:function(e,t){return void 0===e&&(e=[]),void 0===t&&(t=0),e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e},fromBufferAttribute:function(e,t,r){return void 0!==r&&console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."),this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}});function BufferAttribute(e,t,r){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.name="",this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=!0===r,this.dynamic=!1,this.updateRange={offset:0,count:-1},this.version=0}Object.defineProperty(BufferAttribute.prototype,"needsUpdate",{set:function(e){!0===e&&this.version++}}),Object.assign(BufferAttribute.prototype,{isBufferAttribute:!0,onUploadCallback:function(){},setArray:function(e){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");return this.count=void 0===e?0:e.length/this.itemSize,this.array=e,this},setDynamic:function(e){return this.dynamic=e,this},copy:function(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.dynamic=e.dynamic,this},copyAt:function(e,t,r){e*=this.itemSize,r*=t.itemSize;for(var a=0,n=this.itemSize;a<n;a++)this.array[e+a]=t.array[r+a];return this},copyArray:function(e){return this.array.set(e),this},copyColorsArray:function(e){for(var t=this.array,r=0,a=0,n=e.length,o;a<n;a++)o=e[a],void 0===o&&(console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined",a),o=new Color),t[r++]=o.r,t[r++]=o.g,t[r++]=o.b;return this},copyVector2sArray:function(e){for(var t=this.array,r=0,a=0,n=e.length,o;a<n;a++)o=e[a],void 0===o&&(console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined",a),o=new Vector2),t[r++]=o.x,t[r++]=o.y;return this},copyVector3sArray:function(e){for(var t=this.array,r=0,a=0,n=e.length,o;a<n;a++)o=e[a],void 0===o&&(console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined",a),o=new Vector3),t[r++]=o.x,t[r++]=o.y,t[r++]=o.z;return this},copyVector4sArray:function(e){for(var t=this.array,r=0,a=0,n=e.length,o;a<n;a++)o=e[a],void 0===o&&(console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined",a),o=new Vector4),t[r++]=o.x,t[r++]=o.y,t[r++]=o.z,t[r++]=o.w;return this},set:function(e,t){return void 0===t&&(t=0),this.array.set(e,t),this},getX:function(e){return this.array[e*this.itemSize]},setX:function(e,t){return this.array[e*this.itemSize]=t,this},getY:function(e){return this.array[e*this.itemSize+1]},setY:function(e,t){return this.array[e*this.itemSize+1]=t,this},getZ:function(e){return this.array[e*this.itemSize+2]},setZ:function(e,t){return this.array[e*this.itemSize+2]=t,this},getW:function(e){return this.array[e*this.itemSize+3]},setW:function(e,t){return this.array[e*this.itemSize+3]=t,this},setXY:function(e,t,r){return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=r,this},setXYZ:function(e,t,r,a){return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=a,this},setXYZW:function(e,t,r,a,n){return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=a,this.array[e+3]=n,this},onUpload:function(e){return this.onUploadCallback=e,this},clone:function(){return new this.constructor(this.array,this.itemSize).copy(this)}});function Int8BufferAttribute(e,t,r){BufferAttribute.call(this,new Int8Array(e),t,r)}Int8BufferAttribute.prototype=Object.create(BufferAttribute.prototype),Int8BufferAttribute.prototype.constructor=Int8BufferAttribute;function Uint8BufferAttribute(e,t,r){BufferAttribute.call(this,new Uint8Array(e),t,r)}Uint8BufferAttribute.prototype=Object.create(BufferAttribute.prototype),Uint8BufferAttribute.prototype.constructor=Uint8BufferAttribute;function Uint8ClampedBufferAttribute(e,t,r){BufferAttribute.call(this,new Uint8ClampedArray(e),t,r)}Uint8ClampedBufferAttribute.prototype=Object.create(BufferAttribute.prototype),Uint8ClampedBufferAttribute.prototype.constructor=Uint8ClampedBufferAttribute;function Int16BufferAttribute(e,t,r){BufferAttribute.call(this,new Int16Array(e),t,r)}Int16BufferAttribute.prototype=Object.create(BufferAttribute.prototype),Int16BufferAttribute.prototype.constructor=Int16BufferAttribute;function Uint16BufferAttribute(e,t,r){BufferAttribute.call(this,new Uint16Array(e),t,r)}Uint16BufferAttribute.prototype=Object.create(BufferAttribute.prototype),Uint16BufferAttribute.prototype.constructor=Uint16BufferAttribute;function Int32BufferAttribute(e,t,r){BufferAttribute.call(this,new Int32Array(e),t,r)}Int32BufferAttribute.prototype=Object.create(BufferAttribute.prototype),Int32BufferAttribute.prototype.constructor=Int32BufferAttribute;function Uint32BufferAttribute(e,t,r){BufferAttribute.call(this,new Uint32Array(e),t,r)}Uint32BufferAttribute.prototype=Object.create(BufferAttribute.prototype),Uint32BufferAttribute.prototype.constructor=Uint32BufferAttribute;function Float32BufferAttribute(e,t,r){BufferAttribute.call(this,new Float32Array(e),t,r)}Float32BufferAttribute.prototype=Object.create(BufferAttribute.prototype),Float32BufferAttribute.prototype.constructor=Float32BufferAttribute;function Float64BufferAttribute(e,t,r){BufferAttribute.call(this,new Float64Array(e),t,r)}Float64BufferAttribute.prototype=Object.create(BufferAttribute.prototype),Float64BufferAttribute.prototype.constructor=Float64BufferAttribute;function DirectGeometry(){this.vertices=[],this.normals=[],this.colors=[],this.uvs=[],this.uvs2=[],this.groups=[],this.morphTargets={},this.skinWeights=[],this.skinIndices=[],this.boundingBox=null,this.boundingSphere=null,this.verticesNeedUpdate=!1,this.normalsNeedUpdate=!1,this.colorsNeedUpdate=!1,this.uvsNeedUpdate=!1,this.groupsNeedUpdate=!1}Object.assign(DirectGeometry.prototype,{computeGroups:function(e){for(var t=[],r=void 0,a=e.faces,n=0,o,s;n<a.length;n++)s=a[n],s.materialIndex!==r&&(r=s.materialIndex,void 0!==o&&(o.count=3*n-o.start,t.push(o)),o={start:3*n,materialIndex:r});o!==void 0&&(o.count=3*n-o.start,t.push(o)),this.groups=t},fromGeometry:function(e){var t=e.faces,r=e.vertices,a=e.faceVertexUvs,n=a[0]&&0<a[0].length,o=a[1]&&0<a[1].length,s=e.morphTargets,d=s.length,l;if(0<d){l=[];for(var p=0;p<d;p++)l[p]={name:s[p].name,data:[]};this.morphTargets.position=l}var m=e.morphNormals,u=m.length,c;if(0<u){c=[];for(var p=0;p<u;p++)c[p]={name:m[p].name,data:[]};this.morphTargets.normal=c}var g=e.skinIndices,h=e.skinWeights,f=g.length===r.length,x=h.length===r.length;0<r.length&&0===t.length&&console.error("THREE.DirectGeometry: Faceless geometries are not supported.");for(var p=0,y;p<t.length;p++){y=t[p],this.vertices.push(r[y.a],r[y.b],r[y.c]);var _=y.vertexNormals;if(3===_.length)this.normals.push(_[0],_[1],_[2]);else{var b=y.normal;this.normals.push(b,b,b)}var E=y.vertexColors;if(3===E.length)this.colors.push(E[0],E[1],E[2]);else{var v=y.color;this.colors.push(v,v,v)}if(!0===n){var T=a[0][p];void 0===T?(console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ",p),this.uvs.push(new Vector2,new Vector2,new Vector2)):this.uvs.push(T[0],T[1],T[2])}if(!0===o){var T=a[1][p];void 0===T?(console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ",p),this.uvs2.push(new Vector2,new Vector2,new Vector2)):this.uvs2.push(T[0],T[1],T[2])}for(var M=0,S;M<d;M++)S=s[M].vertices,l[M].data.push(S[y.a],S[y.b],S[y.c]);for(var M=0,A;M<u;M++)A=m[M].vertexNormals[p],c[M].data.push(A.a,A.b,A.c);f&&this.skinIndices.push(g[y.a],g[y.b],g[y.c]),x&&this.skinWeights.push(h[y.a],h[y.b],h[y.c])}return this.computeGroups(e),this.verticesNeedUpdate=e.verticesNeedUpdate,this.normalsNeedUpdate=e.normalsNeedUpdate,this.colorsNeedUpdate=e.colorsNeedUpdate,this.uvsNeedUpdate=e.uvsNeedUpdate,this.groupsNeedUpdate=e.groupsNeedUpdate,this}});function arrayMax(e){if(0===e.length)return-Infinity;for(var t=e[0],r=1,a=e.length;r<a;++r)e[r]>t&&(t=e[r]);return t}var bufferGeometryId=1;function BufferGeometry(){Object.defineProperty(this,"id",{value:bufferGeometryId+=2}),this.uuid=_Math.generateUUID(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}BufferGeometry.prototype=Object.assign(Object.create(EventDispatcher.prototype),{constructor:BufferGeometry,isBufferGeometry:!0,getIndex:function(){return this.index},setIndex:function(e){this.index=Array.isArray(e)?new(65535<arrayMax(e)?Uint32BufferAttribute:Uint16BufferAttribute)(e,1):e},addAttribute:function(e,t){return t&&t.isBufferAttribute||t&&t.isInterleavedBufferAttribute?"index"===e?(console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."),this.setIndex(t),this):(this.attributes[e]=t,this):(console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."),this.addAttribute(e,new BufferAttribute(arguments[1],arguments[2])))},getAttribute:function(e){return this.attributes[e]},removeAttribute:function(e){return delete this.attributes[e],this},addGroup:function(e,t,r){this.groups.push({start:e,count:t,materialIndex:r===void 0?0:r})},clearGroups:function(){this.groups=[]},setDrawRange:function(e,t){this.drawRange.start=e,this.drawRange.count=t},applyMatrix:function(e){var t=this.attributes.position;void 0!==t&&(e.applyToBufferAttribute(t),t.needsUpdate=!0);var r=this.attributes.normal;if(void 0!==r){var a=new Matrix3().getNormalMatrix(e);a.applyToBufferAttribute(r),r.needsUpdate=!0}return null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this},rotateX:function(){var e=new Matrix4;return function(t){return e.makeRotationX(t),this.applyMatrix(e),this}}(),rotateY:function(){var e=new Matrix4;return function(t){return e.makeRotationY(t),this.applyMatrix(e),this}}(),rotateZ:function(){var e=new Matrix4;return function(t){return e.makeRotationZ(t),this.applyMatrix(e),this}}(),translate:function(){var e=new Matrix4;return function(t,r,a){return e.makeTranslation(t,r,a),this.applyMatrix(e),this}}(),scale:function(){var e=new Matrix4;return function(t,r,a){return e.makeScale(t,r,a),this.applyMatrix(e),this}}(),lookAt:function(){var e=new Object3D;return function(t){e.lookAt(t),e.updateMatrix(),this.applyMatrix(e.matrix)}}(),center:function(){var e=new Vector3;return function(){return this.computeBoundingBox(),this.boundingBox.getCenter(e).negate(),this.translate(e.x,e.y,e.z),this}}(),setFromObject:function(e){var t=e.geometry;if(e.isPoints||e.isLine){var r=new Float32BufferAttribute(3*t.vertices.length,3),a=new Float32BufferAttribute(3*t.colors.length,3);if(this.addAttribute("position",r.copyVector3sArray(t.vertices)),this.addAttribute("color",a.copyColorsArray(t.colors)),t.lineDistances&&t.lineDistances.length===t.vertices.length){var n=new Float32BufferAttribute(t.lineDistances.length,1);this.addAttribute("lineDistance",n.copyArray(t.lineDistances))}null!==t.boundingSphere&&(this.boundingSphere=t.boundingSphere.clone()),null!==t.boundingBox&&(this.boundingBox=t.boundingBox.clone())}else e.isMesh&&t&&t.isGeometry&&this.fromGeometry(t);return this},setFromPoints:function(e){for(var t=[],r=0,a=e.length,n;r<a;r++)n=e[r],t.push(n.x,n.y,n.z||0);return this.addAttribute("position",new Float32BufferAttribute(t,3)),this},updateFromObject:function(e){var t=e.geometry;if(e.isMesh){var r=t.__directGeometry;if(!0===t.elementsNeedUpdate&&(r=void 0,t.elementsNeedUpdate=!1),void 0===r)return this.fromGeometry(t);r.verticesNeedUpdate=t.verticesNeedUpdate,r.normalsNeedUpdate=t.normalsNeedUpdate,r.colorsNeedUpdate=t.colorsNeedUpdate,r.uvsNeedUpdate=t.uvsNeedUpdate,r.groupsNeedUpdate=t.groupsNeedUpdate,t.verticesNeedUpdate=!1,t.normalsNeedUpdate=!1,t.colorsNeedUpdate=!1,t.uvsNeedUpdate=!1,t.groupsNeedUpdate=!1,t=r}var a;return!0===t.verticesNeedUpdate&&(a=this.attributes.position,void 0!==a&&(a.copyVector3sArray(t.vertices),a.needsUpdate=!0),t.verticesNeedUpdate=!1),!0===t.normalsNeedUpdate&&(a=this.attributes.normal,void 0!==a&&(a.copyVector3sArray(t.normals),a.needsUpdate=!0),t.normalsNeedUpdate=!1),!0===t.colorsNeedUpdate&&(a=this.attributes.color,void 0!==a&&(a.copyColorsArray(t.colors),a.needsUpdate=!0),t.colorsNeedUpdate=!1),t.uvsNeedUpdate&&(a=this.attributes.uv,void 0!==a&&(a.copyVector2sArray(t.uvs),a.needsUpdate=!0),t.uvsNeedUpdate=!1),t.lineDistancesNeedUpdate&&(a=this.attributes.lineDistance,void 0!==a&&(a.copyArray(t.lineDistances),a.needsUpdate=!0),t.lineDistancesNeedUpdate=!1),t.groupsNeedUpdate&&(t.computeGroups(e.geometry),this.groups=t.groups,t.groupsNeedUpdate=!1),this},fromGeometry:function(e){return e.__directGeometry=new DirectGeometry().fromGeometry(e),this.fromDirectGeometry(e.__directGeometry)},fromDirectGeometry:function(e){var t=new Float32Array(3*e.vertices.length);if(this.addAttribute("position",new BufferAttribute(t,3).copyVector3sArray(e.vertices)),0<e.normals.length){var r=new Float32Array(3*e.normals.length);this.addAttribute("normal",new BufferAttribute(r,3).copyVector3sArray(e.normals))}if(0<e.colors.length){var a=new Float32Array(3*e.colors.length);this.addAttribute("color",new BufferAttribute(a,3).copyColorsArray(e.colors))}if(0<e.uvs.length){var n=new Float32Array(2*e.uvs.length);this.addAttribute("uv",new BufferAttribute(n,2).copyVector2sArray(e.uvs))}if(0<e.uvs2.length){var o=new Float32Array(2*e.uvs2.length);this.addAttribute("uv2",new BufferAttribute(o,2).copyVector2sArray(e.uvs2))}for(var s in this.groups=e.groups,e.morphTargets){for(var d=[],p=e.morphTargets[s],m=0,u=p.length;m<u;m++){var l=p[m],c=new Float32BufferAttribute(3*l.data.length,3);c.name=l.name,d.push(c.copyVector3sArray(l.data))}this.morphAttributes[s]=d}if(0<e.skinIndices.length){var g=new Float32BufferAttribute(4*e.skinIndices.length,4);this.addAttribute("skinIndex",g.copyVector4sArray(e.skinIndices))}if(0<e.skinWeights.length){var h=new Float32BufferAttribute(4*e.skinWeights.length,4);this.addAttribute("skinWeight",h.copyVector4sArray(e.skinWeights))}return null!==e.boundingSphere&&(this.boundingSphere=e.boundingSphere.clone()),null!==e.boundingBox&&(this.boundingBox=e.boundingBox.clone()),this},computeBoundingBox:function(){null===this.boundingBox&&(this.boundingBox=new Box3);var e=this.attributes.position;e===void 0?this.boundingBox.makeEmpty():this.boundingBox.setFromBufferAttribute(e),(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error("THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The \"position\" attribute is likely to have NaN values.",this)},computeBoundingSphere:function(){var e=Math.max,t=new Box3,r=new Vector3;return function(){null===this.boundingSphere&&(this.boundingSphere=new Sphere);var a=this.attributes.position;if(a){var n=this.boundingSphere.center;t.setFromBufferAttribute(a),t.getCenter(n);for(var o=0,s=0,d=a.count;s<d;s++)r.x=a.getX(s),r.y=a.getY(s),r.z=a.getZ(s),o=e(o,n.distanceToSquared(r));this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&console.error("THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The \"position\" attribute is likely to have NaN values.",this)}}}(),computeFaceNormals:function(){},computeVertexNormals:function(){var e=this.index,t=this.attributes;if(t.position){var r=t.position.array;if(t.normal===void 0)this.addAttribute("normal",new BufferAttribute(new Float32Array(r.length),3));else for(var a=t.normal.array,n=0,o=a.length;n<o;n++)a[n]=0;var s=t.normal.array,d=new Vector3,l=new Vector3,p=new Vector3,m=new Vector3,u=new Vector3,c,g,h;if(e)for(var f=e.array,n=0,o=e.count;n<o;n+=3)c=3*f[n+0],g=3*f[n+1],h=3*f[n+2],d.fromArray(r,c),l.fromArray(r,g),p.fromArray(r,h),m.subVectors(p,l),u.subVectors(d,l),m.cross(u),s[c]+=m.x,s[c+1]+=m.y,s[c+2]+=m.z,s[g]+=m.x,s[g+1]+=m.y,s[g+2]+=m.z,s[h]+=m.x,s[h+1]+=m.y,s[h+2]+=m.z;else for(var n=0,o=r.length;n<o;n+=9)d.fromArray(r,n),l.fromArray(r,n+3),p.fromArray(r,n+6),m.subVectors(p,l),u.subVectors(d,l),m.cross(u),s[n]=m.x,s[n+1]=m.y,s[n+2]=m.z,s[n+3]=m.x,s[n+4]=m.y,s[n+5]=m.z,s[n+6]=m.x,s[n+7]=m.y,s[n+8]=m.z;this.normalizeNormals(),t.normal.needsUpdate=!0}},merge:function(e,t){if(!(e&&e.isBufferGeometry))return void console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.",e);t===void 0&&(t=0,console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));var r=this.attributes;for(var a in r)if(e.attributes[a]!==void 0)for(var n=r[a],o=n.array,s=e.attributes[a],d=s.array,l=s.itemSize,p=0,m=l*t;p<d.length;p++,m++)o[m]=d[p];return this},normalizeNormals:function(){var e=new Vector3;return function(){for(var t=this.attributes.normal,r=0,a=t.count;r<a;r++)e.x=t.getX(r),e.y=t.getY(r),e.z=t.getZ(r),e.normalize(),t.setXYZ(r,e.x,e.y,e.z)}}(),toNonIndexed:function(){function e(e,t){for(var r=e.array,a=e.itemSize,n=new r.constructor(t.length*a),o=0,s=0,d=0,p=t.length;d<p;d++){o=t[d]*a;for(var l=0;l<a;l++)n[s++]=r[o++]}return new BufferAttribute(n,a)}if(null===this.index)return console.warn("THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed."),this;var t=new BufferGeometry,r=this.index.array,a=this.attributes;for(var n in a){var o=a[n],s=e(o,r);t.addAttribute(n,s)}var d=this.morphAttributes;for(n in d){for(var p=[],m=d[n],u=0,c=m.length;u<c;u++){var o=m[u],s=e(o,r);p.push(s)}t.morphAttributes[n]=p}for(var g=this.groups,u=0,h=g.length,l;u<h;u++)l=g[u],t.addGroup(l.start,l.count,l.materialIndex);return t},toJSON:function(){var e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,""!==this.name&&(e.name=this.name),0<Object.keys(this.userData).length&&(e.userData=this.userData),void 0!==this.parameters){var t=this.parameters;for(var r in t)void 0!==t[r]&&(e[r]=t[r]);return e}e.data={attributes:{}};var a=this.index;if(null!==a){var n=Array.prototype.slice.call(a.array);e.data.index={type:a.array.constructor.name,array:n}}var i=this.attributes;for(var r in i){var o=i[r],n=Array.prototype.slice.call(o.array);e.data.attributes[r]={itemSize:o.itemSize,type:o.array.constructor.name,array:n,normalized:o.normalized}}var s=this.groups;0<s.length&&(e.data.groups=JSON.parse(JSON.stringify(s)));var d=this.boundingSphere;return null!==d&&(e.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),e},clone:function(){return new BufferGeometry().copy(this)},copy:function(e){var t,r,a;this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.name=e.name;var n=e.index;null!==n&&this.setIndex(n.clone());var o=e.attributes;for(t in o){var s=o[t];this.addAttribute(t,s.clone())}var d=e.morphAttributes;for(t in d){var p=[],m=d[t];for(r=0,a=m.length;r<a;r++)p.push(m[r].clone());this.morphAttributes[t]=p}var u=e.groups;for(r=0,a=u.length;r<a;r++){var c=u[r];this.addGroup(c.start,c.count,c.materialIndex)}var g=e.boundingBox;null!==g&&(this.boundingBox=g.clone());var h=e.boundingSphere;return null!==h&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this},dispose:function(){this.dispatchEvent({type:"dispose"})}});function Mesh(e,t){Object3D.call(this),this.type="Mesh",this.geometry=e===void 0?new BufferGeometry:e,this.material=t===void 0?new MeshBasicMaterial({color:16777215*Math.random()}):t,this.drawMode=TrianglesDrawMode,this.updateMorphTargets()}Mesh.prototype=Object.assign(Object.create(Object3D.prototype),{constructor:Mesh,isMesh:!0,setDrawMode:function(e){this.drawMode=e},copy:function(e){return Object3D.prototype.copy.call(this,e),this.drawMode=e.drawMode,void 0!==e.morphTargetInfluences&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),void 0!==e.morphTargetDictionary&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this},updateMorphTargets:function(){var e=this.geometry,t,r,a;if(e.isBufferGeometry){var n=e.morphAttributes,i=Object.keys(n);if(0<i.length){var o=n[i[0]];if(o!==void 0)for(this.morphTargetInfluences=[],this.morphTargetDictionary={},(t=0,r=o.length);t<r;t++)a=o[t].name||t+"",this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=t}}else{var s=e.morphTargets;s!==void 0&&0<s.length&&console.error("THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}},raycast:function(){var r=Math.floor,n=Math.max,o=Math.min;function e(e,t,r,a,n,i,o,s){var d;if(d=t.side===BackSide?a.intersectTriangle(o,i,n,!0,s):a.intersectTriangle(n,i,o,t.side!==DoubleSide,s),null===d)return null;_.copy(s),_.applyMatrix4(e.matrixWorld);var l=r.ray.origin.distanceTo(_);return l<r.near||l>r.far?null:{distance:l,point:_.clone(),object:e}}function t(t,r,n,o,s,d,l,a,u){p.fromBufferAttribute(s,l),i.fromBufferAttribute(s,a),m.fromBufferAttribute(s,u);var c=e(t,r,n,o,p,i,m,y);if(c){d&&(g.fromBufferAttribute(d,l),h.fromBufferAttribute(d,a),x.fromBufferAttribute(d,u),c.uv=Triangle.getUV(y,p,i,m,g,h,x,new Vector2));var f=new Face3(l,a,u);Triangle.getNormal(p,i,m,f.normal),c.face=f}return c}var s=new Matrix4,d=new Ray,l=new Sphere,p=new Vector3,i=new Vector3,m=new Vector3,a=new Vector3,u=new Vector3,c=new Vector3,g=new Vector2,h=new Vector2,x=new Vector2,y=new Vector3,_=new Vector3;return function(_,E){var v=this.geometry,T=this.material,M=this.matrixWorld;if(void 0!==T&&(null===v.boundingSphere&&v.computeBoundingSphere(),l.copy(v.boundingSphere),l.applyMatrix4(M),!1!==_.ray.intersectsSphere(l))&&(s.getInverse(M),d.copy(_.ray).applyMatrix4(s),null===v.boundingBox||!1!==d.intersectsBox(v.boundingBox))){var S;if(v.isBufferGeometry){var A=v.index,w=v.attributes.position,R=v.attributes.uv,L=v.groups,P=v.drawRange,C,B,U,F,z,N,D,I,O,G,W;if(null!==A){if(Array.isArray(T))for(F=0,N=L.length;F<N;F++)for(I=L[F],O=T[I.materialIndex],G=n(I.start,P.start),W=o(I.start+I.count,P.start+P.count),(z=G,D=W);z<D;z+=3)C=A.getX(z),B=A.getX(z+1),U=A.getX(z+2),S=t(this,O,_,d,w,R,C,B,U),S&&(S.faceIndex=r(z/3),S.face.materialIndex=I.materialIndex,E.push(S));else for(G=n(0,P.start),W=o(A.count,P.start+P.count),(F=G,N=W);F<N;F+=3)C=A.getX(F),B=A.getX(F+1),U=A.getX(F+2),S=t(this,T,_,d,w,R,C,B,U),S&&(S.faceIndex=r(F/3),E.push(S));}else if(void 0!==w)if(Array.isArray(T))for(F=0,N=L.length;F<N;F++)for(I=L[F],O=T[I.materialIndex],G=n(I.start,P.start),W=o(I.start+I.count,P.start+P.count),(z=G,D=W);z<D;z+=3)C=z,B=z+1,U=z+2,S=t(this,O,_,d,w,R,C,B,U),S&&(S.faceIndex=r(z/3),S.face.materialIndex=I.materialIndex,E.push(S));else for(G=n(0,P.start),W=o(w.count,P.start+P.count),(F=G,N=W);F<N;F+=3)C=F,B=F+1,U=F+2,S=t(this,T,_,d,w,R,C,B,U),S&&(S.faceIndex=r(F/3),E.push(S))}else if(v.isGeometry){var V=Array.isArray(T),k=v.vertices,H=v.faces,X=v.faceVertexUvs[0],q,Y,Z,J;0<X.length&&(J=X);for(var Q=0,K=H.length;Q<K;Q++){var $=H[Q],ee=V?T[$.materialIndex]:T;if(void 0!==ee){if(q=k[$.a],Y=k[$.b],Z=k[$.c],!0===ee.morphTargets){var te=v.morphTargets,re=this.morphTargetInfluences;p.set(0,0,0),i.set(0,0,0),m.set(0,0,0);for(var ae=0,ne=te.length,ie;ae<ne;ae++)if(ie=re[ae],0!==ie){var oe=te[ae].vertices;p.addScaledVector(a.subVectors(oe[$.a],q),ie),i.addScaledVector(u.subVectors(oe[$.b],Y),ie),m.addScaledVector(c.subVectors(oe[$.c],Z),ie)}p.add(q),i.add(Y),m.add(Z),q=p,Y=i,Z=m}if(S=e(this,ee,_,d,q,Y,Z,y),S){if(J&&J[Q]){var se=J[Q];g.copy(se[0]),h.copy(se[1]),x.copy(se[2]),S.uv=Triangle.getUV(y,q,Y,Z,g,h,x,new Vector2)}S.face=$,S.faceIndex=Q,E.push(S)}}}}}}}(),clone:function(){return new this.constructor(this.geometry,this.material).copy(this)}});var geometryId=0;function Geometry(){Object.defineProperty(this,"id",{value:geometryId+=2}),this.uuid=_Math.generateUUID(),this.name="",this.type="Geometry",this.vertices=[],this.colors=[],this.faces=[],this.faceVertexUvs=[[]],this.morphTargets=[],this.morphNormals=[],this.skinWeights=[],this.skinIndices=[],this.lineDistances=[],this.boundingBox=null,this.boundingSphere=null,this.elementsNeedUpdate=!1,this.verticesNeedUpdate=!1,this.uvsNeedUpdate=!1,this.normalsNeedUpdate=!1,this.colorsNeedUpdate=!1,this.lineDistancesNeedUpdate=!1,this.groupsNeedUpdate=!1}Geometry.prototype=Object.assign(Object.create(EventDispatcher.prototype),{constructor:Geometry,isGeometry:!0,applyMatrix:function(e){for(var t=new Matrix3().getNormalMatrix(e),r=0,a=this.vertices.length,n;r<a;r++)n=this.vertices[r],n.applyMatrix4(e);for(var r=0,a=this.faces.length,o;r<a;r++){o=this.faces[r],o.normal.applyMatrix3(t).normalize();for(var s=0,d=o.vertexNormals.length;s<d;s++)o.vertexNormals[s].applyMatrix3(t).normalize()}return null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this.verticesNeedUpdate=!0,this.normalsNeedUpdate=!0,this},rotateX:function(){var e=new Matrix4;return function(t){return e.makeRotationX(t),this.applyMatrix(e),this}}(),rotateY:function(){var e=new Matrix4;return function(t){return e.makeRotationY(t),this.applyMatrix(e),this}}(),rotateZ:function(){var e=new Matrix4;return function(t){return e.makeRotationZ(t),this.applyMatrix(e),this}}(),translate:function(){var e=new Matrix4;return function(t,r,a){return e.makeTranslation(t,r,a),this.applyMatrix(e),this}}(),scale:function(){var e=new Matrix4;return function(t,r,a){return e.makeScale(t,r,a),this.applyMatrix(e),this}}(),lookAt:function(){var e=new Object3D;return function(t){e.lookAt(t),e.updateMatrix(),this.applyMatrix(e.matrix)}}(),fromBufferGeometry:function(e){function t(e,t,a,n){var i=void 0===d?[]:[r.colors[e].clone(),r.colors[t].clone(),r.colors[a].clone()],o=void 0===s?[]:[new Vector3().fromArray(s,3*e),new Vector3().fromArray(s,3*t),new Vector3().fromArray(s,3*a)],m=new Face3(e,t,a,o,i,n);r.faces.push(m),void 0!==l&&r.faceVertexUvs[0].push([new Vector2().fromArray(l,2*e),new Vector2().fromArray(l,2*t),new Vector2().fromArray(l,2*a)]),void 0!==p&&r.faceVertexUvs[1].push([new Vector2().fromArray(p,2*e),new Vector2().fromArray(p,2*t),new Vector2().fromArray(p,2*a)])}var r=this,a=null===e.index?void 0:e.index.array,n=e.attributes,o=n.position.array,s=void 0===n.normal?void 0:n.normal.array,d=void 0===n.color?void 0:n.color.array,l=void 0===n.uv?void 0:n.uv.array,p=void 0===n.uv2?void 0:n.uv2.array;void 0!==p&&(this.faceVertexUvs[1]=[]);for(var m=0,u=0;m<o.length;m+=3,u+=2)r.vertices.push(new Vector3().fromArray(o,m)),void 0!==d&&r.colors.push(new Color().fromArray(d,m));var c=e.groups;if(0<c.length)for(var m=0;m<c.length;m++)for(var g=c[m],h=g.start,f=g.count,u=h;u<h+f;u+=3)void 0===a?t(u,u+1,u+2,g.materialIndex):t(a[u],a[u+1],a[u+2],g.materialIndex);else if(void 0!==a)for(var m=0;m<a.length;m+=3)t(a[m],a[m+1],a[m+2]);else for(var m=0;m<o.length/3;m+=3)t(m,m+1,m+2);return this.computeFaceNormals(),null!==e.boundingBox&&(this.boundingBox=e.boundingBox.clone()),null!==e.boundingSphere&&(this.boundingSphere=e.boundingSphere.clone()),this},center:function(){var e=new Vector3;return function(){return this.computeBoundingBox(),this.boundingBox.getCenter(e).negate(),this.translate(e.x,e.y,e.z),this}}(),normalize:function(){this.computeBoundingSphere();var e=this.boundingSphere.center,t=this.boundingSphere.radius,r=0===t?1:1/t,a=new Matrix4;return a.set(r,0,0,-r*e.x,0,r,0,-r*e.y,0,0,r,-r*e.z,0,0,0,1),this.applyMatrix(a),this},computeFaceNormals:function(){for(var e=new Vector3,t=new Vector3,r=0,a=this.faces.length;r<a;r++){var n=this.faces[r],i=this.vertices[n.a],o=this.vertices[n.b],s=this.vertices[n.c];e.subVectors(s,o),t.subVectors(i,o),e.cross(t),e.normalize(),n.normal.copy(e)}},computeVertexNormals:function(e){e===void 0&&(e=!0);var t,r,a,n,i,o;for(o=Array(this.vertices.length),t=0,r=this.vertices.length;t<r;t++)o[t]=new Vector3;if(e){var s=new Vector3,d=new Vector3,l,p,m;for(a=0,n=this.faces.length;a<n;a++)i=this.faces[a],l=this.vertices[i.a],p=this.vertices[i.b],m=this.vertices[i.c],s.subVectors(m,p),d.subVectors(l,p),s.cross(d),o[i.a].add(s),o[i.b].add(s),o[i.c].add(s)}else for(this.computeFaceNormals(),a=0,n=this.faces.length;a<n;a++)i=this.faces[a],o[i.a].add(i.normal),o[i.b].add(i.normal),o[i.c].add(i.normal);for(t=0,r=this.vertices.length;t<r;t++)o[t].normalize();for(a=0,n=this.faces.length;a<n;a++){i=this.faces[a];var u=i.vertexNormals;3===u.length?(u[0].copy(o[i.a]),u[1].copy(o[i.b]),u[2].copy(o[i.c])):(u[0]=o[i.a].clone(),u[1]=o[i.b].clone(),u[2]=o[i.c].clone())}0<this.faces.length&&(this.normalsNeedUpdate=!0)},computeFlatVertexNormals:function(){var e,t,r;for(this.computeFaceNormals(),e=0,t=this.faces.length;e<t;e++){r=this.faces[e];var a=r.vertexNormals;3===a.length?(a[0].copy(r.normal),a[1].copy(r.normal),a[2].copy(r.normal)):(a[0]=r.normal.clone(),a[1]=r.normal.clone(),a[2]=r.normal.clone())}0<this.faces.length&&(this.normalsNeedUpdate=!0)},computeMorphNormals:function(){var e,t,r,a,n;for(r=0,a=this.faces.length;r<a;r++)for(n=this.faces[r],n.__originalFaceNormal?n.__originalFaceNormal.copy(n.normal):n.__originalFaceNormal=n.normal.clone(),n.__originalVertexNormals||(n.__originalVertexNormals=[]),(e=0,t=n.vertexNormals.length);e<t;e++)n.__originalVertexNormals[e]?n.__originalVertexNormals[e].copy(n.vertexNormals[e]):n.__originalVertexNormals[e]=n.vertexNormals[e].clone();var o=new Geometry;for(o.faces=this.faces,e=0,t=this.morphTargets.length;e<t;e++){if(!this.morphNormals[e]){this.morphNormals[e]={},this.morphNormals[e].faceNormals=[],this.morphNormals[e].vertexNormals=[];var s=this.morphNormals[e].faceNormals,d=this.morphNormals[e].vertexNormals,l,p;for(r=0,a=this.faces.length;r<a;r++)l=new Vector3,p={a:new Vector3,b:new Vector3,c:new Vector3},s.push(l),d.push(p)}var m=this.morphNormals[e];o.vertices=this.morphTargets[e].vertices,o.computeFaceNormals(),o.computeVertexNormals();var l,p;for(r=0,a=this.faces.length;r<a;r++)n=this.faces[r],l=m.faceNormals[r],p=m.vertexNormals[r],l.copy(n.normal),p.a.copy(n.vertexNormals[0]),p.b.copy(n.vertexNormals[1]),p.c.copy(n.vertexNormals[2])}for(r=0,a=this.faces.length;r<a;r++)n=this.faces[r],n.normal=n.__originalFaceNormal,n.vertexNormals=n.__originalVertexNormals},computeBoundingBox:function(){null===this.boundingBox&&(this.boundingBox=new Box3),this.boundingBox.setFromPoints(this.vertices)},computeBoundingSphere:function(){null===this.boundingSphere&&(this.boundingSphere=new Sphere),this.boundingSphere.setFromPoints(this.vertices)},merge:function(e,t,r){if(!(e&&e.isGeometry))return void console.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.",e);var a=this.vertices.length,n=this.vertices,o=e.vertices,s=this.faces,d=e.faces,l=this.faceVertexUvs[0],p=e.faceVertexUvs[0],m=this.colors,u=e.colors,c;r===void 0&&(r=0),t!==void 0&&(c=new Matrix3().getNormalMatrix(t));for(var g=0,h=o.length;g<h;g++){var f=o[g],x=f.clone();t!==void 0&&x.applyMatrix4(t),n.push(x)}for(var g=0,h=u.length;g<h;g++)m.push(u[g].clone());for(g=0,h=d.length;g<h;g++){var y=d[g],_=y.vertexNormals,b=y.vertexColors,E,v,T;E=new Face3(y.a+a,y.b+a,y.c+a),E.normal.copy(y.normal),c!==void 0&&E.normal.applyMatrix3(c).normalize();for(var M=0,S=_.length;M<S;M++)v=_[M].clone(),void 0!==c&&v.applyMatrix3(c).normalize(),E.vertexNormals.push(v);E.color.copy(y.color);for(var M=0,S=b.length;M<S;M++)T=b[M],E.vertexColors.push(T.clone());E.materialIndex=y.materialIndex+r,s.push(E)}for(g=0,h=p.length;g<h;g++){var A=p[g],w=[];if(void 0!==A){for(var M=0,S=A.length;M<S;M++)w.push(A[M].clone());l.push(w)}}},mergeMesh:function(e){return e&&e.isMesh?void(e.matrixAutoUpdate&&e.updateMatrix(),this.merge(e.geometry,e.matrix)):void console.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.",e)},mergeVertices:function(){var e=Math.round,t=Math.pow,r={},a=[],o=[],s=t(10,4),d,l,p,m,u,c,g,h;for(p=0,m=this.vertices.length;p<m;p++)d=this.vertices[p],l=e(d.x*s)+"_"+e(d.y*s)+"_"+e(d.z*s),void 0===r[l]?(r[l]=p,a.push(this.vertices[p]),o[p]=a.length-1):o[p]=o[r[l]];var f=[];for(p=0,m=this.faces.length;p<m;p++){u=this.faces[p],u.a=o[u.a],u.b=o[u.b],u.c=o[u.c],c=[u.a,u.b,u.c];for(var x=0;3>x;x++)if(c[x]===c[(x+1)%3]){f.push(p);break}}for(p=f.length-1;0<=p;p--){var y=f[p];for(this.faces.splice(y,1),g=0,h=this.faceVertexUvs.length;g<h;g++)this.faceVertexUvs[g].splice(y,1)}var _=this.vertices.length-a.length;return this.vertices=a,_},setFromPoints:function(e){this.vertices=[];for(var t=0,r=e.length,a;t<r;t++)a=e[t],this.vertices.push(new Vector3(a.x,a.y,a.z||0));return this},sortFacesByMaterialIndex:function(){for(var e=this.faces,t=e.length,r=0;r<t;r++)e[r]._id=r;e.sort(function(e,t){return e.materialIndex-t.materialIndex});var a=this.faceVertexUvs[0],n=this.faceVertexUvs[1],o,s;a&&a.length===t&&(o=[]),n&&n.length===t&&(s=[]);for(var r=0,d;r<t;r++)d=e[r]._id,o&&o.push(a[d]),s&&s.push(n[d]);o&&(this.faceVertexUvs[0]=o),s&&(this.faceVertexUvs[1]=s)},toJSON:function(){function e(e,t,r){return r?e|1<<t:e&~(1<<t)}function t(e){var t=e.x.toString()+e.y.toString()+e.z.toString();return void 0===c[t]?(c[t]=u.length/3,u.push(e.x,e.y,e.z),c[t]):c[t]}function r(e){var t=e.r.toString()+e.g.toString()+e.b.toString();return void 0===h[t]?(h[t]=g.length,g.push(e.getHex()),h[t]):h[t]}function a(e){var t=e.x.toString()+e.y.toString();return void 0===x[t]?(x[t]=f.length/2,f.push(e.x,e.y),x[t]):x[t]}var n={metadata:{version:4.5,type:"Geometry",generator:"Geometry.toJSON"}};if(n.uuid=this.uuid,n.type=this.type,""!==this.name&&(n.name=this.name),void 0!==this.parameters){var o=this.parameters;for(var s in o)void 0!==o[s]&&(n[s]=o[s]);return n}for(var d=[],l=0,p;l<this.vertices.length;l++)p=this.vertices[l],d.push(p.x,p.y,p.z);for(var m=[],u=[],c={},g=[],h={},f=[],x={},l=0;l<this.faces.length;l++){var y=this.faces[l],_=void 0!==this.faceVertexUvs[0][l],b=0<y.normal.length(),E=0<y.vertexNormals.length,v=1!==y.color.r||1!==y.color.g||1!==y.color.b,T=0<y.vertexColors.length,M=0;if(M=e(M,0,0),M=e(M,1,!0),M=e(M,2,!1),M=e(M,3,_),M=e(M,4,b),M=e(M,5,E),M=e(M,6,v),M=e(M,7,T),m.push(M),m.push(y.a,y.b,y.c),m.push(y.materialIndex),_){var S=this.faceVertexUvs[0][l];m.push(a(S[0]),a(S[1]),a(S[2]))}if(b&&m.push(t(y.normal)),E){var A=y.vertexNormals;m.push(t(A[0]),t(A[1]),t(A[2]))}if(v&&m.push(r(y.color)),T){var w=y.vertexColors;m.push(r(w[0]),r(w[1]),r(w[2]))}}return n.data={},n.data.vertices=d,n.data.normals=u,0<g.length&&(n.data.colors=g),0<f.length&&(n.data.uvs=[f]),n.data.faces=m,n},clone:function(){return new Geometry().copy(this)},copy:function(e){var t,r,a,n,o,s;this.vertices=[],this.colors=[],this.faces=[],this.faceVertexUvs=[[]],this.morphTargets=[],this.morphNormals=[],this.skinWeights=[],this.skinIndices=[],this.lineDistances=[],this.boundingBox=null,this.boundingSphere=null,this.name=e.name;var d=e.vertices;for(t=0,r=d.length;t<r;t++)this.vertices.push(d[t].clone());var l=e.colors;for(t=0,r=l.length;t<r;t++)this.colors.push(l[t].clone());var p=e.faces;for(t=0,r=p.length;t<r;t++)this.faces.push(p[t].clone());for(t=0,r=e.faceVertexUvs.length;t<r;t++){var m=e.faceVertexUvs[t];for(void 0===this.faceVertexUvs[t]&&(this.faceVertexUvs[t]=[]),a=0,n=m.length;a<n;a++){var u=m[a],c=[];for(o=0,s=u.length;o<s;o++){var g=u[o];c.push(g.clone())}this.faceVertexUvs[t].push(c)}}var h=e.morphTargets;for(t=0,r=h.length;t<r;t++){var f={name:h[t].name};if(void 0!==h[t].vertices)for(f.vertices=[],a=0,n=h[t].vertices.length;a<n;a++)f.vertices.push(h[t].vertices[a].clone());if(void 0!==h[t].normals)for(f.normals=[],a=0,n=h[t].normals.length;a<n;a++)f.normals.push(h[t].normals[a].clone());this.morphTargets.push(f)}var x=e.morphNormals;for(t=0,r=x.length;t<r;t++){var y={};if(void 0!==x[t].vertexNormals)for(y.vertexNormals=[],a=0,n=x[t].vertexNormals.length;a<n;a++){var _=x[t].vertexNormals[a],b={};b.a=_.a.clone(),b.b=_.b.clone(),b.c=_.c.clone(),y.vertexNormals.push(b)}if(void 0!==x[t].faceNormals)for(y.faceNormals=[],a=0,n=x[t].faceNormals.length;a<n;a++)y.faceNormals.push(x[t].faceNormals[a].clone());this.morphNormals.push(y)}var E=e.skinWeights;for(t=0,r=E.length;t<r;t++)this.skinWeights.push(E[t].clone());var v=e.skinIndices;for(t=0,r=v.length;t<r;t++)this.skinIndices.push(v[t].clone());var T=e.lineDistances;for(t=0,r=T.length;t<r;t++)this.lineDistances.push(T[t]);var M=e.boundingBox;null!==M&&(this.boundingBox=M.clone());var S=e.boundingSphere;return null!==S&&(this.boundingSphere=S.clone()),this.elementsNeedUpdate=e.elementsNeedUpdate,this.verticesNeedUpdate=e.verticesNeedUpdate,this.uvsNeedUpdate=e.uvsNeedUpdate,this.normalsNeedUpdate=e.normalsNeedUpdate,this.colorsNeedUpdate=e.colorsNeedUpdate,this.lineDistancesNeedUpdate=e.lineDistancesNeedUpdate,this.groupsNeedUpdate=e.groupsNeedUpdate,this},dispose:function(){this.dispatchEvent({type:"dispose"})}});function BoxGeometry(e,t,r,a,n,i){Geometry.call(this),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:r,widthSegments:a,heightSegments:n,depthSegments:i},this.fromBufferGeometry(new BoxBufferGeometry(e,t,r,a,n,i)),this.mergeVertices()}BoxGeometry.prototype=Object.create(Geometry.prototype),BoxGeometry.prototype.constructor=BoxGeometry;function BoxBufferGeometry(e,t,r,a,n,i){var s=Math.floor;function o(e,t,r,n,i,o,s,u,_,E,v){var T=_+1,M=0,S=0,A=new Vector3,w,R;for(R=0;R<E+1;R++){var L=R*(s/E)-s/2;for(w=0;w<T;w++){var y=w*(o/_)-o/2;A[e]=y*n,A[t]=L*i,A[r]=u/2,m.push(A.x,A.y,A.z),A[e]=0,A[t]=0,A[r]=0<u?1:-1,c.push(A.x,A.y,A.z),g.push(w/_),g.push(1-R/E),M+=1}}for(R=0;R<E;R++)for(w=0;w<_;w++){var x=h+w+T*R,a=h+w+T*(R+1),b=h+(w+1)+T*(R+1),P=h+(w+1)+T*R;p.push(x,a,P),p.push(a,b,P),S+=6}l.addGroup(f,S,v),f+=S,h+=M}BufferGeometry.call(this),this.type="BoxBufferGeometry",this.parameters={width:e,height:t,depth:r,widthSegments:a,heightSegments:n,depthSegments:i};var l=this;e=e||1,t=t||1,r=r||1,a=s(a)||1,n=s(n)||1,i=s(i)||1;var p=[],m=[],c=[],g=[],h=0,f=0;o("z","y","x",-1,-1,r,t,e,i,n,0),o("z","y","x",1,-1,r,t,-e,i,n,1),o("x","z","y",1,1,e,r,t,a,i,2),o("x","z","y",1,-1,e,r,-t,a,i,3),o("x","y","z",1,-1,e,t,r,a,n,4),o("x","y","z",-1,-1,e,t,-r,a,n,5),this.setIndex(p),this.addAttribute("position",new Float32BufferAttribute(m,3)),this.addAttribute("normal",new Float32BufferAttribute(c,3)),this.addAttribute("uv",new Float32BufferAttribute(g,2))}BoxBufferGeometry.prototype=Object.create(BufferGeometry.prototype),BoxBufferGeometry.prototype.constructor=BoxBufferGeometry;function MeshNormalMaterial(e){Material.call(this),this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=TangentSpaceNormalMap,this.normalScale=new Vector2(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(e)}MeshNormalMaterial.prototype=Object.create(Material.prototype),MeshNormalMaterial.prototype.constructor=MeshNormalMaterial,MeshNormalMaterial.prototype.isMeshNormalMaterial=!0,MeshNormalMaterial.prototype.copy=function(e){return Material.prototype.copy.call(this,e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this};var EPSILON=1e-6,ARRAY_TYPE="undefined"==typeof Float32Array?Array:Float32Array,degree=Math.PI/180;function create(){var e=new ARRAY_TYPE(2);return ARRAY_TYPE!=Float32Array&&(e[0]=0,e[1]=0),e}function copy(e,t){return e[0]=t[0],e[1]=t[1],e}function set(e,t,r){return e[0]=t,e[1]=r,e}function add(e,t,r){return e[0]=t[0]+r[0],e[1]=t[1]+r[1],e}function subtract(e,t,r){return e[0]=t[0]-r[0],e[1]=t[1]-r[1],e}function scale(e,t,r){return e[0]=t[0]*r,e[1]=t[1]*r,e}function distance(e,t){var r=t[0]-e[0],a=t[1]-e[1];return Math.sqrt(r*r+a*a)}function length(e){var t=e[0],r=e[1];return Math.sqrt(t*t+r*r)}function squaredLength(e){var t=e[0],r=e[1];return t*t+r*r}function negate(e,t){return e[0]=-t[0],e[1]=-t[1],e}function normalize(e,t){var r=Math.sqrt,a=t[0],n=t[1],i=a*a+n*n;return 0<i&&(i=1/r(i)),e[0]=t[0]*i,e[1]=t[1]*i,e}function dot(e,t){return e[0]*t[0]+e[1]*t[1]}function cross(e,t,r){var a=t[0]*r[1]-t[1]*r[0];return e[0]=e[1]=0,e[2]=a,e}function lerp(e,r,a,n){var t=r[0],i=r[1];return e[0]=t+n*(a[0]-t),e[1]=i+n*(a[1]-i),e}function transformMat3(e,t,r){var a=t[0],n=t[1];return e[0]=r[0]*a+r[3]*n+r[6],e[1]=r[1]*a+r[4]*n+r[7],e}function transformMat4(e,t,r){var a=t[0],n=t[1];return e[0]=r[0]*a+r[4]*n+r[12],e[1]=r[1]*a+r[5]*n+r[13],e}function exactEquals(e,t){return e[0]===t[0]&&e[1]===t[1]}var forEach=function(){var e=Math.min,t=create();return function(r,a,n,o,s,d){var p,m;for(a||(a=2),n||(n=0),m=o?e(o*a+n,r.length):r.length,p=n;p<m;p+=a)t[0]=r[p],t[1]=r[p+1],s(t,t,d),r[p]=t[0],r[p+1]=t[1];return r}}();class Vector2$1 extends Float32Array{static distance(e,t){return distance(e,t)}constructor(e=[0,0]){return super(e),this}get x(){return this[0]}set x(e){this[0]=e}get y(){return this[1]}set y(e){this[1]=e}set(e,t){return set(this,e,t),this}copy(e){return copy(this,e),this}add(e){return add(this,this,e),this}get size(){return length(this)}get squaredSize(){return squaredLength(this)}subtract(e){return subtract(this,this,e),this}negate(e=this){return negate(this,e),this}cross(e,t){return cross(this,e,t),this}scale(e){return scale(this,this,e),this}normalize(){normalize(this,this)}dot(e){return dot(this,e)}distance(e){return Vector2$1.distance(this,e)}equals(e){return exactEquals(this,e)}applyMatrix3(e){return transformMat3(this,this,e),this}applyMatrix4(e){return transformMat4(this,this,e),this}lerp(e,t){lerp(this,this,e,t)}clone(){return new Vector2$1(this)}}let pointers=new Map;class Pointer extends Vector2$1{static get TOUCH_TYPE(){return"touchtype"}static get MOUSE_TYPE(){return"mousetype"}static get(e=window){let t=pointers.get(e);return t||(t=new Pointer(e)),t}get downed(){return this._downed}constructor(e){super(),this._domElement=e||window,this.type=Pointer.TOUCH_TYPE,this.velocity=new Vector2$1,this.dragOffset=new Vector2$1,this.centered=new Vector2$1,this.centeredFlippedY=new Vector2$1,this.normalized=new Vector2$1,this.normalizedFlippedY=new Vector2$1,this.normalizedCentered=new Vector2$1,this.normalizedCenteredFlippedY=new Vector2$1,this._downed=!1,pointers.set(this._domElement,this),this.onDown=new Signal,this.onMove=new Signal,this.onUp=new Signal,this.onClick=new Signal,this.onTypeChange=new Signal,this._preventMouseTypeChange=!1,this._onPointerMoveBinded=this._onPointerMove.bind(this),this._onPointerDownBinded=this._onPointerDown.bind(this),this._onPointerUpBinded=this._onPointerUp.bind(this),this._updateBinded=this._update.bind(this),this._resizeBinded=this.resize.bind(this),this._position=new Vector2$1,this.enable()}resize(){this._domElementBoundingRect=this._domElement===window?{left:0,top:0,width:window.innerWidth,height:window.innerHeight}:this._domElement.getBoundingClientRect()}_onPointerDown(t){this.resize(),"touchstart"===t.type&&(this._preventMouseTypeChange=!0,this._changeType(Pointer.TOUCH_TYPE)),this._downed=!0,this.dragOffset.set(0,0),this.copy(this._position),this._onPointerEvent(t),this._updatePositions(),this.onDown.dispatch(t)}_onPointerMove(t){if("mousemove"===t.type){if(this._preventMouseTypeChange)return;this._changeType(Pointer.MOUSE_TYPE)}this._onPointerEvent(t),this.onMove.dispatch(t)}_onPointerUp(t){this._downed&&(this._downed=!1,this._onPointerEvent(t),this._updatePositions(),this.onUp.dispatch(t),4>this.dragOffset.length&&this.onClick.dispatch(t),clearTimeout(this._timeout),this._timeout=setTimeout(()=>{this._preventMouseTypeChange=!1},2e3))}_onPointerEvent(t){!!window.TouchEvent&&t instanceof window.TouchEvent&&("touchend"===t.type?t=t.changedTouches[0]:t=t.touches[0]),this._position.x=t.clientX-this._domElementBoundingRect.left,this._position.y=t.clientY-this._domElementBoundingRect.top}_changeType(e){this.type===e||(this.type=e,this.disable(),this.enable(),this.onTypeChange.dispatch(this.type))}_update(){(this.x||this.y)&&(this.velocity.x=this._position.x-this.x,this.velocity.y=this._position.y-this.y,this.downed&&this.dragOffset.add(this.velocity)),this._updatePositions()}_updatePositions(){this.x=this._position.x,this.y=this._position.y;(this.x||this.y)&&(this.centered.x=this.centeredFlippedY.x=this.x-.5*this._domElementBoundingRect.width,this.centered.y=this.centeredFlippedY.y=this.y-.5*this._domElementBoundingRect.height,this.centeredFlippedY.y*=-1,this.normalized.x=this.normalizedFlippedY.x=this.x/this._domElementBoundingRect.width,this.normalized.y=this.normalizedFlippedY.y=this.y/this._domElementBoundingRect.height,this.normalizedFlippedY.y=1-this.normalizedFlippedY.y,this.normalizedCentered.x=this.normalizedCenteredFlippedY.x=2*this.normalized.x-1,this.normalizedCentered.y=this.normalizedCenteredFlippedY.y=2*this.normalized.y-1,this.normalizedCenteredFlippedY.y*=-1)}enable(){this.disable(),this.resize(),this.type===Pointer.TOUCH_TYPE?(this._domElement.addEventListener("touchmove",this._onPointerMoveBinded),window.addEventListener("touchend",this._onPointerUpBinded)):(this._domElement.addEventListener("mousedown",this._onPointerDownBinded),window.addEventListener("mouseup",this._onPointerUpBinded)),this._domElement.addEventListener("touchstart",this._onPointerDownBinded),this._domElement.addEventListener("mousemove",this._onPointerMoveBinded),window.addEventListener("resize",this._resizeBinded),Ticker$1.add(this._updateBinded=this._updateBinded||this._update.bind(this))}disable(){Ticker$1.delete(this._updateBinded),this._domElement.removeEventListener("touchstart",this._onPointerDownBinded),this._domElement.removeEventListener("mousedown",this._onPointerDownBinded),this._domElement.removeEventListener("touchmove",this._onPointerMoveBinded),this._domElement.removeEventListener("mousemove",this._onPointerMoveBinded),window.removeEventListener("touchend",this._onPointerUpBinded),window.removeEventListener("mouseup",this._onPointerUpBinded),window.removeEventListener("resize",this._resizeBinded)}}function copy$1(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e}function set$1(e,t,r,a,n,i,o,s,d,l,p,m,u,c,g,h,f){return e[0]=t,e[1]=r,e[2]=a,e[3]=n,e[4]=i,e[5]=o,e[6]=s,e[7]=d,e[8]=l,e[9]=p,e[10]=m,e[11]=u,e[12]=c,e[13]=g,e[14]=h,e[15]=f,e}function identity(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function invert(e,t){var r=t[0],a=t[1],n=t[2],i=t[3],o=t[4],s=t[5],d=t[6],l=t[7],p=t[8],m=t[9],u=t[10],c=t[11],g=t[12],h=t[13],f=t[14],x=t[15],y=r*s-a*o,_=r*d-n*o,b=r*l-i*o,E=a*d-n*s,v=a*l-i*s,T=n*l-i*d,M=p*h-m*g,S=p*f-u*g,A=p*x-c*g,w=m*f-u*h,R=m*x-c*h,L=u*x-c*f,P=y*L-_*R+b*w+E*A-v*S+T*M;return P?(P=1/P,e[0]=(s*L-d*R+l*w)*P,e[1]=(n*R-a*L-i*w)*P,e[2]=(h*T-f*v+x*E)*P,e[3]=(u*v-m*T-c*E)*P,e[4]=(d*A-o*L-l*S)*P,e[5]=(r*L-n*A+i*S)*P,e[6]=(f*b-g*T-x*_)*P,e[7]=(p*T-u*b+c*_)*P,e[8]=(o*R-s*A+l*M)*P,e[9]=(a*A-r*R-i*M)*P,e[10]=(g*v-h*b+x*y)*P,e[11]=(m*b-p*v-c*y)*P,e[12]=(s*S-o*w-d*M)*P,e[13]=(r*w-a*S+n*M)*P,e[14]=(h*_-g*E-f*y)*P,e[15]=(p*E-m*_+u*y)*P,e):null}function multiply$1(e,t,r){var a=t[0],n=t[1],i=t[2],o=t[3],s=t[4],d=t[5],l=t[6],p=t[7],m=t[8],u=t[9],c=t[10],g=t[11],h=t[12],f=t[13],x=t[14],y=t[15],_=r[0],b=r[1],E=r[2],v=r[3];return e[0]=_*a+b*s+E*m+v*h,e[1]=_*n+b*d+E*u+v*f,e[2]=_*i+b*l+E*c+v*x,e[3]=_*o+b*p+E*g+v*y,_=r[4],b=r[5],E=r[6],v=r[7],e[4]=_*a+b*s+E*m+v*h,e[5]=_*n+b*d+E*u+v*f,e[6]=_*i+b*l+E*c+v*x,e[7]=_*o+b*p+E*g+v*y,_=r[8],b=r[9],E=r[10],v=r[11],e[8]=_*a+b*s+E*m+v*h,e[9]=_*n+b*d+E*u+v*f,e[10]=_*i+b*l+E*c+v*x,e[11]=_*o+b*p+E*g+v*y,_=r[12],b=r[13],E=r[14],v=r[15],e[12]=_*a+b*s+E*m+v*h,e[13]=_*n+b*d+E*u+v*f,e[14]=_*i+b*l+E*c+v*x,e[15]=_*o+b*p+E*g+v*y,e}function translate(e,t,r){var a=r[0],n=r[1],i=r[2],o,s,d,l,p,m,u,c,g,h,f,x;return t===e?(e[12]=t[0]*a+t[4]*n+t[8]*i+t[12],e[13]=t[1]*a+t[5]*n+t[9]*i+t[13],e[14]=t[2]*a+t[6]*n+t[10]*i+t[14],e[15]=t[3]*a+t[7]*n+t[11]*i+t[15]):(o=t[0],s=t[1],d=t[2],l=t[3],p=t[4],m=t[5],u=t[6],c=t[7],g=t[8],h=t[9],f=t[10],x=t[11],e[0]=o,e[1]=s,e[2]=d,e[3]=l,e[4]=p,e[5]=m,e[6]=u,e[7]=c,e[8]=g,e[9]=h,e[10]=f,e[11]=x,e[12]=o*a+p*n+g*i+t[12],e[13]=s*a+m*n+h*i+t[13],e[14]=d*a+u*n+f*i+t[14],e[15]=l*a+c*n+x*i+t[15]),e}function scale$1(e,t,r){var a=r[0],n=r[1],i=r[2];return e[0]=t[0]*a,e[1]=t[1]*a,e[2]=t[2]*a,e[3]=t[3]*a,e[4]=t[4]*n,e[5]=t[5]*n,e[6]=t[6]*n,e[7]=t[7]*n,e[8]=t[8]*i,e[9]=t[9]*i,e[10]=t[10]*i,e[11]=t[11]*i,e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e}function rotateX(e,t,r){var a=Math.sin,n=Math.cos,i=a(r),o=n(r),s=t[4],d=t[5],l=t[6],p=t[7],m=t[8],u=t[9],c=t[10],g=t[11];return t!==e&&(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[4]=s*o+m*i,e[5]=d*o+u*i,e[6]=l*o+c*i,e[7]=p*o+g*i,e[8]=m*o-s*i,e[9]=u*o-d*i,e[10]=c*o-l*i,e[11]=g*o-p*i,e}function rotateY(e,t,r){var a=Math.sin,n=Math.cos,i=a(r),o=n(r),s=t[0],d=t[1],l=t[2],p=t[3],m=t[8],u=t[9],c=t[10],g=t[11];return t!==e&&(e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=s*o-m*i,e[1]=d*o-u*i,e[2]=l*o-c*i,e[3]=p*o-g*i,e[8]=s*i+m*o,e[9]=d*i+u*o,e[10]=l*i+c*o,e[11]=p*i+g*o,e}function rotateZ(e,t,r){var a=Math.sin,n=Math.cos,i=a(r),o=n(r),s=t[0],d=t[1],l=t[2],p=t[3],m=t[4],u=t[5],c=t[6],g=t[7];return t!==e&&(e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=s*o+m*i,e[1]=d*o+u*i,e[2]=l*o+c*i,e[3]=p*o+g*i,e[4]=m*o-s*i,e[5]=u*o-d*i,e[6]=c*o-l*i,e[7]=g*o-p*i,e}function fromQuat(e,t){var r=t[0],a=t[1],n=t[2],i=t[3],o=r+r,s=a+a,d=n+n,l=r*o,p=a*o,m=a*s,u=n*o,c=n*s,g=n*d,h=i*o,f=i*s,x=i*d;return e[0]=1-m-g,e[1]=p+x,e[2]=u-f,e[3]=0,e[4]=p-x,e[5]=1-l-g,e[6]=c+h,e[7]=0,e[8]=u+f,e[9]=c-h,e[10]=1-l-m,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function perspective(e,t,r,a,n){var i=Math.tan,o=1/i(t/2),s;return e[0]=o/r,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=o,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=-1,e[12]=0,e[13]=0,e[15]=0,null!=n&&n!==1/0?(s=1/(a-n),e[10]=(n+a)*s,e[14]=2*n*a*s):(e[10]=-1,e[14]=-2*a),e}class Matrix4$1 extends Float32Array{constructor(e=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]){return super(e),this}set x(e){this[12]=e}get x(){return this[12]}set y(e){this[13]=e}get y(){return this[13]}set z(e){this[14]=e}get z(){return this[14]}set w(e){this[15]=e}get w(){return this[15]}set(e,t,r,a,n,i,o,s,d,l,p,m,u,c,g,h){return e.length?this.copy(e):(set$1(this,e,t,r,a,n,i,o,s,d,l,p,m,u,c,g,h),this)}translate(e,t=this){return translate(this,t,e),this}rotateX(e,t=this){return rotateX(this,t,e),this}rotateY(e,t=this){return rotateY(this,t,e),this}rotateZ(e,t=this){return rotateZ(this,t,e),this}scale(e,t=this){return scale$1(this,t,"number"==typeof e?[e,e,e]:e),this}multiply(e,t){return t?multiply$1(this,e,t):multiply$1(this,this,e),this}identity(){return identity(this),this}copy(e){return copy$1(this,e),this}fromPerspective({fov:e,aspectRatio:t,near:r,far:a}={}){return perspective(this,e,t,r,a),this}fromQuaternion(e){return fromQuat(this,e),this}setPosition(e){return this.x=e[0],this.y=e[1],this.z=e[2],this}invert(e=this){return invert(this,e),this}}function create$2(){var e=new ARRAY_TYPE(3);return ARRAY_TYPE!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e}function length$1(e){var t=e[0],r=e[1],a=e[2];return Math.sqrt(t*t+r*r+a*a)}function fromValues$2(e,t,r){var a=new ARRAY_TYPE(3);return a[0]=e,a[1]=t,a[2]=r,a}function copy$2(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e}function set$2(e,t,r,a){return e[0]=t,e[1]=r,e[2]=a,e}function add$2(e,t,r){return e[0]=t[0]+r[0],e[1]=t[1]+r[1],e[2]=t[2]+r[2],e}function subtract$2(e,t,r){return e[0]=t[0]-r[0],e[1]=t[1]-r[1],e[2]=t[2]-r[2],e}function scale$2(e,t,r){return e[0]=t[0]*r,e[1]=t[1]*r,e[2]=t[2]*r,e}function distance$1(e,t){var r=t[0]-e[0],a=t[1]-e[1],n=t[2]-e[2];return Math.sqrt(r*r+a*a+n*n)}function squaredLength$1(e){var t=e[0],r=e[1],a=e[2];return t*t+r*r+a*a}function negate$1(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e}function normalize$1(e,t){var r=Math.sqrt,a=t[0],n=t[1],i=t[2],o=a*a+n*n+i*i;return 0<o&&(o=1/r(o)),e[0]=t[0]*o,e[1]=t[1]*o,e[2]=t[2]*o,e}function dot$1(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function cross$1(e,t,r){var a=t[0],n=t[1],i=t[2],o=r[0],s=r[1],d=r[2];return e[0]=n*d-i*s,e[1]=i*o-a*d,e[2]=a*s-n*o,e}function transformMat4$1(e,t,r){var a=t[0],n=t[1],i=t[2],o=r[3]*a+r[7]*n+r[11]*i+r[15];return o=o||1,e[0]=(r[0]*a+r[4]*n+r[8]*i+r[12])/o,e[1]=(r[1]*a+r[5]*n+r[9]*i+r[13])/o,e[2]=(r[2]*a+r[6]*n+r[10]*i+r[14])/o,e}function angle$1(e,t){var r=Math.PI,a=Math.acos,n=fromValues$2(e[0],e[1],e[2]),i=fromValues$2(t[0],t[1],t[2]);normalize$1(n,n),normalize$1(i,i);var o=dot$1(n,i);return 1<o?0:-1>o?r:a(o)}function exactEquals$2(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]}var len$1=length$1,forEach$1=function(){var e=Math.min,t=create$2();return function(r,a,n,o,s,d){var p,m;for(a||(a=3),n||(n=0),m=o?e(o*a+n,r.length):r.length,p=n;p<m;p+=a)t[0]=r[p],t[1]=r[p+1],t[2]=r[p+2],s(t,t,d),r[p]=t[0],r[p+1]=t[1],r[p+2]=t[2];return r}}();class Vector3$1 extends Float32Array{constructor(e=[0,0,0]){return super(e),this}get x(){return this[0]}set x(e){this[0]=e}get y(){return this[1]}set y(e){this[1]=e}get z(){return this[2]}set z(e){this[2]=e}set(e,t,r){return set$2(this,e,t,r),this}copy(e){return copy$2(this,e),this}add(e){return add$2(this,this,e),this}get size(){return length$1(this)}get squaredSize(){return squaredLength$1(this)}distance(e){return distance$1(this,e)}subtract(e){return subtract$2(this,this,e),this}negate(e=this){return negate$1(this,e),this}cross(e,t){return cross$1(this,e,t),this}scale(e){return scale$2(this,this,e),this}normalize(){return normalize$1(this,this),this}dot(e){return dot$1(this,e)}equals(e){return exactEquals$2(this,e)}applyMatrix4(e){return transformMat4$1(this,this,e),this}angle(e){return angle$1(this,e)}clone(){return new Vector3$1(this)}}function create$3(){var e=new ARRAY_TYPE(9);return ARRAY_TYPE!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[5]=0,e[6]=0,e[7]=0),e[0]=1,e[4]=1,e[8]=1,e}function create$4(){var e=new ARRAY_TYPE(4);return ARRAY_TYPE!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0,e[3]=0),e}function copy$4(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e}function set$4(e,t,r,a,n){return e[0]=t,e[1]=r,e[2]=a,e[3]=n,e}function normalize$2(e,t){var r=Math.sqrt,a=t[0],n=t[1],i=t[2],o=t[3],s=a*a+n*n+i*i+o*o;return 0<s&&(s=1/r(s)),e[0]=a*s,e[1]=n*s,e[2]=i*s,e[3]=o*s,e}var forEach$2=function(){var e=Math.min,t=create$4();return function(r,a,n,o,s,d){var p,m;for(a||(a=4),n||(n=0),m=o?e(o*a+n,r.length):r.length,p=n;p<m;p+=a)t[0]=r[p],t[1]=r[p+1],t[2]=r[p+2],t[3]=r[p+3],s(t,t,d),r[p]=t[0],r[p+1]=t[1],r[p+2]=t[2],r[p+3]=t[3];return r}}();function create$5(){var e=new ARRAY_TYPE(4);return ARRAY_TYPE!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e[3]=1,e}function identity$2(e){return e[0]=0,e[1]=0,e[2]=0,e[3]=1,e}function setAxisAngle(e,t,r){var a=Math.sin,n=Math.cos;r*=.5;var i=a(r);return e[0]=i*t[0],e[1]=i*t[1],e[2]=i*t[2],e[3]=n(r),e}function multiply$5(e,t,r){var a=t[0],n=t[1],i=t[2],o=t[3],s=r[0],d=r[1],l=r[2],p=r[3];return e[0]=a*p+o*s+n*l-i*d,e[1]=n*p+o*d+i*s-a*l,e[2]=i*p+o*l+a*d-n*s,e[3]=o*p-a*s-n*d-i*l,e}function rotateX$2(e,t,r){var a=Math.sin,n=Math.cos;r*=.5;var i=t[0],o=t[1],s=t[2],d=t[3],l=a(r),p=n(r);return e[0]=i*p+d*l,e[1]=o*p+s*l,e[2]=s*p-o*l,e[3]=d*p-i*l,e}function rotateY$2(e,t,r){var a=Math.sin,n=Math.cos;r*=.5;var i=t[0],o=t[1],s=t[2],d=t[3],l=a(r),p=n(r);return e[0]=i*p-s*l,e[1]=o*p+d*l,e[2]=s*p+i*l,e[3]=d*p-o*l,e}function rotateZ$2(e,t,r){var a=Math.sin,n=Math.cos;r*=.5;var i=t[0],o=t[1],s=t[2],d=t[3],l=a(r),p=n(r);return e[0]=i*p+o*l,e[1]=o*p-i*l,e[2]=s*p+d*l,e[3]=d*p-s*l,e}function slerp(e,r,a,n){var t=Math.acos,i=Math.sin,o=r[0],s=r[1],d=r[2],l=r[3],p=a[0],m=a[1],u=a[2],c=a[3],g,h,f,x,y;return h=o*p+s*m+d*u+l*c,0>h&&(h=-h,p=-p,m=-m,u=-u,c=-c),1-h>EPSILON?(g=t(h),f=i(g),x=i((1-n)*g)/f,y=i(n*g)/f):(x=1-n,y=n),e[0]=x*o+y*p,e[1]=x*s+y*m,e[2]=x*d+y*u,e[3]=x*l+y*c,e}function invert$2(e,t){var r=t[0],a=t[1],n=t[2],i=t[3],o=r*r+a*a+n*n+i*i,s=o?1/o:0;return e[0]=-r*s,e[1]=-a*s,e[2]=-n*s,e[3]=i*s,e}function fromMat3(e,t){var r=Math.sqrt,a=t[0]+t[4]+t[8],n;if(0<a)n=r(a+1),e[3]=.5*n,n=.5/n,e[0]=(t[5]-t[7])*n,e[1]=(t[6]-t[2])*n,e[2]=(t[1]-t[3])*n;else{var o=0;t[4]>t[0]&&(o=1),t[8]>t[3*o+o]&&(o=2);var s=(o+1)%3,d=(o+2)%3;n=r(t[3*o+o]-t[3*s+s]-t[3*d+d]+1),e[o]=.5*n,n=.5/n,e[3]=(t[3*s+d]-t[3*d+s])*n,e[s]=(t[3*s+o]+t[3*o+s])*n,e[d]=(t[3*d+o]+t[3*o+d])*n}return e}var copy$5=copy$4,set$5=set$4,normalize$3=normalize$2,rotationTo=function(){var e=create$2(),t=fromValues$2(1,0,0),r=fromValues$2(0,1,0);return function(n,i,a){var o=dot$1(i,a);return-.999999>o?(cross$1(e,t,i),1e-6>len$1(e)&&cross$1(e,r,i),normalize$1(e,e),setAxisAngle(n,e,Math.PI),n):.999999<o?(n[0]=0,n[1]=0,n[2]=0,n[3]=1,n):(cross$1(e,i,a),n[0]=e[0],n[1]=e[1],n[2]=e[2],n[3]=1+o,normalize$3(n,n))}}(),sqlerp=function(){var e=create$5(),r=create$5();return function(n,i,a,o,s,d){return slerp(e,i,s,d),slerp(r,a,o,d),slerp(n,e,r,2*d*(1-d)),n}}(),setAxes=function(){var e=create$3();return function(t,r,a,n){return e[0]=a[0],e[3]=a[1],e[6]=a[2],e[1]=n[0],e[4]=n[1],e[7]=n[2],e[2]=-r[0],e[5]=-r[1],e[8]=-r[2],normalize$3(t,fromMat3(t,e))}}();class Quaternion$1 extends Float32Array{constructor(e=0,t=0,r=0,a=1){return super(4),this.set(e,t,r,a),this}get x(){return this[0]}set x(e){this[0]=e}get y(){return this[1]}set y(e){this[1]=e}get z(){return this[2]}set z(e){this[2]=e}get w(){return this[3]}set w(e){this[3]=e}identity(){return identity$2(this),this}set(e,t,r,a){return set$5(this,e,t,r,a),this}rotateX(e){return rotateX$2(this,this,e),this}rotateY(e){return rotateY$2(this,this,e),this}rotateZ(e){return rotateZ$2(this,this,e),this}invert(e=this){return invert$2(this,e),this}copy(e){return copy$5(this,e),this}normalize(e=this){return normalize$3(this,this),this}multiply(e,t){return t?multiply$5(this,e,t):multiply$5(this,this,e),this}fromMatrix3(e){return fromMat3(this,e),this}}class TrackballController{constructor({matrix:e=new Matrix4$1,domElement:t=document.body,distance:r=0,invertRotation:a=!0,rotationEaseRatio:n=.04,zoomSpeed:i=.1,zoomEaseRatio:o=.1,minDistance:s=0,maxDistance:d=1/0,enabled:l=!0}={}){this.matrix=e,this._distance=r,this.invertRotation=a,this.rotationEaseRatio=n,this.maxDistance=d,this.minDistance=s,this.zoomSpeed=i,this.zoomEaseRatio=o,this._pointer=Pointer.get(t),this._nextDistance=this._distance,this._cachedQuaternion=new Quaternion$1,this._cachedMatrix=new Matrix4$1,this._cachedVector3=new Vector3$1,this._velocity=new Vector2$1,this._velocityOrigin=new Vector2$1,this._position=new Vector3$1([this.matrix.x,this.matrix.y,this.matrix.z]),this._positionPrevious=this._position.clone(),this._positionOffset=new Vector3$1,t.addEventListener("wheel",this.onWheel.bind(this)),this.enabled=!0,this.update(),this.enabled=l}set distance(e){this._distance=this._nextDistance=e}get distance(){return this._distance}onWheel(t){var e=Math.abs,r=Math.max,a=Math.min;if(this.enabled){const n=1+e(.01*(t.deltaY*this.zoomSpeed));this._nextDistance=this._nextDistance||1,this._nextDistance=0<t.deltaY?this._nextDistance*n:this._nextDistance/n,this._nextDistance=r(a(this._nextDistance,this.maxDistance),this.minDistance)}}update(){this.enabled&&(this._cachedMatrix.identity(),this._cachedQuaternion.identity(),this._distance+=(this._nextDistance-this._distance)*this.zoomEaseRatio,this._position.set(this.matrix.x,this.matrix.y,this.matrix.z).subtract(this._positionOffset),this.matrix.x=0,this.matrix.y=0,this.matrix.z=0,this._pointer.downed&&this._velocity.copy(this._pointer.velocity).scale(.003),this._velocity.lerp(this._velocityOrigin,this.rotationEaseRatio),this._cachedQuaternion.rotateY(this.invertRotation?-this._velocity.x:this._velocity.x),this._cachedQuaternion.rotateX(this.invertRotation?-this._velocity.y:this._velocity.y),this._cachedMatrix.fromQuaternion(this._cachedQuaternion),this.matrix.multiply(this._cachedMatrix),this._positionOffset.set(0,0,1),this._positionOffset.applyMatrix4(this.matrix),this._positionOffset.scale(this._distance),this._cachedVector3.copy(this._position).add(this._positionOffset),this.matrix.x=this._cachedVector3.x,this.matrix.y=this._cachedVector3.y,this.matrix.z=this._cachedVector3.z)}}class THREETrackballController extends TrackballController{constructor(e=new Object3D,t){e.updateMatrix(),super(Object.assign({matrix:new Matrix4$1(e.matrix.elements)},t)),this._matrix4=new Matrix4,this.object3D=e;const r=this.enabled;this.enabled=!0,this.update(),this.enabled=r}update(){this.object3D&&(this.matrix.x=this.object3D.position.x,this.matrix.y=this.object3D.position.y,this.matrix.z=this.object3D.position.z,super.update(),this._matrix4.fromArray(this.matrix),this.object3D.matrix.identity(),this.object3D.applyMatrix(this._matrix4))}}class Scene$1 extends Scene{constructor({canvas:e}={}){super(),this.camera=new PerspectiveCamera(65,window.innerWidth/window.innerHeight,.1,1e4),this.controls=new THREETrackballController(this.camera,{distance:5,domElement:e});let t=new Mesh(new BoxGeometry(1,1,1),new MeshNormalMaterial());this.add(t)}resize(e,t){this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}update(){this.controls.update()}}var ImageUtils={getDataURL:function(e){var t;if("undefined"==typeof HTMLCanvasElement)return e.src;if(e instanceof HTMLCanvasElement)t=e;else{void 0===_canvas&&(_canvas=document.createElementNS("http://www.w3.org/1999/xhtml","canvas")),_canvas.width=e.width,_canvas.height=e.height;var r=_canvas.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),t=_canvas}return 2048<t.width||2048<t.height?t.toDataURL("image/jpeg",.6):t.toDataURL("image/png")}},textureId=0,_canvas;function Texture(e,t,r,a,n,i,o,s,d,l){Object.defineProperty(this,"id",{value:textureId++}),this.uuid=_Math.generateUUID(),this.name="",this.image=e===void 0?Texture.DEFAULT_IMAGE:e,this.mipmaps=[],this.mapping=t===void 0?Texture.DEFAULT_MAPPING:t,this.wrapS=r===void 0?ClampToEdgeWrapping:r,this.wrapT=a===void 0?ClampToEdgeWrapping:a,this.magFilter=n===void 0?LinearFilter:n,this.minFilter=i===void 0?LinearMipMapLinearFilter:i,this.anisotropy=d===void 0?1:d,this.format=o===void 0?RGBAFormat:o,this.type=s===void 0?UnsignedByteType:s,this.offset=new Vector2(0,0),this.repeat=new Vector2(1,1),this.center=new Vector2(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Matrix3,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=l===void 0?LinearEncoding:l,this.version=0,this.onUpdate=null}Texture.DEFAULT_IMAGE=void 0,Texture.DEFAULT_MAPPING=UVMapping,Texture.prototype=Object.assign(Object.create(EventDispatcher.prototype),{constructor:Texture,isTexture:!0,updateMatrix:function(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)},clone:function(){return new this.constructor().copy(this)},copy:function(e){return this.name=e.name,this.image=e.image,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.encoding=e.encoding,this},toJSON:function(e){var t=void 0===e||"string"==typeof e;if(!t&&void 0!==e.textures[this.uuid])return e.textures[this.uuid];var r={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(void 0!==this.image){var a=this.image;if(void 0===a.uuid&&(a.uuid=_Math.generateUUID()),!t&&void 0===e.images[a.uuid]){var n;if(Array.isArray(a)){n=[];for(var o=0,s=a.length;o<s;o++)n.push(ImageUtils.getDataURL(a[o]))}else n=ImageUtils.getDataURL(a);e.images[a.uuid]={uuid:a.uuid,url:n}}r.image=a.uuid}return t||(e.textures[this.uuid]=r),r},dispose:function(){this.dispatchEvent({type:"dispose"})},transformUv:function(e){var t=Math.abs,r=Math.ceil,a=Math.floor;if(this.mapping!==UVMapping)return e;if(e.applyMatrix3(this.matrix),0>e.x||1<e.x)switch(this.wrapS){case RepeatWrapping:e.x-=a(e.x);break;case ClampToEdgeWrapping:e.x=0>e.x?0:1;break;case MirroredRepeatWrapping:1===t(a(e.x)%2)?e.x=r(e.x)-e.x:e.x-=a(e.x);}if(0>e.y||1<e.y)switch(this.wrapT){case RepeatWrapping:e.y-=a(e.y);break;case ClampToEdgeWrapping:e.y=0>e.y?0:1;break;case MirroredRepeatWrapping:1===t(a(e.y)%2)?e.y=r(e.y)-e.y:e.y-=a(e.y);}return this.flipY&&(e.y=1-e.y),e}}),Object.defineProperty(Texture.prototype,"needsUpdate",{set:function(e){!0===e&&this.version++}});function DataTexture(e,t,r,a,n,i,o,s,d,l,p,m){Texture.call(this,null,i,o,s,d,l,a,n,p,m),this.image={data:e,width:t,height:r},this.magFilter=d===void 0?NearestFilter:d,this.minFilter=l===void 0?NearestFilter:l,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}DataTexture.prototype=Object.create(Texture.prototype),DataTexture.prototype.constructor=DataTexture,DataTexture.prototype.isDataTexture=!0;function Plane(e,t){this.normal=e===void 0?new Vector3(1,0,0):e,this.constant=t===void 0?0:t}Object.assign(Plane.prototype,{set:function(e,t){return this.normal.copy(e),this.constant=t,this},setComponents:function(e,t,r,a){return this.normal.set(e,t,r),this.constant=a,this},setFromNormalAndCoplanarPoint:function(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this},setFromCoplanarPoints:function(){var e=new Vector3,t=new Vector3;return function(r,a,n){var i=e.subVectors(n,a).cross(t.subVectors(r,a)).normalize();return this.setFromNormalAndCoplanarPoint(i,r),this}}(),clone:function(){return new this.constructor().copy(this)},copy:function(e){return this.normal.copy(e.normal),this.constant=e.constant,this},normalize:function(){var e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this},negate:function(){return this.constant*=-1,this.normal.negate(),this},distanceToPoint:function(e){return this.normal.dot(e)+this.constant},distanceToSphere:function(e){return this.distanceToPoint(e.center)-e.radius},projectPoint:function(e,t){return void 0===t&&(console.warn("THREE.Plane: .projectPoint() target is now required"),t=new Vector3),t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e)},intersectLine:function(){var e=new Vector3;return function(r,a){a===void 0&&(console.warn("THREE.Plane: .intersectLine() target is now required"),a=new Vector3);var n=r.delta(e),i=this.normal.dot(n);if(0===i)return 0===this.distanceToPoint(r.start)?a.copy(r.start):void 0;var o=-(r.start.dot(this.normal)+this.constant)/i;return 0>o||1<o?void 0:a.copy(n).multiplyScalar(o).add(r.start)}}(),intersectsLine:function(e){var t=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return 0>t&&0<r||0>r&&0<t},intersectsBox:function(e){return e.intersectsPlane(this)},intersectsSphere:function(e){return e.intersectsPlane(this)},coplanarPoint:function(e){return void 0===e&&(console.warn("THREE.Plane: .coplanarPoint() target is now required"),e=new Vector3),e.copy(this.normal).multiplyScalar(-this.constant)},applyMatrix4:function(){var e=new Vector3,t=new Matrix3;return function(r,a){var n=a||t.getNormalMatrix(r),i=this.coplanarPoint(e).applyMatrix4(r),o=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(o),this}}(),translate:function(e){return this.constant-=e.dot(this.normal),this},equals:function(e){return e.normal.equals(this.normal)&&e.constant===this.constant}});function Frustum(e,t,r,a,n,i){this.planes=[e===void 0?new Plane:e,t===void 0?new Plane:t,r===void 0?new Plane:r,a===void 0?new Plane:a,n===void 0?new Plane:n,i===void 0?new Plane:i]}Object.assign(Frustum.prototype,{set:function(e,t,r,a,n,i){var o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(r),o[3].copy(a),o[4].copy(n),o[5].copy(i),this},clone:function(){return new this.constructor().copy(this)},copy:function(e){for(var t=this.planes,r=0;6>r;r++)t[r].copy(e.planes[r]);return this},setFromMatrix:function(e){var t=this.planes,r=e.elements,a=r[0],n=r[1],i=r[2],o=r[3],s=r[4],d=r[5],l=r[6],p=r[7],m=r[8],u=r[9],c=r[10],g=r[11],h=r[12],f=r[13],x=r[14],y=r[15];return t[0].setComponents(o-a,p-s,g-m,y-h).normalize(),t[1].setComponents(o+a,p+s,g+m,y+h).normalize(),t[2].setComponents(o+n,p+d,g+u,y+f).normalize(),t[3].setComponents(o-n,p-d,g-u,y-f).normalize(),t[4].setComponents(o-i,p-l,g-c,y-x).normalize(),t[5].setComponents(o+i,p+l,g+c,y+x).normalize(),this},intersectsObject:function(){var e=new Sphere;return function(t){var r=t.geometry;return null===r.boundingSphere&&r.computeBoundingSphere(),e.copy(r.boundingSphere).applyMatrix4(t.matrixWorld),this.intersectsSphere(e)}}(),intersectsSprite:function(){var e=new Sphere;return function(t){return e.center.set(0,0,0),e.radius=.7071067811865476,e.applyMatrix4(t.matrixWorld),this.intersectsSphere(e)}}(),intersectsSphere:function(e){for(var t=this.planes,r=e.center,a=-e.radius,n=0,o;6>n;n++)if(o=t[n].distanceToPoint(r),o<a)return!1;return!0},intersectsBox:function(){var e=new Vector3;return function(t){for(var r=this.planes,a=0,n;6>a;a++)if(n=r[a],e.x=0<n.normal.x?t.max.x:t.min.x,e.y=0<n.normal.y?t.max.y:t.min.y,e.z=0<n.normal.z?t.max.z:t.min.z,0>n.distanceToPoint(e))return!1;return!0}}(),containsPoint:function(e){for(var t=this.planes,r=0;6>r;r++)if(0>t[r].distanceToPoint(e))return!1;return!0}});var alphamap_fragment=`
#ifdef USE_ALPHAMAP

	diffuseColor.a *= texture2D( alphaMap, vUv ).g;

#endif
`,alphamap_pars_fragment=`
#ifdef USE_ALPHAMAP

	uniform sampler2D alphaMap;

#endif
`,alphatest_fragment=`
#ifdef ALPHATEST

	if ( diffuseColor.a < ALPHATEST ) discard;

#endif
`,aomap_fragment=`
#ifdef USE_AOMAP

	// reads channel R, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;

	reflectedLight.indirectDiffuse *= ambientOcclusion;

	#if defined( USE_ENVMAP ) && defined( PHYSICAL )

		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );

		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );

	#endif

#endif
`,aomap_pars_fragment=`
#ifdef USE_AOMAP

	uniform sampler2D aoMap;
	uniform float aoMapIntensity;

#endif
`,begin_vertex=`
vec3 transformed = vec3( position );
`,beginnormal_vertex=`
vec3 objectNormal = vec3( normal );
`,bsdfs=`

// Analytical approximation of the DFG LUT, one half of the
// split-sum approximation used in indirect specular lighting.
// via 'environmentBRDF' from "Physically Based Shading on Mobile"
// https://www.unrealengine.com/blog/physically-based-shading-on-mobile - environmentBRDF for GGX on mobile
vec2 integrateSpecularBRDF( const in float dotNV, const in float roughness ) {
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );

	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );

	vec4 r = roughness * c0 + c1;

	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;

	return vec2( -1.04, 1.04 ) * a004 + r.zw;

}

float punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {

#if defined ( PHYSICALLY_CORRECT_LIGHTS )

	// based upon Frostbite 3 Moving to Physically-based Rendering
	// page 32, equation 26: E[window1]
	// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
	// this is intended to be used on spot and point lights who are represented as luminous intensity
	// but who must be converted to luminous irradiance for surface lighting calculation
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );

	if( cutoffDistance > 0.0 ) {

		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );

	}

	return distanceFalloff;

#else

	if( cutoffDistance > 0.0 && decayExponent > 0.0 ) {

		return pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );

	}

	return 1.0;

#endif

}

vec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {

	return RECIPROCAL_PI * diffuseColor;

} // validated

vec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {

	// Original approximation by Christophe Schlick '94
	// float fresnel = pow( 1.0 - dotLH, 5.0 );

	// Optimized variant (presented by Epic at SIGGRAPH '13)
	// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
	float fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );

	return ( 1.0 - specularColor ) * fresnel + specularColor;

} // validated

// Microfacet Models for Refraction through Rough Surfaces - equation (34)
// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html
// alpha is "roughness squared" in Disney’s reparameterization
float G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {

	// geometry term (normalized) = G(l)⋅G(v) / 4(n⋅l)(n⋅v)
	// also see #12151

	float a2 = pow2( alpha );

	float gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	float gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );

	return 1.0 / ( gl * gv );

} // validated

// Moving Frostbite to Physically Based Rendering 3.0 - page 12, listing 2
// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
float G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {

	float a2 = pow2( alpha );

	// dotNL and dotNV are explicitly swapped. This is not a mistake.
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );

	return 0.5 / max( gv + gl, EPSILON );

}

// Microfacet Models for Refraction through Rough Surfaces - equation (33)
// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html
// alpha is "roughness squared" in Disney’s reparameterization
float D_GGX( const in float alpha, const in float dotNH ) {

	float a2 = pow2( alpha );

	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0; // avoid alpha = 0 with dotNH = 1

	return RECIPROCAL_PI * a2 / pow2( denom );

}

// GGX Distribution, Schlick Fresnel, GGX-Smith Visibility
vec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {

	float alpha = pow2( roughness ); // UE4's roughness

	vec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );

	float dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );
	float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
	float dotNH = saturate( dot( geometry.normal, halfDir ) );
	float dotLH = saturate( dot( incidentLight.direction, halfDir ) );

	vec3 F = F_Schlick( specularColor, dotLH );

	float G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );

	float D = D_GGX( alpha, dotNH );

	return F * ( G * D );

} // validated

// Rect Area Light

// Real-Time Polygonal-Light Shading with Linearly Transformed Cosines
// by Eric Heitz, Jonathan Dupuy, Stephen Hill and David Neubelt
// code: https://github.com/selfshadow/ltc_code/

vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {

	const float LUT_SIZE  = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS  = 0.5 / LUT_SIZE;

	float dotNV = saturate( dot( N, V ) );

	// texture parameterized by sqrt( GGX alpha ) and sqrt( 1 - cos( theta ) )
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );

	uv = uv * LUT_SCALE + LUT_BIAS;

	return uv;

}

float LTC_ClippedSphereFormFactor( const in vec3 f ) {

	// Real-Time Area Lighting: a Journey from Research to Production (p.102)
	// An approximation of the form factor of a horizon-clipped rectangle.

	float l = length( f );

	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );

}

vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {

	float x = dot( v1, v2 );

	float y = abs( x );

	// rational polynomial approximation to theta / sin( theta ) / 2PI
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;

	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;

	return cross( v1, v2 ) * theta_sintheta;

}

vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {

	// bail if point is on back side of plane of light
	// assumes ccw winding order of light vertices
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );

	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );

	// construct orthonormal basis around N
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 ); // negated from paper; possibly due to a different handedness of world coordinate system

	// compute transform
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );

	// transform rect
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );

	// project rect onto sphere
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );

	// calculate vector form factor
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );

	// adjust for horizon clipping
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );

/*
	// alternate method of adjusting for horizon clipping (see referece)
	// refactoring required
	float len = length( vectorFormFactor );
	float z = vectorFormFactor.z / len;

	const float LUT_SIZE  = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS  = 0.5 / LUT_SIZE;

	// tabulated horizon-clipped sphere, apparently...
	vec2 uv = vec2( z * 0.5 + 0.5, len );
	uv = uv * LUT_SCALE + LUT_BIAS;

	float scale = texture2D( ltc_2, uv ).w;

	float result = len * scale;
*/

	return vec3( result );

}

// End Rect Area Light

// ref: https://www.unrealengine.com/blog/physically-based-shading-on-mobile - environmentBRDF for GGX on mobile
vec3 BRDF_Specular_GGX_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {

	float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );

	vec2 brdf = integrateSpecularBRDF( dotNV, roughness );

	return specularColor * brdf.x + brdf.y;

} // validated

// Fdez-Agüera's "Multiple-Scattering Microfacet Model for Real-Time Image Based Lighting"
// Approximates multiscattering in order to preserve energy.
// http://www.jcgt.org/published/0008/01/03/
void BRDF_Specular_Multiscattering_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {

	float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );

	vec3 F = F_Schlick( specularColor, dotNV );
	vec2 brdf = integrateSpecularBRDF( dotNV, roughness );
	vec3 FssEss = F * brdf.x + brdf.y;

	float Ess = brdf.x + brdf.y;
	float Ems = 1.0 - Ess;

	// Paper incorrect indicates coefficient is PI/21, and will
	// be corrected to 1/21 in future updates.
	vec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619; // 1/21
	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );

	singleScatter += FssEss;
	multiScatter += Fms * Ems;

}

float G_BlinnPhong_Implicit( /* const in float dotNL, const in float dotNV */ ) {

	// geometry term is (n dot l)(n dot v) / 4(n dot l)(n dot v)
	return 0.25;

}

float D_BlinnPhong( const in float shininess, const in float dotNH ) {

	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );

}

vec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {

	vec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );

	//float dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );
	//float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
	float dotNH = saturate( dot( geometry.normal, halfDir ) );
	float dotLH = saturate( dot( incidentLight.direction, halfDir ) );

	vec3 F = F_Schlick( specularColor, dotLH );

	float G = G_BlinnPhong_Implicit( /* dotNL, dotNV */ );

	float D = D_BlinnPhong( shininess, dotNH );

	return F * ( G * D );

} // validated

// source: http://simonstechblog.blogspot.ca/2011/12/microfacet-brdf.html
float GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {
	return ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );
}

float BlinnExponentToGGXRoughness( const in float blinnExponent ) {
	return sqrt( 2.0 / ( blinnExponent + 2.0 ) );
}
`,bumpmap_pars_fragment=`
#ifdef USE_BUMPMAP

	uniform sampler2D bumpMap;
	uniform float bumpScale;

	// Bump Mapping Unparametrized Surfaces on the GPU by Morten S. Mikkelsen
	// http://api.unrealengine.com/attachments/Engine/Rendering/LightingAndShadows/BumpMappingWithoutTangentSpace/mm_sfgrad_bump.pdf

	// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)

	vec2 dHdxy_fwd() {

		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );

		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;

		return vec2( dBx, dBy );

	}

	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {

		// Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988

		vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );
		vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );
		vec3 vN = surf_norm;		// normalized

		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );

		float fDet = dot( vSigmaX, R1 );

		fDet *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );

		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );

	}

#endif
`,clipping_planes_fragment=`
#if NUM_CLIPPING_PLANES > 0

	vec4 plane;

	#pragma unroll_loop
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {

		plane = clippingPlanes[ i ];
		if ( dot( vViewPosition, plane.xyz ) > plane.w ) discard;

	}

	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES

		bool clipped = true;

		#pragma unroll_loop
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {

			plane = clippingPlanes[ i ];
			clipped = ( dot( vViewPosition, plane.xyz ) > plane.w ) && clipped;

		}

		if ( clipped ) discard;

	#endif

#endif
`,clipping_planes_pars_fragment=`
#if NUM_CLIPPING_PLANES > 0

	#if ! defined( PHYSICAL ) && ! defined( PHONG ) && ! defined( MATCAP )
		varying vec3 vViewPosition;
	#endif

	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];

#endif
`,clipping_planes_pars_vertex=`
#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG ) && ! defined( MATCAP )
	varying vec3 vViewPosition;
#endif
`,clipping_planes_vertex=`
#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG ) && ! defined( MATCAP )
	vViewPosition = - mvPosition.xyz;
#endif
`,color_fragment=`
#ifdef USE_COLOR

	diffuseColor.rgb *= vColor;

#endif
`,color_pars_fragment=`
#ifdef USE_COLOR

	varying vec3 vColor;

#endif
`,color_pars_vertex=`
#ifdef USE_COLOR

	varying vec3 vColor;

#endif
`,color_vertex=`
#ifdef USE_COLOR

	vColor.xyz = color.xyz;

#endif
`,common=`
#define PI 3.14159265359
#define PI2 6.28318530718
#define PI_HALF 1.5707963267949
#define RECIPROCAL_PI 0.31830988618
#define RECIPROCAL_PI2 0.15915494
#define LOG2 1.442695
#define EPSILON 1e-6

#define saturate(a) clamp( a, 0.0, 1.0 )
#define whiteCompliment(a) ( 1.0 - saturate( a ) )

float pow2( const in float x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }
// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.
// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract(sin(sn) * c);
}

struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};

struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};

struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
};

vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

}

// http://en.wikibooks.org/wiki/GLSL_Programming/Applying_Matrix_Transformations
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {

	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );

}

vec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {

	float distance = dot( planeNormal, point - pointOnPlane );

	return - distance * planeNormal + point;

}

float sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {

	return sign( dot( point - pointOnPlane, planeNormal ) );

}

vec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {

	return lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;

}

mat3 transposeMat3( const in mat3 m ) {

	mat3 tmp;

	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );

	return tmp;

}

// https://en.wikipedia.org/wiki/Relative_luminance
float linearToRelativeLuminance( const in vec3 color ) {

	vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );

	return dot( weights, color.rgb );

}
`,cube_uv_reflection_fragment=`
#ifdef ENVMAP_TYPE_CUBE_UV

#define cubeUV_textureSize (1024.0)

int getFaceFromDirection(vec3 direction) {
	vec3 absDirection = abs(direction);
	int face = -1;
	if( absDirection.x > absDirection.z ) {
		if(absDirection.x > absDirection.y )
			face = direction.x > 0.0 ? 0 : 3;
		else
			face = direction.y > 0.0 ? 1 : 4;
	}
	else {
		if(absDirection.z > absDirection.y )
			face = direction.z > 0.0 ? 2 : 5;
		else
			face = direction.y > 0.0 ? 1 : 4;
	}
	return face;
}
#define cubeUV_maxLods1  (log2(cubeUV_textureSize*0.25) - 1.0)
#define cubeUV_rangeClamp (exp2((6.0 - 1.0) * 2.0))

vec2 MipLevelInfo( vec3 vec, float roughnessLevel, float roughness ) {
	float scale = exp2(cubeUV_maxLods1 - roughnessLevel);
	float dxRoughness = dFdx(roughness);
	float dyRoughness = dFdy(roughness);
	vec3 dx = dFdx( vec * scale * dxRoughness );
	vec3 dy = dFdy( vec * scale * dyRoughness );
	float d = max( dot( dx, dx ), dot( dy, dy ) );
	// Clamp the value to the max mip level counts. hard coded to 6 mips
	d = clamp(d, 1.0, cubeUV_rangeClamp);
	float mipLevel = 0.5 * log2(d);
	return vec2(floor(mipLevel), fract(mipLevel));
}

#define cubeUV_maxLods2 (log2(cubeUV_textureSize*0.25) - 2.0)
#define cubeUV_rcpTextureSize (1.0 / cubeUV_textureSize)

vec2 getCubeUV(vec3 direction, float roughnessLevel, float mipLevel) {
	mipLevel = roughnessLevel > cubeUV_maxLods2 - 3.0 ? 0.0 : mipLevel;
	float a = 16.0 * cubeUV_rcpTextureSize;

	vec2 exp2_packed = exp2( vec2( roughnessLevel, mipLevel ) );
	vec2 rcp_exp2_packed = vec2( 1.0 ) / exp2_packed;
	// float powScale = exp2(roughnessLevel + mipLevel);
	float powScale = exp2_packed.x * exp2_packed.y;
	// float scale =  1.0 / exp2(roughnessLevel + 2.0 + mipLevel);
	float scale = rcp_exp2_packed.x * rcp_exp2_packed.y * 0.25;
	// float mipOffset = 0.75*(1.0 - 1.0/exp2(mipLevel))/exp2(roughnessLevel);
	float mipOffset = 0.75*(1.0 - rcp_exp2_packed.y) * rcp_exp2_packed.x;

	bool bRes = mipLevel == 0.0;
	scale =  bRes && (scale < a) ? a : scale;

	vec3 r;
	vec2 offset;
	int face = getFaceFromDirection(direction);

	float rcpPowScale = 1.0 / powScale;

	if( face == 0) {
		r = vec3(direction.x, -direction.z, direction.y);
		offset = vec2(0.0+mipOffset,0.75 * rcpPowScale);
		offset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;
	}
	else if( face == 1) {
		r = vec3(direction.y, direction.x, direction.z);
		offset = vec2(scale+mipOffset, 0.75 * rcpPowScale);
		offset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;
	}
	else if( face == 2) {
		r = vec3(direction.z, direction.x, direction.y);
		offset = vec2(2.0*scale+mipOffset, 0.75 * rcpPowScale);
		offset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;
	}
	else if( face == 3) {
		r = vec3(direction.x, direction.z, direction.y);
		offset = vec2(0.0+mipOffset,0.5 * rcpPowScale);
		offset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;
	}
	else if( face == 4) {
		r = vec3(direction.y, direction.x, -direction.z);
		offset = vec2(scale+mipOffset, 0.5 * rcpPowScale);
		offset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;
	}
	else {
		r = vec3(direction.z, -direction.x, direction.y);
		offset = vec2(2.0*scale+mipOffset, 0.5 * rcpPowScale);
		offset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;
	}
	r = normalize(r);
	float texelOffset = 0.5 * cubeUV_rcpTextureSize;
	vec2 s = ( r.yz / abs( r.x ) + vec2( 1.0 ) ) * 0.5;
	vec2 base = offset + vec2( texelOffset );
	return base + s * ( scale - 2.0 * texelOffset );
}

#define cubeUV_maxLods3 (log2(cubeUV_textureSize*0.25) - 3.0)

vec4 textureCubeUV( sampler2D envMap, vec3 reflectedDirection, float roughness ) {
	float roughnessVal = roughness* cubeUV_maxLods3;
	float r1 = floor(roughnessVal);
	float r2 = r1 + 1.0;
	float t = fract(roughnessVal);
	vec2 mipInfo = MipLevelInfo(reflectedDirection, r1, roughness);
	float s = mipInfo.y;
	float level0 = mipInfo.x;
	float level1 = level0 + 1.0;
	level1 = level1 > 5.0 ? 5.0 : level1;

	// round to nearest mipmap if we are not interpolating.
	level0 += min( floor( s + 0.5 ), 5.0 );

	// Tri linear interpolation.
	vec2 uv_10 = getCubeUV(reflectedDirection, r1, level0);
	vec4 color10 = envMapTexelToLinear(texture2D(envMap, uv_10));

	vec2 uv_20 = getCubeUV(reflectedDirection, r2, level0);
	vec4 color20 = envMapTexelToLinear(texture2D(envMap, uv_20));

	vec4 result = mix(color10, color20, t);

	return vec4(result.rgb, 1.0);
}

#endif
`,defaultnormal_vertex=`
vec3 transformedNormal = normalMatrix * objectNormal;

#ifdef FLIP_SIDED

	transformedNormal = - transformedNormal;

#endif
`,displacementmap_pars_vertex=`
#ifdef USE_DISPLACEMENTMAP

	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;

#endif
`,displacementmap_vertex=`
#ifdef USE_DISPLACEMENTMAP

	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, uv ).x * displacementScale + displacementBias );

#endif
`,emissivemap_fragment=`
#ifdef USE_EMISSIVEMAP

	vec4 emissiveColor = texture2D( emissiveMap, vUv );

	emissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;

	totalEmissiveRadiance *= emissiveColor.rgb;

#endif
`,emissivemap_pars_fragment=`
#ifdef USE_EMISSIVEMAP

	uniform sampler2D emissiveMap;

#endif
`,encodings_fragment=`
  gl_FragColor = linearToOutputTexel( gl_FragColor );
`,encodings_pars_fragment=`
// For a discussion of what this is, please read this: http://lousodrome.net/blog/light/2013/05/26/gamma-correct-and-hdr-rendering-in-a-32-bits-buffer/

vec4 LinearToLinear( in vec4 value ) {
	return value;
}

vec4 GammaToLinear( in vec4 value, in float gammaFactor ) {
	return vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );
}

vec4 LinearToGamma( in vec4 value, in float gammaFactor ) {
	return vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );
}

vec4 sRGBToLinear( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}

vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}

vec4 RGBEToLinear( in vec4 value ) {
	return vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );
}

vec4 LinearToRGBE( in vec4 value ) {
	float maxComponent = max( max( value.r, value.g ), value.b );
	float fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );
	return vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );
//  return vec4( value.brg, ( 3.0 + 128.0 ) / 256.0 );
}

// reference: http://iwasbeingirony.blogspot.ca/2010/06/difference-between-rgbm-and-rgbd.html
vec4 RGBMToLinear( in vec4 value, in float maxRange ) {
	return vec4( value.rgb * value.a * maxRange, 1.0 );
}

vec4 LinearToRGBM( in vec4 value, in float maxRange ) {
	float maxRGB = max( value.r, max( value.g, value.b ) );
	float M = clamp( maxRGB / maxRange, 0.0, 1.0 );
	M = ceil( M * 255.0 ) / 255.0;
	return vec4( value.rgb / ( M * maxRange ), M );
}

// reference: http://iwasbeingirony.blogspot.ca/2010/06/difference-between-rgbm-and-rgbd.html
vec4 RGBDToLinear( in vec4 value, in float maxRange ) {
	return vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );
}

vec4 LinearToRGBD( in vec4 value, in float maxRange ) {
	float maxRGB = max( value.r, max( value.g, value.b ) );
	float D = max( maxRange / maxRGB, 1.0 );
	D = min( floor( D ) / 255.0, 1.0 );
	return vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );
}

// LogLuv reference: http://graphicrants.blogspot.ca/2009/04/rgbm-color-encoding.html

// M matrix, for encoding
const mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );
vec4 LinearToLogLuv( in vec4 value )  {
	vec3 Xp_Y_XYZp = cLogLuvM * value.rgb;
	Xp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );
	vec4 vResult;
	vResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;
	float Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;
	vResult.w = fract( Le );
	vResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;
	return vResult;
}

// Inverse M matrix, for decoding
const mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );
vec4 LogLuvToLinear( in vec4 value ) {
	float Le = value.z * 255.0 + value.w;
	vec3 Xp_Y_XYZp;
	Xp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );
	Xp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;
	Xp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;
	vec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;
	return vec4( max( vRGB, 0.0 ), 1.0 );
}
`,envmap_fragment=`
#ifdef USE_ENVMAP

	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )

		vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );

		// Transforming Normal Vectors with the Inverse Transformation
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

		#ifdef ENVMAP_MODE_REFLECTION

			vec3 reflectVec = reflect( cameraToVertex, worldNormal );

		#else

			vec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );

		#endif

	#else

		vec3 reflectVec = vReflect;

	#endif

	#ifdef ENVMAP_TYPE_CUBE

		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );

	#elif defined( ENVMAP_TYPE_EQUIREC )

		vec2 sampleUV;

		reflectVec = normalize( reflectVec );

		sampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;

		sampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;

		vec4 envColor = texture2D( envMap, sampleUV );

	#elif defined( ENVMAP_TYPE_SPHERE )

		reflectVec = normalize( reflectVec );

		vec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0, 0.0, 1.0 ) );

		vec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );

	#else

		vec4 envColor = vec4( 0.0 );

	#endif

	envColor = envMapTexelToLinear( envColor );

	#ifdef ENVMAP_BLENDING_MULTIPLY

		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );

	#elif defined( ENVMAP_BLENDING_MIX )

		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );

	#elif defined( ENVMAP_BLENDING_ADD )

		outgoingLight += envColor.xyz * specularStrength * reflectivity;

	#endif

#endif
`,envmap_pars_fragment=`
#if defined( USE_ENVMAP ) || defined( PHYSICAL )
	uniform float reflectivity;
	uniform float envMapIntensity;
#endif

#ifdef USE_ENVMAP

	#if ! defined( PHYSICAL ) && ( defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) )
		varying vec3 vWorldPosition;
	#endif

	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	uniform float flipEnvMap;
	uniform int maxMipLevel;

	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( PHYSICAL )
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif

#endif
`,envmap_pars_vertex=`
#ifdef USE_ENVMAP

	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )
		varying vec3 vWorldPosition;

	#else

		varying vec3 vReflect;
		uniform float refractionRatio;

	#endif

#endif
`,envmap_vertex=`
#ifdef USE_ENVMAP

	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )

		vWorldPosition = worldPosition.xyz;

	#else

		vec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );

		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );

		#ifdef ENVMAP_MODE_REFLECTION

			vReflect = reflect( cameraToVertex, worldNormal );

		#else

			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );

		#endif

	#endif

#endif
`,fog_vertex=`
#ifdef USE_FOG

	fogDepth = -mvPosition.z;

#endif
`,fog_pars_vertex=`
#ifdef USE_FOG

	varying float fogDepth;

#endif
`,fog_fragment=`
#ifdef USE_FOG

	#ifdef FOG_EXP2

		float fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * fogDepth * fogDepth * LOG2 ) );

	#else

		float fogFactor = smoothstep( fogNear, fogFar, fogDepth );

	#endif

	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );

#endif
`,fog_pars_fragment=`
#ifdef USE_FOG

	uniform vec3 fogColor;
	varying float fogDepth;

	#ifdef FOG_EXP2

		uniform float fogDensity;

	#else

		uniform float fogNear;
		uniform float fogFar;

	#endif

#endif
`,gradientmap_pars_fragment=`
#ifdef TOON

	uniform sampler2D gradientMap;

	vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {

		// dotNL will be from -1.0 to 1.0
		float dotNL = dot( normal, lightDirection );
		vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );

		#ifdef USE_GRADIENTMAP

			return texture2D( gradientMap, coord ).rgb;

		#else

			return ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );

		#endif


	}

#endif
`,lightmap_fragment=`
#ifdef USE_LIGHTMAP

	reflectedLight.indirectDiffuse += PI * texture2D( lightMap, vUv2 ).xyz * lightMapIntensity; // factor of PI should not be present; included here to prevent breakage

#endif
`,lightmap_pars_fragment=`
#ifdef USE_LIGHTMAP

	uniform sampler2D lightMap;
	uniform float lightMapIntensity;

#endif
`,lights_lambert_vertex=`
vec3 diffuse = vec3( 1.0 );

GeometricContext geometry;
geometry.position = mvPosition.xyz;
geometry.normal = normalize( transformedNormal );
geometry.viewDir = normalize( -mvPosition.xyz );

GeometricContext backGeometry;
backGeometry.position = geometry.position;
backGeometry.normal = -geometry.normal;
backGeometry.viewDir = geometry.viewDir;

vLightFront = vec3( 0.0 );
vIndirectFront = vec3( 0.0 );

#ifdef DOUBLE_SIDED
	vLightBack = vec3( 0.0 );
	vIndirectBack = vec3( 0.0 );
#endif

IncidentLight directLight;
float dotNL;
vec3 directLightColor_Diffuse;

#if NUM_POINT_LIGHTS > 0

	#pragma unroll_loop
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

		getPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );

		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = PI * directLight.color;

		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;

		#ifdef DOUBLE_SIDED

			vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;

		#endif

	}

#endif

#if NUM_SPOT_LIGHTS > 0

	#pragma unroll_loop
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {

		getSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );

		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = PI * directLight.color;

		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;

		#ifdef DOUBLE_SIDED

			vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;

		#endif
	}

#endif

/*
#if NUM_RECT_AREA_LIGHTS > 0

	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {

		// TODO (abelnation): implement

	}

#endif
*/

#if NUM_DIR_LIGHTS > 0

	#pragma unroll_loop
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

		getDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );

		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = PI * directLight.color;

		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;

		#ifdef DOUBLE_SIDED

			vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;

		#endif

	}

#endif

#if NUM_HEMI_LIGHTS > 0

	#pragma unroll_loop
	for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {

		vIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );

		#ifdef DOUBLE_SIDED

			vIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );

		#endif

	}

#endif
`,lights_pars_begin=`
uniform vec3 ambientLightColor;

vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {

	vec3 irradiance = ambientLightColor;

	#ifndef PHYSICALLY_CORRECT_LIGHTS

		irradiance *= PI;

	#endif

	return irradiance;

}

#if NUM_DIR_LIGHTS > 0

	struct DirectionalLight {
		vec3 direction;
		vec3 color;

		int shadow;
		float shadowBias;
		float shadowRadius;
		vec2 shadowMapSize;
	};

	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];

	void getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {

		directLight.color = directionalLight.color;
		directLight.direction = directionalLight.direction;
		directLight.visible = true;

	}

#endif


#if NUM_POINT_LIGHTS > 0

	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;

		int shadow;
		float shadowBias;
		float shadowRadius;
		vec2 shadowMapSize;
		float shadowCameraNear;
		float shadowCameraFar;
	};

	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];

	// directLight is an out parameter as having it as a return value caused compiler errors on some devices
	void getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {

		vec3 lVector = pointLight.position - geometry.position;
		directLight.direction = normalize( lVector );

		float lightDistance = length( lVector );

		directLight.color = pointLight.color;
		directLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );
		directLight.visible = ( directLight.color != vec3( 0.0 ) );

	}

#endif


#if NUM_SPOT_LIGHTS > 0

	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;

		int shadow;
		float shadowBias;
		float shadowRadius;
		vec2 shadowMapSize;
	};

	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];

	// directLight is an out parameter as having it as a return value caused compiler errors on some devices
	void getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {

		vec3 lVector = spotLight.position - geometry.position;
		directLight.direction = normalize( lVector );

		float lightDistance = length( lVector );
		float angleCos = dot( directLight.direction, spotLight.direction );

		if ( angleCos > spotLight.coneCos ) {

			float spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );

			directLight.color = spotLight.color;
			directLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );
			directLight.visible = true;

		} else {

			directLight.color = vec3( 0.0 );
			directLight.visible = false;

		}
	}

#endif


#if NUM_RECT_AREA_LIGHTS > 0

	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};

	// Pre-computed values of LinearTransformedCosine approximation of BRDF
	// BRDF approximation Texture is 64x64
	uniform sampler2D ltc_1; // RGBA Float
	uniform sampler2D ltc_2; // RGBA Float

	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];

#endif


#if NUM_HEMI_LIGHTS > 0

	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};

	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];

	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {

		float dotNL = dot( geometry.normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;

		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );

		#ifndef PHYSICALLY_CORRECT_LIGHTS

			irradiance *= PI;

		#endif

		return irradiance;

	}

#endif
`,envmap_physical_pars_fragment=`
#if defined( USE_ENVMAP ) && defined( PHYSICAL )

	vec3 getLightProbeIndirectIrradiance( /*const in SpecularLightProbe specularLightProbe,*/ const in GeometricContext geometry, const in int maxMIPLevel ) {

		vec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );

		#ifdef ENVMAP_TYPE_CUBE

			vec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );

			// TODO: replace with properly filtered cubemaps and access the irradiance LOD level, be it the last LOD level
			// of a specular cubemap, or just the default level of a specially created irradiance cubemap.

			#ifdef TEXTURE_LOD_EXT

				vec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );

			#else

				// force the bias high to get the last LOD level as it is the most blurred.
				vec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );

			#endif

			envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;

		#elif defined( ENVMAP_TYPE_CUBE_UV )

			vec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );
			vec4 envMapColor = textureCubeUV( envMap, queryVec, 1.0 );

		#else

			vec4 envMapColor = vec4( 0.0 );

		#endif

		return PI * envMapColor.rgb * envMapIntensity;

	}

	// taken from here: http://casual-effects.blogspot.ca/2011/08/plausible-environment-lighting-in-two.html
	float getSpecularMIPLevel( const in float blinnShininessExponent, const in int maxMIPLevel ) {

		//float envMapWidth = pow( 2.0, maxMIPLevelScalar );
		//float desiredMIPLevel = log2( envMapWidth * sqrt( 3.0 ) ) - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );

		float maxMIPLevelScalar = float( maxMIPLevel );
		float desiredMIPLevel = maxMIPLevelScalar + 0.79248 - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );

		// clamp to allowable LOD ranges.
		return clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );

	}

	vec3 getLightProbeIndirectRadiance( /*const in SpecularLightProbe specularLightProbe,*/ const in GeometricContext geometry, const in float blinnShininessExponent, const in int maxMIPLevel ) {

		#ifdef ENVMAP_MODE_REFLECTION

			vec3 reflectVec = reflect( -geometry.viewDir, geometry.normal );

		#else

			vec3 reflectVec = refract( -geometry.viewDir, geometry.normal, refractionRatio );

		#endif

		reflectVec = inverseTransformDirection( reflectVec, viewMatrix );

		float specularMIPLevel = getSpecularMIPLevel( blinnShininessExponent, maxMIPLevel );

		#ifdef ENVMAP_TYPE_CUBE

			vec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );

			#ifdef TEXTURE_LOD_EXT

				vec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );

			#else

				vec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );

			#endif

			envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;

		#elif defined( ENVMAP_TYPE_CUBE_UV )

			vec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );
			vec4 envMapColor = textureCubeUV( envMap, queryReflectVec, BlinnExponentToGGXRoughness(blinnShininessExponent ));

		#elif defined( ENVMAP_TYPE_EQUIREC )

			vec2 sampleUV;
			sampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
			sampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;

			#ifdef TEXTURE_LOD_EXT

				vec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );

			#else

				vec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );

			#endif

			envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;

		#elif defined( ENVMAP_TYPE_SPHERE )

			vec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );

			#ifdef TEXTURE_LOD_EXT

				vec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );

			#else

				vec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );

			#endif

			envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;

		#endif

		return envMapColor.rgb * envMapIntensity;

	}

#endif
`,lights_phong_fragment=`
BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;
`,lights_phong_pars_fragment=`
varying vec3 vViewPosition;

#ifndef FLAT_SHADED

	varying vec3 vNormal;

#endif


struct BlinnPhongMaterial {

	vec3	diffuseColor;
	vec3	specularColor;
	float	specularShininess;
	float	specularStrength;

};

void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {

	#ifdef TOON

		vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;

	#else

		float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
		vec3 irradiance = dotNL * directLight.color;

	#endif

	#ifndef PHYSICALLY_CORRECT_LIGHTS

		irradiance *= PI; // punctual light

	#endif

	reflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );

	reflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;

}

void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong

#define Material_LightProbeLOD( material )	(0)
`,lights_physical_fragment=`
PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.specularRoughness = clamp( roughnessFactor, 0.04, 1.0 );
#ifdef STANDARD
	material.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );
	material.clearCoat = saturate( clearCoat ); // Burley clearcoat model
	material.clearCoatRoughness = clamp( clearCoatRoughness, 0.04, 1.0 );
#endif
`,lights_physical_pars_fragment=`
struct PhysicalMaterial {

	vec3	diffuseColor;
	float	specularRoughness;
	vec3	specularColor;

	#ifndef STANDARD
		float clearCoat;
		float clearCoatRoughness;
	#endif

};

#define MAXIMUM_SPECULAR_COEFFICIENT 0.16
#define DEFAULT_SPECULAR_COEFFICIENT 0.04

// Clear coat directional hemishperical reflectance (this approximation should be improved)
float clearCoatDHRApprox( const in float roughness, const in float dotNL ) {

	return DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );

}

#if NUM_RECT_AREA_LIGHTS > 0

	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.specularRoughness;

		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight; // counterclockwise; light shines in local neg z direction
		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;

		vec2 uv = LTC_Uv( normal, viewDir, roughness );

		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );

		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);

		// LTC Fresnel Approximation by Stephen Hill
		// http://blog.selfshadow.com/publications/s2016-advances/s2016_ltc_fresnel.pdf
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );

		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );

		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );

	}

#endif

void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );

	vec3 irradiance = dotNL * directLight.color;

	#ifndef PHYSICALLY_CORRECT_LIGHTS

		irradiance *= PI; // punctual light

	#endif

	#ifndef STANDARD
		float clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );
	#else
		float clearCoatDHR = 0.0;
	#endif

	reflectedLight.directSpecular += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry, material.specularColor, material.specularRoughness );

	reflectedLight.directDiffuse += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );

	#ifndef STANDARD

		reflectedLight.directSpecular += irradiance * material.clearCoat * BRDF_Specular_GGX( directLight, geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );

	#endif

}

void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

	// Defer to the IndirectSpecular function to compute
	// the indirectDiffuse if energy preservation is enabled.
	#ifndef ENVMAP_TYPE_CUBE_UV

		reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );

	#endif

}

void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearCoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {

	#ifndef STANDARD
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		float dotNL = dotNV;
		float clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );
	#else
		float clearCoatDHR = 0.0;
	#endif

	float clearCoatInv = 1.0 - clearCoatDHR;

	// Both indirect specular and diffuse light accumulate here
	// if energy preservation enabled, and PMREM provided.
	#if defined( ENVMAP_TYPE_CUBE_UV )

		vec3 singleScattering = vec3( 0.0 );
		vec3 multiScattering = vec3( 0.0 );
		vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;

		BRDF_Specular_Multiscattering_Environment( geometry, material.specularColor, material.specularRoughness, singleScattering, multiScattering );

		// The multiscattering paper uses the below formula for calculating diffuse 
		// for dielectrics, but this is already handled when initially computing the 
		// specular and diffuse color, so we can just use the diffuseColor directly.
		//vec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );
		vec3 diffuse = material.diffuseColor;

		reflectedLight.indirectSpecular += clearCoatInv * radiance * singleScattering;
		reflectedLight.indirectDiffuse += multiScattering * cosineWeightedIrradiance;
		reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;

	#else

		reflectedLight.indirectSpecular += clearCoatInv * radiance * BRDF_Specular_GGX_Environment( geometry, material.specularColor, material.specularRoughness );

	#endif

	#ifndef STANDARD

		reflectedLight.indirectSpecular += clearCoatRadiance * material.clearCoat * BRDF_Specular_GGX_Environment( geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );

	#endif
}

#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical

#define Material_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.specularRoughness )
#define Material_ClearCoat_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.clearCoatRoughness )

// ref: https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {

	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );

}
`,lights_fragment_begin=`
/**
 * This is a template that can be used to light a material, it uses pluggable
 * RenderEquations (RE)for specific lighting scenarios.
 *
 * Instructions for use:
 * - Ensure that both RE_Direct, RE_IndirectDiffuse and RE_IndirectSpecular are defined
 * - If you have defined an RE_IndirectSpecular, you need to also provide a Material_LightProbeLOD. <---- ???
 * - Create a material parameter that is to be passed as the third parameter to your lighting functions.
 *
 * TODO:
 * - Add area light support.
 * - Add sphere light support.
 * - Add diffuse light probe (irradiance cubemap) support.
 */

GeometricContext geometry;

geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = normalize( vViewPosition );

IncidentLight directLight;

#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )

	PointLight pointLight;

	#pragma unroll_loop
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

		pointLight = pointLights[ i ];

		getPointDirectLightIrradiance( pointLight, geometry, directLight );

		#ifdef USE_SHADOWMAP
		directLight.color *= all( bvec2( pointLight.shadow, directLight.visible ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
		#endif

		RE_Direct( directLight, geometry, material, reflectedLight );

	}

#endif

#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )

	SpotLight spotLight;

	#pragma unroll_loop
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {

		spotLight = spotLights[ i ];

		getSpotDirectLightIrradiance( spotLight, geometry, directLight );

		#ifdef USE_SHADOWMAP
		directLight.color *= all( bvec2( spotLight.shadow, directLight.visible ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
		#endif

		RE_Direct( directLight, geometry, material, reflectedLight );

	}

#endif

#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )

	DirectionalLight directionalLight;

	#pragma unroll_loop
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

		directionalLight = directionalLights[ i ];

		getDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );

		#ifdef USE_SHADOWMAP
		directLight.color *= all( bvec2( directionalLight.shadow, directLight.visible ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif

		RE_Direct( directLight, geometry, material, reflectedLight );

	}

#endif

#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )

	RectAreaLight rectAreaLight;

	#pragma unroll_loop
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {

		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );

	}

#endif

#if defined( RE_IndirectDiffuse )

	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );

	#if ( NUM_HEMI_LIGHTS > 0 )

		#pragma unroll_loop
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {

			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );

		}

	#endif

#endif

#if defined( RE_IndirectSpecular )

	vec3 radiance = vec3( 0.0 );
	vec3 clearCoatRadiance = vec3( 0.0 );

#endif
`,lights_fragment_maps=`
#if defined( RE_IndirectDiffuse )

	#ifdef USE_LIGHTMAP

		vec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;

		#ifndef PHYSICALLY_CORRECT_LIGHTS

			lightMapIrradiance *= PI; // factor of PI should not be present; included here to prevent breakage

		#endif

		irradiance += lightMapIrradiance;

	#endif

	#if defined( USE_ENVMAP ) && defined( PHYSICAL ) && defined( ENVMAP_TYPE_CUBE_UV )

		irradiance += getLightProbeIndirectIrradiance( /*lightProbe,*/ geometry, maxMipLevel );

	#endif

#endif

#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )

	radiance += getLightProbeIndirectRadiance( /*specularLightProbe,*/ geometry, Material_BlinnShininessExponent( material ), maxMipLevel );

	#ifndef STANDARD
		clearCoatRadiance += getLightProbeIndirectRadiance( /*specularLightProbe,*/ geometry, Material_ClearCoat_BlinnShininessExponent( material ), maxMipLevel );
	#endif

#endif
`,lights_fragment_end=`
#if defined( RE_IndirectDiffuse )

	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );

#endif

#if defined( RE_IndirectSpecular )

	RE_IndirectSpecular( radiance, irradiance, clearCoatRadiance, geometry, material, reflectedLight );

#endif
`,logdepthbuf_fragment=`
#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )

	gl_FragDepthEXT = log2( vFragDepth ) * logDepthBufFC * 0.5;

#endif
`,logdepthbuf_pars_fragment=`
#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )

	uniform float logDepthBufFC;
	varying float vFragDepth;

#endif
`,logdepthbuf_pars_vertex=`
#ifdef USE_LOGDEPTHBUF

	#ifdef USE_LOGDEPTHBUF_EXT

		varying float vFragDepth;

	#else

		uniform float logDepthBufFC;

	#endif

#endif
`,logdepthbuf_vertex=`
#ifdef USE_LOGDEPTHBUF

	#ifdef USE_LOGDEPTHBUF_EXT

		vFragDepth = 1.0 + gl_Position.w;

	#else

		gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;

		gl_Position.z *= gl_Position.w;

	#endif

#endif
`,map_fragment=`
#ifdef USE_MAP

	vec4 texelColor = texture2D( map, vUv );

	texelColor = mapTexelToLinear( texelColor );
	diffuseColor *= texelColor;

#endif
`,map_pars_fragment=`
#ifdef USE_MAP

	uniform sampler2D map;

#endif
`,map_particle_fragment=`
#ifdef USE_MAP

	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	vec4 mapTexel = texture2D( map, uv );
	diffuseColor *= mapTexelToLinear( mapTexel );

#endif
`,map_particle_pars_fragment=`
#ifdef USE_MAP

	uniform mat3 uvTransform;
	uniform sampler2D map;

#endif
`,metalnessmap_fragment=`
float metalnessFactor = metalness;

#ifdef USE_METALNESSMAP

	vec4 texelMetalness = texture2D( metalnessMap, vUv );

	// reads channel B, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	metalnessFactor *= texelMetalness.b;

#endif
`,metalnessmap_pars_fragment=`
#ifdef USE_METALNESSMAP

	uniform sampler2D metalnessMap;

#endif
`,morphnormal_vertex=`
#ifdef USE_MORPHNORMALS

	objectNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];
	objectNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];
	objectNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];
	objectNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];

#endif
`,morphtarget_pars_vertex=`
#ifdef USE_MORPHTARGETS

	#ifndef USE_MORPHNORMALS

	uniform float morphTargetInfluences[ 8 ];

	#else

	uniform float morphTargetInfluences[ 4 ];

	#endif

#endif
`,morphtarget_vertex=`
#ifdef USE_MORPHTARGETS

	transformed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];
	transformed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];
	transformed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];
	transformed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];

	#ifndef USE_MORPHNORMALS

	transformed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];
	transformed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];
	transformed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];
	transformed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];

	#endif

#endif
`,normal_fragment_begin=`
#ifdef FLAT_SHADED

	// Workaround for Adreno/Nexus5 not able able to do dFdx( vViewPosition ) ...

	vec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );
	vec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );
	vec3 normal = normalize( cross( fdx, fdy ) );

#else

	vec3 normal = normalize( vNormal );

	#ifdef DOUBLE_SIDED

		normal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );

	#endif

#endif
`,normal_fragment_maps=`
#ifdef USE_NORMALMAP

	#ifdef OBJECTSPACE_NORMALMAP

		normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals

		#ifdef FLIP_SIDED

			normal = - normal;

		#endif

		#ifdef DOUBLE_SIDED

			normal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );

		#endif

		normal = normalize( normalMatrix * normal );

	#else // tangent-space normal map

		normal = perturbNormal2Arb( -vViewPosition, normal );

	#endif

#elif defined( USE_BUMPMAP )

	normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );

#endif
`,normalmap_pars_fragment=`
#ifdef USE_NORMALMAP

	uniform sampler2D normalMap;
	uniform vec2 normalScale;

	#ifdef OBJECTSPACE_NORMALMAP

		uniform mat3 normalMatrix;

	#else

		// Per-Pixel Tangent Space Normal Mapping
		// http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html

		vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {

			// Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988

			vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );
			vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );
			vec2 st0 = dFdx( vUv.st );
			vec2 st1 = dFdy( vUv.st );

			float scale = sign( st1.t * st0.s - st0.t * st1.s ); // we do not care about the magnitude

			vec3 S = normalize( ( q0 * st1.t - q1 * st0.t ) * scale );
			vec3 T = normalize( ( - q0 * st1.s + q1 * st0.s ) * scale );
			vec3 N = normalize( surf_norm );
			mat3 tsn = mat3( S, T, N );

			vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;

			mapN.xy *= normalScale;
			mapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );

			return normalize( tsn * mapN );

		}

	#endif

#endif
`,packing=`
vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}

vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}

const float PackUpscale = 256. / 255.; // fraction -> 0..1 (including 1)
const float UnpackDownscale = 255. / 256.; // 0..1 -> fraction (excluding 1)

const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );

const float ShiftRight8 = 1. / 256.;

vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8; // tidy overflow
	return r * PackUpscale;
}

float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}

// NOTE: viewZ/eyeZ is < 0 when in front of the camera per OpenGL conventions

float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}

float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return (( near + viewZ ) * far ) / (( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}
`,premultiplied_alpha_fragment=`
#ifdef PREMULTIPLIED_ALPHA

	// Get get normal blending with premultipled, use with CustomBlending, OneFactor, OneMinusSrcAlphaFactor, AddEquation.
	gl_FragColor.rgb *= gl_FragColor.a;

#endif
`,project_vertex=`
vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );

gl_Position = projectionMatrix * mvPosition;
`,dithering_fragment=`
#if defined( DITHERING )

  gl_FragColor.rgb = dithering( gl_FragColor.rgb );

#endif
`,dithering_pars_fragment=`
#if defined( DITHERING )

	// based on https://www.shadertoy.com/view/MslGR8
	vec3 dithering( vec3 color ) {
		//Calculate grid position
		float grid_position = rand( gl_FragCoord.xy );

		//Shift the individual colors differently, thus making it even harder to see the dithering pattern
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );

		//modify shift acording to grid position.
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );

		//shift the color by dither_shift
		return color + dither_shift_RGB;
	}

#endif
`,roughnessmap_fragment=`
float roughnessFactor = roughness;

#ifdef USE_ROUGHNESSMAP

	vec4 texelRoughness = texture2D( roughnessMap, vUv );

	// reads channel G, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	roughnessFactor *= texelRoughness.g;

#endif
`,roughnessmap_pars_fragment=`
#ifdef USE_ROUGHNESSMAP

	uniform sampler2D roughnessMap;

#endif
`,shadowmap_pars_fragment=`
#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHTS > 0

		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHTS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];

	#endif

	#if NUM_SPOT_LIGHTS > 0

		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHTS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];

	#endif

	#if NUM_POINT_LIGHTS > 0

		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHTS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): create uniforms for area light shadows

	#endif
	*/

	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {

		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );

	}

	float texture2DShadowLerp( sampler2D depths, vec2 size, vec2 uv, float compare ) {

		const vec2 offset = vec2( 0.0, 1.0 );

		vec2 texelSize = vec2( 1.0 ) / size;
		vec2 centroidUV = floor( uv * size + 0.5 ) / size;

		float lb = texture2DCompare( depths, centroidUV + texelSize * offset.xx, compare );
		float lt = texture2DCompare( depths, centroidUV + texelSize * offset.xy, compare );
		float rb = texture2DCompare( depths, centroidUV + texelSize * offset.yx, compare );
		float rt = texture2DCompare( depths, centroidUV + texelSize * offset.yy, compare );

		vec2 f = fract( uv * size + 0.5 );

		float a = mix( lb, lt, f.y );
		float b = mix( rb, rt, f.y );
		float c = mix( a, b, f.x );

		return c;

	}

	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {

		float shadow = 1.0;

		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;

		// if ( something && something ) breaks ATI OpenGL shader compiler
		// if ( all( something, something ) ) using this instead

		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );
		bool inFrustum = all( inFrustumVec );

		bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );

		bool frustumTest = all( frustumTestVec );

		if ( frustumTest ) {

		#if defined( SHADOWMAP_TYPE_PCF )

			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;

			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;

			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 9.0 );

		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )

			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;

			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;

			shadow = (
				texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy, shadowCoord.z ) +
				texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 9.0 );

		#else // no percentage-closer filtering:

			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );

		#endif

		}

		return shadow;

	}

	// cubeToUV() maps a 3D direction vector suitable for cube texture mapping to a 2D
	// vector suitable for 2D texture mapping. This code uses the following layout for the
	// 2D texture:
	//
	// xzXZ
	//  y Y
	//
	// Y - Positive y direction
	// y - Negative y direction
	// X - Positive x direction
	// x - Negative x direction
	// Z - Positive z direction
	// z - Negative z direction
	//
	// Source and test bed:
	// https://gist.github.com/tschw/da10c43c467ce8afd0c4

	vec2 cubeToUV( vec3 v, float texelSizeY ) {

		// Number of texels to avoid at the edge of each square

		vec3 absV = abs( v );

		// Intersect unit cube

		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;

		// Apply scale to avoid seams

		// two texels less per square (one texel will do for NEAREST)
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );

		// Unwrap

		// space: -1 ... 1 range for each square
		//
		// #X##		dim    := ( 4 , 2 )
		//  # #		center := ( 1 , 1 )

		vec2 planar = v.xy;

		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;

		if ( absV.z >= almostOne ) {

			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;

		} else if ( absV.x >= almostOne ) {

			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;

		} else if ( absV.y >= almostOne ) {

			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;

		}

		// Transform to UV space

		// scale := 0.5 / dim
		// translate := ( center + 0.5 ) / dim
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );

	}

	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {

		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );

		// for point lights, the uniform @vShadowCoord is re-purposed to hold
		// the vector from the light to the world-space position of the fragment.
		vec3 lightToPosition = shadowCoord.xyz;

		// dp = normalized distance from light to fragment position
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear ); // need to clamp?
		dp += shadowBias;

		// bd3D = base direction 3D
		vec3 bd3D = normalize( lightToPosition );

		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT )

			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;

			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );

		#else // no percentage-closer filtering

			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );

		#endif

	}

#endif
`,shadowmap_pars_vertex=`
#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHTS > 0

		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHTS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];

	#endif

	#if NUM_SPOT_LIGHTS > 0

		uniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHTS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];

	#endif

	#if NUM_POINT_LIGHTS > 0

		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHTS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): uniforms for area light shadows

	#endif
	*/

#endif
`,shadowmap_vertex=`
#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHTS > 0

	#pragma unroll_loop
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;

	}

	#endif

	#if NUM_SPOT_LIGHTS > 0

	#pragma unroll_loop
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {

		vSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;

	}

	#endif

	#if NUM_POINT_LIGHTS > 0

	#pragma unroll_loop
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;

	}

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): update vAreaShadowCoord with area light info

	#endif
	*/

#endif
`,shadowmask_pars_fragment=`
float getShadowMask() {

	float shadow = 1.0;

	#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHTS > 0

	DirectionalLight directionalLight;

	#pragma unroll_loop
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

		directionalLight = directionalLights[ i ];
		shadow *= bool( directionalLight.shadow ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;

	}

	#endif

	#if NUM_SPOT_LIGHTS > 0

	SpotLight spotLight;

	#pragma unroll_loop
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {

		spotLight = spotLights[ i ];
		shadow *= bool( spotLight.shadow ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;

	}

	#endif

	#if NUM_POINT_LIGHTS > 0

	PointLight pointLight;

	#pragma unroll_loop
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

		pointLight = pointLights[ i ];
		shadow *= bool( pointLight.shadow ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;

	}

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): update shadow for Area light

	#endif
	*/

	#endif

	return shadow;

}
`,skinbase_vertex=`
#ifdef USE_SKINNING

	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );

#endif
`,skinning_pars_vertex=`
#ifdef USE_SKINNING

	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;

	#ifdef BONE_TEXTURE

		uniform sampler2D boneTexture;
		uniform int boneTextureSize;

		mat4 getBoneMatrix( const in float i ) {

			float j = i * 4.0;
			float x = mod( j, float( boneTextureSize ) );
			float y = floor( j / float( boneTextureSize ) );

			float dx = 1.0 / float( boneTextureSize );
			float dy = 1.0 / float( boneTextureSize );

			y = dy * ( y + 0.5 );

			vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
			vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
			vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
			vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );

			mat4 bone = mat4( v1, v2, v3, v4 );

			return bone;

		}

	#else

		uniform mat4 boneMatrices[ MAX_BONES ];

		mat4 getBoneMatrix( const in float i ) {

			mat4 bone = boneMatrices[ int(i) ];
			return bone;

		}

	#endif

#endif
`,skinning_vertex=`
#ifdef USE_SKINNING

	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );

	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;

	transformed = ( bindMatrixInverse * skinned ).xyz;

#endif
`,skinnormal_vertex=`
#ifdef USE_SKINNING

	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;

	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;

#endif
`,specularmap_fragment=`
float specularStrength;

#ifdef USE_SPECULARMAP

	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;

#else

	specularStrength = 1.0;

#endif
`,specularmap_pars_fragment=`
#ifdef USE_SPECULARMAP

	uniform sampler2D specularMap;

#endif
`,tonemapping_fragment=`
#if defined( TONE_MAPPING )

  gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );

#endif
`,tonemapping_pars_fragment=`
#ifndef saturate
	#define saturate(a) clamp( a, 0.0, 1.0 )
#endif

uniform float toneMappingExposure;
uniform float toneMappingWhitePoint;

// exposure only
vec3 LinearToneMapping( vec3 color ) {

	return toneMappingExposure * color;

}

// source: https://www.cs.utah.edu/~reinhard/cdrom/
vec3 ReinhardToneMapping( vec3 color ) {

	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );

}

// source: http://filmicgames.com/archives/75
#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )
vec3 Uncharted2ToneMapping( vec3 color ) {

	// John Hable's filmic operator from Uncharted 2 video game
	color *= toneMappingExposure;
	return saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );

}

// source: http://filmicgames.com/archives/75
vec3 OptimizedCineonToneMapping( vec3 color ) {

	// optimized filmic operator by Jim Hejl and Richard Burgess-Dawson
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );

}

// source: https://knarkowicz.wordpress.com/2016/01/06/aces-filmic-tone-mapping-curve/
vec3 ACESFilmicToneMapping( vec3 color ) {

	color *= toneMappingExposure;
	return saturate( ( color * ( 2.51 * color + 0.03 ) ) / ( color * ( 2.43 * color + 0.59 ) + 0.14 ) );

}
`,uv_pars_fragment=`
#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )

	varying vec2 vUv;

#endif
`,uv_pars_vertex=`
#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )

	varying vec2 vUv;
	uniform mat3 uvTransform;

#endif
`,uv_vertex=`
#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )

	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

#endif
`,uv2_pars_fragment=`
#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )

	varying vec2 vUv2;

#endif
`,uv2_pars_vertex=`
#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )

	attribute vec2 uv2;
	varying vec2 vUv2;

#endif
`,uv2_vertex=`
#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )

	vUv2 = uv2;

#endif
`,worldpos_vertex=`
#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )

	vec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );

#endif
`,background_frag=`
uniform sampler2D t2D;

varying vec2 vUv;

void main() {

	vec4 texColor = texture2D( t2D, vUv );

	gl_FragColor = mapTexelToLinear( texColor );

	#include <tonemapping_fragment>
	#include <encodings_fragment>

}
`,background_vert=`
varying vec2 vUv;
uniform mat3 uvTransform;

void main() {

	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

	gl_Position = vec4( position.xy, 1.0, 1.0 );

}
`,cube_frag=`
uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;

varying vec3 vWorldDirection;

void main() {

	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );

	gl_FragColor = mapTexelToLinear( texColor );
	gl_FragColor.a *= opacity;

	#include <tonemapping_fragment>
	#include <encodings_fragment>

}
`,cube_vert=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`,depth_frag=`
#if DEPTH_PACKING == 3200

	uniform float opacity;

#endif

#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( 1.0 );

	#if DEPTH_PACKING == 3200

		diffuseColor.a = opacity;

	#endif

	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>

	#include <logdepthbuf_fragment>

	#if DEPTH_PACKING == 3200

		gl_FragColor = vec4( vec3( 1.0 - gl_FragCoord.z ), opacity );

	#elif DEPTH_PACKING == 3201

		gl_FragColor = packDepthToRGBA( gl_FragCoord.z );

	#endif

}
`,depth_vert=`
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>

	#include <skinbase_vertex>

	#ifdef USE_DISPLACEMENTMAP

		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

}
`,distanceRGBA_frag=`
#define DISTANCE

uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;

#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <clipping_planes_pars_fragment>

void main () {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( 1.0 );

	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>

	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist ); // clamp to [ 0, 1 ]

	gl_FragColor = packDepthToRGBA( dist );

}
`,distanceRGBA_vert=`
#define DISTANCE

varying vec3 vWorldPosition;

#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>

	#include <skinbase_vertex>

	#ifdef USE_DISPLACEMENTMAP

		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>

	vWorldPosition = worldPosition.xyz;

}
`,equirect_frag=`
uniform sampler2D tEquirect;

varying vec3 vWorldDirection;

#include <common>

void main() {

	vec3 direction = normalize( vWorldDirection );

	vec2 sampleUV;

	sampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;

	sampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;

	vec4 texColor = texture2D( tEquirect, sampleUV );

	gl_FragColor = mapTexelToLinear( texColor );

	#include <tonemapping_fragment>
	#include <encodings_fragment>

}
`,equirect_vert=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

}
`,linedashed_frag=`
uniform vec3 diffuse;
uniform float opacity;

uniform float dashSize;
uniform float totalSize;

varying float vLineDistance;

#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	if ( mod( vLineDistance, totalSize ) > dashSize ) {

		discard;

	}

	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <logdepthbuf_fragment>
	#include <color_fragment>

	outgoingLight = diffuseColor.rgb; // simple shader

	gl_FragColor = vec4( outgoingLight, diffuseColor.a );

	#include <premultiplied_alpha_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>

}
`,linedashed_vert=`
uniform float scale;
attribute float lineDistance;

varying float vLineDistance;

#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <color_vertex>

	vLineDistance = scale * lineDistance;

	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	gl_Position = projectionMatrix * mvPosition;

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

}
`,meshbasic_frag=`
uniform vec3 diffuse;
uniform float opacity;

#ifndef FLAT_SHADED

	varying vec3 vNormal;

#endif

#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );

	// accumulation (baked indirect lighting only)
	#ifdef USE_LIGHTMAP

		reflectedLight.indirectDiffuse += texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;

	#else

		reflectedLight.indirectDiffuse += vec3( 1.0 );

	#endif

	// modulation
	#include <aomap_fragment>

	reflectedLight.indirectDiffuse *= diffuseColor.rgb;

	vec3 outgoingLight = reflectedLight.indirectDiffuse;

	#include <envmap_fragment>

	gl_FragColor = vec4( outgoingLight, diffuseColor.a );

	#include <premultiplied_alpha_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>

}
`,meshbasic_vert=`
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <skinbase_vertex>

	#ifdef USE_ENVMAP

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>

	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>

}
`,meshlambert_frag=`
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

varying vec3 vLightFront;
varying vec3 vIndirectFront;

#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif


#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <fog_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <emissivemap_fragment>

	// accumulation
	reflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );

	#ifdef DOUBLE_SIDED

		reflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;

	#else

		reflectedLight.indirectDiffuse += vIndirectFront;

	#endif

	#include <lightmap_fragment>

	reflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );

	#ifdef DOUBLE_SIDED

		reflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;

	#else

		reflectedLight.directDiffuse = vLightFront;

	#endif

	reflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;

	#include <envmap_fragment>

	gl_FragColor = vec4( outgoingLight, diffuseColor.a );

	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}
`,meshlambert_vert=`
#define LAMBERT

varying vec3 vLightFront;
varying vec3 vIndirectFront;

#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif

#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <bsdfs>
#include <lights_pars_begin>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <lights_lambert_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}
`,meshmatcap_frag=`
#define MATCAP

uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;

varying vec3 vViewPosition;

#ifndef FLAT_SHADED

	varying vec3 vNormal;

#endif

#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>

#include <fog_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>

	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks

	#ifdef USE_MATCAP

		vec4 matcapColor = texture2D( matcap, uv );
		matcapColor = matcapTexelToLinear( matcapColor );

	#else

		vec4 matcapColor = vec4( 1.0 );

	#endif

	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;

	gl_FragColor = vec4( outgoingLight, diffuseColor.a );

	#include <premultiplied_alpha_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>

}
`,meshmatcap_vert=`
#define MATCAP

varying vec3 vViewPosition;

#ifndef FLAT_SHADED

	varying vec3 vNormal;

#endif

#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>

#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>

	#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED

		vNormal = normalize( transformedNormal );

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

	vViewPosition = - mvPosition.xyz;

}
`,meshphong_frag=`
#define PHONG

uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;

	#include <envmap_fragment>

	gl_FragColor = vec4( outgoingLight, diffuseColor.a );

	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`,meshphong_vert=`
#define PHONG

varying vec3 vViewPosition;

#ifndef FLAT_SHADED

	varying vec3 vNormal;

#endif

#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>

#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED

	vNormal = normalize( transformedNormal );

#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,meshphysical_frag=`
#define PHYSICAL

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;

#ifndef STANDARD
	uniform float clearCoat;
	uniform float clearCoatRoughness;
#endif

varying vec3 vViewPosition;

#ifndef FLAT_SHADED

	varying vec3 vNormal;

#endif

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <cube_uv_reflection_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <lights_physical_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;

	gl_FragColor = vec4( outgoingLight, diffuseColor.a );

	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`,meshphysical_vert=`
#define PHYSICAL

varying vec3 vViewPosition;

#ifndef FLAT_SHADED

	varying vec3 vNormal;

#endif

#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>

#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED

	vNormal = normalize( transformedNormal );

#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,normal_frag=`
#define NORMAL

uniform float opacity;

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || ( defined( USE_NORMALMAP ) && ! defined( OBJECTSPACE_NORMALMAP ) )

	varying vec3 vViewPosition;

#endif

#ifndef FLAT_SHADED

	varying vec3 vNormal;

#endif

#include <packing>
#include <uv_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>

void main() {

	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>

	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );

}
`,normal_vert=`
#define NORMAL

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || ( defined( USE_NORMALMAP ) && ! defined( OBJECTSPACE_NORMALMAP ) )

	varying vec3 vViewPosition;

#endif

#ifndef FLAT_SHADED

	varying vec3 vNormal;

#endif

#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>

void main() {

	#include <uv_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>

#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED

	vNormal = normalize( transformedNormal );

#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || ( defined( USE_NORMALMAP ) && ! defined( OBJECTSPACE_NORMALMAP ) )

	vViewPosition = - mvPosition.xyz;

#endif

}
`,points_frag=`
uniform vec3 diffuse;
uniform float opacity;

#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>

	outgoingLight = diffuseColor.rgb;

	gl_FragColor = vec4( outgoingLight, diffuseColor.a );

	#include <premultiplied_alpha_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>

}
`,points_vert=`
uniform float size;
uniform float scale;

#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <color_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>

	gl_PointSize = size;

	#ifdef USE_SIZEATTENUATION

		bool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );

		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );

	#endif

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>

}
`,shadow_frag=`
uniform vec3 color;
uniform float opacity;

#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>

void main() {

	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );

	#include <fog_fragment>

}
`,shadow_vert=`
#include <fog_pars_vertex>
#include <shadowmap_pars_vertex>

void main() {

	#include <begin_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,sprite_frag=`
uniform vec3 diffuse;
uniform float opacity;

#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphatest_fragment>

	outgoingLight = diffuseColor.rgb;

	gl_FragColor = vec4( outgoingLight, diffuseColor.a );

	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>

}
`,sprite_vert=`
uniform float rotation;
uniform vec2 center;

#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>

	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );

	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

	#ifndef USE_SIZEATTENUATION

		bool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );

		if ( isPerspective ) scale *= - mvPosition.z;

	#endif

	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;

	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;

	mvPosition.xy += rotatedPosition;

	gl_Position = projectionMatrix * mvPosition;

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

}
`,ShaderChunk={alphamap_fragment:"\n#ifdef USE_ALPHAMAP\n\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n\n#endif\n",alphamap_pars_fragment:alphamap_pars_fragment,alphatest_fragment:alphatest_fragment,aomap_fragment:aomap_fragment,aomap_pars_fragment:aomap_pars_fragment,begin_vertex:begin_vertex,beginnormal_vertex:beginnormal_vertex,bsdfs:bsdfs,bumpmap_pars_fragment:bumpmap_pars_fragment,clipping_planes_fragment:clipping_planes_fragment,clipping_planes_pars_fragment:clipping_planes_pars_fragment,clipping_planes_pars_vertex:clipping_planes_pars_vertex,clipping_planes_vertex:clipping_planes_vertex,color_fragment:color_fragment,color_pars_fragment:color_pars_fragment,color_pars_vertex:color_pars_vertex,color_vertex:color_vertex,common:common,cube_uv_reflection_fragment:cube_uv_reflection_fragment,defaultnormal_vertex:defaultnormal_vertex,displacementmap_pars_vertex:displacementmap_pars_vertex,displacementmap_vertex:displacementmap_vertex,emissivemap_fragment:emissivemap_fragment,emissivemap_pars_fragment:emissivemap_pars_fragment,encodings_fragment:encodings_fragment,encodings_pars_fragment:encodings_pars_fragment,envmap_fragment:envmap_fragment,envmap_pars_fragment:envmap_pars_fragment,envmap_pars_vertex:envmap_pars_vertex,envmap_physical_pars_fragment:envmap_physical_pars_fragment,envmap_vertex:envmap_vertex,fog_vertex:fog_vertex,fog_pars_vertex:fog_pars_vertex,fog_fragment:fog_fragment,fog_pars_fragment:fog_pars_fragment,gradientmap_pars_fragment:gradientmap_pars_fragment,lightmap_fragment:lightmap_fragment,lightmap_pars_fragment:lightmap_pars_fragment,lights_lambert_vertex:lights_lambert_vertex,lights_pars_begin:lights_pars_begin,lights_phong_fragment:lights_phong_fragment,lights_phong_pars_fragment:lights_phong_pars_fragment,lights_physical_fragment:lights_physical_fragment,lights_physical_pars_fragment:lights_physical_pars_fragment,lights_fragment_begin:lights_fragment_begin,lights_fragment_maps:lights_fragment_maps,lights_fragment_end:lights_fragment_end,logdepthbuf_fragment:logdepthbuf_fragment,logdepthbuf_pars_fragment:logdepthbuf_pars_fragment,logdepthbuf_pars_vertex:logdepthbuf_pars_vertex,logdepthbuf_vertex:logdepthbuf_vertex,map_fragment:map_fragment,map_pars_fragment:map_pars_fragment,map_particle_fragment:map_particle_fragment,map_particle_pars_fragment:map_particle_pars_fragment,metalnessmap_fragment:metalnessmap_fragment,metalnessmap_pars_fragment:metalnessmap_pars_fragment,morphnormal_vertex:morphnormal_vertex,morphtarget_pars_vertex:morphtarget_pars_vertex,morphtarget_vertex:morphtarget_vertex,normal_fragment_begin:normal_fragment_begin,normal_fragment_maps:normal_fragment_maps,normalmap_pars_fragment:normalmap_pars_fragment,packing:packing,premultiplied_alpha_fragment:premultiplied_alpha_fragment,project_vertex:project_vertex,dithering_fragment:dithering_fragment,dithering_pars_fragment:dithering_pars_fragment,roughnessmap_fragment:roughnessmap_fragment,roughnessmap_pars_fragment:roughnessmap_pars_fragment,shadowmap_pars_fragment:shadowmap_pars_fragment,shadowmap_pars_vertex:shadowmap_pars_vertex,shadowmap_vertex:shadowmap_vertex,shadowmask_pars_fragment:shadowmask_pars_fragment,skinbase_vertex:skinbase_vertex,skinning_pars_vertex:skinning_pars_vertex,skinning_vertex:skinning_vertex,skinnormal_vertex:skinnormal_vertex,specularmap_fragment:specularmap_fragment,specularmap_pars_fragment:specularmap_pars_fragment,tonemapping_fragment:tonemapping_fragment,tonemapping_pars_fragment:tonemapping_pars_fragment,uv_pars_fragment:uv_pars_fragment,uv_pars_vertex:uv_pars_vertex,uv_vertex:uv_vertex,uv2_pars_fragment:uv2_pars_fragment,uv2_pars_vertex:uv2_pars_vertex,uv2_vertex:uv2_vertex,worldpos_vertex:worldpos_vertex,background_frag:background_frag,background_vert:background_vert,cube_frag:cube_frag,cube_vert:cube_vert,depth_frag:depth_frag,depth_vert:depth_vert,distanceRGBA_frag:distanceRGBA_frag,distanceRGBA_vert:distanceRGBA_vert,equirect_frag:equirect_frag,equirect_vert:equirect_vert,linedashed_frag:linedashed_frag,linedashed_vert:linedashed_vert,meshbasic_frag:meshbasic_frag,meshbasic_vert:meshbasic_vert,meshlambert_frag:meshlambert_frag,meshlambert_vert:meshlambert_vert,meshmatcap_frag:meshmatcap_frag,meshmatcap_vert:meshmatcap_vert,meshphong_frag:meshphong_frag,meshphong_vert:meshphong_vert,meshphysical_frag:meshphysical_frag,meshphysical_vert:meshphysical_vert,normal_frag:normal_frag,normal_vert:normal_vert,points_frag:points_frag,points_vert:points_vert,shadow_frag:shadow_frag,shadow_vert:shadow_vert,sprite_frag:sprite_frag,sprite_vert:sprite_vert};function cloneUniforms(e){var t={};for(var r in e)for(var a in t[r]={},e[r]){var n=e[r][a];t[r][a]=n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture)?n.clone():Array.isArray(n)?n.slice():n}return t}function mergeUniforms(e){for(var t={},r=0,a;r<e.length;r++)for(var n in a=cloneUniforms(e[r]),a)t[n]=a[n];return t}var UniformsLib={common:{diffuse:{value:new Color(15658734)},opacity:{value:1},map:{value:null},uvTransform:{value:new Matrix3},alphaMap:{value:null}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},refractionRatio:{value:.98},maxMipLevel:{value:0}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new Vector2(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Color(16777215)}},lights:{ambientLightColor:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{},shadow:{},shadowBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{},shadow:{},shadowBias:{},shadowRadius:{},shadowMapSize:{}}},spotShadowMap:{value:[]},spotShadowMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{},shadow:{},shadowBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}}},points:{diffuse:{value:new Color(15658734)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},uvTransform:{value:new Matrix3}},sprite:{diffuse:{value:new Color(15658734)},opacity:{value:1},center:{value:new Vector2(.5,.5)},rotation:{value:0},map:{value:null},uvTransform:{value:new Matrix3}}},ShaderLib={basic:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.specularmap,UniformsLib.envmap,UniformsLib.aomap,UniformsLib.lightmap,UniformsLib.fog]),vertexShader:ShaderChunk.meshbasic_vert,fragmentShader:ShaderChunk.meshbasic_frag},lambert:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.specularmap,UniformsLib.envmap,UniformsLib.aomap,UniformsLib.lightmap,UniformsLib.emissivemap,UniformsLib.fog,UniformsLib.lights,{emissive:{value:new Color(0)}}]),vertexShader:ShaderChunk.meshlambert_vert,fragmentShader:ShaderChunk.meshlambert_frag},phong:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.specularmap,UniformsLib.envmap,UniformsLib.aomap,UniformsLib.lightmap,UniformsLib.emissivemap,UniformsLib.bumpmap,UniformsLib.normalmap,UniformsLib.displacementmap,UniformsLib.gradientmap,UniformsLib.fog,UniformsLib.lights,{emissive:{value:new Color(0)},specular:{value:new Color(1118481)},shininess:{value:30}}]),vertexShader:ShaderChunk.meshphong_vert,fragmentShader:ShaderChunk.meshphong_frag},standard:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.envmap,UniformsLib.aomap,UniformsLib.lightmap,UniformsLib.emissivemap,UniformsLib.bumpmap,UniformsLib.normalmap,UniformsLib.displacementmap,UniformsLib.roughnessmap,UniformsLib.metalnessmap,UniformsLib.fog,UniformsLib.lights,{emissive:{value:new Color(0)},roughness:{value:.5},metalness:{value:.5},envMapIntensity:{value:1}}]),vertexShader:ShaderChunk.meshphysical_vert,fragmentShader:ShaderChunk.meshphysical_frag},matcap:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.bumpmap,UniformsLib.normalmap,UniformsLib.displacementmap,UniformsLib.fog,{matcap:{value:null}}]),vertexShader:ShaderChunk.meshmatcap_vert,fragmentShader:ShaderChunk.meshmatcap_frag},points:{uniforms:mergeUniforms([UniformsLib.points,UniformsLib.fog]),vertexShader:ShaderChunk.points_vert,fragmentShader:ShaderChunk.points_frag},dashed:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ShaderChunk.linedashed_vert,fragmentShader:ShaderChunk.linedashed_frag},depth:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.displacementmap]),vertexShader:ShaderChunk.depth_vert,fragmentShader:ShaderChunk.depth_frag},normal:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.bumpmap,UniformsLib.normalmap,UniformsLib.displacementmap,{opacity:{value:1}}]),vertexShader:ShaderChunk.normal_vert,fragmentShader:ShaderChunk.normal_frag},sprite:{uniforms:mergeUniforms([UniformsLib.sprite,UniformsLib.fog]),vertexShader:ShaderChunk.sprite_vert,fragmentShader:ShaderChunk.sprite_frag},background:{uniforms:{uvTransform:{value:new Matrix3},t2D:{value:null}},vertexShader:ShaderChunk.background_vert,fragmentShader:ShaderChunk.background_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ShaderChunk.cube_vert,fragmentShader:ShaderChunk.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ShaderChunk.equirect_vert,fragmentShader:ShaderChunk.equirect_frag},distanceRGBA:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.displacementmap,{referencePosition:{value:new Vector3},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ShaderChunk.distanceRGBA_vert,fragmentShader:ShaderChunk.distanceRGBA_frag},shadow:{uniforms:mergeUniforms([UniformsLib.lights,UniformsLib.fog,{color:{value:new Color(0)},opacity:{value:1}}]),vertexShader:ShaderChunk.shadow_vert,fragmentShader:ShaderChunk.shadow_frag}};ShaderLib.physical={uniforms:mergeUniforms([ShaderLib.standard.uniforms,{clearCoat:{value:0},clearCoatRoughness:{value:0}}]),vertexShader:ShaderChunk.meshphysical_vert,fragmentShader:ShaderChunk.meshphysical_frag};function WebGLAnimation(){function e(n,i){!1===r||(a(n,i),t.requestAnimationFrame(e))}var t=null,r=!1,a=null;return{start:function(){!0===r||null===a||(t.requestAnimationFrame(e),r=!0)},stop:function(){r=!1},setAnimationLoop:function(e){a=e},setContext:function(e){t=e}}}function WebGLAttributes(e){function t(t,r){var a=t.array,n=t.dynamic?e.DYNAMIC_DRAW:e.STATIC_DRAW,i=e.createBuffer();e.bindBuffer(r,i),e.bufferData(r,a,n),t.onUploadCallback();var o=e.FLOAT;return a instanceof Float32Array?o=e.FLOAT:a instanceof Float64Array?console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array."):a instanceof Uint16Array?o=e.UNSIGNED_SHORT:a instanceof Int16Array?o=e.SHORT:a instanceof Uint32Array?o=e.UNSIGNED_INT:a instanceof Int32Array?o=e.INT:a instanceof Int8Array?o=e.BYTE:a instanceof Uint8Array&&(o=e.UNSIGNED_BYTE),{buffer:i,type:o,bytesPerElement:a.BYTES_PER_ELEMENT,version:t.version}}function r(t,r,a){var n=r.array,i=r.updateRange;e.bindBuffer(a,t),!1===r.dynamic?e.bufferData(a,n,e.STATIC_DRAW):-1===i.count?e.bufferSubData(a,0,n):0===i.count?console.error("THREE.WebGLObjects.updateBuffer: dynamic THREE.BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually."):(e.bufferSubData(a,i.offset*n.BYTES_PER_ELEMENT,n.subarray(i.offset,i.offset+i.count)),i.count=-1)}var a=new WeakMap;return{get:function(e){return e.isInterleavedBufferAttribute&&(e=e.data),a.get(e)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);var r=a.get(t);r&&(e.deleteBuffer(r.buffer),a.delete(t))},update:function(e,n){e.isInterleavedBufferAttribute&&(e=e.data);var i=a.get(e);i===void 0?a.set(e,t(e,n)):i.version<e.version&&(r(i.buffer,e,n),i.version=e.version)}}}function PlaneGeometry(e,t,r,a){Geometry.call(this),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:r,heightSegments:a},this.fromBufferGeometry(new PlaneBufferGeometry(e,t,r,a)),this.mergeVertices()}PlaneGeometry.prototype=Object.create(Geometry.prototype),PlaneGeometry.prototype.constructor=PlaneGeometry;function PlaneBufferGeometry(e,t,r,n){var i=Math.floor;BufferGeometry.call(this),this.type="PlaneBufferGeometry",this.parameters={width:e,height:t,widthSegments:r,heightSegments:n},e=e||1,t=t||1;var o=e/2,s=t/2,l=i(r)||1,p=i(n)||1,m=l+1,u=e/l,g=t/p,h=[],f=[],_=[],E=[],v,T;for(T=0;T<p+1;T++){var M=T*g-s;for(v=0;v<m;v++){var y=v*u-o;f.push(y,-M,0),_.push(0,0,1),E.push(v/l),E.push(1-T/p)}}for(T=0;T<p;T++)for(v=0;v<l;v++){var x=v+m*T,a=v+m*(T+1),b=v+1+m*(T+1),c=v+1+m*T;h.push(x,a,c),h.push(a,b,c)}this.setIndex(h),this.addAttribute("position",new Float32BufferAttribute(f,3)),this.addAttribute("normal",new Float32BufferAttribute(_,3)),this.addAttribute("uv",new Float32BufferAttribute(E,2))}PlaneBufferGeometry.prototype=Object.create(BufferGeometry.prototype),PlaneBufferGeometry.prototype.constructor=PlaneBufferGeometry;function ShaderMaterial(e){Material.call(this),this.type="ShaderMaterial",this.defines={},this.uniforms={},this.vertexShader="void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",this.fragmentShader="void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}",this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,e!==void 0&&(e.attributes!==void 0&&console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."),this.setValues(e))}ShaderMaterial.prototype=Object.create(Material.prototype),ShaderMaterial.prototype.constructor=ShaderMaterial,ShaderMaterial.prototype.isShaderMaterial=!0,ShaderMaterial.prototype.copy=function(e){return Material.prototype.copy.call(this,e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=cloneUniforms(e.uniforms),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.lights=e.lights,this.clipping=e.clipping,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this.extensions=e.extensions,this},ShaderMaterial.prototype.toJSON=function(e){var t=Material.prototype.toJSON.call(this,e);for(var r in t.uniforms={},this.uniforms){var a=this.uniforms[r],n=a.value;t.uniforms[r]=n&&n.isTexture?{type:"t",value:n.toJSON(e).uuid}:n&&n.isColor?{type:"c",value:n.getHex()}:n&&n.isVector2?{type:"v2",value:n.toArray()}:n&&n.isVector3?{type:"v3",value:n.toArray()}:n&&n.isVector4?{type:"v4",value:n.toArray()}:n&&n.isMatrix3?{type:"m3",value:n.toArray()}:n&&n.isMatrix4?{type:"m4",value:n.toArray()}:{value:n}}0<Object.keys(this.defines).length&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader;var i={};for(var o in this.extensions)!0===this.extensions[o]&&(i[o]=!0);return 0<Object.keys(i).length&&(t.extensions=i),t};function WebGLBackground(e,t,r,a){function n(t,a,n,u){var c=a.background;if(null===c?(i(o,s),d=null,l=0):c&&c.isColor&&(i(c,1),u=!0,d=null,l=0),(e.autoClear||u)&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),c&&(c.isCubeTexture||c.isWebGLRenderTargetCube)){void 0===m&&(m=new Mesh(new BoxBufferGeometry(1,1,1),new ShaderMaterial({type:"BackgroundCubeMaterial",uniforms:cloneUniforms(ShaderLib.cube.uniforms),vertexShader:ShaderLib.cube.vertexShader,fragmentShader:ShaderLib.cube.fragmentShader,side:BackSide,depthTest:!1,depthWrite:!1,fog:!1})),m.geometry.removeAttribute("normal"),m.geometry.removeAttribute("uv"),m.onBeforeRender=function(e,t,r){this.matrixWorld.copyPosition(r.matrixWorld)},Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.tCube.value}}),r.update(m));var g=c.isWebGLRenderTargetCube?c.texture:c;m.material.uniforms.tCube.value=g,m.material.uniforms.tFlip.value=c.isWebGLRenderTargetCube?1:-1,(d!==c||l!==g.version)&&(m.material.needsUpdate=!0,d=c,l=g.version),t.unshift(m,m.geometry,m.material,0,0,null)}else c&&c.isTexture&&(void 0===p&&(p=new Mesh(new PlaneBufferGeometry(2,2),new ShaderMaterial({type:"BackgroundMaterial",uniforms:cloneUniforms(ShaderLib.background.uniforms),vertexShader:ShaderLib.background.vertexShader,fragmentShader:ShaderLib.background.fragmentShader,side:FrontSide,depthTest:!1,depthWrite:!1,fog:!1})),p.geometry.removeAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(p)),p.material.uniforms.t2D.value=c,!0===c.matrixAutoUpdate&&c.updateMatrix(),p.material.uniforms.uvTransform.value.copy(c.matrix),(d!==c||l!==c.version)&&(p.material.needsUpdate=!0,d=c,l=c.version),t.unshift(p,p.geometry,p.material,0,0,null))}function i(e,r){t.buffers.color.setClear(e.r,e.g,e.b,r,a)}var o=new Color(0),s=0,d=null,l=0,p,m;return{getClearColor:function(){return o},setClearColor:function(e,t){o.set(e),s=t===void 0?1:t,i(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,i(o,s)},render:n}}function WebGLBufferRenderer(e,t,r,a){function n(t,a){e.drawArrays(o,t,a),r.update(a,o)}function i(n,i,s){var d;if(a.isWebGL2)d=e;else if(d=t.get("ANGLE_instanced_arrays"),null===d)return void console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");d[a.isWebGL2?"drawArraysInstanced":"drawArraysInstancedANGLE"](o,i,s,n.maxInstancedCount),r.update(s,o,n.maxInstancedCount)}var o;this.setMode=function(e){o=e},this.render=n,this.renderInstances=i}function WebGLCapabilities(e,t,r){function a(){if(void 0!==d)return d;var r=t.get("EXT_texture_filter_anisotropic");return d=null===r?0:e.getParameter(r.MAX_TEXTURE_MAX_ANISOTROPY_EXT),d}function n(t){if("highp"===t){if(0<e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision&&0<e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision)return"highp";t="mediump"}return"mediump"===t&&0<e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision&&0<e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision?"mediump":"lowp"}var i="undefined"!=typeof WebGL2RenderingContext&&e instanceof WebGL2RenderingContext,o=r.precision===void 0?"highp":r.precision,s=n(o),d;s!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",s,"instead."),o=s);var l=!0===r.logarithmicDepthBuffer,p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),u=e.getParameter(e.MAX_TEXTURE_SIZE),c=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),g=e.getParameter(e.MAX_VERTEX_ATTRIBS),h=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),f=e.getParameter(e.MAX_VARYING_VECTORS),x=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),y=0<m,_=i||!!t.get("OES_texture_float"),b=i?e.getParameter(e.MAX_SAMPLES):0;return{isWebGL2:i,getMaxAnisotropy:a,getMaxPrecision:n,precision:o,logarithmicDepthBuffer:l,maxTextures:p,maxVertexTextures:m,maxTextureSize:u,maxCubemapSize:c,maxAttributes:g,maxVertexUniforms:h,maxVaryings:f,maxFragmentUniforms:x,vertexTextures:y,floatFragmentTextures:_,floatVertexTextures:y&&_,maxSamples:b}}function WebGLClipping(){function e(){p.value!==a&&(p.value=a,p.needsUpdate=0<n),r.numPlanes=n,r.numIntersection=0}function t(e,t,a,n){var o=null===e?0:e.length,s=null;if(0!==o){if(s=p.value,!0!==n||null===s){var m=a+4*o,u=t.matrixWorldInverse;l.getNormalMatrix(u),(null===s||s.length<m)&&(s=new Float32Array(m));for(var c=0,g=a;c!==o;++c,g+=4)d.copy(e[c]).applyMatrix4(u,l),d.normal.toArray(s,g),s[g+3]=d.constant}p.value=s,p.needsUpdate=!0}return r.numPlanes=o,s}var r=this,a=null,n=0,o=!1,s=!1,d=new Plane,l=new Matrix3,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(e,r,i){var s=0!==e.length||r||0!==n||o;return o=r,a=t(e,i,0),n=e.length,s},this.beginShadows=function(){s=!0,t(null)},this.endShadows=function(){s=!1,e()},this.setState=function(r,d,l,m,u,c){if(!o||null===r||0===r.length||s&&!l)s?t(null):e();else{var g=s?0:n,h=4*g,f=u.clippingState||null;p.value=f,f=t(r,m,h,c);for(var x=0;x!=h;++x)f[x]=a[x];u.clippingState=f,this.numIntersection=d?this.numPlanes:0,this.numPlanes+=g}}}function WebGLExtensions(e){var t={};return{get:function(r){if(void 0!==t[r])return t[r];var a;return a="WEBGL_depth_texture"===r?e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture"):"EXT_texture_filter_anisotropic"===r?e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic"):"WEBGL_compressed_texture_s3tc"===r?e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc"):"WEBGL_compressed_texture_pvrtc"===r?e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"):e.getExtension(r),null===a&&console.warn("THREE.WebGLRenderer: "+r+" extension not supported."),t[r]=a,a}}}function WebGLGeometries(e,t,r){function a(e){var i=e.target,s=n[i.id];for(var d in null!==s.index&&t.remove(s.index),s.attributes)t.remove(s.attributes[d]);i.removeEventListener("dispose",a),delete n[i.id];var l=o[s.id];l&&(t.remove(l),delete o[s.id]),r.memory.geometries--}var n={},o={};return{get:function(e,t){var i=n[t.id];return i?i:(t.addEventListener("dispose",a),t.isBufferGeometry?i=t:t.isGeometry&&(void 0===t._bufferGeometry&&(t._bufferGeometry=new BufferGeometry().setFromObject(e)),i=t._bufferGeometry),n[t.id]=i,r.memory.geometries++,i)},update:function(r){var a=r.index,n=r.attributes;for(var o in null!==a&&t.update(a,e.ELEMENT_ARRAY_BUFFER),n)t.update(n[o],e.ARRAY_BUFFER);var s=r.morphAttributes;for(var o in s)for(var d=s[o],p=0,m=d.length;p<m;p++)t.update(d[p],e.ARRAY_BUFFER)},getWireframeAttribute:function(r){var n=o[r.id];if(n)return n;var s=[],d=r.index,p=r.attributes;if(null!==d)for(var m=d.array,u=0,g=m.length;u<g;u+=3){var h=m[u+0],f=m[u+1],x=m[u+2];s.push(h,f,f,x,x,h)}else for(var m=p.position.array,u=0,g=m.length/3-1;u<g;u+=3){var h=u+0,f=u+1,x=u+2;s.push(h,f,f,x,x,h)}return n=new(65535<arrayMax(s)?Uint32BufferAttribute:Uint16BufferAttribute)(s,1),t.update(n,e.ELEMENT_ARRAY_BUFFER),o[r.id]=n,n}}}function WebGLIndexedBufferRenderer(e,t,r,a){function n(t,a){e.drawElements(o,a,s,t*d),r.update(a,o)}function i(n,i,l){var p;if(a.isWebGL2)p=e;else{var p=t.get("ANGLE_instanced_arrays");if(null===p)return void console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.")}p[a.isWebGL2?"drawElementsInstanced":"drawElementsInstancedANGLE"](o,l,s,i*d,n.maxInstancedCount),r.update(l,o,n.maxInstancedCount)}var o,s,d;this.setMode=function(e){o=e},this.setIndex=function(e){s=e.type,d=e.bytesPerElement},this.render=n,this.renderInstances=i}function WebGLInfo(e){function t(t,a,n){switch(n=n||1,r.calls++,a){case e.TRIANGLES:r.triangles+=n*(t/3);break;case e.TRIANGLE_STRIP:case e.TRIANGLE_FAN:r.triangles+=n*(t-2);break;case e.LINES:r.lines+=n*(t/2);break;case e.LINE_STRIP:r.lines+=n*(t-1);break;case e.LINE_LOOP:r.lines+=n*t;break;case e.POINTS:r.points+=n*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);}}var r={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:r,programs:null,autoReset:!0,reset:function(){r.frame++,r.calls=0,r.triangles=0,r.points=0,r.lines=0},update:t}}function absNumericalSort(e,t){var r=Math.abs;return r(t[1])-r(e[1])}function WebGLMorphtargets(e){var t={},r=new Float32Array(8);return{update:function(a,n,o,s){var d=a.morphTargetInfluences,l=d.length,p=t[n.id];if(p===void 0){p=[];for(var m=0;m<l;m++)p[m]=[m,0];t[n.id]=p}for(var u=o.morphTargets&&n.morphAttributes.position,c=o.morphNormals&&n.morphAttributes.normal,m=0,g;m<l;m++)g=p[m],0!==g[1]&&(u&&n.removeAttribute("morphTarget"+m),c&&n.removeAttribute("morphNormal"+m));for(var m=0,g;m<l;m++)g=p[m],g[0]=m,g[1]=d[m];p.sort(absNumericalSort);for(var m=0,g;8>m;m++){if(g=p[m],g){var h=g[0],f=g[1];if(f){u&&n.addAttribute("morphTarget"+m,u[h]),c&&n.addAttribute("morphNormal"+m,c[h]),r[m]=f;continue}}r[m]=0}s.getUniforms().setValue(e,"morphTargetInfluences",r)}}}function WebGLObjects(e,t){function r(r){var n=t.render.frame,i=r.geometry,o=e.get(r,i);return a[o.id]!==n&&(i.isGeometry&&o.updateFromObject(r),e.update(o),a[o.id]=n),o}var a={};return{update:r,dispose:function(){a={}}}}function CubeTexture(e,t,r,a,n,i,o,s,d,l){e=e===void 0?[]:e,t=t===void 0?CubeReflectionMapping:t,Texture.call(this,e,t,r,a,n,i,o,s,d,l),this.flipY=!1}CubeTexture.prototype=Object.create(Texture.prototype),CubeTexture.prototype.constructor=CubeTexture,CubeTexture.prototype.isCubeTexture=!0,Object.defineProperty(CubeTexture.prototype,"images",{get:function(){return this.image},set:function(e){this.image=e}});function DataTexture3D(e,t,r,a){Texture.call(this,null),this.image={data:e,width:t,height:r,depth:a},this.magFilter=NearestFilter,this.minFilter=NearestFilter,this.generateMipmaps=!1,this.flipY=!1}DataTexture3D.prototype=Object.create(Texture.prototype),DataTexture3D.prototype.constructor=DataTexture3D,DataTexture3D.prototype.isDataTexture3D=!0;var emptyTexture=new Texture,emptyTexture3d=new DataTexture3D,emptyCubeTexture=new CubeTexture;function UniformContainer(){this.seq=[],this.map={}}var arrayCacheF32=[],arrayCacheI32=[],mat4array=new Float32Array(16),mat3array=new Float32Array(9),mat2array=new Float32Array(4);function flatten(e,t,a){var o=e[0];if(0>=o||0<o)return e;var s=t*a,n=arrayCacheF32[s];if(void 0===n&&(n=new Float32Array(s),arrayCacheF32[s]=n),0!==t){o.toArray(n,0);for(var d=1,l=0;d!==t;++d)l+=a,e[d].toArray(n,l)}return n}function arraysEqual(e,t){if(e.length!==t.length)return!1;for(var r=0,a=e.length;r<a;r++)if(e[r]!==t[r])return!1;return!0}function copyArray(e,t){for(var r=0,a=t.length;r<a;r++)e[r]=t[r]}function allocTexUnits(e,t){var a=arrayCacheI32[t];a===void 0&&(a=new Int32Array(t),arrayCacheI32[t]=a);for(var n=0;n!==t;++n)a[n]=e.allocTextureUnit();return a}function setValue1f(e,t){var r=this.cache;r[0]===t||(e.uniform1f(this.addr,t),r[0]=t)}function setValue1i(e,t){var r=this.cache;r[0]===t||(e.uniform1i(this.addr,t),r[0]=t)}function setValue2fv(e,t){var r=this.cache;if(t.x!==void 0)(r[0]!==t.x||r[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),r[0]=t.x,r[1]=t.y);else{if(arraysEqual(r,t))return;e.uniform2fv(this.addr,t),copyArray(r,t)}}function setValue3fv(e,t){var r=this.cache;if(t.x!==void 0)(r[0]!==t.x||r[1]!==t.y||r[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),r[0]=t.x,r[1]=t.y,r[2]=t.z);else if(t.r!==void 0)(r[0]!==t.r||r[1]!==t.g||r[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),r[0]=t.r,r[1]=t.g,r[2]=t.b);else{if(arraysEqual(r,t))return;e.uniform3fv(this.addr,t),copyArray(r,t)}}function setValue4fv(e,t){var r=this.cache;if(t.x!==void 0)(r[0]!==t.x||r[1]!==t.y||r[2]!==t.z||r[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),r[0]=t.x,r[1]=t.y,r[2]=t.z,r[3]=t.w);else{if(arraysEqual(r,t))return;e.uniform4fv(this.addr,t),copyArray(r,t)}}function setValue2fm(e,t){var r=this.cache,a=t.elements;if(a===void 0){if(arraysEqual(r,t))return;e.uniformMatrix2fv(this.addr,!1,t),copyArray(r,t)}else{if(arraysEqual(r,a))return;mat2array.set(a),e.uniformMatrix2fv(this.addr,!1,mat2array),copyArray(r,a)}}function setValue3fm(e,t){var r=this.cache,a=t.elements;if(a===void 0){if(arraysEqual(r,t))return;e.uniformMatrix3fv(this.addr,!1,t),copyArray(r,t)}else{if(arraysEqual(r,a))return;mat3array.set(a),e.uniformMatrix3fv(this.addr,!1,mat3array),copyArray(r,a)}}function setValue4fm(e,t){var r=this.cache,a=t.elements;if(a===void 0){if(arraysEqual(r,t))return;e.uniformMatrix4fv(this.addr,!1,t),copyArray(r,t)}else{if(arraysEqual(r,a))return;mat4array.set(a),e.uniformMatrix4fv(this.addr,!1,mat4array),copyArray(r,a)}}function setValueT1(e,t,r){var a=this.cache,n=r.allocTextureUnit();a[0]!==n&&(e.uniform1i(this.addr,n),a[0]=n),r.setTexture2D(t||emptyTexture,n)}function setValueT3D1(e,t,r){var a=this.cache,n=r.allocTextureUnit();a[0]!==n&&(e.uniform1i(this.addr,n),a[0]=n),r.setTexture3D(t||emptyTexture3d,n)}function setValueT6(e,t,r){var a=this.cache,n=r.allocTextureUnit();a[0]!==n&&(e.uniform1i(this.addr,n),a[0]=n),r.setTextureCube(t||emptyCubeTexture,n)}function setValue2iv(e,t){var r=this.cache;arraysEqual(r,t)||(e.uniform2iv(this.addr,t),copyArray(r,t))}function setValue3iv(e,t){var r=this.cache;arraysEqual(r,t)||(e.uniform3iv(this.addr,t),copyArray(r,t))}function setValue4iv(e,t){var r=this.cache;arraysEqual(r,t)||(e.uniform4iv(this.addr,t),copyArray(r,t))}function getSingularSetter(e){return 5126===e?setValue1f:35664===e?setValue2fv:35665===e?setValue3fv:35666===e?setValue4fv:35674===e?setValue2fm:35675===e?setValue3fm:35676===e?setValue4fm:35678===e||36198===e?setValueT1:35679===e?setValueT3D1:35680===e?setValueT6:5124===e||35670===e?setValue1i:35667===e||35671===e?setValue2iv:35668===e||35672===e?setValue3iv:35669===e||35673===e?setValue4iv:void 0}function setValue1fv(e,t){var r=this.cache;arraysEqual(r,t)||(e.uniform1fv(this.addr,t),copyArray(r,t))}function setValue1iv(e,t){var r=this.cache;arraysEqual(r,t)||(e.uniform1iv(this.addr,t),copyArray(r,t))}function setValueV2a(e,t){var r=this.cache,a=flatten(t,this.size,2);arraysEqual(r,a)||(e.uniform2fv(this.addr,a),this.updateCache(a))}function setValueV3a(e,t){var r=this.cache,a=flatten(t,this.size,3);arraysEqual(r,a)||(e.uniform3fv(this.addr,a),this.updateCache(a))}function setValueV4a(e,t){var r=this.cache,a=flatten(t,this.size,4);arraysEqual(r,a)||(e.uniform4fv(this.addr,a),this.updateCache(a))}function setValueM2a(e,t){var r=this.cache,a=flatten(t,this.size,4);arraysEqual(r,a)||(e.uniformMatrix2fv(this.addr,!1,a),this.updateCache(a))}function setValueM3a(e,t){var r=this.cache,a=flatten(t,this.size,9);arraysEqual(r,a)||(e.uniformMatrix3fv(this.addr,!1,a),this.updateCache(a))}function setValueM4a(e,t){var r=this.cache,a=flatten(t,this.size,16);arraysEqual(r,a)||(e.uniformMatrix4fv(this.addr,!1,a),this.updateCache(a))}function setValueT1a(e,t,r){var a=this.cache,o=t.length,n=allocTexUnits(r,o);!1===arraysEqual(a,n)&&(e.uniform1iv(this.addr,n),copyArray(a,n));for(var s=0;s!==o;++s)r.setTexture2D(t[s]||emptyTexture,n[s])}function setValueT6a(e,t,r){var a=this.cache,o=t.length,n=allocTexUnits(r,o);!1===arraysEqual(a,n)&&(e.uniform1iv(this.addr,n),copyArray(a,n));for(var s=0;s!==o;++s)r.setTextureCube(t[s]||emptyCubeTexture,n[s])}function getPureArraySetter(e){return 5126===e?setValue1fv:35664===e?setValueV2a:35665===e?setValueV3a:35666===e?setValueV4a:35674===e?setValueM2a:35675===e?setValueM3a:35676===e?setValueM4a:35678===e?setValueT1a:35680===e?setValueT6a:5124===e||35670===e?setValue1iv:35667===e||35671===e?setValue2iv:35668===e||35672===e?setValue3iv:35669===e||35673===e?setValue4iv:void 0}function SingleUniform(e,t,r){this.id=e,this.addr=r,this.cache=[],this.setValue=getSingularSetter(t.type)}function PureArrayUniform(e,t,r){this.id=e,this.addr=r,this.cache=[],this.size=t.size,this.setValue=getPureArraySetter(t.type)}PureArrayUniform.prototype.updateCache=function(e){var t=this.cache;e instanceof Float32Array&&t.length!==e.length&&(this.cache=new Float32Array(e.length)),copyArray(t,e)};function StructuredUniform(e){this.id=e,UniformContainer.call(this)}StructuredUniform.prototype.setValue=function(e,t,r){for(var a=this.seq,o=0,s=a.length,n;o!==s;++o)n=a[o],n.setValue(e,t[n.id],r)};var RePathPart=/([\w\d_]+)(\])?(\[|\.)?/g;function addUniform(e,t){e.seq.push(t),e.map[t.id]=t}function parseUniform(e,t,r){var a=e.name,n=a.length;for(RePathPart.lastIndex=0;;){var i=RePathPart.exec(a),o=RePathPart.lastIndex,s=i[1],d="]"===i[2],l=i[3];if(d&&(s|=0),void 0===l||"["===l&&o+2===n){addUniform(r,void 0===l?new SingleUniform(s,e,t):new PureArrayUniform(s,e,t));break}else{var p=r.map,m=p[s];void 0===m&&(m=new StructuredUniform(s),addUniform(r,m)),r=m}}}function WebGLUniforms(e,t,r){UniformContainer.call(this),this.renderer=r;for(var a=e.getProgramParameter(t,e.ACTIVE_UNIFORMS),n=0;n<a;++n){var o=e.getActiveUniform(t,n),s=e.getUniformLocation(t,o.name);parseUniform(o,s,this)}}WebGLUniforms.prototype.setValue=function(e,t,r){var a=this.map[t];a!==void 0&&a.setValue(e,r,this.renderer)},WebGLUniforms.prototype.setOptional=function(e,t,r){var a=t[r];a!==void 0&&this.setValue(e,r,a)},WebGLUniforms.upload=function(e,t,r,a){for(var o=0,s=t.length;o!==s;++o){var n=t[o],d=r[n.id];!1!==d.needsUpdate&&n.setValue(e,d.value,a)}},WebGLUniforms.seqWithValue=function(e,t){for(var a=[],r=0,o=e.length,n;r!==o;++r)n=e[r],n.id in t&&a.push(n);return a};function addLineNumbers(e){for(var t=e.split("\n"),r=0;r<t.length;r++)t[r]=r+1+": "+t[r];return t.join("\n")}function WebGLShader(e,t,r){var a=e.createShader(t);return e.shaderSource(a,r),e.compileShader(a),!1===e.getShaderParameter(a,e.COMPILE_STATUS)&&console.error("THREE.WebGLShader: Shader couldn't compile."),""!==e.getShaderInfoLog(a)&&console.warn("THREE.WebGLShader: gl.getShaderInfoLog()",t===e.VERTEX_SHADER?"vertex":"fragment",e.getShaderInfoLog(a),addLineNumbers(r)),a}var programIdCount=0;function getEncodingComponents(e){switch(e){case LinearEncoding:return["Linear","( value )"];case sRGBEncoding:return["sRGB","( value )"];case RGBEEncoding:return["RGBE","( value )"];case RGBM7Encoding:return["RGBM","( value, 7.0 )"];case RGBM16Encoding:return["RGBM","( value, 16.0 )"];case RGBDEncoding:return["RGBD","( value, 256.0 )"];case GammaEncoding:return["Gamma","( value, float( GAMMA_FACTOR ) )"];default:throw new Error("unsupported encoding: "+e);}}function getTexelDecodingFunction(e,t){var r=getEncodingComponents(t);return"vec4 "+e+"( vec4 value ) { return "+r[0]+"ToLinear"+r[1]+"; }"}function getTexelEncodingFunction(e,t){var r=getEncodingComponents(t);return"vec4 "+e+"( vec4 value ) { return LinearTo"+r[0]+r[1]+"; }"}function getToneMappingFunction(e,t){var r;switch(t){case LinearToneMapping:r="Linear";break;case ReinhardToneMapping:r="Reinhard";break;case Uncharted2ToneMapping:r="Uncharted2";break;case CineonToneMapping:r="OptimizedCineon";break;case ACESFilmicToneMapping:r="ACESFilmic";break;default:throw new Error("unsupported toneMapping: "+t);}return"vec3 "+e+"( vec3 color ) { return "+r+"ToneMapping( color ); }"}function generateExtensions(e,t,r){e=e||{};var a=[e.derivatives||t.envMapCubeUV||t.bumpMap||t.normalMap&&!t.objectSpaceNormalMap||t.flatShading?"#extension GL_OES_standard_derivatives : enable":"",(e.fragDepth||t.logarithmicDepthBuffer)&&r.get("EXT_frag_depth")?"#extension GL_EXT_frag_depth : enable":"",e.drawBuffers&&r.get("WEBGL_draw_buffers")?"#extension GL_EXT_draw_buffers : require":"",(e.shaderTextureLOD||t.envMap)&&r.get("EXT_shader_texture_lod")?"#extension GL_EXT_shader_texture_lod : enable":""];return a.filter(filterEmptyLine).join("\n")}function generateDefines(e){var t=[];for(var r in e){var a=e[r];!1===a||t.push("#define "+r+" "+a)}return t.join("\n")}function fetchAttributeLocations(e,t){for(var r={},a=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES),n=0;n<a;n++){var o=e.getActiveAttrib(t,n),s=o.name;r[s]=e.getAttribLocation(t,s)}return r}function filterEmptyLine(e){return""!==e}function replaceLightNums(e,t){return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights)}function replaceClippingPlaneNums(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}function parseIncludes(e){function t(e,t){var r=ShaderChunk[t];if(r===void 0)throw new Error("Can not resolve #include <"+t+">");return parseIncludes(r)}var r=/^[ \t]*#include +<([\w\d./]+)>/gm;return e.replace(r,t)}function unrollLoops(e){var t=/#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g;return e.replace(t,function(e,t,r,a){for(var n="",o=parseInt(t);o<parseInt(r);o++)n+=a.replace(/\[ i \]/g,"[ "+o+" ]");return n})}function WebGLProgram(e,t,r,a,n,i,o){var s=e.context,d=a.defines,l=n.vertexShader,p=n.fragmentShader,m="SHADOWMAP_TYPE_BASIC";i.shadowMapType===PCFShadowMap?m="SHADOWMAP_TYPE_PCF":i.shadowMapType===PCFSoftShadowMap&&(m="SHADOWMAP_TYPE_PCF_SOFT");var u="ENVMAP_TYPE_CUBE",c="ENVMAP_MODE_REFLECTION",g="ENVMAP_BLENDING_MULTIPLY";if(i.envMap){switch(a.envMap.mapping){case CubeReflectionMapping:case CubeRefractionMapping:u="ENVMAP_TYPE_CUBE";break;case CubeUVReflectionMapping:case CubeUVRefractionMapping:u="ENVMAP_TYPE_CUBE_UV";break;case EquirectangularReflectionMapping:case EquirectangularRefractionMapping:u="ENVMAP_TYPE_EQUIREC";break;case SphericalReflectionMapping:u="ENVMAP_TYPE_SPHERE";}switch(a.envMap.mapping){case CubeRefractionMapping:case EquirectangularRefractionMapping:c="ENVMAP_MODE_REFRACTION";}switch(a.combine){case MultiplyOperation:g="ENVMAP_BLENDING_MULTIPLY";break;case MixOperation:g="ENVMAP_BLENDING_MIX";break;case AddOperation:g="ENVMAP_BLENDING_ADD";}}var h=0<e.gammaFactor?e.gammaFactor:1,f=o.isWebGL2?"":generateExtensions(a.extensions,i,t),x=generateDefines(d),y=s.createProgram(),_,b;if(a.isRawShaderMaterial?(_=[x].filter(filterEmptyLine).join("\n"),0<_.length&&(_+="\n"),b=[f,x].filter(filterEmptyLine).join("\n"),0<b.length&&(b+="\n")):(_=["precision "+i.precision+" float;","precision "+i.precision+" int;","#define SHADER_NAME "+n.name,x,i.supportsVertexTextures?"#define VERTEX_TEXTURES":"","#define GAMMA_FACTOR "+h,"#define MAX_BONES "+i.maxBones,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+c:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMap&&i.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",i.displacementMap&&i.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.vertexColors?"#define USE_COLOR":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.useVertexTexture?"#define BONE_TEXTURE":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&!1===i.flatShading?"#define USE_MORPHNORMALS":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.logarithmicDepthBuffer&&(o.isWebGL2||t.get("EXT_frag_depth"))?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_COLOR","\tattribute vec3 color;","#endif","#ifdef USE_MORPHTARGETS","\tattribute vec3 morphTarget0;","\tattribute vec3 morphTarget1;","\tattribute vec3 morphTarget2;","\tattribute vec3 morphTarget3;","\t#ifdef USE_MORPHNORMALS","\t\tattribute vec3 morphNormal0;","\t\tattribute vec3 morphNormal1;","\t\tattribute vec3 morphNormal2;","\t\tattribute vec3 morphNormal3;","\t#else","\t\tattribute vec3 morphTarget4;","\t\tattribute vec3 morphTarget5;","\t\tattribute vec3 morphTarget6;","\t\tattribute vec3 morphTarget7;","\t#endif","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif","\n"].filter(filterEmptyLine).join("\n"),b=[f,"precision "+i.precision+" float;","precision "+i.precision+" int;","#define SHADER_NAME "+n.name,x,i.alphaTest?"#define ALPHATEST "+i.alphaTest+(i.alphaTest%1?"":".0"):"","#define GAMMA_FACTOR "+h,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+u:"",i.envMap?"#define "+c:"",i.envMap?"#define "+g:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMap&&i.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.vertexColors?"#define USE_COLOR":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.logarithmicDepthBuffer&&(o.isWebGL2||t.get("EXT_frag_depth"))?"#define USE_LOGDEPTHBUF_EXT":"",i.envMap&&(o.isWebGL2||t.get("EXT_shader_texture_lod"))?"#define TEXTURE_LOD_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;",i.toneMapping===NoToneMapping?"":"#define TONE_MAPPING",i.toneMapping===NoToneMapping?"":ShaderChunk.tonemapping_pars_fragment,i.toneMapping===NoToneMapping?"":getToneMappingFunction("toneMapping",i.toneMapping),i.dithering?"#define DITHERING":"",i.outputEncoding||i.mapEncoding||i.matcapEncoding||i.envMapEncoding||i.emissiveMapEncoding?ShaderChunk.encodings_pars_fragment:"",i.mapEncoding?getTexelDecodingFunction("mapTexelToLinear",i.mapEncoding):"",i.matcapEncoding?getTexelDecodingFunction("matcapTexelToLinear",i.matcapEncoding):"",i.envMapEncoding?getTexelDecodingFunction("envMapTexelToLinear",i.envMapEncoding):"",i.emissiveMapEncoding?getTexelDecodingFunction("emissiveMapTexelToLinear",i.emissiveMapEncoding):"",i.outputEncoding?getTexelEncodingFunction("linearToOutputTexel",i.outputEncoding):"",i.depthPacking?"#define DEPTH_PACKING "+a.depthPacking:"","\n"].filter(filterEmptyLine).join("\n")),l=parseIncludes(l),l=replaceLightNums(l,i),l=replaceClippingPlaneNums(l,i),p=parseIncludes(p),p=replaceLightNums(p,i),p=replaceClippingPlaneNums(p,i),l=unrollLoops(l),p=unrollLoops(p),o.isWebGL2&&!a.isRawShaderMaterial){var E=!1,v=/^\s*#version\s+300\s+es\s*\n/;a.isShaderMaterial&&null!==l.match(v)&&null!==p.match(v)&&(E=!0,l=l.replace(v,""),p=p.replace(v,"")),_="#version 300 es\n\n#define attribute in\n#define varying out\n#define texture2D texture\n"+_,b=["#version 300 es\n","#define varying in",E?"":"out highp vec4 pc_fragColor;",E?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join("\n")+"\n"+b}var T=_+l,M=b+p,S=WebGLShader(s,s.VERTEX_SHADER,T),A=WebGLShader(s,s.FRAGMENT_SHADER,M);s.attachShader(y,S),s.attachShader(y,A),void 0===a.index0AttributeName?!0===i.morphTargets&&s.bindAttribLocation(y,0,"position"):s.bindAttribLocation(y,0,a.index0AttributeName),s.linkProgram(y);var w=s.getProgramInfoLog(y).trim(),R=s.getShaderInfoLog(S).trim(),L=s.getShaderInfoLog(A).trim(),P=!0,C=!0;!1===s.getProgramParameter(y,s.LINK_STATUS)?(P=!1,console.error("THREE.WebGLProgram: shader error: ",s.getError(),"gl.VALIDATE_STATUS",s.getProgramParameter(y,s.VALIDATE_STATUS),"gl.getProgramInfoLog",w,R,L)):""===w?(""===R||""===L)&&(C=!1):console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()",w),C&&(this.diagnostics={runnable:P,material:a,programLog:w,vertexShader:{log:R,prefix:_},fragmentShader:{log:L,prefix:b}}),s.deleteShader(S),s.deleteShader(A);var B;this.getUniforms=function(){return null==B&&(B=new WebGLUniforms(s,y,e)),B};var U;return this.getAttributes=function(){return void 0===U&&(U=fetchAttributeLocations(s,y)),U},this.destroy=function(){s.deleteProgram(y),this.program=void 0},Object.defineProperties(this,{uniforms:{get:function(){return console.warn("THREE.WebGLProgram: .uniforms is now .getUniforms()."),this.getUniforms()}},attributes:{get:function(){return console.warn("THREE.WebGLProgram: .attributes is now .getAttributes()."),this.getAttributes()}}}),this.name=n.name,this.id=programIdCount++,this.code=r,this.usedTimes=1,this.program=y,this.vertexShader=S,this.fragmentShader=A,this}function WebGLPrograms(e,t,r){var i=Math.floor,o=Math.min;function a(e){var t=e.skeleton,a=t.bones;if(r.floatVertexTextures)return 1024;var n=r.maxVertexUniforms,s=i((n-20)/4),d=o(s,a.length);return d<a.length?(console.warn("THREE.WebGLRenderer: Skeleton has "+a.length+" bones. This GPU supports "+d+"."),0):d}function n(e,t){var r;return e?e.isTexture?r=e.encoding:e.isWebGLRenderTarget&&(console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."),r=e.texture.encoding):r=LinearEncoding,r===LinearEncoding&&t&&(r=GammaEncoding),r}var s=[],d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"phong",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"},l=["precision","supportsVertexTextures","map","mapEncoding","matcap","matcapEncoding","envMap","envMapMode","envMapEncoding","lightMap","aoMap","emissiveMap","emissiveMapEncoding","bumpMap","normalMap","objectSpaceNormalMap","displacementMap","specularMap","roughnessMap","metalnessMap","gradientMap","alphaMap","combine","vertexColors","fog","useFog","fogExp","flatShading","sizeAttenuation","logarithmicDepthBuffer","skinning","maxBones","useVertexTexture","morphTargets","morphNormals","maxMorphTargets","maxMorphNormals","premultipliedAlpha","numDirLights","numPointLights","numSpotLights","numHemiLights","numRectAreaLights","shadowMapEnabled","shadowMapType","toneMapping","physicallyCorrectLights","alphaTest","doubleSided","flipSided","numClippingPlanes","numClipIntersection","depthPacking","dithering"];this.getParameters=function(t,i,o,s,l,p,m){var u=d[t.type],c=m.isSkinnedMesh?a(m):0,g=r.precision;null!==t.precision&&(g=r.getMaxPrecision(t.precision),g!==t.precision&&console.warn("THREE.WebGLProgram.getParameters:",t.precision,"not supported, using",g,"instead."));var h=e.getRenderTarget(),f={shaderID:u,precision:g,supportsVertexTextures:r.vertexTextures,outputEncoding:n(h?h.texture:null,e.gammaOutput),map:!!t.map,mapEncoding:n(t.map,e.gammaInput),matcap:!!t.matcap,matcapEncoding:n(t.matcap,e.gammaInput),envMap:!!t.envMap,envMapMode:t.envMap&&t.envMap.mapping,envMapEncoding:n(t.envMap,e.gammaInput),envMapCubeUV:!!t.envMap&&(t.envMap.mapping===CubeUVReflectionMapping||t.envMap.mapping===CubeUVRefractionMapping),lightMap:!!t.lightMap,aoMap:!!t.aoMap,emissiveMap:!!t.emissiveMap,emissiveMapEncoding:n(t.emissiveMap,e.gammaInput),bumpMap:!!t.bumpMap,normalMap:!!t.normalMap,objectSpaceNormalMap:t.normalMapType===ObjectSpaceNormalMap,displacementMap:!!t.displacementMap,roughnessMap:!!t.roughnessMap,metalnessMap:!!t.metalnessMap,specularMap:!!t.specularMap,alphaMap:!!t.alphaMap,gradientMap:!!t.gradientMap,combine:t.combine,vertexColors:t.vertexColors,fog:!!s,useFog:t.fog,fogExp:s&&s.isFogExp2,flatShading:t.flatShading,sizeAttenuation:t.sizeAttenuation,logarithmicDepthBuffer:r.logarithmicDepthBuffer,skinning:t.skinning&&0<c,maxBones:c,useVertexTexture:r.floatVertexTextures,morphTargets:t.morphTargets,morphNormals:t.morphNormals,maxMorphTargets:e.maxMorphTargets,maxMorphNormals:e.maxMorphNormals,numDirLights:i.directional.length,numPointLights:i.point.length,numSpotLights:i.spot.length,numRectAreaLights:i.rectArea.length,numHemiLights:i.hemi.length,numClippingPlanes:l,numClipIntersection:p,dithering:t.dithering,shadowMapEnabled:e.shadowMap.enabled&&m.receiveShadow&&0<o.length,shadowMapType:e.shadowMap.type,toneMapping:e.toneMapping,physicallyCorrectLights:e.physicallyCorrectLights,premultipliedAlpha:t.premultipliedAlpha,alphaTest:t.alphaTest,doubleSided:t.side===DoubleSide,flipSided:t.side===BackSide,depthPacking:t.depthPacking!==void 0&&t.depthPacking};return f},this.getProgramCode=function(t,r){var a=[];if(r.shaderID?a.push(r.shaderID):(a.push(t.fragmentShader),a.push(t.vertexShader)),void 0!==t.defines)for(var n in t.defines)a.push(n),a.push(t.defines[n]);for(var o=0;o<l.length;o++)a.push(r[l[o]]);return a.push(t.onBeforeCompile.toString()),a.push(e.gammaOutput),a.push(e.gammaFactor),a.join()},this.acquireProgram=function(a,n,i,o){for(var d=0,l=s.length,m,u;d<l;d++)if(u=s[d],u.code===o){m=u,++m.usedTimes;break}return void 0===m&&(m=new WebGLProgram(e,t,o,a,n,i,r),s.push(m)),m},this.releaseProgram=function(e){if(0==--e.usedTimes){var t=s.indexOf(e);s[t]=s[s.length-1],s.pop(),e.destroy()}},this.programs=s}function WebGLProperties(){function e(e){var t=a.get(e);return void 0===t&&(t={},a.set(e,t)),t}function t(e){a.delete(e)}function r(e,t,r){a.get(e)[t]=r}var a=new WeakMap;return{get:e,remove:t,update:r,dispose:function(){a=new WeakMap}}}function painterSortStable(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.program&&t.program&&e.program!==t.program?e.program.id-t.program.id:e.material.id===t.material.id?e.z===t.z?e.id-t.id:e.z-t.z:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function reversePainterSortStable(e,t){if(e.groupOrder!==t.groupOrder)return e.groupOrder-t.groupOrder;return e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder}function WebGLRenderList(){function e(e,a,n,i,o,s){var d=t[r];return void 0===d?(d={id:e.id,object:e,geometry:a,material:n,program:n.program,groupOrder:i,renderOrder:e.renderOrder,z:o,group:s},t[r]=d):(d.id=e.id,d.object=e,d.geometry=a,d.material=n,d.program=n.program,d.groupOrder=i,d.renderOrder=e.renderOrder,d.z=o,d.group=s),r++,d}var t=[],r=0,a=[],n=[];return{opaque:a,transparent:n,init:function(){r=0,a.length=0,n.length=0},push:function(t,r,i,o,s,d){var l=e(t,r,i,o,s,d);(!0===i.transparent?n:a).push(l)},unshift:function(t,r,i,o,s,d){var l=e(t,r,i,o,s,d);(!0===i.transparent?n:a).unshift(l)},sort:function(){1<a.length&&a.sort(painterSortStable),1<n.length&&n.sort(reversePainterSortStable)}}}function WebGLRenderLists(){function e(t){var a=t.target;a.removeEventListener("dispose",e),delete r[a.id]}function t(t,a){var n=r[t.id],i;return void 0===n?(i=new WebGLRenderList,r[t.id]={},r[t.id][a.id]=i,t.addEventListener("dispose",e)):(i=n[a.id],void 0===i&&(i=new WebGLRenderList,n[a.id]=i)),i}var r={};return{get:t,dispose:function(){r={}}}}function UniformsCache(){var e={};return{get:function(t){if(void 0!==e[t.id])return e[t.id];var r;switch(t.type){case"DirectionalLight":r={direction:new Vector3,color:new Color,shadow:!1,shadowBias:0,shadowRadius:1,shadowMapSize:new Vector2};break;case"SpotLight":r={position:new Vector3,direction:new Vector3,color:new Color,distance:0,coneCos:0,penumbraCos:0,decay:0,shadow:!1,shadowBias:0,shadowRadius:1,shadowMapSize:new Vector2};break;case"PointLight":r={position:new Vector3,color:new Color,distance:0,decay:0,shadow:!1,shadowBias:0,shadowRadius:1,shadowMapSize:new Vector2,shadowCameraNear:1,shadowCameraFar:1e3};break;case"HemisphereLight":r={direction:new Vector3,skyColor:new Color,groundColor:new Color};break;case"RectAreaLight":r={color:new Color,position:new Vector3,halfWidth:new Vector3,halfHeight:new Vector3};}return e[t.id]=r,r}}}var count=0;function WebGLLights(){var e=Math.cos,t=new UniformsCache,a={id:count++,hash:{stateID:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,shadowsLength:-1},ambient:[0,0,0],directional:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotShadowMap:[],spotShadowMatrix:[],rectArea:[],point:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[]},n=new Vector3,i=new Matrix4,o=new Matrix4;return{setup:function(s,d,p){for(var m=0,u=0,c=0,h=0,f=0,x=0,y=0,_=0,E=p.matrixWorldInverse,v=0,T=s.length;v<T;v++){var l=s[v],M=l.color,S=l.intensity,A=l.distance,w=l.shadow&&l.shadow.map?l.shadow.map.texture:null;if(l.isAmbientLight)m+=M.r*S,u+=M.g*S,c+=M.b*S;else if(l.isDirectionalLight){var R=t.get(l);if(R.color.copy(l.color).multiplyScalar(l.intensity),R.direction.setFromMatrixPosition(l.matrixWorld),n.setFromMatrixPosition(l.target.matrixWorld),R.direction.sub(n),R.direction.transformDirection(E),R.shadow=l.castShadow,l.castShadow){var L=l.shadow;R.shadowBias=L.bias,R.shadowRadius=L.radius,R.shadowMapSize=L.mapSize}a.directionalShadowMap[h]=w,a.directionalShadowMatrix[h]=l.shadow.matrix,a.directional[h]=R,h++}else if(l.isSpotLight){var R=t.get(l);if(R.position.setFromMatrixPosition(l.matrixWorld),R.position.applyMatrix4(E),R.color.copy(M).multiplyScalar(S),R.distance=A,R.direction.setFromMatrixPosition(l.matrixWorld),n.setFromMatrixPosition(l.target.matrixWorld),R.direction.sub(n),R.direction.transformDirection(E),R.coneCos=e(l.angle),R.penumbraCos=e(l.angle*(1-l.penumbra)),R.decay=l.decay,R.shadow=l.castShadow,l.castShadow){var L=l.shadow;R.shadowBias=L.bias,R.shadowRadius=L.radius,R.shadowMapSize=L.mapSize}a.spotShadowMap[x]=w,a.spotShadowMatrix[x]=l.shadow.matrix,a.spot[x]=R,x++}else if(l.isRectAreaLight){var R=t.get(l);R.color.copy(M).multiplyScalar(S),R.position.setFromMatrixPosition(l.matrixWorld),R.position.applyMatrix4(E),o.identity(),i.copy(l.matrixWorld),i.premultiply(E),o.extractRotation(i),R.halfWidth.set(.5*l.width,0,0),R.halfHeight.set(0,.5*l.height,0),R.halfWidth.applyMatrix4(o),R.halfHeight.applyMatrix4(o),a.rectArea[y]=R,y++}else if(l.isPointLight){var R=t.get(l);if(R.position.setFromMatrixPosition(l.matrixWorld),R.position.applyMatrix4(E),R.color.copy(l.color).multiplyScalar(l.intensity),R.distance=l.distance,R.decay=l.decay,R.shadow=l.castShadow,l.castShadow){var L=l.shadow;R.shadowBias=L.bias,R.shadowRadius=L.radius,R.shadowMapSize=L.mapSize,R.shadowCameraNear=L.camera.near,R.shadowCameraFar=L.camera.far}a.pointShadowMap[f]=w,a.pointShadowMatrix[f]=l.shadow.matrix,a.point[f]=R,f++}else if(l.isHemisphereLight){var R=t.get(l);R.direction.setFromMatrixPosition(l.matrixWorld),R.direction.transformDirection(E),R.direction.normalize(),R.skyColor.copy(l.color).multiplyScalar(S),R.groundColor.copy(l.groundColor).multiplyScalar(S),a.hemi[_]=R,_++}}a.ambient[0]=m,a.ambient[1]=u,a.ambient[2]=c,a.directional.length=h,a.spot.length=x,a.rectArea.length=y,a.point.length=f,a.hemi.length=_,a.hash.stateID=a.id,a.hash.directionalLength=h,a.hash.pointLength=f,a.hash.spotLength=x,a.hash.rectAreaLength=y,a.hash.hemiLength=_,a.hash.shadowsLength=d.length},state:a}}function WebGLRenderState(){var e=new WebGLLights,t=[],r=[];return{init:function(){t.length=0,r.length=0},state:{lightsArray:t,shadowsArray:r,lights:e},setupLights:function(a){e.setup(t,r,a)},pushLight:function(e){t.push(e)},pushShadow:function(e){r.push(e)}}}function WebGLRenderStates(){function e(t){var a=t.target;a.removeEventListener("dispose",e),delete r[a.id]}function t(t,a){var n;return void 0===r[t.id]?(n=new WebGLRenderState,r[t.id]={},r[t.id][a.id]=n,t.addEventListener("dispose",e)):void 0===r[t.id][a.id]?(n=new WebGLRenderState,r[t.id][a.id]=n):n=r[t.id][a.id],n}var r={};return{get:t,dispose:function(){r={}}}}function WebGLRenderTarget(e,t,r){this.width=e,this.height=t,this.scissor=new Vector4(0,0,e,t),this.scissorTest=!1,this.viewport=new Vector4(0,0,e,t),r=r||{},this.texture=new Texture(void 0,void 0,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.encoding),this.texture.generateMipmaps=r.generateMipmaps!==void 0&&r.generateMipmaps,this.texture.minFilter=r.minFilter===void 0?LinearFilter:r.minFilter,this.depthBuffer=!(r.depthBuffer!==void 0)||r.depthBuffer,this.stencilBuffer=!(r.stencilBuffer!==void 0)||r.stencilBuffer,this.depthTexture=r.depthTexture===void 0?null:r.depthTexture}WebGLRenderTarget.prototype=Object.assign(Object.create(EventDispatcher.prototype),{constructor:WebGLRenderTarget,isWebGLRenderTarget:!0,setSize:function(e,t){(this.width!==e||this.height!==t)&&(this.width=e,this.height=t,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)},clone:function(){return new this.constructor().copy(this)},copy:function(e){return this.width=e.width,this.height=e.height,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.depthTexture=e.depthTexture,this},dispose:function(){this.dispatchEvent({type:"dispose"})}});function MeshDepthMaterial(e){Material.call(this),this.type="MeshDepthMaterial",this.depthPacking=BasicDepthPacking,this.skinning=!1,this.morphTargets=!1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.setValues(e)}MeshDepthMaterial.prototype=Object.create(Material.prototype),MeshDepthMaterial.prototype.constructor=MeshDepthMaterial,MeshDepthMaterial.prototype.isMeshDepthMaterial=!0,MeshDepthMaterial.prototype.copy=function(e){return Material.prototype.copy.call(this,e),this.depthPacking=e.depthPacking,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this};function MeshDistanceMaterial(e){Material.call(this),this.type="MeshDistanceMaterial",this.referencePosition=new Vector3,this.nearDistance=1,this.farDistance=1e3,this.skinning=!1,this.morphTargets=!1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.fog=!1,this.lights=!1,this.setValues(e)}MeshDistanceMaterial.prototype=Object.create(Material.prototype),MeshDistanceMaterial.prototype.constructor=MeshDistanceMaterial,MeshDistanceMaterial.prototype.isMeshDistanceMaterial=!0,MeshDistanceMaterial.prototype.copy=function(e){return Material.prototype.copy.call(this,e),this.referencePosition.copy(e.referencePosition),this.nearDistance=e.nearDistance,this.farDistance=e.farDistance,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this};function WebGLShadowMap(e,t,r){function a(t,r,a,n,i,o){var s=t.geometry,d=null,l=h,p=t.customDepthMaterial;if(a&&(l=f,p=t.customDistanceMaterial),!p){var m=!1;r.morphTargets&&(s&&s.isBufferGeometry?m=s.morphAttributes&&s.morphAttributes.position&&0<s.morphAttributes.position.length:s&&s.isGeometry&&(m=s.morphTargets&&0<s.morphTargets.length)),t.isSkinnedMesh&&!1===r.skinning&&console.warn("THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:",t);var u=t.isSkinnedMesh&&r.skinning,c=0;m&&(c|=1),u&&(c|=2),d=l[c]}else d=p;if(e.localClippingEnabled&&!0===r.clipShadows&&0!==r.clippingPlanes.length){var g=d.uuid,_=r.uuid,b=x[g];void 0===b&&(b={},x[g]=b);var E=b[_];void 0===E&&(E=d.clone(),b[_]=E),d=E}return d.visible=r.visible,d.wireframe=r.wireframe,d.side=null==r.shadowSide?y[r.side]:r.shadowSide,d.clipShadows=r.clipShadows,d.clippingPlanes=r.clippingPlanes,d.clipIntersection=r.clipIntersection,d.wireframeLinewidth=r.wireframeLinewidth,d.linewidth=r.linewidth,a&&d.isMeshDistanceMaterial&&(d.referencePosition.copy(n),d.nearDistance=i,d.farDistance=o),d}function n(r,s,d,p){if(!1!==r.visible){var u=r.layers.test(s.layers);if(u&&(r.isMesh||r.isLine||r.isPoints)&&r.castShadow&&(!r.frustumCulled||o.intersectsObject(r))){r.modelViewMatrix.multiplyMatrices(d.matrixWorldInverse,r.matrixWorld);var c=t.update(r),g=r.material;if(Array.isArray(g))for(var h=c.groups,f=0,x=h.length;f<x;f++){var y=h[f],_=g[y.materialIndex];if(_&&_.visible){var b=a(r,_,p,m,d.near,d.far);e.renderBufferDirect(d,null,c,b,r,y)}}else if(g.visible){var b=a(r,g,p,m,d.near,d.far);e.renderBufferDirect(d,null,c,b,r,null)}}for(var E=r.children,v=0,T=E.length;v<void 0;v++)n(E[v],s,d,p)}}for(var o=new Frustum,s=new Matrix4,d=new Vector2,l=new Vector2(r,r),p=new Vector3,m=new Vector3,u=1,c=2,g=(u|c)+1,h=Array(g),f=Array(g),x={},y={0:BackSide,1:FrontSide,2:DoubleSide},_=[new Vector3(1,0,0),new Vector3(-1,0,0),new Vector3(0,0,1),new Vector3(0,0,-1),new Vector3(0,1,0),new Vector3(0,-1,0)],b=[new Vector3(0,1,0),new Vector3(0,1,0),new Vector3(0,1,0),new Vector3(0,1,0),new Vector3(0,0,1),new Vector3(0,0,-1)],E=[new Vector4,new Vector4,new Vector4,new Vector4,new Vector4,new Vector4],v=0;v!==g;++v){var T=0!=(v&u),M=0!=(v&c),S=new MeshDepthMaterial({depthPacking:RGBADepthPacking,morphTargets:T,skinning:M});h[v]=S;var A=new MeshDistanceMaterial({morphTargets:T,skinning:M});f[v]=A}var w=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=PCFShadowMap,this.render=function(t,r,a){if(!1!==w.enabled&&(!1!==w.autoUpdate||!1!==w.needsUpdate)&&0!==t.length){var u=e.state;u.setBlending(NoBlending),u.buffers.color.setClear(1,1,1,1),u.buffers.depth.setTest(!0),u.setScissorTest(!1);for(var c=0,g=t.length,h;void 0>c;c++){var f=t[c],x=f.shadow,y=f&&f.isPointLight;if(void 0===x){console.warn("THREE.WebGLShadowMap:",f,"has no shadow.");continue}var v=x.camera;if(d.copy(x.mapSize),d.min(l),y){var T=d.x,M=d.y;E[0].set(2*T,M,T,M),E[1].set(0,M,T,M),E[2].set(3*T,M,T,M),E[3].set(T,M,T,M),E[4].set(3*T,0,T,M),E[5].set(T,0,T,M),d.x*=4,d.y*=2}if(null===x.map){x.map=new WebGLRenderTarget(d.x,d.y,{minFilter:NearestFilter,magFilter:NearestFilter,format:RGBAFormat}),x.map.texture.name=f.name+".shadowMap",v.updateProjectionMatrix()}x.isSpotLightShadow&&x.update(f);var S=x.map,A=x.matrix;m.setFromMatrixPosition(f.matrixWorld),v.position.copy(m),y?(h=6,A.makeTranslation(-m.x,-m.y,-m.z)):(h=1,p.setFromMatrixPosition(f.target.matrixWorld),v.lookAt(p),v.updateMatrixWorld(),A.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),A.multiply(v.projectionMatrix),A.multiply(v.matrixWorldInverse)),e.setRenderTarget(S),e.clear();for(var R=0;R<h;R++){if(y){p.copy(v.position),p.add(_[R]),v.up.copy(b[R]),v.lookAt(p),v.updateMatrixWorld();var L=E[R];u.viewport(L)}s.multiplyMatrices(v.projectionMatrix,v.matrixWorldInverse),o.setFromMatrix(s),n(r,a,v,y)}}w.needsUpdate=!1}}}function WebGLState(e,t,r,a){function n(t,r,a){var n=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(var s=0;s<a;s++)e.texImage2D(r+s,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,n);return o}function i(r,n){if(T[r]=1,0===M[r]&&(e.enableVertexAttribArray(r),M[r]=1),S[r]!==n){var i=a.isWebGL2?e:t.get("ANGLE_instanced_arrays");i[a.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](r,n),S[r]=n}}function o(t){!0!==A[t]&&(e.enable(t),A[t]=!0)}function s(t){!1!==A[t]&&(e.disable(t),A[t]=!1)}function d(){if(null===w&&(w=[],t.get("WEBGL_compressed_texture_pvrtc")||t.get("WEBGL_compressed_texture_s3tc")||t.get("WEBGL_compressed_texture_etc1")||t.get("WEBGL_compressed_texture_astc")))for(var r=e.getParameter(e.COMPRESSED_TEXTURE_FORMATS),a=0;a<r.length;a++)w.push(r[a]);return w}function l(t){return R!==t&&(e.useProgram(t),R=t,!0)}function p(t,a,n,i,d,l,p,m){return t===NoBlending?void(L&&(s(e.BLEND),L=!1)):(L||(o(e.BLEND),L=!0),t===CustomBlending?void(d=d||a,l=l||n,p=p||i,(a!==C||d!==F)&&(e.blendEquationSeparate(r.convert(a),r.convert(d)),C=a,F=d),(n!==B||i!==U||l!==z||p!==N)&&(e.blendFuncSeparate(r.convert(n),r.convert(i),r.convert(l),r.convert(p)),B=n,U=i,z=l,N=p),P=t,D=null):void((t!==P||m!==D)&&((C!==AddEquation||F!==AddEquation)&&(e.blendEquation(e.FUNC_ADD),C=AddEquation,F=AddEquation),m?t===NormalBlending?e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA):t===AdditiveBlending?e.blendFunc(e.ONE,e.ONE):t===SubtractiveBlending?e.blendFuncSeparate(e.ZERO,e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ONE_MINUS_SRC_ALPHA):t===MultiplyBlending?e.blendFuncSeparate(e.ZERO,e.SRC_COLOR,e.ZERO,e.SRC_ALPHA):console.error("THREE.WebGLState: Invalid blending: ",t):t===NormalBlending?e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA):t===AdditiveBlending?e.blendFunc(e.SRC_ALPHA,e.ONE):t===SubtractiveBlending?e.blendFunc(e.ZERO,e.ONE_MINUS_SRC_COLOR):t===MultiplyBlending?e.blendFunc(e.ZERO,e.SRC_COLOR):console.error("THREE.WebGLState: Invalid blending: ",t),B=null,U=null,z=null,N=null,P=t,D=m)))}function m(t){I!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),I=t)}function u(t){t===CullFaceNone?s(e.CULL_FACE):(o(e.CULL_FACE),t!==O&&(t===CullFaceBack?e.cullFace(e.BACK):t===CullFaceFront?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function c(t){t!==G&&(H&&e.lineWidth(t),G=t)}function g(t,r,a){t?(o(e.POLYGON_OFFSET_FILL),(W!==r||V!==a)&&(e.polygonOffset(r,a),W=r,V=a)):s(e.POLYGON_OFFSET_FILL)}function h(t){void 0===t&&(t=e.TEXTURE0+k-1),j!==t&&(e.activeTexture(t),j=t)}function f(t,r){null===j&&h();var a=Y[j];void 0===a&&(a={type:void 0,texture:void 0},Y[j]=a),(a.type!==t||a.texture!==r)&&(e.bindTexture(t,r||Q[t]),a.type=t,a.texture=r)}function x(t){!1===Z.equals(t)&&(e.scissor(t.x,t.y,t.z,t.w),Z.copy(t))}function y(t){!1===J.equals(t)&&(e.viewport(t.x,t.y,t.z,t.w),J.copy(t))}var _=new function(){var t=!1,n=new Vector4,i=null,o=new Vector4(0,0,0,0);return{setMask:function(r){i===r||t||(e.colorMask(r,r,r,r),i=r)},setLocked:function(e){t=e},setClear:function(t,i,s,d,a){!0===a&&(t*=d,i*=d,s*=d),n.set(t,i,s,d),!1===o.equals(n)&&(e.clearColor(t,i,s,d),o.copy(n))},reset:function(){t=!1,i=null,o.set(-1,0,0,0)}}},b=new function(){var t=!1,r=null,a=null,n=null;return{setTest:function(t){t?o(e.DEPTH_TEST):s(e.DEPTH_TEST)},setMask:function(a){r===a||t||(e.depthMask(a),r=a)},setFunc:function(t){a!==t&&(t?t===NeverDepth?e.depthFunc(e.NEVER):t===AlwaysDepth?e.depthFunc(e.ALWAYS):t===LessDepth?e.depthFunc(e.LESS):t===LessEqualDepth?e.depthFunc(e.LEQUAL):t===EqualDepth?e.depthFunc(e.EQUAL):t===GreaterEqualDepth?e.depthFunc(e.GEQUAL):t===GreaterDepth?e.depthFunc(e.GREATER):t===NotEqualDepth?e.depthFunc(e.NOTEQUAL):e.depthFunc(e.LEQUAL):e.depthFunc(e.LEQUAL),a=t)},setLocked:function(e){t=e},setClear:function(t){n!==t&&(e.clearDepth(t),n=t)},reset:function(){t=!1,r=null,a=null,n=null}}},E=new function(){var t=!1,r=null,a=null,n=null,i=null,d=null,l=null,p=null,m=null;return{setTest:function(t){t?o(e.STENCIL_TEST):s(e.STENCIL_TEST)},setMask:function(a){r===a||t||(e.stencilMask(a),r=a)},setFunc:function(t,r,o){(a!==t||n!==r||i!==o)&&(e.stencilFunc(t,r,o),a=t,n=r,i=o)},setOp:function(t,r,a){(d!==t||l!==r||p!==a)&&(e.stencilOp(t,r,a),d=t,l=r,p=a)},setLocked:function(e){t=e},setClear:function(t){m!==t&&(e.clearStencil(t),m=t)},reset:function(){t=!1,r=null,a=null,n=null,i=null,d=null,l=null,p=null,m=null}}},v=e.getParameter(e.MAX_VERTEX_ATTRIBS),T=new Uint8Array(v),M=new Uint8Array(v),S=new Uint8Array(v),A={},w=null,R=null,L=null,P=null,C=null,B=null,U=null,F=null,z=null,N=null,D=!1,I=null,O=null,G=null,W=null,V=null,k=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,X=0,q=e.getParameter(e.VERSION);-1===q.indexOf("WebGL")?-1!==q.indexOf("OpenGL ES")&&(X=parseFloat(/^OpenGL\ ES\ ([0-9])/.exec(q)[1]),H=2<=X):(X=parseFloat(/^WebGL\ ([0-9])/.exec(q)[1]),H=1<=X);var j=null,Y={},Z=new Vector4,J=new Vector4,Q={};return Q[e.TEXTURE_2D]=n(e.TEXTURE_2D,e.TEXTURE_2D,1),Q[e.TEXTURE_CUBE_MAP]=n(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),_.setClear(0,0,0,1),b.setClear(1),E.setClear(0),o(e.DEPTH_TEST),b.setFunc(LessEqualDepth),m(!1),u(CullFaceBack),o(e.CULL_FACE),p(NoBlending),{buffers:{color:_,depth:b,stencil:E},initAttributes:function(){for(var e=0,t=T.length;e<t;e++)T[e]=0},enableAttribute:function(e){i(e,0)},enableAttributeAndDivisor:i,disableUnusedAttributes:function(){for(var t=0,r=M.length;t!==r;++t)M[t]!==T[t]&&(e.disableVertexAttribArray(t),M[t]=0)},enable:o,disable:s,getCompressedTextureFormats:d,useProgram:l,setBlending:p,setMaterial:function(t,r){t.side===DoubleSide?s(e.CULL_FACE):o(e.CULL_FACE);var a=t.side===BackSide;r&&(a=!a),m(a),t.blending===NormalBlending&&!1===t.transparent?p(NoBlending):p(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.premultipliedAlpha),b.setFunc(t.depthFunc),b.setTest(t.depthTest),b.setMask(t.depthWrite),_.setMask(t.colorWrite),g(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits)},setFlipSided:m,setCullFace:u,setLineWidth:c,setPolygonOffset:g,setScissorTest:function(t){t?o(e.SCISSOR_TEST):s(e.SCISSOR_TEST)},activeTexture:h,bindTexture:f,compressedTexImage2D:function(){try{e.compressedTexImage2D.apply(e,arguments)}catch(e){console.error("THREE.WebGLState:",e)}},texImage2D:function(){try{e.texImage2D.apply(e,arguments)}catch(e){console.error("THREE.WebGLState:",e)}},texImage3D:function(){try{e.texImage3D.apply(e,arguments)}catch(e){console.error("THREE.WebGLState:",e)}},scissor:x,viewport:y,reset:function(){for(var t=0;t<M.length;t++)1===M[t]&&(e.disableVertexAttribArray(t),M[t]=0);A={},w=null,j=null,Y={},R=null,P=null,I=null,O=null,_.reset(),b.reset(),E.reset()}}}function WebGLTextures(e,t,r,a,n,o,s){var R=Math.floor,L=Math.max,P=Math.min;function d(e,t,r,a){var n=1;if((e.width>a||e.height>a)&&(n=a/L(e.width,e.height)),1>n||!0===t){if(e instanceof HTMLImageElement||e instanceof HTMLCanvasElement||e instanceof ImageBitmap){void 0===B&&(B=document.createElementNS("http://www.w3.org/1999/xhtml","canvas"));var i=r?document.createElementNS("http://www.w3.org/1999/xhtml","canvas"):B,o=t?_Math.floorPowerOfTwo:R;i.width=o(n*e.width),i.height=o(n*e.height);var s=i.getContext("2d");return s.drawImage(e,0,0,i.width,i.height),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+e.width+"x"+e.height+") to ("+i.width+"x"+i.height+")."),i}return"data"in e&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+e.width+"x"+e.height+")."),e}return e}function l(e){return _Math.isPowerOfTwo(e.width)&&_Math.isPowerOfTwo(e.height)}function p(e){return!n.isWebGL2&&(e.wrapS!==ClampToEdgeWrapping||e.wrapT!==ClampToEdgeWrapping||e.minFilter!==NearestFilter&&e.minFilter!==LinearFilter)}function m(e,t){return e.generateMipmaps&&t&&e.minFilter!==NearestFilter&&e.minFilter!==LinearFilter}function u(t,r,n,i){e.generateMipmap(t);var o=a.get(r);o.__maxMipLevel=Math.log(L(n,i))*Math.LOG2E}function c(r,a){if(!n.isWebGL2)return r;var i=r;return r===e.RED&&(a===e.FLOAT&&(i=e.R32F),a===e.HALF_FLOAT&&(i=e.R16F),a===e.UNSIGNED_BYTE&&(i=e.R8)),r===e.RGB&&(a===e.FLOAT&&(i=e.RGB32F),a===e.HALF_FLOAT&&(i=e.RGB16F),a===e.UNSIGNED_BYTE&&(i=e.RGB8)),r===e.RGBA&&(a===e.FLOAT&&(i=e.RGBA32F),a===e.HALF_FLOAT&&(i=e.RGBA16F),a===e.UNSIGNED_BYTE&&(i=e.RGBA8)),i===e.R16F||i===e.R32F||i===e.RGBA16F||i===e.RGBA32F?t.get("EXT_color_buffer_float"):(i===e.RGB16F||i===e.RGB32F)&&console.warn("THREE.WebGLRenderer: Floating point textures with RGB format not supported. Please use RGBA instead."),i}function g(t){return t===NearestFilter||t===NearestMipMapNearestFilter||t===NearestMipMapLinearFilter?e.NEAREST:e.LINEAR}function h(e){var t=e.target;t.removeEventListener("dispose",h),x(t),t.isVideoTexture&&delete C[t.id],s.memory.textures--}function f(e){var t=e.target;t.removeEventListener("dispose",f),y(t),s.memory.textures--}function x(t){var r=a.get(t);if(t.image&&r.__image__webglTextureCube)e.deleteTexture(r.__image__webglTextureCube);else{if(r.__webglInit===void 0)return;e.deleteTexture(r.__webglTexture)}a.remove(t)}function y(t){var r=a.get(t),n=a.get(t.texture);if(t){if(void 0!==n.__webglTexture&&e.deleteTexture(n.__webglTexture),t.depthTexture&&t.depthTexture.dispose(),t.isWebGLRenderTargetCube)for(var o=0;6>o;o++)e.deleteFramebuffer(r.__webglFramebuffer[o]),r.__webglDepthbuffer&&e.deleteRenderbuffer(r.__webglDepthbuffer[o]);else e.deleteFramebuffer(r.__webglFramebuffer),r.__webglDepthbuffer&&e.deleteRenderbuffer(r.__webglDepthbuffer);a.remove(t.texture),a.remove(t)}}function _(t,n){var i=a.get(t);if(t.isVideoTexture&&w(t),0<t.version&&i.__version!==t.version){var o=t.image;if(void 0===o)console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined");else if(!1===o.complete)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else return void E(i,t,n)}r.activeTexture(e.TEXTURE0+n),r.bindTexture(e.TEXTURE_2D,i.__webglTexture)}function b(r,i,s){var d;if(s?(e.texParameteri(r,e.TEXTURE_WRAP_S,o.convert(i.wrapS)),e.texParameteri(r,e.TEXTURE_WRAP_T,o.convert(i.wrapT)),e.texParameteri(r,e.TEXTURE_MAG_FILTER,o.convert(i.magFilter)),e.texParameteri(r,e.TEXTURE_MIN_FILTER,o.convert(i.minFilter))):(e.texParameteri(r,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(r,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),(i.wrapS!==ClampToEdgeWrapping||i.wrapT!==ClampToEdgeWrapping)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),e.texParameteri(r,e.TEXTURE_MAG_FILTER,g(i.magFilter)),e.texParameteri(r,e.TEXTURE_MIN_FILTER,g(i.minFilter)),i.minFilter!==NearestFilter&&i.minFilter!==LinearFilter&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),d=t.get("EXT_texture_filter_anisotropic"),d){if(i.type===FloatType&&null===t.get("OES_texture_float_linear"))return;if(i.type===HalfFloatType&&null===(n.isWebGL2||t.get("OES_texture_half_float_linear")))return;(1<i.anisotropy||a.get(i).__currentAnisotropy)&&(e.texParameterf(r,d.TEXTURE_MAX_ANISOTROPY_EXT,P(i.anisotropy,n.getMaxAnisotropy())),a.get(i).__currentAnisotropy=i.anisotropy)}}function E(t,a,g){var f;f=a.isDataTexture3D?e.TEXTURE_3D:e.TEXTURE_2D,t.__webglInit===void 0&&(t.__webglInit=!0,a.addEventListener("dispose",h),t.__webglTexture=e.createTexture(),s.memory.textures++),r.activeTexture(e.TEXTURE0+g),r.bindTexture(f,t.__webglTexture),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,a.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,a.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,a.unpackAlignment);var x=p(a)&&!1===l(a.image),y=d(a.image,x,!1,n.maxTextureSize),_=l(y)||n.isWebGL2,E=o.convert(a.format),v=o.convert(a.type),T=c(E,v);b(f,a,_);var M=a.mipmaps,S;if(a.isDepthTexture){if(T=e.DEPTH_COMPONENT,a.type===FloatType){if(!n.isWebGL2)throw new Error("Float Depth Texture only supported in WebGL2.0");T=e.DEPTH_COMPONENT32F}else n.isWebGL2&&(T=e.DEPTH_COMPONENT16);a.format===DepthFormat&&T===e.DEPTH_COMPONENT&&a.type!==UnsignedShortType&&a.type!==UnsignedIntType&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),a.type=UnsignedShortType,v=o.convert(a.type)),a.format===DepthStencilFormat&&(T=e.DEPTH_STENCIL,a.type!==UnsignedInt248Type&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),a.type=UnsignedInt248Type,v=o.convert(a.type))),r.texImage2D(e.TEXTURE_2D,0,T,y.width,y.height,0,E,v,null)}else if(a.isDataTexture){if(0<M.length&&_){for(var A=0,w=M.length;A<w;A++)S=M[A],r.texImage2D(e.TEXTURE_2D,A,T,S.width,S.height,0,E,v,S.data);a.generateMipmaps=!1,t.__maxMipLevel=M.length-1}else r.texImage2D(e.TEXTURE_2D,0,T,y.width,y.height,0,E,v,y.data),t.__maxMipLevel=0;}else if(a.isCompressedTexture){for(var A=0,w=M.length;A<w;A++)S=M[A],a.format!==RGBAFormat&&a.format!==RGBFormat?-1<r.getCompressedTextureFormats().indexOf(E)?r.compressedTexImage2D(e.TEXTURE_2D,A,T,S.width,S.height,0,S.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):r.texImage2D(e.TEXTURE_2D,A,T,S.width,S.height,0,E,v,S.data);t.__maxMipLevel=M.length-1}else if(a.isDataTexture3D)r.texImage3D(e.TEXTURE_3D,0,T,y.width,y.height,y.depth,0,E,v,y.data),t.__maxMipLevel=0;else if(0<M.length&&_){for(var A=0,w=M.length;A<w;A++)S=M[A],r.texImage2D(e.TEXTURE_2D,A,T,E,v,S);a.generateMipmaps=!1,t.__maxMipLevel=M.length-1}else r.texImage2D(e.TEXTURE_2D,0,T,E,v,y),t.__maxMipLevel=0;m(a,_)&&u(e.TEXTURE_2D,a,y.width,y.height),t.__version=a.version,a.onUpdate&&a.onUpdate(a)}function v(t,n,i,s){var d=o.convert(n.texture.format),l=o.convert(n.texture.type),p=c(d,l);r.texImage2D(s,0,p,n.width,n.height,0,d,l,null),e.bindFramebuffer(e.FRAMEBUFFER,t),e.framebufferTexture2D(e.FRAMEBUFFER,i,s,a.get(n.texture).__webglTexture,0),e.bindFramebuffer(e.FRAMEBUFFER,null)}function T(t,r,a){if(e.bindRenderbuffer(e.RENDERBUFFER,t),r.depthBuffer&&!r.stencilBuffer){if(a){var n=A(r);e.renderbufferStorageMultisample(e.RENDERBUFFER,n,e.DEPTH_COMPONENT16,r.width,r.height)}else e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_COMPONENT16,r.width,r.height);e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,t)}else if(r.depthBuffer&&r.stencilBuffer){if(a){var n=A(r);e.renderbufferStorageMultisample(e.RENDERBUFFER,n,e.DEPTH_STENCIL,r.width,r.height)}else e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_STENCIL,r.width,r.height);e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.RENDERBUFFER,t)}else{var i=o.convert(r.texture.format),s=o.convert(r.texture.type),d=c(i,s);if(a){var n=A(r);e.renderbufferStorageMultisample(e.RENDERBUFFER,n,d,r.width,r.height)}else e.renderbufferStorage(e.RENDERBUFFER,d,r.width,r.height)}e.bindRenderbuffer(e.RENDERBUFFER,null)}function M(t,r){var n=r&&r.isWebGLRenderTargetCube;if(n)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(e.FRAMEBUFFER,t),!(r.depthTexture&&r.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");a.get(r.depthTexture).__webglTexture&&r.depthTexture.image.width===r.width&&r.depthTexture.image.height===r.height||(r.depthTexture.image.width=r.width,r.depthTexture.image.height=r.height,r.depthTexture.needsUpdate=!0),_(r.depthTexture,0);var i=a.get(r.depthTexture).__webglTexture;if(r.depthTexture.format===DepthFormat)e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,i,0);else if(r.depthTexture.format===DepthStencilFormat)e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,i,0);else throw new Error("Unknown depthTexture format")}function S(t){var r=a.get(t),n=!0===t.isWebGLRenderTargetCube;if(t.depthTexture){if(n)throw new Error("target.depthTexture not supported in Cube render targets");M(r.__webglFramebuffer,t)}else if(n){r.__webglDepthbuffer=[];for(var o=0;6>o;o++)e.bindFramebuffer(e.FRAMEBUFFER,r.__webglFramebuffer[o]),r.__webglDepthbuffer[o]=e.createRenderbuffer(),T(r.__webglDepthbuffer[o],t)}else e.bindFramebuffer(e.FRAMEBUFFER,r.__webglFramebuffer),r.__webglDepthbuffer=e.createRenderbuffer(),T(r.__webglDepthbuffer,t);e.bindFramebuffer(e.FRAMEBUFFER,null)}function A(e){return n.isWebGL2&&e.isWebGLMultisampleRenderTarget?P(n.maxSamples,e.samples):0}function w(e){var t=e.id,r=s.render.frame;C[t]!==r&&(C[t]=r,e.update())}var C={},B;this.setTexture2D=_,this.setTexture3D=function(t,n){var i=a.get(t);return 0<t.version&&i.__version!==t.version?void E(i,t,n):void(r.activeTexture(e.TEXTURE0+n),r.bindTexture(e.TEXTURE_3D,i.__webglTexture))},this.setTextureCube=function(t,p){var g=a.get(t);if(6===t.image.length)if(0<t.version&&g.__version!==t.version){g.__image__webglTextureCube||(t.addEventListener("dispose",h),g.__image__webglTextureCube=e.createTexture(),s.memory.textures++),r.activeTexture(e.TEXTURE0+p),r.bindTexture(e.TEXTURE_CUBE_MAP,g.__image__webglTextureCube),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,t.flipY);for(var f=t&&t.isCompressedTexture,x=t.image[0]&&t.image[0].isDataTexture,y=[],_=0;6>_;_++)y[_]=f||x?x?t.image[_].image:t.image[_]:d(t.image[_],!1,!0,n.maxCubemapSize);var E=y[0],v=l(E)||n.isWebGL2,T=o.convert(t.format),M=o.convert(t.type),S=c(T,M);b(e.TEXTURE_CUBE_MAP,t,v);for(var _=0;6>_;_++)if(!f)x?r.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_,0,S,y[_].width,y[_].height,0,T,M,y[_].data):r.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_,0,S,T,M,y[_]);else for(var A=y[_].mipmaps,w=0,R=A.length,L;w<R;w++)L=A[w],t.format!==RGBAFormat&&t.format!==RGBFormat?-1<r.getCompressedTextureFormats().indexOf(T)?r.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_,w,S,L.width,L.height,0,L.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):r.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_,w,S,L.width,L.height,0,T,M,L.data);g.__maxMipLevel=f?A.length-1:0,m(t,v)&&u(e.TEXTURE_CUBE_MAP,t,E.width,E.height),g.__version=t.version,t.onUpdate&&t.onUpdate(t)}else r.activeTexture(e.TEXTURE0+p),r.bindTexture(e.TEXTURE_CUBE_MAP,g.__image__webglTextureCube)},this.setTextureCubeDynamic=function(t,n){r.activeTexture(e.TEXTURE0+n),r.bindTexture(e.TEXTURE_CUBE_MAP,a.get(t).__webglTexture)},this.setupRenderTarget=function(t){var d=a.get(t),p=a.get(t.texture);t.addEventListener("dispose",f),p.__webglTexture=e.createTexture(),s.memory.textures++;var g=!0===t.isWebGLRenderTargetCube,h=!0===t.isWebGLMultisampleRenderTarget,x=l(t)||n.isWebGL2;if(g){d.__webglFramebuffer=[];for(var y=0;6>y;y++)d.__webglFramebuffer[y]=e.createFramebuffer()}else if(d.__webglFramebuffer=e.createFramebuffer(),h)if(n.isWebGL2){d.__webglMultisampledFramebuffer=e.createFramebuffer(),d.__webglColorRenderbuffer=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,d.__webglColorRenderbuffer);var _=o.convert(t.texture.format),E=o.convert(t.texture.type),M=c(_,E),w=A(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,w,M,t.width,t.height),e.bindFramebuffer(e.FRAMEBUFFER,d.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,d.__webglColorRenderbuffer),e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(d.__webglDepthRenderbuffer=e.createRenderbuffer(),T(d.__webglDepthRenderbuffer,t,!0)),e.bindFramebuffer(e.FRAMEBUFFER,null)}else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.");if(g){r.bindTexture(e.TEXTURE_CUBE_MAP,p.__webglTexture),b(e.TEXTURE_CUBE_MAP,t.texture,x);for(var y=0;6>y;y++)v(d.__webglFramebuffer[y],t,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+y);m(t.texture,x)&&u(e.TEXTURE_CUBE_MAP,t.texture,t.width,t.height),r.bindTexture(e.TEXTURE_CUBE_MAP,null)}else r.bindTexture(e.TEXTURE_2D,p.__webglTexture),b(e.TEXTURE_2D,t.texture,x),v(d.__webglFramebuffer,t,e.COLOR_ATTACHMENT0,e.TEXTURE_2D),m(t.texture,x)&&u(e.TEXTURE_2D,t.texture,t.width,t.height),r.bindTexture(e.TEXTURE_2D,null);t.depthBuffer&&S(t)},this.updateRenderTargetMipmap=function(t){var i=t.texture,o=l(t)||n.isWebGL2;if(m(i,o)){var s=t.isWebGLRenderTargetCube?e.TEXTURE_CUBE_MAP:e.TEXTURE_2D,d=a.get(i).__webglTexture;r.bindTexture(s,d),u(s,i,t.width,t.height),r.bindTexture(s,null)}},this.updateMultisampleRenderTarget=function(t){if(t.isWebGLMultisampleRenderTarget)if(n.isWebGL2){var r=a.get(t);e.bindFramebuffer(e.READ_FRAMEBUFFER,r.__webglMultisampledFramebuffer),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,r.__webglFramebuffer);var i=t.width,o=t.height,s=e.COLOR_BUFFER_BIT;t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&(s|=e.STENCIL_BUFFER_BIT),e.blitFramebuffer(0,0,i,o,0,0,i,o,s,e.NEAREST)}else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.")}}function WebGLUtils(e,t,r){return{convert:function(a){var n;if(a===RepeatWrapping)return e.REPEAT;if(a===ClampToEdgeWrapping)return e.CLAMP_TO_EDGE;if(a===MirroredRepeatWrapping)return e.MIRRORED_REPEAT;if(a===NearestFilter)return e.NEAREST;if(a===NearestMipMapNearestFilter)return e.NEAREST_MIPMAP_NEAREST;if(a===NearestMipMapLinearFilter)return e.NEAREST_MIPMAP_LINEAR;if(a===LinearFilter)return e.LINEAR;if(a===LinearMipMapNearestFilter)return e.LINEAR_MIPMAP_NEAREST;if(a===LinearMipMapLinearFilter)return e.LINEAR_MIPMAP_LINEAR;if(a===UnsignedByteType)return e.UNSIGNED_BYTE;if(a===UnsignedShort4444Type)return e.UNSIGNED_SHORT_4_4_4_4;if(a===UnsignedShort5551Type)return e.UNSIGNED_SHORT_5_5_5_1;if(a===UnsignedShort565Type)return e.UNSIGNED_SHORT_5_6_5;if(a===ByteType)return e.BYTE;if(a===ShortType)return e.SHORT;if(a===UnsignedShortType)return e.UNSIGNED_SHORT;if(a===IntType)return e.INT;if(a===UnsignedIntType)return e.UNSIGNED_INT;if(a===FloatType)return e.FLOAT;if(a===HalfFloatType){if(r.isWebGL2)return e.HALF_FLOAT;if(n=t.get("OES_texture_half_float"),null!==n)return n.HALF_FLOAT_OES}if(a===AlphaFormat)return e.ALPHA;if(a===RGBFormat)return e.RGB;if(a===RGBAFormat)return e.RGBA;if(a===LuminanceFormat)return e.LUMINANCE;if(a===LuminanceAlphaFormat)return e.LUMINANCE_ALPHA;if(a===DepthFormat)return e.DEPTH_COMPONENT;if(a===DepthStencilFormat)return e.DEPTH_STENCIL;if(a===RedFormat)return e.RED;if(a===AddEquation)return e.FUNC_ADD;if(a===SubtractEquation)return e.FUNC_SUBTRACT;if(a===ReverseSubtractEquation)return e.FUNC_REVERSE_SUBTRACT;if(a===ZeroFactor)return e.ZERO;if(a===OneFactor)return e.ONE;if(a===SrcColorFactor)return e.SRC_COLOR;if(a===OneMinusSrcColorFactor)return e.ONE_MINUS_SRC_COLOR;if(a===SrcAlphaFactor)return e.SRC_ALPHA;if(a===OneMinusSrcAlphaFactor)return e.ONE_MINUS_SRC_ALPHA;if(a===DstAlphaFactor)return e.DST_ALPHA;if(a===OneMinusDstAlphaFactor)return e.ONE_MINUS_DST_ALPHA;if(a===DstColorFactor)return e.DST_COLOR;if(a===OneMinusDstColorFactor)return e.ONE_MINUS_DST_COLOR;if(a===SrcAlphaSaturateFactor)return e.SRC_ALPHA_SATURATE;if((a===RGB_S3TC_DXT1_Format||a===RGBA_S3TC_DXT1_Format||a===RGBA_S3TC_DXT3_Format||a===RGBA_S3TC_DXT5_Format)&&(n=t.get("WEBGL_compressed_texture_s3tc"),null!==n)){if(a===RGB_S3TC_DXT1_Format)return n.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===RGBA_S3TC_DXT1_Format)return n.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===RGBA_S3TC_DXT3_Format)return n.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===RGBA_S3TC_DXT5_Format)return n.COMPRESSED_RGBA_S3TC_DXT5_EXT}if((a===RGB_PVRTC_4BPPV1_Format||a===RGB_PVRTC_2BPPV1_Format||a===RGBA_PVRTC_4BPPV1_Format||a===RGBA_PVRTC_2BPPV1_Format)&&(n=t.get("WEBGL_compressed_texture_pvrtc"),null!==n)){if(a===RGB_PVRTC_4BPPV1_Format)return n.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===RGB_PVRTC_2BPPV1_Format)return n.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===RGBA_PVRTC_4BPPV1_Format)return n.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===RGBA_PVRTC_2BPPV1_Format)return n.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(a===RGB_ETC1_Format&&(n=t.get("WEBGL_compressed_texture_etc1"),null!==n))return n.COMPRESSED_RGB_ETC1_WEBGL;if((a===RGBA_ASTC_4x4_Format||a===RGBA_ASTC_5x4_Format||a===RGBA_ASTC_5x5_Format||a===RGBA_ASTC_6x5_Format||a===RGBA_ASTC_6x6_Format||a===RGBA_ASTC_8x5_Format||a===RGBA_ASTC_8x6_Format||a===RGBA_ASTC_8x8_Format||a===RGBA_ASTC_10x5_Format||a===RGBA_ASTC_10x6_Format||a===RGBA_ASTC_10x8_Format||a===RGBA_ASTC_10x10_Format||a===RGBA_ASTC_12x10_Format||a===RGBA_ASTC_12x12_Format)&&(n=t.get("WEBGL_compressed_texture_astc"),null!==n))return a;if(a===MinEquation||a===MaxEquation){if(r.isWebGL2){if(a===MinEquation)return e.MIN;if(a===MaxEquation)return e.MAX}if(n=t.get("EXT_blend_minmax"),null!==n){if(a===MinEquation)return n.MIN_EXT;if(a===MaxEquation)return n.MAX_EXT}}if(a===UnsignedInt248Type){if(r.isWebGL2)return e.UNSIGNED_INT_24_8;if(n=t.get("WEBGL_depth_texture"),null!==n)return n.UNSIGNED_INT_24_8_WEBGL}return 0}}}function Group(){Object3D.call(this),this.type="Group"}Group.prototype=Object.assign(Object.create(Object3D.prototype),{constructor:Group,isGroup:!0});function ArrayCamera(e){PerspectiveCamera.call(this),this.cameras=e||[]}ArrayCamera.prototype=Object.assign(Object.create(PerspectiveCamera.prototype),{constructor:ArrayCamera,isArrayCamera:!0});var cameraLPos=new Vector3,cameraRPos=new Vector3;function setProjectionFromUnion(e,t,r){cameraLPos.setFromMatrixPosition(t.matrixWorld),cameraRPos.setFromMatrixPosition(r.matrixWorld);var a=cameraLPos.distanceTo(cameraRPos),n=t.projectionMatrix.elements,i=r.projectionMatrix.elements,o=n[14]/(n[10]-1),s=n[14]/(n[10]+1),d=(n[9]+1)/n[5],l=(n[9]-1)/n[5],p=(n[8]-1)/n[0],m=(i[8]+1)/i[0],u=a/(-p+m),c=u*-p;t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(c),e.translateZ(u),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.getInverse(e.matrixWorld);var g=o+u,h=s+u;e.projectionMatrix.makePerspective(o*p-c,o*m+(a-c),d*s/h*g,l*s/h*g,g,h)}function WebVRManager(e){function t(){return null!==o&&!0===o.isPresenting}function r(){if(t()){var r=o.getEyeParameters("left"),a=r.renderWidth*u,n=r.renderHeight*u;v=e.getPixelRatio(),E=e.getSize(),e.setDrawingBufferSize(2*a,n,1),T.start()}else i.enabled&&e.setDrawingBufferSize(E.width,E.height,v),T.stop()}function a(e){for(var t=navigator.getGamepads&&navigator.getGamepads(),r=0,a=0,n=t.length,o;r<n;r++)if(o=t[r],o&&("Daydream Controller"===o.id||"Gear VR Controller"===o.id||"Oculus Go Controller"===o.id||"OpenVR Gamepad"===o.id||o.id.startsWith("Oculus Touch")||o.id.startsWith("Spatial Controller"))){if(a===e)return o;a++}}function n(){for(var e=0;e<l.length;e++){var t=l[e],r=a(e);if(r!==void 0&&r.pose!==void 0){if(null===r.pose)return;var n=r.pose;!1===n.hasPosition&&t.position.set(.2,-.6,-.05),null!==n.position&&t.position.fromArray(n.position),null!==n.orientation&&t.quaternion.fromArray(n.orientation),t.matrix.compose(t.position,t.quaternion,t.scale),t.matrix.premultiply(p),t.matrix.decompose(t.position,t.quaternion,t.scale),t.matrixWorldNeedsUpdate=!0,t.visible=!0;var o="Daydream Controller"===r.id?0:1;b[e]!==r.buttons[o].pressed&&(b[e]=r.buttons[o].pressed,!0===b[e]?t.dispatchEvent({type:"selectstart"}):(t.dispatchEvent({type:"selectend"}),t.dispatchEvent({type:"select"})))}else t.visible=!1}}var i=this,o=null,s=null,d=null,l=[],p=new Matrix4,m=new Matrix4,u=1,c="stage";"undefined"!=typeof window&&"VRFrameData"in window&&(s=new window.VRFrameData,window.addEventListener("vrdisplaypresentchange",r,!1));var g=new Matrix4,h=new Quaternion,f=new Vector3,x=new PerspectiveCamera;x.bounds=new Vector4(0,0,.5,1),x.layers.enable(1);var y=new PerspectiveCamera;y.bounds=new Vector4(.5,0,.5,1),y.layers.enable(2);var _=new ArrayCamera([x,y]);_.layers.enable(1),_.layers.enable(2);var b=[],E,v;this.enabled=!1,this.getController=function(e){var t=l[e];return void 0===t&&(t=new Group,t.matrixAutoUpdate=!1,t.visible=!1,l[e]=t),t},this.getDevice=function(){return o},this.setDevice=function(e){e!==void 0&&(o=e),T.setContext(e)},this.setFramebufferScaleFactor=function(e){u=e},this.setFrameOfReferenceType=function(e){c=e},this.setPoseTarget=function(e){e!==void 0&&(d=e)},this.getCamera=function(e){var t="stage"===c?1.6:0;if(null===o)return e.position.set(0,t,0),e;if(o.depthNear=e.near,o.depthFar=e.far,o.getFrameData(s),"stage"===c){var r=o.stageParameters;r?p.fromArray(r.sittingToStandingTransform):p.makeTranslation(0,t,0)}var a=s.pose,i=null===d?e:d;if(i.matrix.copy(p),i.matrix.decompose(i.position,i.quaternion,i.scale),null!==a.orientation&&(h.fromArray(a.orientation),i.quaternion.multiply(h)),null!==a.position&&(h.setFromRotationMatrix(p),f.fromArray(a.position),f.applyQuaternion(h),i.position.add(f)),i.updateMatrixWorld(),!1===o.isPresenting)return e;x.near=e.near,y.near=e.near,x.far=e.far,y.far=e.far,x.matrixWorldInverse.fromArray(s.leftViewMatrix),y.matrixWorldInverse.fromArray(s.rightViewMatrix),m.getInverse(p),"stage"===c&&(x.matrixWorldInverse.multiply(m),y.matrixWorldInverse.multiply(m));var l=i.parent;null!==l&&(g.getInverse(l.matrixWorld),x.matrixWorldInverse.multiply(g),y.matrixWorldInverse.multiply(g)),x.matrixWorld.getInverse(x.matrixWorldInverse),y.matrixWorld.getInverse(y.matrixWorldInverse),x.projectionMatrix.fromArray(s.leftProjectionMatrix),y.projectionMatrix.fromArray(s.rightProjectionMatrix),setProjectionFromUnion(_,x,y);var u=o.getLayers();if(u.length){var b=u[0];null!==b.leftBounds&&4===b.leftBounds.length&&x.bounds.fromArray(b.leftBounds),null!==b.rightBounds&&4===b.rightBounds.length&&y.bounds.fromArray(b.rightBounds)}return n(),_},this.getStandingMatrix=function(){return p},this.isPresenting=t;var T=new WebGLAnimation;this.setAnimationLoop=function(e){T.setAnimationLoop(e)},this.submitFrame=function(){t()&&o.submitFrame()},this.dispose=function(){"undefined"!=typeof window&&window.removeEventListener("vrdisplaypresentchange",r)}}function WebXRManager(e){function t(){return null!==d&&null!==p}function r(e){var t=c[g.indexOf(e.inputSource)];t&&t.dispatchEvent({type:e.type})}function a(){e.setFramebuffer(null),_.stop()}function n(e,t){null===t?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.getInverse(e.matrixWorld)}function i(e,t){if(u=t.getDevicePose(p),null!==u)for(var r=d.baseLayer,a=t.views,n=0;n<a.length;n++){var o=a[n],s=r.getViewport(o),l=u.getViewMatrix(o),m=x.cameras[n];m.matrix.fromArray(l).getInverse(m.matrix),m.projectionMatrix.fromArray(o.projectionMatrix),m.viewport.set(s.x,s.y,s.width,s.height),0==n&&x.matrix.copy(m.matrix)}for(var n=0;n<c.length;n++){var h=c[n],f=g[n];if(f){var _=t.getInputPose(f,p);if(null!==_){"targetRay"in _?h.matrix.elements=_.targetRay.transformMatrix:"pointerMatrix"in _&&(h.matrix.elements=_.pointerMatrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.visible=!0;continue}}h.visible=!1}y&&y(e)}var o=e.context,s=null,d=null,l=1,p=null,m="stage",u=null,c=[],g=[],h=new PerspectiveCamera;h.layers.enable(1),h.viewport=new Vector4;var f=new PerspectiveCamera;f.layers.enable(2),f.viewport=new Vector4;var x=new ArrayCamera([h,f]);x.layers.enable(1),x.layers.enable(2),this.enabled=!1,this.getController=function(e){var t=c[e];return void 0===t&&(t=new Group,t.matrixAutoUpdate=!1,t.visible=!1,c[e]=t),t},this.getDevice=function(){return s},this.setDevice=function(e){e!==void 0&&(s=e),e instanceof XRDevice&&o.setCompatibleXRDevice(e)},this.setFramebufferScaleFactor=function(e){l=e},this.setFrameOfReferenceType=function(e){m=e},this.setSession=function(t){d=t,null!==d&&(d.addEventListener("select",r),d.addEventListener("selectstart",r),d.addEventListener("selectend",r),d.addEventListener("end",a),d.baseLayer=new XRWebGLLayer(d,o,{framebufferScaleFactor:l}),d.requestFrameOfReference(m).then(function(t){p=t,e.setFramebuffer(d.baseLayer.framebuffer),_.setContext(d),_.start()}),g=d.getInputSources(),d.addEventListener("inputsourceschange",function(){g=d.getInputSources(),console.log(g);for(var e=0,t;e<c.length;e++)t=c[e],t.userData.inputSource=g[e]}))},this.getCamera=function(e){if(t()){var r=e.parent,a=x.cameras;n(x,r);for(var o=0;o<a.length;o++)n(a[o],r);e.matrixWorld.copy(x.matrixWorld);for(var s=e.children,o=0,d=s.length;o<d;o++)s[o].updateMatrixWorld(!0);return setProjectionFromUnion(x,h,f),x}return e},this.isPresenting=t;var y=null,_=new WebGLAnimation;_.setAnimationLoop(i),this.setAnimationLoop=function(e){y=e},this.dispose=function(){},this.getStandingMatrix=function(){return console.warn("THREE.WebXRManager: getStandingMatrix() is no longer needed."),new THREE.Matrix4},this.submitFrame=function(){}}function WebGLRenderer(e){var F=Math.sqrt,z=Math.LN2,N=Math.log,D=Math.max;function t(){return null===K?pe:1}function r(){ve=new WebGLExtensions(be),Te=new WebGLCapabilities(be,ve,e),Te.isWebGL2||(ve.get("WEBGL_depth_texture"),ve.get("OES_texture_float"),ve.get("OES_texture_half_float"),ve.get("OES_texture_half_float_linear"),ve.get("OES_standard_derivatives"),ve.get("OES_element_index_uint"),ve.get("ANGLE_instanced_arrays")),ve.get("OES_texture_float_linear"),Ie=new WebGLUtils(be,ve,Te),Me=new WebGLState(be,ve,Ie,Te),Me.scissor(ie.copy(ue).multiplyScalar(pe)),Me.viewport(ne.copy(me).multiplyScalar(pe)),Se=new WebGLInfo(be),Ae=new WebGLProperties,we=new WebGLTextures(be,ve,Me,Ae,Te,Ie,Se),Re=new WebGLAttributes(be),Le=new WebGLGeometries(be,Re,Se),Pe=new WebGLObjects(Le,Se),ze=new WebGLMorphtargets(be),Ce=new WebGLPrograms(Z,ve,Te),Be=new WebGLRenderLists,Ue=new WebGLRenderStates,Fe=new WebGLBackground(Z,Me,Pe,H),Ne=new WebGLBufferRenderer(be,ve,Se,Te),De=new WebGLIndexedBufferRenderer(be,ve,Se,Te),Se.programs=Ce.programs,Z.context=be,Z.capabilities=Te,Z.extensions=ve,Z.properties=Ae,Z.renderLists=Be,Z.state=Me,Z.info=Se}function a(e){e.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),J=!0}function n(){console.log("THREE.WebGLRenderer: Context Restored."),J=!1,r()}function o(e){var t=e.target;t.removeEventListener("dispose",o),s(t)}function s(e){d(e),Ae.remove(e)}function d(e){var t=Ae.get(e).program;e.program=void 0,t!==void 0&&Ce.releaseProgram(t)}function l(e,t){e.render(function(e){Z.renderBufferImmediate(e,t)})}function p(e,t,r){if(r&&r.isInstancedBufferGeometry&!Te.isWebGL2&&null===ve.get("ANGLE_instanced_arrays"))return void console.error("THREE.WebGLRenderer.setupVertexAttributes: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");Me.initAttributes();var a=r.attributes,n=t.getAttributes(),i=e.defaultAttributeValues;for(var o in n){var s=n[o];if(0<=s){var d=a[o];if(d!==void 0){var l=d.normalized,p=d.itemSize,m=Re.get(d);if(m===void 0)continue;var u=m.buffer,c=m.type,g=m.bytesPerElement;if(d.isInterleavedBufferAttribute){var h=d.data,f=h.stride,x=d.offset;h&&h.isInstancedInterleavedBuffer?(Me.enableAttributeAndDivisor(s,h.meshPerAttribute),r.maxInstancedCount===void 0&&(r.maxInstancedCount=h.meshPerAttribute*h.count)):Me.enableAttribute(s),be.bindBuffer(be.ARRAY_BUFFER,u),be.vertexAttribPointer(s,p,c,l,f*g,x*g)}else d.isInstancedBufferAttribute?(Me.enableAttributeAndDivisor(s,d.meshPerAttribute),void 0===r.maxInstancedCount&&(r.maxInstancedCount=d.meshPerAttribute*d.count)):Me.enableAttribute(s),be.bindBuffer(be.ARRAY_BUFFER,u),be.vertexAttribPointer(s,p,c,l,0,0)}else if(i!==void 0){var y=i[o];if(y!==void 0)switch(y.length){case 2:be.vertexAttrib2fv(s,y);break;case 3:be.vertexAttrib3fv(s,y);break;case 4:be.vertexAttrib4fv(s,y);break;default:be.vertexAttrib1fv(s,y);}}}}Me.disableUnusedAttributes()}function m(e){Oe.isPresenting()||Ge&&Ge(e)}function u(e,t,r,a){if(!1!==e.visible){var n=e.layers.test(t.layers);if(n)if(e.isGroup)r=e.renderOrder;else if(e.isLight)Y.pushLight(e),e.castShadow&&Y.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||ge.intersectsSprite(e)){a&&_e.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ye);var o=Pe.update(e),s=e.material;j.push(e,o,s,r,_e.z,null)}}else if(e.isImmediateRenderObject)a&&_e.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ye),j.push(e,null,e.material,r,_e.z,null);else if((e.isMesh||e.isLine||e.isPoints)&&(e.isSkinnedMesh&&e.skeleton.update(),!e.frustumCulled||ge.intersectsObject(e))){a&&_e.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ye);var o=Pe.update(e),s=e.material;if(Array.isArray(s))for(var d=o.groups,p=0,m=d.length;p<m;p++){var c=d[p],g=s[c.materialIndex];g&&g.visible&&j.push(e,o,g,r,_e.z,c)}else s.visible&&j.push(e,o,s,r,_e.z,null)}for(var h=e.children,p=0,m=h.length;p<m;p++)u(h[p],t,r,a)}}function c(e,t,r,a){for(var n=0,o=e.length;n<o;n++){var s=e[n],d=s.object,l=s.geometry,p=a===void 0?s.material:a,m=s.group;if(r.isArrayCamera){ae=r;for(var u=r.cameras,c=0,h=u.length,f;c<h;c++)if(f=u[c],d.layers.test(f.layers)){if("viewport"in f)Me.viewport(ne.copy(f.viewport));else{var _=f.bounds,b=_.x*de,x=_.y*le,y=_.z*de,E=_.w*le;Me.viewport(ne.set(b,x,y,E).multiplyScalar(pe))}Y.setupLights(f),g(d,t,f,l,p,m)}}else ae=null,g(d,t,r,l,p,m)}}function g(e,t,r,a,n,i){if(e.onBeforeRender(Z,t,r,a,n,i),Y=Ue.get(t,ae||r),e.modelViewMatrix.multiplyMatrices(r.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),e.isImmediateRenderObject){Me.setMaterial(n);var o=f(r,t.fog,n,e);te.geometry=null,te.program=null,te.wireframe=!1,l(e,o)}else Z.renderBufferDirect(r,t.fog,a,n,e,i);e.onAfterRender(Z,t,r,a,n,i),Y=Ue.get(t,ae||r)}function h(e,t,r){var a=Ae.get(e),n=Y.state.lights,s=Y.state.shadowsArray,l=a.lightsHash,p=n.state.hash,m=Ce.getParameters(e,n.state,s,t,he.numPlanes,he.numIntersection,r),u=Ce.getProgramCode(e,m),c=a.program,g=!0;if(c===void 0)e.addEventListener("dispose",o);else if(c.code!==u)d(e);else if(l.stateID!==p.stateID||l.directionalLength!==p.directionalLength||l.pointLength!==p.pointLength||l.spotLength!==p.spotLength||l.rectAreaLength!==p.rectAreaLength||l.hemiLength!==p.hemiLength||l.shadowsLength!==p.shadowsLength)l.stateID=p.stateID,l.directionalLength=p.directionalLength,l.pointLength=p.pointLength,l.spotLength=p.spotLength,l.rectAreaLength=p.rectAreaLength,l.hemiLength=p.hemiLength,l.shadowsLength=p.shadowsLength,g=!1;else{if(void 0!==m.shaderID)return;g=!1}if(g){if(m.shaderID){var h=ShaderLib[m.shaderID];a.shader={name:e.type,uniforms:cloneUniforms(h.uniforms),vertexShader:h.vertexShader,fragmentShader:h.fragmentShader}}else a.shader={name:e.type,uniforms:e.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader};e.onBeforeCompile(a.shader,Z),u=Ce.getProgramCode(e,m),c=Ce.acquireProgram(e,a.shader,m,u),a.program=c,e.program=c}var f=c.getAttributes();if(e.morphTargets){e.numSupportedMorphTargets=0;for(var x=0;x<Z.maxMorphTargets;x++)0<=f["morphTarget"+x]&&e.numSupportedMorphTargets++}if(e.morphNormals){e.numSupportedMorphNormals=0;for(var x=0;x<Z.maxMorphNormals;x++)0<=f["morphNormal"+x]&&e.numSupportedMorphNormals++}var y=a.shader.uniforms;(e.isShaderMaterial||e.isRawShaderMaterial)&&!0!==e.clipping||(a.numClippingPlanes=he.numPlanes,a.numIntersection=he.numIntersection,y.clippingPlanes=he.uniform),a.fog=t,l===void 0&&(a.lightsHash=l={}),l.stateID=p.stateID,l.directionalLength=p.directionalLength,l.pointLength=p.pointLength,l.spotLength=p.spotLength,l.rectAreaLength=p.rectAreaLength,l.hemiLength=p.hemiLength,l.shadowsLength=p.shadowsLength,e.lights&&(y.ambientLightColor.value=n.state.ambient,y.directionalLights.value=n.state.directional,y.spotLights.value=n.state.spot,y.rectAreaLights.value=n.state.rectArea,y.pointLights.value=n.state.point,y.hemisphereLights.value=n.state.hemi,y.directionalShadowMap.value=n.state.directionalShadowMap,y.directionalShadowMatrix.value=n.state.directionalShadowMatrix,y.spotShadowMap.value=n.state.spotShadowMap,y.spotShadowMatrix.value=n.state.spotShadowMatrix,y.pointShadowMap.value=n.state.pointShadowMap,y.pointShadowMatrix.value=n.state.pointShadowMatrix);var _=a.program.getUniforms(),b=WebGLUniforms.seqWithValue(_.seq,y);a.uniformsList=b}function f(e,t,r,a){se=0;var n=Ae.get(r),i=Y.state.lights,o=n.lightsHash,s=i.state.hash;if(fe&&(xe||e!==re)){var d=e===re&&r.id===ee;he.setState(r.clippingPlanes,r.clipIntersection,r.clipShadows,e,n,d)}!1===r.needsUpdate&&(void 0===n.program?r.needsUpdate=!0:r.fog&&n.fog!==t?r.needsUpdate=!0:r.lights&&(o.stateID!==s.stateID||o.directionalLength!==s.directionalLength||o.pointLength!==s.pointLength||o.spotLength!==s.spotLength||o.rectAreaLength!==s.rectAreaLength||o.hemiLength!==s.hemiLength||o.shadowsLength!==s.shadowsLength)?r.needsUpdate=!0:void 0!==n.numClippingPlanes&&(n.numClippingPlanes!==he.numPlanes||n.numIntersection!==he.numIntersection)&&(r.needsUpdate=!0)),r.needsUpdate&&(h(r,t,a),r.needsUpdate=!1);var l=!1,p=!1,m=!1,u=n.program,c=u.getUniforms(),g=n.shader.uniforms;if(Me.useProgram(u.program)&&(l=!0,p=!0,m=!0),r.id!==ee&&(ee=r.id,p=!0),l||re!==e){if(c.setValue(be,"projectionMatrix",e.projectionMatrix),Te.logarithmicDepthBuffer&&c.setValue(be,"logDepthBufFC",2/(N(e.far+1)/z)),re!==e&&(re=e,p=!0,m=!0),r.isShaderMaterial||r.isMeshPhongMaterial||r.isMeshStandardMaterial||r.envMap){var f=c.map.cameraPosition;void 0!==f&&f.setValue(be,_e.setFromMatrixPosition(e.matrixWorld))}(r.isMeshPhongMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial||r.skinning)&&c.setValue(be,"viewMatrix",e.matrixWorldInverse)}if(r.skinning){c.setOptional(be,a,"bindMatrix"),c.setOptional(be,a,"bindMatrixInverse");var U=a.skeleton;if(U){var I=U.bones;if(Te.floatVertexTextures){if(void 0===U.boneTexture){var O=F(4*I.length);O=_Math.ceilPowerOfTwo(O),O=D(O,4);var G=new Float32Array(4*(O*O));G.set(U.boneMatrices);var W=new DataTexture(G,O,O,RGBAFormat,FloatType);W.needsUpdate=!0,U.boneMatrices=G,U.boneTexture=W,U.boneTextureSize=O}c.setValue(be,"boneTexture",U.boneTexture),c.setValue(be,"boneTextureSize",U.boneTextureSize)}else c.setOptional(be,U,"boneMatrices")}}return p&&(c.setValue(be,"toneMappingExposure",Z.toneMappingExposure),c.setValue(be,"toneMappingWhitePoint",Z.toneMappingWhitePoint),r.lights&&B(g,m),t&&r.fog&&v(g,t),r.isMeshBasicMaterial?x(g,r):r.isMeshLambertMaterial?(x(g,r),T(g,r)):r.isMeshPhongMaterial?(x(g,r),r.isMeshToonMaterial?S(g,r):M(g,r)):r.isMeshStandardMaterial?(x(g,r),r.isMeshPhysicalMaterial?w(g,r):A(g,r)):r.isMeshMatcapMaterial?(x(g,r),R(g,r)):r.isMeshDepthMaterial?(x(g,r),L(g,r)):r.isMeshDistanceMaterial?(x(g,r),P(g,r)):r.isMeshNormalMaterial?(x(g,r),C(g,r)):r.isLineBasicMaterial?(y(g,r),r.isLineDashedMaterial&&_(g,r)):r.isPointsMaterial?b(g,r):r.isSpriteMaterial?E(g,r):r.isShadowMaterial&&(g.color.value=r.color,g.opacity.value=r.opacity),void 0!==g.ltc_1&&(g.ltc_1.value=UniformsLib.LTC_1),void 0!==g.ltc_2&&(g.ltc_2.value=UniformsLib.LTC_2),WebGLUniforms.upload(be,n.uniformsList,g,Z)),r.isShaderMaterial&&!0===r.uniformsNeedUpdate&&(WebGLUniforms.upload(be,n.uniformsList,g,Z),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&c.setValue(be,"center",a.center),c.setValue(be,"modelViewMatrix",a.modelViewMatrix),c.setValue(be,"normalMatrix",a.normalMatrix),c.setValue(be,"modelMatrix",a.matrixWorld),u}function x(e,t){e.opacity.value=t.opacity,t.color&&(e.diffuse.value=t.color),t.emissive&&e.emissive.value.copy(t.emissive).multiplyScalar(t.emissiveIntensity),t.map&&(e.map.value=t.map),t.alphaMap&&(e.alphaMap.value=t.alphaMap),t.specularMap&&(e.specularMap.value=t.specularMap),t.envMap&&(e.envMap.value=t.envMap,e.flipEnvMap.value=t.envMap.isCubeTexture?-1:1,e.reflectivity.value=t.reflectivity,e.refractionRatio.value=t.refractionRatio,e.maxMipLevel.value=Ae.get(t.envMap).__maxMipLevel),t.lightMap&&(e.lightMap.value=t.lightMap,e.lightMapIntensity.value=t.lightMapIntensity),t.aoMap&&(e.aoMap.value=t.aoMap,e.aoMapIntensity.value=t.aoMapIntensity);var r;t.map?r=t.map:t.specularMap?r=t.specularMap:t.displacementMap?r=t.displacementMap:t.normalMap?r=t.normalMap:t.bumpMap?r=t.bumpMap:t.roughnessMap?r=t.roughnessMap:t.metalnessMap?r=t.metalnessMap:t.alphaMap?r=t.alphaMap:t.emissiveMap&&(r=t.emissiveMap),r!==void 0&&(r.isWebGLRenderTarget&&(r=r.texture),!0===r.matrixAutoUpdate&&r.updateMatrix(),e.uvTransform.value.copy(r.matrix))}function y(e,t){e.diffuse.value=t.color,e.opacity.value=t.opacity}function _(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function b(e,t){e.diffuse.value=t.color,e.opacity.value=t.opacity,e.size.value=t.size*pe,e.scale.value=.5*le,e.map.value=t.map,null!==t.map&&(!0===t.map.matrixAutoUpdate&&t.map.updateMatrix(),e.uvTransform.value.copy(t.map.matrix))}function E(e,t){e.diffuse.value=t.color,e.opacity.value=t.opacity,e.rotation.value=t.rotation,e.map.value=t.map,null!==t.map&&(!0===t.map.matrixAutoUpdate&&t.map.updateMatrix(),e.uvTransform.value.copy(t.map.matrix))}function v(e,t){e.fogColor.value=t.color,t.isFog?(e.fogNear.value=t.near,e.fogFar.value=t.far):t.isFogExp2&&(e.fogDensity.value=t.density)}function T(e,t){t.emissiveMap&&(e.emissiveMap.value=t.emissiveMap)}function M(e,t){e.specular.value=t.specular,e.shininess.value=D(t.shininess,1e-4),t.emissiveMap&&(e.emissiveMap.value=t.emissiveMap),t.bumpMap&&(e.bumpMap.value=t.bumpMap,e.bumpScale.value=t.bumpScale,t.side===BackSide&&(e.bumpScale.value*=-1)),t.normalMap&&(e.normalMap.value=t.normalMap,e.normalScale.value.copy(t.normalScale),t.side===BackSide&&e.normalScale.value.negate()),t.displacementMap&&(e.displacementMap.value=t.displacementMap,e.displacementScale.value=t.displacementScale,e.displacementBias.value=t.displacementBias)}function S(e,t){M(e,t),t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function A(e,t){e.roughness.value=t.roughness,e.metalness.value=t.metalness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap),t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap),t.emissiveMap&&(e.emissiveMap.value=t.emissiveMap),t.bumpMap&&(e.bumpMap.value=t.bumpMap,e.bumpScale.value=t.bumpScale,t.side===BackSide&&(e.bumpScale.value*=-1)),t.normalMap&&(e.normalMap.value=t.normalMap,e.normalScale.value.copy(t.normalScale),t.side===BackSide&&e.normalScale.value.negate()),t.displacementMap&&(e.displacementMap.value=t.displacementMap,e.displacementScale.value=t.displacementScale,e.displacementBias.value=t.displacementBias),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function w(e,t){A(e,t),e.reflectivity.value=t.reflectivity,e.clearCoat.value=t.clearCoat,e.clearCoatRoughness.value=t.clearCoatRoughness}function R(e,t){t.matcap&&(e.matcap.value=t.matcap),t.bumpMap&&(e.bumpMap.value=t.bumpMap,e.bumpScale.value=t.bumpScale,t.side===BackSide&&(e.bumpScale.value*=-1)),t.normalMap&&(e.normalMap.value=t.normalMap,e.normalScale.value.copy(t.normalScale),t.side===BackSide&&e.normalScale.value.negate()),t.displacementMap&&(e.displacementMap.value=t.displacementMap,e.displacementScale.value=t.displacementScale,e.displacementBias.value=t.displacementBias)}function L(e,t){t.displacementMap&&(e.displacementMap.value=t.displacementMap,e.displacementScale.value=t.displacementScale,e.displacementBias.value=t.displacementBias)}function P(e,t){t.displacementMap&&(e.displacementMap.value=t.displacementMap,e.displacementScale.value=t.displacementScale,e.displacementBias.value=t.displacementBias),e.referencePosition.value.copy(t.referencePosition),e.nearDistance.value=t.nearDistance,e.farDistance.value=t.farDistance}function C(e,t){t.bumpMap&&(e.bumpMap.value=t.bumpMap,e.bumpScale.value=t.bumpScale,t.side===BackSide&&(e.bumpScale.value*=-1)),t.normalMap&&(e.normalMap.value=t.normalMap,e.normalScale.value.copy(t.normalScale),t.side===BackSide&&e.normalScale.value.negate()),t.displacementMap&&(e.displacementMap.value=t.displacementMap,e.displacementScale.value=t.displacementScale,e.displacementBias.value=t.displacementBias)}function B(e,t){e.ambientLightColor.needsUpdate=t,e.directionalLights.needsUpdate=t,e.pointLights.needsUpdate=t,e.spotLights.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function U(){var e=se;return e>=Te.maxTextures&&console.warn("THREE.WebGLRenderer: Trying to use "+e+" texture units while this GPU supports only "+Te.maxTextures),se+=1,e}console.log("THREE.WebGLRenderer",REVISION),e=e||{};var I=e.canvas===void 0?document.createElementNS("http://www.w3.org/1999/xhtml","canvas"):e.canvas,O=e.context===void 0?null:e.context,G=e.alpha!==void 0&&e.alpha,W=!(e.depth!==void 0)||e.depth,V=!(e.stencil!==void 0)||e.stencil,k=e.antialias!==void 0&&e.antialias,H=!(e.premultipliedAlpha!==void 0)||e.premultipliedAlpha,X=e.preserveDrawingBuffer!==void 0&&e.preserveDrawingBuffer,q=e.powerPreference===void 0?"default":e.powerPreference,j=null,Y=null;this.domElement=I,this.context=null,this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.gammaFactor=2,this.gammaInput=!1,this.gammaOutput=!1,this.physicallyCorrectLights=!1,this.toneMapping=LinearToneMapping,this.toneMappingExposure=1,this.toneMappingWhitePoint=1,this.maxMorphTargets=8,this.maxMorphNormals=4;var Z=this,J=!1,Q=null,K=null,$=null,ee=-1,te={geometry:null,program:null,wireframe:!1},re=null,ae=null,ne=new Vector4,ie=new Vector4,oe=null,se=0,de=I.width,le=I.height,pe=1,me=new Vector4(0,0,de,le),ue=new Vector4(0,0,de,le),ce=!1,ge=new Frustum,he=new WebGLClipping,fe=!1,xe=!1,ye=new Matrix4,_e=new Vector3,be;try{var Ee={alpha:G,depth:W,stencil:V,antialias:k,premultipliedAlpha:H,preserveDrawingBuffer:X,powerPreference:q};if(I.addEventListener("webglcontextlost",a,!1),I.addEventListener("webglcontextrestored",n,!1),be=O||I.getContext("webgl",Ee)||I.getContext("experimental-webgl",Ee),null===be)if(null!==I.getContext("webgl"))throw new Error("Error creating WebGL context with your selected attributes.");else throw new Error("Error creating WebGL context.");void 0===be.getShaderPrecisionFormat&&(be.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(e){console.error("THREE.WebGLRenderer: "+e.message)}var ve,Te,Me,Se,Ae,we,Re,Le,Pe,Ce,Be,Ue,Fe,ze,Ne,De,Ie;r();var Oe=null;"undefined"!=typeof navigator&&(Oe="xr"in navigator?new WebXRManager(Z):new WebVRManager(Z)),this.vr=Oe;var i=new WebGLShadowMap(Z,Pe,Te.maxTextureSize);this.shadowMap=i,this.getContext=function(){return be},this.getContextAttributes=function(){return be.getContextAttributes()},this.forceContextLoss=function(){var e=ve.get("WEBGL_lose_context");e&&e.loseContext()},this.forceContextRestore=function(){var e=ve.get("WEBGL_lose_context");e&&e.restoreContext()},this.getPixelRatio=function(){return pe},this.setPixelRatio=function(e){void 0===e||(pe=e,this.setSize(de,le,!1))},this.getSize=function(){return{width:de,height:le}},this.setSize=function(e,t,r){return Oe.isPresenting()?void console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):void(de=e,le=t,I.width=e*pe,I.height=t*pe,!1!==r&&(I.style.width=e+"px",I.style.height=t+"px"),this.setViewport(0,0,e,t))},this.getDrawingBufferSize=function(){return{width:de*pe,height:le*pe}},this.setDrawingBufferSize=function(e,t,r){de=e,le=t,pe=r,I.width=e*r,I.height=t*r,this.setViewport(0,0,e,t)},this.getCurrentViewport=function(){return ne},this.setViewport=function(e,t,r,a){me.set(e,le-t-a,r,a),Me.viewport(ne.copy(me).multiplyScalar(pe))},this.setScissor=function(e,t,r,a){ue.set(e,le-t-a,r,a),Me.scissor(ie.copy(ue).multiplyScalar(pe))},this.setScissorTest=function(e){Me.setScissorTest(ce=e)},this.getClearColor=function(){return Fe.getClearColor()},this.setClearColor=function(){Fe.setClearColor.apply(Fe,arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha.apply(Fe,arguments)},this.clear=function(e,t,r){var a=0;(e===void 0||e)&&(a|=be.COLOR_BUFFER_BIT),(t===void 0||t)&&(a|=be.DEPTH_BUFFER_BIT),(r===void 0||r)&&(a|=be.STENCIL_BUFFER_BIT),be.clear(a)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){I.removeEventListener("webglcontextlost",a,!1),I.removeEventListener("webglcontextrestored",n,!1),Be.dispose(),Ue.dispose(),Ae.dispose(),Pe.dispose(),Oe.dispose(),We.stop()},this.renderBufferImmediate=function(e,t){Me.initAttributes();var r=Ae.get(e);e.hasPositions&&!r.position&&(r.position=be.createBuffer()),e.hasNormals&&!r.normal&&(r.normal=be.createBuffer()),e.hasUvs&&!r.uv&&(r.uv=be.createBuffer()),e.hasColors&&!r.color&&(r.color=be.createBuffer());var a=t.getAttributes();e.hasPositions&&(be.bindBuffer(be.ARRAY_BUFFER,r.position),be.bufferData(be.ARRAY_BUFFER,e.positionArray,be.DYNAMIC_DRAW),Me.enableAttribute(a.position),be.vertexAttribPointer(a.position,3,be.FLOAT,!1,0,0)),e.hasNormals&&(be.bindBuffer(be.ARRAY_BUFFER,r.normal),be.bufferData(be.ARRAY_BUFFER,e.normalArray,be.DYNAMIC_DRAW),Me.enableAttribute(a.normal),be.vertexAttribPointer(a.normal,3,be.FLOAT,!1,0,0)),e.hasUvs&&(be.bindBuffer(be.ARRAY_BUFFER,r.uv),be.bufferData(be.ARRAY_BUFFER,e.uvArray,be.DYNAMIC_DRAW),Me.enableAttribute(a.uv),be.vertexAttribPointer(a.uv,2,be.FLOAT,!1,0,0)),e.hasColors&&(be.bindBuffer(be.ARRAY_BUFFER,r.color),be.bufferData(be.ARRAY_BUFFER,e.colorArray,be.DYNAMIC_DRAW),Me.enableAttribute(a.color),be.vertexAttribPointer(a.color,3,be.FLOAT,!1,0,0)),Me.disableUnusedAttributes(),be.drawArrays(be.TRIANGLES,0,e.count),e.count=0},this.renderBufferDirect=function(e,r,a,n,i,o){var s=i.isMesh&&0>i.normalMatrix.determinant();Me.setMaterial(n,s);var d=f(e,r,n,i),l=!1;(te.geometry!==a.id||te.program!==d.id||te.wireframe!==(!0===n.wireframe))&&(te.geometry=a.id,te.program=d.id,te.wireframe=!0===n.wireframe,l=!0),i.morphTargetInfluences&&(ze.update(i,a,n,d),l=!0);var m=a.index,u=a.attributes.position,c=1;!0===n.wireframe&&(m=Le.getWireframeAttribute(a),c=2);var g=Ne,h;null!==m&&(h=Re.get(m),g=De,g.setIndex(h)),l&&(p(n,d,a),null!==m&&be.bindBuffer(be.ELEMENT_ARRAY_BUFFER,h.buffer));var x=1/0;null===m?u!==void 0&&(x=u.count):x=m.count;var y=a.drawRange.start*c,_=a.drawRange.count*c,b=null===o?0:o.start*c,E=null===o?1/0:o.count*c,v=D(y,b),T=Math.min(x,y+_,b+E)-1,M=D(0,T-v+1);if(0!==M){if(i.isMesh){if(!0===n.wireframe)Me.setLineWidth(n.wireframeLinewidth*t()),g.setMode(be.LINES);else switch(i.drawMode){case TrianglesDrawMode:g.setMode(be.TRIANGLES);break;case TriangleStripDrawMode:g.setMode(be.TRIANGLE_STRIP);break;case TriangleFanDrawMode:g.setMode(be.TRIANGLE_FAN);}}else if(i.isLine){var S=n.linewidth;void 0===S&&(S=1),Me.setLineWidth(S*t()),i.isLineSegments?g.setMode(be.LINES):i.isLineLoop?g.setMode(be.LINE_LOOP):g.setMode(be.LINE_STRIP)}else i.isPoints?g.setMode(be.POINTS):i.isSprite&&g.setMode(be.TRIANGLES);a&&a.isInstancedBufferGeometry?0<a.maxInstancedCount&&g.renderInstances(a,v,M):g.render(v,M)}},this.compile=function(e,t){Y=Ue.get(e,t),Y.init(),e.traverse(function(e){e.isLight&&(Y.pushLight(e),e.castShadow&&Y.pushShadow(e))}),Y.setupLights(t),e.traverse(function(t){if(t.material)if(Array.isArray(t.material))for(var r=0;r<t.material.length;r++)h(t.material[r],e.fog,t);else h(t.material,e.fog,t)})};var Ge=null,We=new WebGLAnimation;We.setAnimationLoop(m),"undefined"!=typeof window&&We.setContext(window),this.setAnimationLoop=function(e){Ge=e,Oe.setAnimationLoop(e),We.start()},this.render=function(e,t,r,a){if(!(t&&t.isCamera))return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(!J){te.geometry=null,te.program=null,te.wireframe=!1,ee=-1,re=null,!0===e.autoUpdate&&e.updateMatrixWorld(),null===t.parent&&t.updateMatrixWorld(),Oe.enabled&&(t=Oe.getCamera(t)),Y=Ue.get(e,t),Y.init(),e.onBeforeRender(Z,e,t,r),ye.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),ge.setFromMatrix(ye),xe=this.localClippingEnabled,fe=he.init(this.clippingPlanes,xe,t),j=Be.get(e,t),j.init(),u(e,t,0,Z.sortObjects),!0===Z.sortObjects&&j.sort(),fe&&he.beginShadows();var n=Y.state.shadowsArray;i.render(n,e,t),Y.setupLights(t),fe&&he.endShadows(),this.info.autoReset&&this.info.reset(),void 0===r&&(r=null),this.setRenderTarget(r),Fe.render(j,e,t,a);var o=j.opaque,s=j.transparent;if(e.overrideMaterial){var d=e.overrideMaterial;o.length&&c(o,e,t,d),s.length&&c(s,e,t,d)}else o.length&&c(o,e,t),s.length&&c(s,e,t);r&&(we.updateRenderTargetMipmap(r),we.updateMultisampleRenderTarget(r)),Me.buffers.depth.setTest(!0),Me.buffers.depth.setMask(!0),Me.buffers.color.setMask(!0),Me.setPolygonOffset(!1),e.onAfterRender(Z,e,t),Oe.enabled&&Oe.submitFrame(),j=null,Y=null}},this.allocTextureUnit=U,this.setTexture2D=function(){var e=!1;return function(t,r){t&&t.isWebGLRenderTarget&&(!e&&(console.warn("THREE.WebGLRenderer.setTexture2D: don't use render targets as textures. Use their .texture property instead."),e=!0),t=t.texture),we.setTexture2D(t,r)}}(),this.setTexture3D=function(){return function(e,t){we.setTexture3D(e,t)}}(),this.setTexture=function(){var e=!1;return function(t,r){e||(console.warn("THREE.WebGLRenderer: .setTexture is deprecated, use setTexture2D instead."),e=!0),we.setTexture2D(t,r)}}(),this.setTextureCube=function(){var e=!1;return function(t,r){t&&t.isWebGLRenderTargetCube&&(!e&&(console.warn("THREE.WebGLRenderer.setTextureCube: don't use cube render targets as textures. Use their .texture property instead."),e=!0),t=t.texture),t&&t.isCubeTexture||Array.isArray(t.image)&&6===t.image.length?we.setTextureCube(t,r):we.setTextureCubeDynamic(t,r)}}(),this.setFramebuffer=function(e){Q=e},this.getRenderTarget=function(){return K},this.setRenderTarget=function(e){K=e,e&&void 0===Ae.get(e).__webglFramebuffer&&we.setupRenderTarget(e);var t=Q,r=!1;if(e){var a=Ae.get(e).__webglFramebuffer;e.isWebGLRenderTargetCube?(t=a[e.activeCubeFace],r=!0):e.isWebGLMultisampleRenderTarget?t=Ae.get(e).__webglMultisampledFramebuffer:t=a,ne.copy(e.viewport),ie.copy(e.scissor),oe=e.scissorTest}else ne.copy(me).multiplyScalar(pe),ie.copy(ue).multiplyScalar(pe),oe=ce;if($!==t&&(be.bindFramebuffer(be.FRAMEBUFFER,t),$=t),Me.viewport(ne),Me.scissor(ie),Me.setScissorTest(oe),r){var n=Ae.get(e.texture);be.framebufferTexture2D(be.FRAMEBUFFER,be.COLOR_ATTACHMENT0,be.TEXTURE_CUBE_MAP_POSITIVE_X+e.activeCubeFace,n.__webglTexture,e.activeMipMapLevel)}},this.readRenderTargetPixels=function(e,t,r,a,n,i){if(!(e&&e.isWebGLRenderTarget))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");var o=Ae.get(e).__webglFramebuffer;if(o){var s=!1;o!==$&&(be.bindFramebuffer(be.FRAMEBUFFER,o),s=!0);try{var d=e.texture,l=d.format,p=d.type;if(l!==RGBAFormat&&Ie.convert(l)!==be.getParameter(be.IMPLEMENTATION_COLOR_READ_FORMAT))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(p!==UnsignedByteType&&Ie.convert(p)!==be.getParameter(be.IMPLEMENTATION_COLOR_READ_TYPE)&&!(p===FloatType&&(Te.isWebGL2||ve.get("OES_texture_float")||ve.get("WEBGL_color_buffer_float")))&&!(p===HalfFloatType&&(Te.isWebGL2?ve.get("EXT_color_buffer_float"):ve.get("EXT_color_buffer_half_float"))))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");be.checkFramebufferStatus(be.FRAMEBUFFER)===be.FRAMEBUFFER_COMPLETE?0<=t&&t<=e.width-a&&0<=r&&r<=e.height-n&&be.readPixels(t,r,a,n,Ie.convert(l),Ie.convert(p),i):console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.")}finally{s&&be.bindFramebuffer(be.FRAMEBUFFER,$)}}},this.copyFramebufferToTexture=function(e,t,r){var a=t.image.width,n=t.image.height,i=Ie.convert(t.format);this.setTexture2D(t,0),be.copyTexImage2D(be.TEXTURE_2D,r||0,i,e.x,e.y,a,n,0)},this.copyTextureToTexture=function(e,t,r,a){var n=t.image.width,i=t.image.height,o=Ie.convert(r.format),s=Ie.convert(r.type);this.setTexture2D(r,0),t.isDataTexture?be.texSubImage2D(be.TEXTURE_2D,a||0,e.x,e.y,n,i,o,s,t.image.data):be.texSubImage2D(be.TEXTURE_2D,a||0,e.x,e.y,o,s,t.image)}}class Renderer extends WebGLRenderer{constructor(e){super(Object.assign({antialias:!0},e)),this._quality=1,this._render=this.render,delete this.render}get quality(){return this._quality}set quality(e){this._quality===e||(this._quality=e,this.resize())}resize(e=this._width,t=this._height){this._width=e,this._height=t,this.setSize(this._width*window.devicePixelRatio*this.quality,this._height*window.devicePixelRatio*this.quality,!1)}render({scene:e}){this._render(e,e.camera)}}window.customElements.define("dnit-main",class extends TickerElement{constructor(){super({autoplay:!0}),this.attachShadow({mode:"open"}).innerHTML=`
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
    `,this.canvas=this.shadowRoot.querySelector("canvas"),this.renderer=new Renderer({canvas:this.canvas}),this.scene=new Scene$1({canvas:this.canvas})}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this._resizeBinded=this.resize.bind(this)),this.resize()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this._resizeBinded)}resize(){const e=this.canvas.offsetWidth,t=this.canvas.offsetHeight;this.scene.resize(e,t),this.renderer.resize(e,t),this.renderer.render({scene:this.scene})}update(){this.scene.update(),this.renderer.render({scene:this.scene})}});