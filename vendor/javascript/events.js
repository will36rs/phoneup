var e={};var t="object"===typeof Reflect?Reflect:null;var n=t&&"function"===typeof t.apply?t.apply:function ReflectApply(e,t,n){return Function.prototype.apply.call(e,t,n)};var r;r=t&&"function"===typeof t.ownKeys?t.ownKeys:Object.getOwnPropertySymbols?function ReflectOwnKeys(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function ReflectOwnKeys(e){return Object.getOwnPropertyNames(e)};function ProcessEmitWarning(e){console&&console.warn&&console.warn(e)}var i=Number.isNaN||function NumberIsNaN(e){return e!==e};function EventEmitter(){EventEmitter.init.call(this)}e=EventEmitter;e.once=once;EventEmitter.EventEmitter=EventEmitter;EventEmitter.prototype._events=void 0;EventEmitter.prototype._eventsCount=0;EventEmitter.prototype._maxListeners=void 0;var s=10;function checkListener(e){if("function"!==typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}Object.defineProperty(EventEmitter,"defaultMaxListeners",{enumerable:true,get:function(){return s},set:function(e){if("number"!==typeof e||e<0||i(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");s=e}});EventEmitter.init=function(){if(void 0===this._events||this._events===Object.getPrototypeOf(this)._events){this._events=Object.create(null);this._eventsCount=0}this._maxListeners=this._maxListeners||void 0};EventEmitter.prototype.setMaxListeners=function setMaxListeners(e){if("number"!==typeof e||e<0||i(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");this._maxListeners=e;return this};function _getMaxListeners(e){return void 0===e._maxListeners?EventEmitter.defaultMaxListeners:e._maxListeners}EventEmitter.prototype.getMaxListeners=function getMaxListeners(){return _getMaxListeners(this)};EventEmitter.prototype.emit=function emit(e){var t=[];for(var r=1;r<arguments.length;r++)t.push(arguments[r]);var i="error"===e;var s=this._events;if(void 0!==s)i=i&&void 0===s.error;else if(!i)return false;if(i){var o;t.length>0&&(o=t[0]);if(o instanceof Error)throw o;var v=new Error("Unhandled error."+(o?" ("+o.message+")":""));v.context=o;throw v}var a=s[e];if(void 0===a)return false;if("function"===typeof a)n(a,this,t);else{var u=a.length;var f=arrayClone(a,u);for(r=0;r<u;++r)n(f[r],this,t)}return true};function _addListener(e,t,n,r){var i;var s;var o;checkListener(n);s=e._events;if(void 0===s){s=e._events=Object.create(null);e._eventsCount=0}else{if(void 0!==s.newListener){e.emit("newListener",t,n.listener?n.listener:n);s=e._events}o=s[t]}if(void 0===o){o=s[t]=n;++e._eventsCount}else{"function"===typeof o?o=s[t]=r?[n,o]:[o,n]:r?o.unshift(n):o.push(n);i=_getMaxListeners(e);if(i>0&&o.length>i&&!o.warned){o.warned=true;var v=new Error("Possible EventEmitter memory leak detected. "+o.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");v.name="MaxListenersExceededWarning";v.emitter=e;v.type=t;v.count=o.length;ProcessEmitWarning(v)}}return e}EventEmitter.prototype.addListener=function addListener(e,t){return _addListener(this,e,t,false)};EventEmitter.prototype.on=EventEmitter.prototype.addListener;EventEmitter.prototype.prependListener=function prependListener(e,t){return _addListener(this,e,t,true)};function onceWrapper(){if(!this.fired){this.target.removeListener(this.type,this.wrapFn);this.fired=true;return 0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}}function _onceWrap(e,t,n){var r={fired:false,wrapFn:void 0,target:e,type:t,listener:n};var i=onceWrapper.bind(r);i.listener=n;r.wrapFn=i;return i}EventEmitter.prototype.once=function once(e,t){checkListener(t);this.on(e,_onceWrap(this,e,t));return this};EventEmitter.prototype.prependOnceListener=function prependOnceListener(e,t){checkListener(t);this.prependListener(e,_onceWrap(this,e,t));return this};EventEmitter.prototype.removeListener=function removeListener(e,t){var n,r,i,s,o;checkListener(t);r=this._events;if(void 0===r)return this;n=r[e];if(void 0===n)return this;if(n===t||n.listener===t)if(0===--this._eventsCount)this._events=Object.create(null);else{delete r[e];r.removeListener&&this.emit("removeListener",e,n.listener||t)}else if("function"!==typeof n){i=-1;for(s=n.length-1;s>=0;s--)if(n[s]===t||n[s].listener===t){o=n[s].listener;i=s;break}if(i<0)return this;0===i?n.shift():spliceOne(n,i);1===n.length&&(r[e]=n[0]);void 0!==r.removeListener&&this.emit("removeListener",e,o||t)}return this};EventEmitter.prototype.off=EventEmitter.prototype.removeListener;EventEmitter.prototype.removeAllListeners=function removeAllListeners(e){var t,n,r;n=this._events;if(void 0===n)return this;if(void 0===n.removeListener){if(0===arguments.length){this._events=Object.create(null);this._eventsCount=0}else void 0!==n[e]&&(0===--this._eventsCount?this._events=Object.create(null):delete n[e]);return this}if(0===arguments.length){var i=Object.keys(n);var s;for(r=0;r<i.length;++r){s=i[r];"removeListener"!==s&&this.removeAllListeners(s)}this.removeAllListeners("removeListener");this._events=Object.create(null);this._eventsCount=0;return this}t=n[e];if("function"===typeof t)this.removeListener(e,t);else if(void 0!==t)for(r=t.length-1;r>=0;r--)this.removeListener(e,t[r]);return this};function _listeners(e,t,n){var r=e._events;if(void 0===r)return[];var i=r[t];return void 0===i?[]:"function"===typeof i?n?[i.listener||i]:[i]:n?unwrapListeners(i):arrayClone(i,i.length)}EventEmitter.prototype.listeners=function listeners(e){return _listeners(this,e,true)};EventEmitter.prototype.rawListeners=function rawListeners(e){return _listeners(this,e,false)};EventEmitter.listenerCount=function(e,t){return"function"===typeof e.listenerCount?e.listenerCount(t):listenerCount.call(e,t)};EventEmitter.prototype.listenerCount=listenerCount;function listenerCount(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"===typeof n)return 1;if(void 0!==n)return n.length}return 0}EventEmitter.prototype.eventNames=function eventNames(){return this._eventsCount>0?r(this._events):[]};function arrayClone(e,t){var n=new Array(t);for(var r=0;r<t;++r)n[r]=e[r];return n}function spliceOne(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}function unwrapListeners(e){var t=new Array(e.length);for(var n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}function once(e,t){return new Promise((function(n,r){function errorListener(n){e.removeListener(t,resolver);r(n)}function resolver(){"function"===typeof e.removeListener&&e.removeListener("error",errorListener);n([].slice.call(arguments))}eventTargetAgnosticAddListener(e,t,resolver,{once:true});"error"!==t&&addErrorHandlerIfEventEmitter(e,errorListener,{once:true})}))}function addErrorHandlerIfEventEmitter(e,t,n){"function"===typeof e.on&&eventTargetAgnosticAddListener(e,"error",t,n)}function eventTargetAgnosticAddListener(e,t,n,r){if("function"===typeof e.on)r.once?e.once(t,n):e.on(t,n);else{if("function"!==typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,(function wrapListener(i){r.once&&e.removeEventListener(t,wrapListener);n(i)}))}}var o=e;const v=e.once,a=e.EventEmitter;export{a as EventEmitter,o as default,v as once};

