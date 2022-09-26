function e(e) {
  return (
    null !== e &&
    "object" == typeof e &&
    "constructor" in e &&
    e.constructor === Object
  );
}
function t(s = {}, i = {}) {
  Object.keys(i).forEach((n) => {
    void 0 === s[n]
      ? (s[n] = i[n])
      : e(i[n]) && e(s[n]) && Object.keys(i[n]).length > 0 && t(s[n], i[n]);
  });
}
const s = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: { blur() {}, nodeName: "" },
  querySelector: () => null,
  querySelectorAll: () => [],
  getElementById: () => null,
  createEvent: () => ({ initEvent() {} }),
  createElement: () => ({
    children: [],
    childNodes: [],
    style: {},
    setAttribute() {},
    getElementsByTagName: () => [],
  }),
  createElementNS: () => ({}),
  importNode: () => null,
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
};
function i() {
  const e = "undefined" != typeof document ? document : {};
  return t(e, s), e;
}
const n = {
  document: s,
  navigator: { userAgent: "" },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
  history: { replaceState() {}, pushState() {}, go() {}, back() {} },
  CustomEvent: function () {
    return this;
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle: () => ({ getPropertyValue: () => "" }),
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia: () => ({}),
  requestAnimationFrame: (e) =>
    "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
  cancelAnimationFrame(e) {
    "undefined" != typeof setTimeout && clearTimeout(e);
  },
};
function r() {
  const e = "undefined" != typeof window ? window : {};
  return t(e, n), e;
}
class a extends Array {
  constructor(e) {
    "number" == typeof e
      ? super(e)
      : (super(...(e || [])),
        (function (e) {
          const t = e.__proto__;
          Object.defineProperty(e, "__proto__", {
            get: () => t,
            set(e) {
              t.__proto__ = e;
            },
          });
        })(this));
  }
}
function o(e = []) {
  const t = [];
  return (
    e.forEach((e) => {
      Array.isArray(e) ? t.push(...o(e)) : t.push(e);
    }),
    t
  );
}
function l(e, t) {
  return Array.prototype.filter.call(e, t);
}
function d(e, t) {
  const s = r(),
    n = i();
  let o = [];
  if (!t && e instanceof a) return e;
  if (!e) return new a(o);
  if ("string" == typeof e) {
    const s = e.trim();
    if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
      let e = "div";
      0 === s.indexOf("<li") && (e = "ul"),
        0 === s.indexOf("<tr") && (e = "tbody"),
        (0 !== s.indexOf("<td") && 0 !== s.indexOf("<th")) || (e = "tr"),
        0 === s.indexOf("<tbody") && (e = "table"),
        0 === s.indexOf("<option") && (e = "select");
      const t = n.createElement(e);
      t.innerHTML = s;
      for (let s = 0; s < t.childNodes.length; s += 1) o.push(t.childNodes[s]);
    } else
      o = (function (e, t) {
        if ("string" != typeof e) return [e];
        const s = [],
          i = t.querySelectorAll(e);
        for (let n = 0; n < i.length; n += 1) s.push(i[n]);
        return s;
      })(e.trim(), t || n);
  } else if (e.nodeType || e === s || e === n) o.push(e);
  else if (Array.isArray(e)) {
    if (e instanceof a) return e;
    o = e;
  }
  return new a(
    (function (e) {
      const t = [];
      for (let s = 0; s < e.length; s += 1)
        -1 === t.indexOf(e[s]) && t.push(e[s]);
      return t;
    })(o)
  );
}
d.fn = a.prototype;
const c = {
  addClass: function (...e) {
    const t = o(e.map((e) => e.split(" ")));
    return (
      this.forEach((e) => {
        e.classList.add(...t);
      }),
      this
    );
  },
  removeClass: function (...e) {
    const t = o(e.map((e) => e.split(" ")));
    return (
      this.forEach((e) => {
        e.classList.remove(...t);
      }),
      this
    );
  },
  hasClass: function (...e) {
    const t = o(e.map((e) => e.split(" ")));
    return (
      l(this, (e) => t.filter((t) => e.classList.contains(t)).length > 0)
        .length > 0
    );
  },
  toggleClass: function (...e) {
    const t = o(e.map((e) => e.split(" ")));
    this.forEach((e) => {
      t.forEach((t) => {
        e.classList.toggle(t);
      });
    });
  },
  attr: function (e, t) {
    if (1 === arguments.length && "string" == typeof e)
      return this[0] ? this[0].getAttribute(e) : void 0;
    for (let s = 0; s < this.length; s += 1)
      if (2 === arguments.length) this[s].setAttribute(e, t);
      else
        for (const t in e) (this[s][t] = e[t]), this[s].setAttribute(t, e[t]);
    return this;
  },
  removeAttr: function (e) {
    for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
    return this;
  },
  transform: function (e) {
    for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
    return this;
  },
  transition: function (e) {
    for (let t = 0; t < this.length; t += 1)
      this[t].style.transitionDuration = "string" != typeof e ? `${e}ms` : e;
    return this;
  },
  on: function (...e) {
    let [t, s, i, n] = e;
    function r(e) {
      const t = e.target;
      if (!t) return;
      const n = e.target.dom7EventData || [];
      if ((n.indexOf(e) < 0 && n.unshift(e), d(t).is(s))) i.apply(t, n);
      else {
        const e = d(t).parents();
        for (let t = 0; t < e.length; t += 1) d(e[t]).is(s) && i.apply(e[t], n);
      }
    }
    function a(e) {
      const t = (e && e.target && e.target.dom7EventData) || [];
      t.indexOf(e) < 0 && t.unshift(e), i.apply(this, t);
    }
    "function" == typeof e[1] && (([t, i, n] = e), (s = void 0)), n || (n = !1);
    const o = t.split(" ");
    let l;
    for (let d = 0; d < this.length; d += 1) {
      const e = this[d];
      if (s)
        for (l = 0; l < o.length; l += 1) {
          const t = o[l];
          e.dom7LiveListeners || (e.dom7LiveListeners = {}),
            e.dom7LiveListeners[t] || (e.dom7LiveListeners[t] = []),
            e.dom7LiveListeners[t].push({ listener: i, proxyListener: r }),
            e.addEventListener(t, r, n);
        }
      else
        for (l = 0; l < o.length; l += 1) {
          const t = o[l];
          e.dom7Listeners || (e.dom7Listeners = {}),
            e.dom7Listeners[t] || (e.dom7Listeners[t] = []),
            e.dom7Listeners[t].push({ listener: i, proxyListener: a }),
            e.addEventListener(t, a, n);
        }
    }
    return this;
  },
  off: function (...e) {
    let [t, s, i, n] = e;
    "function" == typeof e[1] && (([t, i, n] = e), (s = void 0)), n || (n = !1);
    const r = t.split(" ");
    for (let a = 0; a < r.length; a += 1) {
      const e = r[a];
      for (let t = 0; t < this.length; t += 1) {
        const r = this[t];
        let a;
        if (
          (!s && r.dom7Listeners
            ? (a = r.dom7Listeners[e])
            : s && r.dom7LiveListeners && (a = r.dom7LiveListeners[e]),
          a && a.length)
        )
          for (let t = a.length - 1; t >= 0; t -= 1) {
            const s = a[t];
            (i && s.listener === i) ||
            (i &&
              s.listener &&
              s.listener.dom7proxy &&
              s.listener.dom7proxy === i)
              ? (r.removeEventListener(e, s.proxyListener, n), a.splice(t, 1))
              : i ||
                (r.removeEventListener(e, s.proxyListener, n), a.splice(t, 1));
          }
      }
    }
    return this;
  },
  trigger: function (...e) {
    const t = r(),
      s = e[0].split(" "),
      i = e[1];
    for (let n = 0; n < s.length; n += 1) {
      const r = s[n];
      for (let s = 0; s < this.length; s += 1) {
        const n = this[s];
        if (t.CustomEvent) {
          const s = new t.CustomEvent(r, {
            detail: i,
            bubbles: !0,
            cancelable: !0,
          });
          (n.dom7EventData = e.filter((e, t) => t > 0)),
            n.dispatchEvent(s),
            (n.dom7EventData = []),
            delete n.dom7EventData;
        }
      }
    }
    return this;
  },
  transitionEnd: function (e) {
    const t = this;
    return (
      e &&
        t.on("transitionend", function s(i) {
          i.target === this && (e.call(this, i), t.off("transitionend", s));
        }),
      this
    );
  },
  outerWidth: function (e) {
    if (this.length > 0) {
      if (e) {
        const e = this.styles();
        return (
          this[0].offsetWidth +
          parseFloat(e.getPropertyValue("margin-right")) +
          parseFloat(e.getPropertyValue("margin-left"))
        );
      }
      return this[0].offsetWidth;
    }
    return null;
  },
  outerHeight: function (e) {
    if (this.length > 0) {
      if (e) {
        const e = this.styles();
        return (
          this[0].offsetHeight +
          parseFloat(e.getPropertyValue("margin-top")) +
          parseFloat(e.getPropertyValue("margin-bottom"))
        );
      }
      return this[0].offsetHeight;
    }
    return null;
  },
  styles: function () {
    const e = r();
    return this[0] ? e.getComputedStyle(this[0], null) : {};
  },
  offset: function () {
    if (this.length > 0) {
      const e = r(),
        t = i(),
        s = this[0],
        n = s.getBoundingClientRect(),
        a = t.body,
        o = s.clientTop || a.clientTop || 0,
        l = s.clientLeft || a.clientLeft || 0,
        d = s === e ? e.scrollY : s.scrollTop,
        c = s === e ? e.scrollX : s.scrollLeft;
      return { top: n.top + d - o, left: n.left + c - l };
    }
    return null;
  },
  css: function (e, t) {
    const s = r();
    let i;
    if (1 === arguments.length) {
      if ("string" != typeof e) {
        for (i = 0; i < this.length; i += 1)
          for (const t in e) this[i].style[t] = e[t];
        return this;
      }
      if (this[0]) return s.getComputedStyle(this[0], null).getPropertyValue(e);
    }
    if (2 === arguments.length && "string" == typeof e) {
      for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
      return this;
    }
    return this;
  },
  each: function (e) {
    return e
      ? (this.forEach((t, s) => {
          e.apply(t, [t, s]);
        }),
        this)
      : this;
  },
  html: function (e) {
    if (void 0 === e) return this[0] ? this[0].innerHTML : null;
    for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
    return this;
  },
  text: function (e) {
    if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
    for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
    return this;
  },
  is: function (e) {
    const t = r(),
      s = i(),
      n = this[0];
    let o, l;
    if (!n || void 0 === e) return !1;
    if ("string" == typeof e) {
      if (n.matches) return n.matches(e);
      if (n.webkitMatchesSelector) return n.webkitMatchesSelector(e);
      if (n.msMatchesSelector) return n.msMatchesSelector(e);
      for (o = d(e), l = 0; l < o.length; l += 1) if (o[l] === n) return !0;
      return !1;
    }
    if (e === s) return n === s;
    if (e === t) return n === t;
    if (e.nodeType || e instanceof a) {
      for (o = e.nodeType ? [e] : e, l = 0; l < o.length; l += 1)
        if (o[l] === n) return !0;
      return !1;
    }
    return !1;
  },
  index: function () {
    let e,
      t = this[0];
    if (t) {
      for (e = 0; null !== (t = t.previousSibling); )
        1 === t.nodeType && (e += 1);
      return e;
    }
  },
  eq: function (e) {
    if (void 0 === e) return this;
    const t = this.length;
    if (e > t - 1) return d([]);
    if (e < 0) {
      const s = t + e;
      return d(s < 0 ? [] : [this[s]]);
    }
    return d([this[e]]);
  },
  append: function (...e) {
    let t;
    const s = i();
    for (let i = 0; i < e.length; i += 1) {
      t = e[i];
      for (let e = 0; e < this.length; e += 1)
        if ("string" == typeof t) {
          const i = s.createElement("div");
          for (i.innerHTML = t; i.firstChild; )
            this[e].appendChild(i.firstChild);
        } else if (t instanceof a)
          for (let s = 0; s < t.length; s += 1) this[e].appendChild(t[s]);
        else this[e].appendChild(t);
    }
    return this;
  },
  prepend: function (e) {
    const t = i();
    let s, n;
    for (s = 0; s < this.length; s += 1)
      if ("string" == typeof e) {
        const i = t.createElement("div");
        for (i.innerHTML = e, n = i.childNodes.length - 1; n >= 0; n -= 1)
          this[s].insertBefore(i.childNodes[n], this[s].childNodes[0]);
      } else if (e instanceof a)
        for (n = 0; n < e.length; n += 1)
          this[s].insertBefore(e[n], this[s].childNodes[0]);
      else this[s].insertBefore(e, this[s].childNodes[0]);
    return this;
  },
  next: function (e) {
    return this.length > 0
      ? e
        ? this[0].nextElementSibling && d(this[0].nextElementSibling).is(e)
          ? d([this[0].nextElementSibling])
          : d([])
        : this[0].nextElementSibling
        ? d([this[0].nextElementSibling])
        : d([])
      : d([]);
  },
  nextAll: function (e) {
    const t = [];
    let s = this[0];
    if (!s) return d([]);
    for (; s.nextElementSibling; ) {
      const i = s.nextElementSibling;
      e ? d(i).is(e) && t.push(i) : t.push(i), (s = i);
    }
    return d(t);
  },
  prev: function (e) {
    if (this.length > 0) {
      const t = this[0];
      return e
        ? t.previousElementSibling && d(t.previousElementSibling).is(e)
          ? d([t.previousElementSibling])
          : d([])
        : t.previousElementSibling
        ? d([t.previousElementSibling])
        : d([]);
    }
    return d([]);
  },
  prevAll: function (e) {
    const t = [];
    let s = this[0];
    if (!s) return d([]);
    for (; s.previousElementSibling; ) {
      const i = s.previousElementSibling;
      e ? d(i).is(e) && t.push(i) : t.push(i), (s = i);
    }
    return d(t);
  },
  parent: function (e) {
    const t = [];
    for (let s = 0; s < this.length; s += 1)
      null !== this[s].parentNode &&
        (e
          ? d(this[s].parentNode).is(e) && t.push(this[s].parentNode)
          : t.push(this[s].parentNode));
    return d(t);
  },
  parents: function (e) {
    const t = [];
    for (let s = 0; s < this.length; s += 1) {
      let i = this[s].parentNode;
      for (; i; ) e ? d(i).is(e) && t.push(i) : t.push(i), (i = i.parentNode);
    }
    return d(t);
  },
  closest: function (e) {
    let t = this;
    return void 0 === e ? d([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
  },
  find: function (e) {
    const t = [];
    for (let s = 0; s < this.length; s += 1) {
      const i = this[s].querySelectorAll(e);
      for (let e = 0; e < i.length; e += 1) t.push(i[e]);
    }
    return d(t);
  },
  children: function (e) {
    const t = [];
    for (let s = 0; s < this.length; s += 1) {
      const i = this[s].children;
      for (let s = 0; s < i.length; s += 1)
        (e && !d(i[s]).is(e)) || t.push(i[s]);
    }
    return d(t);
  },
  filter: function (e) {
    return d(l(this, e));
  },
  remove: function () {
    for (let e = 0; e < this.length; e += 1)
      this[e].parentNode && this[e].parentNode.removeChild(this[e]);
    return this;
  },
};
function p(e, t) {
  return void 0 === t && (t = 0), setTimeout(e, t);
}
function u() {
  return Date.now();
}
function h(e, t) {
  void 0 === t && (t = "x");
  const s = r();
  let i, n, a;
  const o = (function (e) {
    const t = r();
    let s;
    return (
      t.getComputedStyle && (s = t.getComputedStyle(e, null)),
      !s && e.currentStyle && (s = e.currentStyle),
      s || (s = e.style),
      s
    );
  })(e);
  return (
    s.WebKitCSSMatrix
      ? ((n = o.transform || o.webkitTransform),
        n.split(",").length > 6 &&
          (n = n
            .split(", ")
            .map((e) => e.replace(",", "."))
            .join(", ")),
        (a = new s.WebKitCSSMatrix("none" === n ? "" : n)))
      : ((a =
          o.MozTransform ||
          o.OTransform ||
          o.MsTransform ||
          o.msTransform ||
          o.transform ||
          o
            .getPropertyValue("transform")
            .replace("translate(", "matrix(1, 0, 0, 1,")),
        (i = a.toString().split(","))),
    "x" === t &&
      (n = s.WebKitCSSMatrix
        ? a.m41
        : 16 === i.length
        ? parseFloat(i[12])
        : parseFloat(i[4])),
    "y" === t &&
      (n = s.WebKitCSSMatrix
        ? a.m42
        : 16 === i.length
        ? parseFloat(i[13])
        : parseFloat(i[5])),
    n || 0
  );
}
function f(e) {
  return (
    "object" == typeof e &&
    null !== e &&
    e.constructor &&
    "Object" === Object.prototype.toString.call(e).slice(8, -1)
  );
}
function m(e) {
  return "undefined" != typeof window && void 0 !== window.HTMLElement
    ? e instanceof HTMLElement
    : e && (1 === e.nodeType || 11 === e.nodeType);
}
function g() {
  const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
    t = ["__proto__", "constructor", "prototype"];
  for (let s = 1; s < arguments.length; s += 1) {
    const i = s < 0 || arguments.length <= s ? void 0 : arguments[s];
    if (null != i && !m(i)) {
      const s = Object.keys(Object(i)).filter((e) => t.indexOf(e) < 0);
      for (let t = 0, n = s.length; t < n; t += 1) {
        const n = s[t],
          r = Object.getOwnPropertyDescriptor(i, n);
        void 0 !== r &&
          r.enumerable &&
          (f(e[n]) && f(i[n])
            ? i[n].__swiper__
              ? (e[n] = i[n])
              : g(e[n], i[n])
            : !f(e[n]) && f(i[n])
            ? ((e[n] = {}), i[n].__swiper__ ? (e[n] = i[n]) : g(e[n], i[n]))
            : (e[n] = i[n]));
      }
    }
  }
  return e;
}
function v(e, t, s) {
  e.style.setProperty(t, s);
}
function w(e) {
  let { swiper: t, targetPosition: s, side: i } = e;
  const n = r(),
    a = -t.translate;
  let o,
    l = null;
  const d = t.params.speed;
  (t.wrapperEl.style.scrollSnapType = "none"),
    n.cancelAnimationFrame(t.cssModeFrameID);
  const c = s > a ? "next" : "prev",
    p = (e, t) => ("next" === c && e >= t) || ("prev" === c && e <= t),
    u = () => {
      (o = new Date().getTime()), null === l && (l = o);
      const e = Math.max(Math.min((o - l) / d, 1), 0),
        r = 0.5 - Math.cos(e * Math.PI) / 2;
      let c = a + r * (s - a);
      if ((p(c, s) && (c = s), t.wrapperEl.scrollTo({ [i]: c }), p(c, s)))
        return (
          (t.wrapperEl.style.overflow = "hidden"),
          (t.wrapperEl.style.scrollSnapType = ""),
          setTimeout(() => {
            (t.wrapperEl.style.overflow = ""), t.wrapperEl.scrollTo({ [i]: c });
          }),
          void n.cancelAnimationFrame(t.cssModeFrameID)
        );
      t.cssModeFrameID = n.requestAnimationFrame(u);
    };
  u();
}
let T, S, b;
function C() {
  return (
    T ||
      (T = (function () {
        const e = r(),
          t = i();
        return {
          smoothScroll:
            t.documentElement && "scrollBehavior" in t.documentElement.style,
          touch: !!(
            "ontouchstart" in e ||
            (e.DocumentTouch && t instanceof e.DocumentTouch)
          ),
          passiveListener: (function () {
            let t = !1;
            try {
              const s = Object.defineProperty({}, "passive", {
                get() {
                  t = !0;
                },
              });
              e.addEventListener("testPassiveListener", null, s);
            } catch (s) {}
            return t;
          })(),
          gestures: "ongesturestart" in e,
        };
      })()),
    T
  );
}
function E(e) {
  return (
    void 0 === e && (e = {}),
    S ||
      (S = (function (e) {
        let { userAgent: t } = void 0 === e ? {} : e;
        const s = C(),
          i = r(),
          n = i.navigator.platform,
          a = t || i.navigator.userAgent,
          o = { ios: !1, android: !1 },
          l = i.screen.width,
          d = i.screen.height,
          c = a.match(/(Android);?[\s\/]+([\d.]+)?/);
        let p = a.match(/(iPad).*OS\s([\d_]+)/);
        const u = a.match(/(iPod)(.*OS\s([\d_]+))?/),
          h = !p && a.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
          f = "Win32" === n;
        let m = "MacIntel" === n;
        return (
          !p &&
            m &&
            s.touch &&
            [
              "1024x1366",
              "1366x1024",
              "834x1194",
              "1194x834",
              "834x1112",
              "1112x834",
              "768x1024",
              "1024x768",
              "820x1180",
              "1180x820",
              "810x1080",
              "1080x810",
            ].indexOf(`${l}x${d}`) >= 0 &&
            ((p = a.match(/(Version)\/([\d.]+)/)),
            p || (p = [0, 1, "13_0_0"]),
            (m = !1)),
          c && !f && ((o.os = "android"), (o.android = !0)),
          (p || h || u) && ((o.os = "ios"), (o.ios = !0)),
          o
        );
      })(e)),
    S
  );
}
function x() {
  return (
    b ||
      (b = (function () {
        const e = r();
        return {
          isSafari: (function () {
            const t = e.navigator.userAgent.toLowerCase();
            return (
              t.indexOf("safari") >= 0 &&
              t.indexOf("chrome") < 0 &&
              t.indexOf("android") < 0
            );
          })(),
          isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
            e.navigator.userAgent
          ),
        };
      })()),
    b
  );
}
function y(e) {
  let { swiper: t, runCallbacks: s, direction: i, step: n } = e;
  const { activeIndex: r, previousIndex: a } = t;
  let o = i;
  if (
    (o || (o = r > a ? "next" : r < a ? "prev" : "reset"),
    t.emit(`transition${n}`),
    s && r !== a)
  ) {
    if ("reset" === o) return void t.emit(`slideResetTransition${n}`);
    t.emit(`slideChangeTransition${n}`),
      "next" === o
        ? t.emit(`slideNextTransition${n}`)
        : t.emit(`slidePrevTransition${n}`);
  }
}
function M(e) {
  const t = this,
    s = i(),
    n = r(),
    a = t.touchEventsData,
    { params: o, touches: l, enabled: c } = t;
  if (!c) return;
  if (t.animating && o.preventInteractionOnTransition) return;
  !t.animating && o.cssMode && o.loop && t.loopFix();
  let p = e;
  p.originalEvent && (p = p.originalEvent);
  let h = d(p.target);
  if ("wrapper" === o.touchEventsTarget && !h.closest(t.wrapperEl).length)
    return;
  if (
    ((a.isTouchEvent = "touchstart" === p.type),
    !a.isTouchEvent && "which" in p && 3 === p.which)
  )
    return;
  if (!a.isTouchEvent && "button" in p && p.button > 0) return;
  if (a.isTouched && a.isMoved) return;
  !!o.noSwipingClass &&
    "" !== o.noSwipingClass &&
    p.target &&
    p.target.shadowRoot &&
    e.path &&
    e.path[0] &&
    (h = d(e.path[0]));
  const f = o.noSwipingSelector ? o.noSwipingSelector : `.${o.noSwipingClass}`,
    m = !(!p.target || !p.target.shadowRoot);
  if (
    o.noSwiping &&
    (m
      ? (function (e, t) {
          return (
            void 0 === t && (t = this),
            (function t(s) {
              if (!s || s === i() || s === r()) return null;
              s.assignedSlot && (s = s.assignedSlot);
              const n = s.closest(e);
              return n || s.getRootNode ? n || t(s.getRootNode().host) : null;
            })(t)
          );
        })(f, h[0])
      : h.closest(f)[0])
  )
    return void (t.allowClick = !0);
  if (o.swipeHandler && !h.closest(o.swipeHandler)[0]) return;
  (l.currentX = "touchstart" === p.type ? p.targetTouches[0].pageX : p.pageX),
    (l.currentY = "touchstart" === p.type ? p.targetTouches[0].pageY : p.pageY);
  const g = l.currentX,
    v = l.currentY,
    w = o.edgeSwipeDetection || o.iOSEdgeSwipeDetection,
    T = o.edgeSwipeThreshold || o.iOSEdgeSwipeThreshold;
  if (w && (g <= T || g >= n.innerWidth - T)) {
    if ("prevent" !== w) return;
    e.preventDefault();
  }
  if (
    (Object.assign(a, {
      isTouched: !0,
      isMoved: !1,
      allowTouchCallbacks: !0,
      isScrolling: void 0,
      startMoving: void 0,
    }),
    (l.startX = g),
    (l.startY = v),
    (a.touchStartTime = u()),
    (t.allowClick = !0),
    t.updateSize(),
    (t.swipeDirection = void 0),
    o.threshold > 0 && (a.allowThresholdMove = !1),
    "touchstart" !== p.type)
  ) {
    let e = !0;
    h.is(a.focusableElements) &&
      ((e = !1), "SELECT" === h[0].nodeName && (a.isTouched = !1)),
      s.activeElement &&
        d(s.activeElement).is(a.focusableElements) &&
        s.activeElement !== h[0] &&
        s.activeElement.blur();
    const i = e && t.allowTouchMove && o.touchStartPreventDefault;
    (!o.touchStartForcePreventDefault && !i) ||
      h[0].isContentEditable ||
      p.preventDefault();
  }
  t.params.freeMode &&
    t.params.freeMode.enabled &&
    t.freeMode &&
    t.animating &&
    !o.cssMode &&
    t.freeMode.onTouchStart(),
    t.emit("touchStart", p);
}
function k(e) {
  const t = i(),
    s = this,
    n = s.touchEventsData,
    { params: r, touches: a, rtlTranslate: o, enabled: l } = s;
  if (!l) return;
  let c = e;
  if ((c.originalEvent && (c = c.originalEvent), !n.isTouched))
    return void (
      n.startMoving &&
      n.isScrolling &&
      s.emit("touchMoveOpposite", c)
    );
  if (n.isTouchEvent && "touchmove" !== c.type) return;
  const p =
      "touchmove" === c.type &&
      c.targetTouches &&
      (c.targetTouches[0] || c.changedTouches[0]),
    h = "touchmove" === c.type ? p.pageX : c.pageX,
    f = "touchmove" === c.type ? p.pageY : c.pageY;
  if (c.preventedByNestedSwiper) return (a.startX = h), void (a.startY = f);
  if (!s.allowTouchMove)
    return (
      d(c.target).is(n.focusableElements) || (s.allowClick = !1),
      void (
        n.isTouched &&
        (Object.assign(a, { startX: h, startY: f, currentX: h, currentY: f }),
        (n.touchStartTime = u()))
      )
    );
  if (n.isTouchEvent && r.touchReleaseOnEdges && !r.loop)
    if (s.isVertical()) {
      if (
        (f < a.startY && s.translate <= s.maxTranslate()) ||
        (f > a.startY && s.translate >= s.minTranslate())
      )
        return (n.isTouched = !1), void (n.isMoved = !1);
    } else if (
      (h < a.startX && s.translate <= s.maxTranslate()) ||
      (h > a.startX && s.translate >= s.minTranslate())
    )
      return;
  if (
    n.isTouchEvent &&
    t.activeElement &&
    c.target === t.activeElement &&
    d(c.target).is(n.focusableElements)
  )
    return (n.isMoved = !0), void (s.allowClick = !1);
  if (
    (n.allowTouchCallbacks && s.emit("touchMove", c),
    c.targetTouches && c.targetTouches.length > 1)
  )
    return;
  (a.currentX = h), (a.currentY = f);
  const m = a.currentX - a.startX,
    g = a.currentY - a.startY;
  if (s.params.threshold && Math.sqrt(m ** 2 + g ** 2) < s.params.threshold)
    return;
  if (void 0 === n.isScrolling) {
    let e;
    (s.isHorizontal() && a.currentY === a.startY) ||
    (s.isVertical() && a.currentX === a.startX)
      ? (n.isScrolling = !1)
      : m * m + g * g >= 25 &&
        ((e = (180 * Math.atan2(Math.abs(g), Math.abs(m))) / Math.PI),
        (n.isScrolling = s.isHorizontal()
          ? e > r.touchAngle
          : 90 - e > r.touchAngle));
  }
  if (
    (n.isScrolling && s.emit("touchMoveOpposite", c),
    void 0 === n.startMoving &&
      ((a.currentX === a.startX && a.currentY === a.startY) ||
        (n.startMoving = !0)),
    n.isScrolling)
  )
    return void (n.isTouched = !1);
  if (!n.startMoving) return;
  (s.allowClick = !1),
    !r.cssMode && c.cancelable && c.preventDefault(),
    r.touchMoveStopPropagation && !r.nested && c.stopPropagation(),
    n.isMoved ||
      (r.loop && !r.cssMode && s.loopFix(),
      (n.startTranslate = s.getTranslate()),
      s.setTransition(0),
      s.animating && s.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
      (n.allowMomentumBounce = !1),
      !r.grabCursor ||
        (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
        s.setGrabCursor(!0),
      s.emit("sliderFirstMove", c)),
    s.emit("sliderMove", c),
    (n.isMoved = !0);
  let v = s.isHorizontal() ? m : g;
  (a.diff = v),
    (v *= r.touchRatio),
    o && (v = -v),
    (s.swipeDirection = v > 0 ? "prev" : "next"),
    (n.currentTranslate = v + n.startTranslate);
  let w = !0,
    T = r.resistanceRatio;
  if (
    (r.touchReleaseOnEdges && (T = 0),
    v > 0 && n.currentTranslate > s.minTranslate()
      ? ((w = !1),
        r.resistance &&
          (n.currentTranslate =
            s.minTranslate() -
            1 +
            (-s.minTranslate() + n.startTranslate + v) ** T))
      : v < 0 &&
        n.currentTranslate < s.maxTranslate() &&
        ((w = !1),
        r.resistance &&
          (n.currentTranslate =
            s.maxTranslate() +
            1 -
            (s.maxTranslate() - n.startTranslate - v) ** T)),
    w && (c.preventedByNestedSwiper = !0),
    !s.allowSlideNext &&
      "next" === s.swipeDirection &&
      n.currentTranslate < n.startTranslate &&
      (n.currentTranslate = n.startTranslate),
    !s.allowSlidePrev &&
      "prev" === s.swipeDirection &&
      n.currentTranslate > n.startTranslate &&
      (n.currentTranslate = n.startTranslate),
    s.allowSlidePrev ||
      s.allowSlideNext ||
      (n.currentTranslate = n.startTranslate),
    r.threshold > 0)
  ) {
    if (!(Math.abs(v) > r.threshold || n.allowThresholdMove))
      return void (n.currentTranslate = n.startTranslate);
    if (!n.allowThresholdMove)
      return (
        (n.allowThresholdMove = !0),
        (a.startX = a.currentX),
        (a.startY = a.currentY),
        (n.currentTranslate = n.startTranslate),
        void (a.diff = s.isHorizontal()
          ? a.currentX - a.startX
          : a.currentY - a.startY)
      );
  }
  r.followFinger &&
    !r.cssMode &&
    (((r.freeMode && r.freeMode.enabled && s.freeMode) ||
      r.watchSlidesProgress) &&
      (s.updateActiveIndex(), s.updateSlidesClasses()),
    s.params.freeMode &&
      r.freeMode.enabled &&
      s.freeMode &&
      s.freeMode.onTouchMove(),
    s.updateProgress(n.currentTranslate),
    s.setTranslate(n.currentTranslate));
}
function P(e) {
  const t = this,
    s = t.touchEventsData,
    { params: i, touches: n, rtlTranslate: r, slidesGrid: a, enabled: o } = t;
  if (!o) return;
  let l = e;
  if (
    (l.originalEvent && (l = l.originalEvent),
    s.allowTouchCallbacks && t.emit("touchEnd", l),
    (s.allowTouchCallbacks = !1),
    !s.isTouched)
  )
    return (
      s.isMoved && i.grabCursor && t.setGrabCursor(!1),
      (s.isMoved = !1),
      void (s.startMoving = !1)
    );
  i.grabCursor &&
    s.isMoved &&
    s.isTouched &&
    (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
    t.setGrabCursor(!1);
  const d = u(),
    c = d - s.touchStartTime;
  if (t.allowClick) {
    const e = l.path || (l.composedPath && l.composedPath());
    t.updateClickedSlide((e && e[0]) || l.target),
      t.emit("tap click", l),
      c < 300 &&
        d - s.lastClickTime < 300 &&
        t.emit("doubleTap doubleClick", l);
  }
  if (
    ((s.lastClickTime = u()),
    p(() => {
      t.destroyed || (t.allowClick = !0);
    }),
    !s.isTouched ||
      !s.isMoved ||
      !t.swipeDirection ||
      0 === n.diff ||
      s.currentTranslate === s.startTranslate)
  )
    return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
  let h;
  if (
    ((s.isTouched = !1),
    (s.isMoved = !1),
    (s.startMoving = !1),
    (h = i.followFinger
      ? r
        ? t.translate
        : -t.translate
      : -s.currentTranslate),
    i.cssMode)
  )
    return;
  if (t.params.freeMode && i.freeMode.enabled)
    return void t.freeMode.onTouchEnd({ currentPos: h });
  let f = 0,
    m = t.slidesSizesGrid[0];
  for (
    let p = 0;
    p < a.length;
    p += p < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup
  ) {
    const e = p < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
    void 0 !== a[p + e]
      ? h >= a[p] && h < a[p + e] && ((f = p), (m = a[p + e] - a[p]))
      : h >= a[p] && ((f = p), (m = a[a.length - 1] - a[a.length - 2]));
  }
  let g = null,
    v = null;
  i.rewind &&
    (t.isBeginning
      ? (v =
          t.params.virtual && t.params.virtual.enabled && t.virtual
            ? t.virtual.slides.length - 1
            : t.slides.length - 1)
      : t.isEnd && (g = 0));
  const w = (h - a[f]) / m,
    T = f < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
  if (c > i.longSwipesMs) {
    if (!i.longSwipes) return void t.slideTo(t.activeIndex);
    "next" === t.swipeDirection &&
      (w >= i.longSwipesRatio
        ? t.slideTo(i.rewind && t.isEnd ? g : f + T)
        : t.slideTo(f)),
      "prev" === t.swipeDirection &&
        (w > 1 - i.longSwipesRatio
          ? t.slideTo(f + T)
          : null !== v && w < 0 && Math.abs(w) > i.longSwipesRatio
          ? t.slideTo(v)
          : t.slideTo(f));
  } else {
    if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
    t.navigation &&
    (l.target === t.navigation.nextEl || l.target === t.navigation.prevEl)
      ? l.target === t.navigation.nextEl
        ? t.slideTo(f + T)
        : t.slideTo(f)
      : ("next" === t.swipeDirection && t.slideTo(null !== g ? g : f + T),
        "prev" === t.swipeDirection && t.slideTo(null !== v ? v : f));
  }
}
function L() {
  const e = this,
    { params: t, el: s } = e;
  if (s && 0 === s.offsetWidth) return;
  t.breakpoints && e.setBreakpoint();
  const { allowSlideNext: i, allowSlidePrev: n, snapGrid: r } = e;
  (e.allowSlideNext = !0),
    (e.allowSlidePrev = !0),
    e.updateSize(),
    e.updateSlides(),
    e.updateSlidesClasses(),
    ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
    e.isEnd &&
    !e.isBeginning &&
    !e.params.centeredSlides
      ? e.slideTo(e.slides.length - 1, 0, !1, !0)
      : e.slideTo(e.activeIndex, 0, !1, !0),
    e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
    (e.allowSlidePrev = n),
    (e.allowSlideNext = i),
    e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
}
function $(e) {
  const t = this;
  t.enabled &&
    (t.allowClick ||
      (t.params.preventClicks && e.preventDefault(),
      t.params.preventClicksPropagation &&
        t.animating &&
        (e.stopPropagation(), e.stopImmediatePropagation())));
}
function O() {
  const e = this,
    { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
  if (!i) return;
  let n;
  (e.previousTranslate = e.translate),
    e.isHorizontal()
      ? (e.translate = -t.scrollLeft)
      : (e.translate = -t.scrollTop),
    0 === e.translate && (e.translate = 0),
    e.updateActiveIndex(),
    e.updateSlidesClasses();
  const r = e.maxTranslate() - e.minTranslate();
  (n = 0 === r ? 0 : (e.translate - e.minTranslate()) / r),
    n !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
    e.emit("setTranslate", e.translate, !1);
}
Object.keys(c).forEach((e) => {
  Object.defineProperty(d.fn, e, { value: c[e], writable: !0 });
});
let A = !1;
function z() {}
const I = (e, t) => {
  const s = i(),
    {
      params: n,
      touchEvents: r,
      el: a,
      wrapperEl: o,
      device: l,
      support: d,
    } = e,
    c = !!n.nested,
    p = "on" === t ? "addEventListener" : "removeEventListener",
    u = t;
  if (d.touch) {
    const t = !(
      "touchstart" !== r.start ||
      !d.passiveListener ||
      !n.passiveListeners
    ) && { passive: !0, capture: !1 };
    a[p](r.start, e.onTouchStart, t),
      a[p](
        r.move,
        e.onTouchMove,
        d.passiveListener ? { passive: !1, capture: c } : c
      ),
      a[p](r.end, e.onTouchEnd, t),
      r.cancel && a[p](r.cancel, e.onTouchEnd, t);
  } else
    a[p](r.start, e.onTouchStart, !1),
      s[p](r.move, e.onTouchMove, c),
      s[p](r.end, e.onTouchEnd, !1);
  (n.preventClicks || n.preventClicksPropagation) &&
    a[p]("click", e.onClick, !0),
    n.cssMode && o[p]("scroll", e.onScroll),
    n.updateOnWindowResize
      ? e[u](
          l.ios || l.android
            ? "resize orientationchange observerUpdate"
            : "resize observerUpdate",
          L,
          !0
        )
      : e[u]("observerUpdate", L, !0);
};
const D = (e, t) => e.grid && t.grid && t.grid.rows > 1;
var G = {
  init: !0,
  direction: "horizontal",
  touchEventsTarget: "wrapper",
  initialSlide: 0,
  speed: 300,
  cssMode: !1,
  updateOnWindowResize: !0,
  resizeObserver: !0,
  nested: !1,
  createElements: !1,
  enabled: !0,
  focusableElements: "input, select, option, textarea, button, video, label",
  width: null,
  height: null,
  preventInteractionOnTransition: !1,
  userAgent: null,
  url: null,
  edgeSwipeDetection: !1,
  edgeSwipeThreshold: 20,
  autoHeight: !1,
  setWrapperSize: !1,
  virtualTranslate: !1,
  effect: "slide",
  breakpoints: void 0,
  breakpointsBase: "window",
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: !1,
  centeredSlides: !1,
  centeredSlidesBounds: !1,
  slidesOffsetBefore: 0,
  slidesOffsetAfter: 0,
  normalizeSlideIndex: !0,
  centerInsufficientSlides: !1,
  watchOverflow: !0,
  roundLengths: !1,
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: !0,
  shortSwipes: !0,
  longSwipes: !0,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: !0,
  allowTouchMove: !0,
  threshold: 0,
  touchMoveStopPropagation: !1,
  touchStartPreventDefault: !0,
  touchStartForcePreventDefault: !1,
  touchReleaseOnEdges: !1,
  uniqueNavElements: !0,
  resistance: !0,
  resistanceRatio: 0.85,
  watchSlidesProgress: !1,
  grabCursor: !1,
  preventClicks: !0,
  preventClicksPropagation: !0,
  slideToClickedSlide: !1,
  preloadImages: !0,
  updateOnImagesReady: !0,
  loop: !1,
  loopAdditionalSlides: 0,
  loopedSlides: null,
  loopFillGroupWithBlank: !1,
  loopPreventsSlide: !0,
  rewind: !1,
  allowSlidePrev: !0,
  allowSlideNext: !0,
  swipeHandler: null,
  noSwiping: !0,
  noSwipingClass: "swiper-no-swiping",
  noSwipingSelector: null,
  passiveListeners: !0,
  maxBackfaceHiddenSlides: 10,
  containerModifierClass: "swiper-",
  slideClass: "swiper-slide",
  slideBlankClass: "swiper-slide-invisible-blank",
  slideActiveClass: "swiper-slide-active",
  slideDuplicateActiveClass: "swiper-slide-duplicate-active",
  slideVisibleClass: "swiper-slide-visible",
  slideDuplicateClass: "swiper-slide-duplicate",
  slideNextClass: "swiper-slide-next",
  slideDuplicateNextClass: "swiper-slide-duplicate-next",
  slidePrevClass: "swiper-slide-prev",
  slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
  wrapperClass: "swiper-wrapper",
  runCallbacksOnInit: !0,
  _emitClasses: !1,
};
function N(e, t) {
  return function (s) {
    void 0 === s && (s = {});
    const i = Object.keys(s)[0],
      n = s[i];
    "object" == typeof n && null !== n
      ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 &&
          !0 === e[i] &&
          (e[i] = { auto: !0 }),
        i in e && "enabled" in n
          ? (!0 === e[i] && (e[i] = { enabled: !0 }),
            "object" != typeof e[i] || "enabled" in e[i] || (e[i].enabled = !0),
            e[i] || (e[i] = { enabled: !1 }),
            g(t, s))
          : g(t, s))
      : g(t, s);
  };
}
const _ = {
    eventsEmitter: {
      on(e, t, s) {
        const i = this;
        if (!i.eventsListeners || i.destroyed) return i;
        if ("function" != typeof t) return i;
        const n = s ? "unshift" : "push";
        return (
          e.split(" ").forEach((e) => {
            i.eventsListeners[e] || (i.eventsListeners[e] = []),
              i.eventsListeners[e][n](t);
          }),
          i
        );
      },
      once(e, t, s) {
        const i = this;
        if (!i.eventsListeners || i.destroyed) return i;
        if ("function" != typeof t) return i;
        function n() {
          i.off(e, n), n.__emitterProxy && delete n.__emitterProxy;
          for (var s = arguments.length, r = new Array(s), a = 0; a < s; a++)
            r[a] = arguments[a];
          t.apply(i, r);
        }
        return (n.__emitterProxy = t), i.on(e, n, s);
      },
      onAny(e, t) {
        const s = this;
        if (!s.eventsListeners || s.destroyed) return s;
        if ("function" != typeof e) return s;
        const i = t ? "unshift" : "push";
        return (
          s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s
        );
      },
      offAny(e) {
        const t = this;
        if (!t.eventsListeners || t.destroyed) return t;
        if (!t.eventsAnyListeners) return t;
        const s = t.eventsAnyListeners.indexOf(e);
        return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
      },
      off(e, t) {
        const s = this;
        return !s.eventsListeners || s.destroyed
          ? s
          : s.eventsListeners
          ? (e.split(" ").forEach((e) => {
              void 0 === t
                ? (s.eventsListeners[e] = [])
                : s.eventsListeners[e] &&
                  s.eventsListeners[e].forEach((i, n) => {
                    (i === t || (i.__emitterProxy && i.__emitterProxy === t)) &&
                      s.eventsListeners[e].splice(n, 1);
                  });
            }),
            s)
          : s;
      },
      emit() {
        const e = this;
        if (!e.eventsListeners || e.destroyed) return e;
        if (!e.eventsListeners) return e;
        let t, s, i;
        for (var n = arguments.length, r = new Array(n), a = 0; a < n; a++)
          r[a] = arguments[a];
        "string" == typeof r[0] || Array.isArray(r[0])
          ? ((t = r[0]), (s = r.slice(1, r.length)), (i = e))
          : ((t = r[0].events), (s = r[0].data), (i = r[0].context || e)),
          s.unshift(i);
        return (
          (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
            e.eventsAnyListeners &&
              e.eventsAnyListeners.length &&
              e.eventsAnyListeners.forEach((e) => {
                e.apply(i, [t, ...s]);
              }),
              e.eventsListeners &&
                e.eventsListeners[t] &&
                e.eventsListeners[t].forEach((e) => {
                  e.apply(i, s);
                });
          }),
          e
        );
      },
    },
    update: {
      updateSize: function () {
        const e = this;
        let t, s;
        const i = e.$el;
        (t =
          void 0 !== e.params.width && null !== e.params.width
            ? e.params.width
            : i[0].clientWidth),
          (s =
            void 0 !== e.params.height && null !== e.params.height
              ? e.params.height
              : i[0].clientHeight),
          (0 === t && e.isHorizontal()) ||
            (0 === s && e.isVertical()) ||
            ((t =
              t -
              parseInt(i.css("padding-left") || 0, 10) -
              parseInt(i.css("padding-right") || 0, 10)),
            (s =
              s -
              parseInt(i.css("padding-top") || 0, 10) -
              parseInt(i.css("padding-bottom") || 0, 10)),
            Number.isNaN(t) && (t = 0),
            Number.isNaN(s) && (s = 0),
            Object.assign(e, {
              width: t,
              height: s,
              size: e.isHorizontal() ? t : s,
            }));
      },
      updateSlides: function () {
        const e = this;
        function t(t) {
          return e.isHorizontal()
            ? t
            : {
                width: "height",
                "margin-top": "margin-left",
                "margin-bottom ": "margin-right",
                "margin-left": "margin-top",
                "margin-right": "margin-bottom",
                "padding-left": "padding-top",
                "padding-right": "padding-bottom",
                marginRight: "marginBottom",
              }[t];
        }
        function s(e, s) {
          return parseFloat(e.getPropertyValue(t(s)) || 0);
        }
        const i = e.params,
          { $wrapperEl: n, size: r, rtlTranslate: a, wrongRTL: o } = e,
          l = e.virtual && i.virtual.enabled,
          d = l ? e.virtual.slides.length : e.slides.length,
          c = n.children(`.${e.params.slideClass}`),
          p = l ? e.virtual.slides.length : c.length;
        let u = [];
        const h = [],
          f = [];
        let m = i.slidesOffsetBefore;
        "function" == typeof m && (m = i.slidesOffsetBefore.call(e));
        let g = i.slidesOffsetAfter;
        "function" == typeof g && (g = i.slidesOffsetAfter.call(e));
        const w = e.snapGrid.length,
          T = e.slidesGrid.length;
        let S = i.spaceBetween,
          b = -m,
          C = 0,
          E = 0;
        if (void 0 === r) return;
        "string" == typeof S &&
          S.indexOf("%") >= 0 &&
          (S = (parseFloat(S.replace("%", "")) / 100) * r),
          (e.virtualSize = -S),
          a
            ? c.css({ marginLeft: "", marginBottom: "", marginTop: "" })
            : c.css({ marginRight: "", marginBottom: "", marginTop: "" }),
          i.centeredSlides &&
            i.cssMode &&
            (v(e.wrapperEl, "--swiper-centered-offset-before", ""),
            v(e.wrapperEl, "--swiper-centered-offset-after", ""));
        const x = i.grid && i.grid.rows > 1 && e.grid;
        let y;
        x && e.grid.initSlides(p);
        const M =
          "auto" === i.slidesPerView &&
          i.breakpoints &&
          Object.keys(i.breakpoints).filter(
            (e) => void 0 !== i.breakpoints[e].slidesPerView
          ).length > 0;
        for (let v = 0; v < p; v += 1) {
          y = 0;
          const n = c.eq(v);
          if (
            (x && e.grid.updateSlide(v, n, p, t), "none" !== n.css("display"))
          ) {
            if ("auto" === i.slidesPerView) {
              M && (c[v].style[t("width")] = "");
              const r = getComputedStyle(n[0]),
                a = n[0].style.transform,
                o = n[0].style.webkitTransform;
              if (
                (a && (n[0].style.transform = "none"),
                o && (n[0].style.webkitTransform = "none"),
                i.roundLengths)
              )
                y = e.isHorizontal() ? n.outerWidth(!0) : n.outerHeight(!0);
              else {
                const e = s(r, "width"),
                  t = s(r, "padding-left"),
                  i = s(r, "padding-right"),
                  a = s(r, "margin-left"),
                  o = s(r, "margin-right"),
                  l = r.getPropertyValue("box-sizing");
                if (l && "border-box" === l) y = e + a + o;
                else {
                  const { clientWidth: s, offsetWidth: r } = n[0];
                  y = e + t + i + a + o + (r - s);
                }
              }
              a && (n[0].style.transform = a),
                o && (n[0].style.webkitTransform = o),
                i.roundLengths && (y = Math.floor(y));
            } else
              (y = (r - (i.slidesPerView - 1) * S) / i.slidesPerView),
                i.roundLengths && (y = Math.floor(y)),
                c[v] && (c[v].style[t("width")] = `${y}px`);
            c[v] && (c[v].swiperSlideSize = y),
              f.push(y),
              i.centeredSlides
                ? ((b = b + y / 2 + C / 2 + S),
                  0 === C && 0 !== v && (b = b - r / 2 - S),
                  0 === v && (b = b - r / 2 - S),
                  Math.abs(b) < 0.001 && (b = 0),
                  i.roundLengths && (b = Math.floor(b)),
                  E % i.slidesPerGroup == 0 && u.push(b),
                  h.push(b))
                : (i.roundLengths && (b = Math.floor(b)),
                  (E - Math.min(e.params.slidesPerGroupSkip, E)) %
                    e.params.slidesPerGroup ==
                    0 && u.push(b),
                  h.push(b),
                  (b = b + y + S)),
              (e.virtualSize += y + S),
              (C = y),
              (E += 1);
          }
        }
        if (
          ((e.virtualSize = Math.max(e.virtualSize, r) + g),
          a &&
            o &&
            ("slide" === i.effect || "coverflow" === i.effect) &&
            n.css({ width: `${e.virtualSize + i.spaceBetween}px` }),
          i.setWrapperSize &&
            n.css({ [t("width")]: `${e.virtualSize + i.spaceBetween}px` }),
          x && e.grid.updateWrapperSize(y, u, t),
          !i.centeredSlides)
        ) {
          const t = [];
          for (let s = 0; s < u.length; s += 1) {
            let n = u[s];
            i.roundLengths && (n = Math.floor(n)),
              u[s] <= e.virtualSize - r && t.push(n);
          }
          (u = t),
            Math.floor(e.virtualSize - r) - Math.floor(u[u.length - 1]) > 1 &&
              u.push(e.virtualSize - r);
        }
        if ((0 === u.length && (u = [0]), 0 !== i.spaceBetween)) {
          const s = e.isHorizontal() && a ? "marginLeft" : t("marginRight");
          c.filter((e, t) => !i.cssMode || t !== c.length - 1).css({
            [s]: `${S}px`,
          });
        }
        if (i.centeredSlides && i.centeredSlidesBounds) {
          let e = 0;
          f.forEach((t) => {
            e += t + (i.spaceBetween ? i.spaceBetween : 0);
          }),
            (e -= i.spaceBetween);
          const t = e - r;
          u = u.map((e) => (e < 0 ? -m : e > t ? t + g : e));
        }
        if (i.centerInsufficientSlides) {
          let e = 0;
          if (
            (f.forEach((t) => {
              e += t + (i.spaceBetween ? i.spaceBetween : 0);
            }),
            (e -= i.spaceBetween),
            e < r)
          ) {
            const t = (r - e) / 2;
            u.forEach((e, s) => {
              u[s] = e - t;
            }),
              h.forEach((e, s) => {
                h[s] = e + t;
              });
          }
        }
        if (
          (Object.assign(e, {
            slides: c,
            snapGrid: u,
            slidesGrid: h,
            slidesSizesGrid: f,
          }),
          i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
        ) {
          v(e.wrapperEl, "--swiper-centered-offset-before", -u[0] + "px"),
            v(
              e.wrapperEl,
              "--swiper-centered-offset-after",
              e.size / 2 - f[f.length - 1] / 2 + "px"
            );
          const t = -e.snapGrid[0],
            s = -e.slidesGrid[0];
          (e.snapGrid = e.snapGrid.map((e) => e + t)),
            (e.slidesGrid = e.slidesGrid.map((e) => e + s));
        }
        if (
          (p !== d && e.emit("slidesLengthChange"),
          u.length !== w &&
            (e.params.watchOverflow && e.checkOverflow(),
            e.emit("snapGridLengthChange")),
          h.length !== T && e.emit("slidesGridLengthChange"),
          i.watchSlidesProgress && e.updateSlidesOffset(),
          !(l || i.cssMode || ("slide" !== i.effect && "fade" !== i.effect)))
        ) {
          const t = `${i.containerModifierClass}backface-hidden`,
            s = e.$el.hasClass(t);
          p <= i.maxBackfaceHiddenSlides
            ? s || e.$el.addClass(t)
            : s && e.$el.removeClass(t);
        }
      },
      updateAutoHeight: function (e) {
        const t = this,
          s = [],
          i = t.virtual && t.params.virtual.enabled;
        let n,
          r = 0;
        "number" == typeof e
          ? t.setTransition(e)
          : !0 === e && t.setTransition(t.params.speed);
        const a = (e) =>
          i
            ? t.slides.filter(
                (t) =>
                  parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e
              )[0]
            : t.slides.eq(e)[0];
        if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
          if (t.params.centeredSlides)
            (t.visibleSlides || d([])).each((e) => {
              s.push(e);
            });
          else
            for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
              const e = t.activeIndex + n;
              if (e > t.slides.length && !i) break;
              s.push(a(e));
            }
        else s.push(a(t.activeIndex));
        for (n = 0; n < s.length; n += 1)
          if (void 0 !== s[n]) {
            const e = s[n].offsetHeight;
            r = e > r ? e : r;
          }
        (r || 0 === r) && t.$wrapperEl.css("height", `${r}px`);
      },
      updateSlidesOffset: function () {
        const e = this,
          t = e.slides;
        for (let s = 0; s < t.length; s += 1)
          t[s].swiperSlideOffset = e.isHorizontal()
            ? t[s].offsetLeft
            : t[s].offsetTop;
      },
      updateSlidesProgress: function (e) {
        void 0 === e && (e = (this && this.translate) || 0);
        const t = this,
          s = t.params,
          { slides: i, rtlTranslate: n, snapGrid: r } = t;
        if (0 === i.length) return;
        void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
        let a = -e;
        n && (a = e),
          i.removeClass(s.slideVisibleClass),
          (t.visibleSlidesIndexes = []),
          (t.visibleSlides = []);
        for (let o = 0; o < i.length; o += 1) {
          const e = i[o];
          let l = e.swiperSlideOffset;
          s.cssMode && s.centeredSlides && (l -= i[0].swiperSlideOffset);
          const d =
              (a + (s.centeredSlides ? t.minTranslate() : 0) - l) /
              (e.swiperSlideSize + s.spaceBetween),
            c =
              (a - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - l) /
              (e.swiperSlideSize + s.spaceBetween),
            p = -(a - l),
            u = p + t.slidesSizesGrid[o];
          ((p >= 0 && p < t.size - 1) ||
            (u > 1 && u <= t.size) ||
            (p <= 0 && u >= t.size)) &&
            (t.visibleSlides.push(e),
            t.visibleSlidesIndexes.push(o),
            i.eq(o).addClass(s.slideVisibleClass)),
            (e.progress = n ? -d : d),
            (e.originalProgress = n ? -c : c);
        }
        t.visibleSlides = d(t.visibleSlides);
      },
      updateProgress: function (e) {
        const t = this;
        if (void 0 === e) {
          const s = t.rtlTranslate ? -1 : 1;
          e = (t && t.translate && t.translate * s) || 0;
        }
        const s = t.params,
          i = t.maxTranslate() - t.minTranslate();
        let { progress: n, isBeginning: r, isEnd: a } = t;
        const o = r,
          l = a;
        0 === i
          ? ((n = 0), (r = !0), (a = !0))
          : ((n = (e - t.minTranslate()) / i), (r = n <= 0), (a = n >= 1)),
          Object.assign(t, { progress: n, isBeginning: r, isEnd: a }),
          (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
            t.updateSlidesProgress(e),
          r && !o && t.emit("reachBeginning toEdge"),
          a && !l && t.emit("reachEnd toEdge"),
          ((o && !r) || (l && !a)) && t.emit("fromEdge"),
          t.emit("progress", n);
      },
      updateSlidesClasses: function () {
        const e = this,
          {
            slides: t,
            params: s,
            $wrapperEl: i,
            activeIndex: n,
            realIndex: r,
          } = e,
          a = e.virtual && s.virtual.enabled;
        let o;
        t.removeClass(
          `${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`
        ),
          (o = a
            ? e.$wrapperEl.find(
                `.${s.slideClass}[data-swiper-slide-index="${n}"]`
              )
            : t.eq(n)),
          o.addClass(s.slideActiveClass),
          s.loop &&
            (o.hasClass(s.slideDuplicateClass)
              ? i
                  .children(
                    `.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${r}"]`
                  )
                  .addClass(s.slideDuplicateActiveClass)
              : i
                  .children(
                    `.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${r}"]`
                  )
                  .addClass(s.slideDuplicateActiveClass));
        let l = o.nextAll(`.${s.slideClass}`).eq(0).addClass(s.slideNextClass);
        s.loop &&
          0 === l.length &&
          ((l = t.eq(0)), l.addClass(s.slideNextClass));
        let d = o.prevAll(`.${s.slideClass}`).eq(0).addClass(s.slidePrevClass);
        s.loop &&
          0 === d.length &&
          ((d = t.eq(-1)), d.addClass(s.slidePrevClass)),
          s.loop &&
            (l.hasClass(s.slideDuplicateClass)
              ? i
                  .children(
                    `.${s.slideClass}:not(.${
                      s.slideDuplicateClass
                    })[data-swiper-slide-index="${l.attr(
                      "data-swiper-slide-index"
                    )}"]`
                  )
                  .addClass(s.slideDuplicateNextClass)
              : i
                  .children(
                    `.${s.slideClass}.${
                      s.slideDuplicateClass
                    }[data-swiper-slide-index="${l.attr(
                      "data-swiper-slide-index"
                    )}"]`
                  )
                  .addClass(s.slideDuplicateNextClass),
            d.hasClass(s.slideDuplicateClass)
              ? i
                  .children(
                    `.${s.slideClass}:not(.${
                      s.slideDuplicateClass
                    })[data-swiper-slide-index="${d.attr(
                      "data-swiper-slide-index"
                    )}"]`
                  )
                  .addClass(s.slideDuplicatePrevClass)
              : i
                  .children(
                    `.${s.slideClass}.${
                      s.slideDuplicateClass
                    }[data-swiper-slide-index="${d.attr(
                      "data-swiper-slide-index"
                    )}"]`
                  )
                  .addClass(s.slideDuplicatePrevClass)),
          e.emitSlidesClasses();
      },
      updateActiveIndex: function (e) {
        const t = this,
          s = t.rtlTranslate ? t.translate : -t.translate,
          {
            slidesGrid: i,
            snapGrid: n,
            params: r,
            activeIndex: a,
            realIndex: o,
            snapIndex: l,
          } = t;
        let d,
          c = e;
        if (void 0 === c) {
          for (let e = 0; e < i.length; e += 1)
            void 0 !== i[e + 1]
              ? s >= i[e] && s < i[e + 1] - (i[e + 1] - i[e]) / 2
                ? (c = e)
                : s >= i[e] && s < i[e + 1] && (c = e + 1)
              : s >= i[e] && (c = e);
          r.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
        }
        if (n.indexOf(s) >= 0) d = n.indexOf(s);
        else {
          const e = Math.min(r.slidesPerGroupSkip, c);
          d = e + Math.floor((c - e) / r.slidesPerGroup);
        }
        if ((d >= n.length && (d = n.length - 1), c === a))
          return void (
            d !== l && ((t.snapIndex = d), t.emit("snapIndexChange"))
          );
        const p = parseInt(
          t.slides.eq(c).attr("data-swiper-slide-index") || c,
          10
        );
        Object.assign(t, {
          snapIndex: d,
          realIndex: p,
          previousIndex: a,
          activeIndex: c,
        }),
          t.emit("activeIndexChange"),
          t.emit("snapIndexChange"),
          o !== p && t.emit("realIndexChange"),
          (t.initialized || t.params.runCallbacksOnInit) &&
            t.emit("slideChange");
      },
      updateClickedSlide: function (e) {
        const t = this,
          s = t.params,
          i = d(e).closest(`.${s.slideClass}`)[0];
        let n,
          r = !1;
        if (i)
          for (let a = 0; a < t.slides.length; a += 1)
            if (t.slides[a] === i) {
              (r = !0), (n = a);
              break;
            }
        if (!i || !r)
          return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
        (t.clickedSlide = i),
          t.virtual && t.params.virtual.enabled
            ? (t.clickedIndex = parseInt(
                d(i).attr("data-swiper-slide-index"),
                10
              ))
            : (t.clickedIndex = n),
          s.slideToClickedSlide &&
            void 0 !== t.clickedIndex &&
            t.clickedIndex !== t.activeIndex &&
            t.slideToClickedSlide();
      },
    },
    translate: {
      getTranslate: function (e) {
        void 0 === e && (e = this.isHorizontal() ? "x" : "y");
        const {
          params: t,
          rtlTranslate: s,
          translate: i,
          $wrapperEl: n,
        } = this;
        if (t.virtualTranslate) return s ? -i : i;
        if (t.cssMode) return i;
        let r = h(n[0], e);
        return s && (r = -r), r || 0;
      },
      setTranslate: function (e, t) {
        const s = this,
          {
            rtlTranslate: i,
            params: n,
            $wrapperEl: r,
            wrapperEl: a,
            progress: o,
          } = s;
        let l,
          d = 0,
          c = 0;
        s.isHorizontal() ? (d = i ? -e : e) : (c = e),
          n.roundLengths && ((d = Math.floor(d)), (c = Math.floor(c))),
          n.cssMode
            ? (a[s.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                s.isHorizontal() ? -d : -c)
            : n.virtualTranslate ||
              r.transform(`translate3d(${d}px, ${c}px, 0px)`),
          (s.previousTranslate = s.translate),
          (s.translate = s.isHorizontal() ? d : c);
        const p = s.maxTranslate() - s.minTranslate();
        (l = 0 === p ? 0 : (e - s.minTranslate()) / p),
          l !== o && s.updateProgress(e),
          s.emit("setTranslate", s.translate, t);
      },
      minTranslate: function () {
        return -this.snapGrid[0];
      },
      maxTranslate: function () {
        return -this.snapGrid[this.snapGrid.length - 1];
      },
      translateTo: function (e, t, s, i, n) {
        void 0 === e && (e = 0),
          void 0 === t && (t = this.params.speed),
          void 0 === s && (s = !0),
          void 0 === i && (i = !0);
        const r = this,
          { params: a, wrapperEl: o } = r;
        if (r.animating && a.preventInteractionOnTransition) return !1;
        const l = r.minTranslate(),
          d = r.maxTranslate();
        let c;
        if (
          ((c = i && e > l ? l : i && e < d ? d : e),
          r.updateProgress(c),
          a.cssMode)
        ) {
          const e = r.isHorizontal();
          if (0 === t) o[e ? "scrollLeft" : "scrollTop"] = -c;
          else {
            if (!r.support.smoothScroll)
              return (
                w({ swiper: r, targetPosition: -c, side: e ? "left" : "top" }),
                !0
              );
            o.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
          }
          return !0;
        }
        return (
          0 === t
            ? (r.setTransition(0),
              r.setTranslate(c),
              s &&
                (r.emit("beforeTransitionStart", t, n),
                r.emit("transitionEnd")))
            : (r.setTransition(t),
              r.setTranslate(c),
              s &&
                (r.emit("beforeTransitionStart", t, n),
                r.emit("transitionStart")),
              r.animating ||
                ((r.animating = !0),
                r.onTranslateToWrapperTransitionEnd ||
                  (r.onTranslateToWrapperTransitionEnd = function (e) {
                    r &&
                      !r.destroyed &&
                      e.target === this &&
                      (r.$wrapperEl[0].removeEventListener(
                        "transitionend",
                        r.onTranslateToWrapperTransitionEnd
                      ),
                      r.$wrapperEl[0].removeEventListener(
                        "webkitTransitionEnd",
                        r.onTranslateToWrapperTransitionEnd
                      ),
                      (r.onTranslateToWrapperTransitionEnd = null),
                      delete r.onTranslateToWrapperTransitionEnd,
                      s && r.emit("transitionEnd"));
                  }),
                r.$wrapperEl[0].addEventListener(
                  "transitionend",
                  r.onTranslateToWrapperTransitionEnd
                ),
                r.$wrapperEl[0].addEventListener(
                  "webkitTransitionEnd",
                  r.onTranslateToWrapperTransitionEnd
                ))),
          !0
        );
      },
    },
    transition: {
      setTransition: function (e, t) {
        const s = this;
        s.params.cssMode || s.$wrapperEl.transition(e),
          s.emit("setTransition", e, t);
      },
      transitionStart: function (e, t) {
        void 0 === e && (e = !0);
        const s = this,
          { params: i } = s;
        i.cssMode ||
          (i.autoHeight && s.updateAutoHeight(),
          y({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
      },
      transitionEnd: function (e, t) {
        void 0 === e && (e = !0);
        const s = this,
          { params: i } = s;
        (s.animating = !1),
          i.cssMode ||
            (s.setTransition(0),
            y({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
      },
    },
    slide: {
      slideTo: function (e, t, s, i, n) {
        if (
          (void 0 === e && (e = 0),
          void 0 === t && (t = this.params.speed),
          void 0 === s && (s = !0),
          "number" != typeof e && "string" != typeof e)
        )
          throw new Error(
            `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
          );
        if ("string" == typeof e) {
          const t = parseInt(e, 10);
          if (!isFinite(t))
            throw new Error(
              `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
            );
          e = t;
        }
        const r = this;
        let a = e;
        a < 0 && (a = 0);
        const {
          params: o,
          snapGrid: l,
          slidesGrid: d,
          previousIndex: c,
          activeIndex: p,
          rtlTranslate: u,
          wrapperEl: h,
          enabled: f,
        } = r;
        if (
          (r.animating && o.preventInteractionOnTransition) ||
          (!f && !i && !n)
        )
          return !1;
        const m = Math.min(r.params.slidesPerGroupSkip, a);
        let g = m + Math.floor((a - m) / r.params.slidesPerGroup);
        g >= l.length && (g = l.length - 1),
          (p || o.initialSlide || 0) === (c || 0) &&
            s &&
            r.emit("beforeSlideChangeStart");
        const v = -l[g];
        if ((r.updateProgress(v), o.normalizeSlideIndex))
          for (let w = 0; w < d.length; w += 1) {
            const e = -Math.floor(100 * v),
              t = Math.floor(100 * d[w]),
              s = Math.floor(100 * d[w + 1]);
            void 0 !== d[w + 1]
              ? e >= t && e < s - (s - t) / 2
                ? (a = w)
                : e >= t && e < s && (a = w + 1)
              : e >= t && (a = w);
          }
        if (r.initialized && a !== p) {
          if (!r.allowSlideNext && v < r.translate && v < r.minTranslate())
            return !1;
          if (
            !r.allowSlidePrev &&
            v > r.translate &&
            v > r.maxTranslate() &&
            (p || 0) !== a
          )
            return !1;
        }
        let T;
        if (
          ((T = a > p ? "next" : a < p ? "prev" : "reset"),
          (u && -v === r.translate) || (!u && v === r.translate))
        )
          return (
            r.updateActiveIndex(a),
            o.autoHeight && r.updateAutoHeight(),
            r.updateSlidesClasses(),
            "slide" !== o.effect && r.setTranslate(v),
            "reset" !== T && (r.transitionStart(s, T), r.transitionEnd(s, T)),
            !1
          );
        if (o.cssMode) {
          const e = r.isHorizontal(),
            s = u ? v : -v;
          if (0 === t) {
            const t = r.virtual && r.params.virtual.enabled;
            t &&
              ((r.wrapperEl.style.scrollSnapType = "none"),
              (r._immediateVirtual = !0)),
              (h[e ? "scrollLeft" : "scrollTop"] = s),
              t &&
                requestAnimationFrame(() => {
                  (r.wrapperEl.style.scrollSnapType = ""),
                    (r._swiperImmediateVirtual = !1);
                });
          } else {
            if (!r.support.smoothScroll)
              return (
                w({ swiper: r, targetPosition: s, side: e ? "left" : "top" }),
                !0
              );
            h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
          }
          return !0;
        }
        return (
          r.setTransition(t),
          r.setTranslate(v),
          r.updateActiveIndex(a),
          r.updateSlidesClasses(),
          r.emit("beforeTransitionStart", t, i),
          r.transitionStart(s, T),
          0 === t
            ? r.transitionEnd(s, T)
            : r.animating ||
              ((r.animating = !0),
              r.onSlideToWrapperTransitionEnd ||
                (r.onSlideToWrapperTransitionEnd = function (e) {
                  r &&
                    !r.destroyed &&
                    e.target === this &&
                    (r.$wrapperEl[0].removeEventListener(
                      "transitionend",
                      r.onSlideToWrapperTransitionEnd
                    ),
                    r.$wrapperEl[0].removeEventListener(
                      "webkitTransitionEnd",
                      r.onSlideToWrapperTransitionEnd
                    ),
                    (r.onSlideToWrapperTransitionEnd = null),
                    delete r.onSlideToWrapperTransitionEnd,
                    r.transitionEnd(s, T));
                }),
              r.$wrapperEl[0].addEventListener(
                "transitionend",
                r.onSlideToWrapperTransitionEnd
              ),
              r.$wrapperEl[0].addEventListener(
                "webkitTransitionEnd",
                r.onSlideToWrapperTransitionEnd
              )),
          !0
        );
      },
      slideToLoop: function (e, t, s, i) {
        if (
          (void 0 === e && (e = 0),
          void 0 === t && (t = this.params.speed),
          void 0 === s && (s = !0),
          "string" == typeof e)
        ) {
          const t = parseInt(e, 10);
          if (!isFinite(t))
            throw new Error(
              `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
            );
          e = t;
        }
        const n = this;
        let r = e;
        return n.params.loop && (r += n.loopedSlides), n.slideTo(r, t, s, i);
      },
      slideNext: function (e, t, s) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        const i = this,
          { animating: n, enabled: r, params: a } = i;
        if (!r) return i;
        let o = a.slidesPerGroup;
        "auto" === a.slidesPerView &&
          1 === a.slidesPerGroup &&
          a.slidesPerGroupAuto &&
          (o = Math.max(i.slidesPerViewDynamic("current", !0), 1));
        const l = i.activeIndex < a.slidesPerGroupSkip ? 1 : o;
        if (a.loop) {
          if (n && a.loopPreventsSlide) return !1;
          i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
        }
        return a.rewind && i.isEnd
          ? i.slideTo(0, e, t, s)
          : i.slideTo(i.activeIndex + l, e, t, s);
      },
      slidePrev: function (e, t, s) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        const i = this,
          {
            params: n,
            animating: r,
            snapGrid: a,
            slidesGrid: o,
            rtlTranslate: l,
            enabled: d,
          } = i;
        if (!d) return i;
        if (n.loop) {
          if (r && n.loopPreventsSlide) return !1;
          i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
        }
        function c(e) {
          return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
        }
        const p = c(l ? i.translate : -i.translate),
          u = a.map((e) => c(e));
        let h = a[u.indexOf(p) - 1];
        if (void 0 === h && n.cssMode) {
          let e;
          a.forEach((t, s) => {
            p >= t && (e = s);
          }),
            void 0 !== e && (h = a[e > 0 ? e - 1 : e]);
        }
        let f = 0;
        if (
          (void 0 !== h &&
            ((f = o.indexOf(h)),
            f < 0 && (f = i.activeIndex - 1),
            "auto" === n.slidesPerView &&
              1 === n.slidesPerGroup &&
              n.slidesPerGroupAuto &&
              ((f = f - i.slidesPerViewDynamic("previous", !0) + 1),
              (f = Math.max(f, 0)))),
          n.rewind && i.isBeginning)
        ) {
          const n =
            i.params.virtual && i.params.virtual.enabled && i.virtual
              ? i.virtual.slides.length - 1
              : i.slides.length - 1;
          return i.slideTo(n, e, t, s);
        }
        return i.slideTo(f, e, t, s);
      },
      slideReset: function (e, t, s) {
        return (
          void 0 === e && (e = this.params.speed),
          void 0 === t && (t = !0),
          this.slideTo(this.activeIndex, e, t, s)
        );
      },
      slideToClosest: function (e, t, s, i) {
        void 0 === e && (e = this.params.speed),
          void 0 === t && (t = !0),
          void 0 === i && (i = 0.5);
        const n = this;
        let r = n.activeIndex;
        const a = Math.min(n.params.slidesPerGroupSkip, r),
          o = a + Math.floor((r - a) / n.params.slidesPerGroup),
          l = n.rtlTranslate ? n.translate : -n.translate;
        if (l >= n.snapGrid[o]) {
          const e = n.snapGrid[o];
          l - e > (n.snapGrid[o + 1] - e) * i && (r += n.params.slidesPerGroup);
        } else {
          const e = n.snapGrid[o - 1];
          l - e <= (n.snapGrid[o] - e) * i && (r -= n.params.slidesPerGroup);
        }
        return (
          (r = Math.max(r, 0)),
          (r = Math.min(r, n.slidesGrid.length - 1)),
          n.slideTo(r, e, t, s)
        );
      },
      slideToClickedSlide: function () {
        const e = this,
          { params: t, $wrapperEl: s } = e,
          i =
            "auto" === t.slidesPerView
              ? e.slidesPerViewDynamic()
              : t.slidesPerView;
        let n,
          r = e.clickedIndex;
        if (t.loop) {
          if (e.animating) return;
          (n = parseInt(d(e.clickedSlide).attr("data-swiper-slide-index"), 10)),
            t.centeredSlides
              ? r < e.loopedSlides - i / 2 ||
                r > e.slides.length - e.loopedSlides + i / 2
                ? (e.loopFix(),
                  (r = s
                    .children(
                      `.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`
                    )
                    .eq(0)
                    .index()),
                  p(() => {
                    e.slideTo(r);
                  }))
                : e.slideTo(r)
              : r > e.slides.length - i
              ? (e.loopFix(),
                (r = s
                  .children(
                    `.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`
                  )
                  .eq(0)
                  .index()),
                p(() => {
                  e.slideTo(r);
                }))
              : e.slideTo(r);
        } else e.slideTo(r);
      },
    },
    loop: {
      loopCreate: function () {
        const e = this,
          t = i(),
          { params: s, $wrapperEl: n } = e,
          r = n.children().length > 0 ? d(n.children()[0].parentNode) : n;
        r.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
        let a = r.children(`.${s.slideClass}`);
        if (s.loopFillGroupWithBlank) {
          const e = s.slidesPerGroup - (a.length % s.slidesPerGroup);
          if (e !== s.slidesPerGroup) {
            for (let i = 0; i < e; i += 1) {
              const e = d(t.createElement("div")).addClass(
                `${s.slideClass} ${s.slideBlankClass}`
              );
              r.append(e);
            }
            a = r.children(`.${s.slideClass}`);
          }
        }
        "auto" !== s.slidesPerView ||
          s.loopedSlides ||
          (s.loopedSlides = a.length),
          (e.loopedSlides = Math.ceil(
            parseFloat(s.loopedSlides || s.slidesPerView, 10)
          )),
          (e.loopedSlides += s.loopAdditionalSlides),
          e.loopedSlides > a.length && (e.loopedSlides = a.length);
        const o = [],
          l = [];
        a.each((t, s) => {
          const i = d(t);
          s < e.loopedSlides && l.push(t),
            s < a.length && s >= a.length - e.loopedSlides && o.push(t),
            i.attr("data-swiper-slide-index", s);
        });
        for (let i = 0; i < l.length; i += 1)
          r.append(d(l[i].cloneNode(!0)).addClass(s.slideDuplicateClass));
        for (let i = o.length - 1; i >= 0; i -= 1)
          r.prepend(d(o[i].cloneNode(!0)).addClass(s.slideDuplicateClass));
      },
      loopFix: function () {
        const e = this;
        e.emit("beforeLoopFix");
        const {
          activeIndex: t,
          slides: s,
          loopedSlides: i,
          allowSlidePrev: n,
          allowSlideNext: r,
          snapGrid: a,
          rtlTranslate: o,
        } = e;
        let l;
        (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
        const d = -a[t] - e.getTranslate();
        if (t < i) {
          (l = s.length - 3 * i + t), (l += i);
          e.slideTo(l, 0, !1, !0) &&
            0 !== d &&
            e.setTranslate((o ? -e.translate : e.translate) - d);
        } else if (t >= s.length - i) {
          (l = -s.length + t + i), (l += i);
          e.slideTo(l, 0, !1, !0) &&
            0 !== d &&
            e.setTranslate((o ? -e.translate : e.translate) - d);
        }
        (e.allowSlidePrev = n), (e.allowSlideNext = r), e.emit("loopFix");
      },
      loopDestroy: function () {
        const { $wrapperEl: e, params: t, slides: s } = this;
        e
          .children(
            `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
          )
          .remove(),
          s.removeAttr("data-swiper-slide-index");
      },
    },
    grabCursor: {
      setGrabCursor: function (e) {
        const t = this;
        if (
          t.support.touch ||
          !t.params.simulateTouch ||
          (t.params.watchOverflow && t.isLocked) ||
          t.params.cssMode
        )
          return;
        const s =
          "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
        (s.style.cursor = "move"), (s.style.cursor = e ? "grabbing" : "grab");
      },
      unsetGrabCursor: function () {
        const e = this;
        e.support.touch ||
          (e.params.watchOverflow && e.isLocked) ||
          e.params.cssMode ||
          (e[
            "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
          ].style.cursor = "");
      },
    },
    events: {
      attachEvents: function () {
        const e = this,
          t = i(),
          { params: s, support: n } = e;
        (e.onTouchStart = M.bind(e)),
          (e.onTouchMove = k.bind(e)),
          (e.onTouchEnd = P.bind(e)),
          s.cssMode && (e.onScroll = O.bind(e)),
          (e.onClick = $.bind(e)),
          n.touch && !A && (t.addEventListener("touchstart", z), (A = !0)),
          I(e, "on");
      },
      detachEvents: function () {
        I(this, "off");
      },
    },
    breakpoints: {
      setBreakpoint: function () {
        const e = this,
          {
            activeIndex: t,
            initialized: s,
            loopedSlides: i = 0,
            params: n,
            $el: r,
          } = e,
          a = n.breakpoints;
        if (!a || (a && 0 === Object.keys(a).length)) return;
        const o = e.getBreakpoint(a, e.params.breakpointsBase, e.el);
        if (!o || e.currentBreakpoint === o) return;
        const l = (o in a ? a[o] : void 0) || e.originalParams,
          d = D(e, n),
          c = D(e, l),
          p = n.enabled;
        d && !c
          ? (r.removeClass(
              `${n.containerModifierClass}grid ${n.containerModifierClass}grid-column`
            ),
            e.emitContainerClasses())
          : !d &&
            c &&
            (r.addClass(`${n.containerModifierClass}grid`),
            ((l.grid.fill && "column" === l.grid.fill) ||
              (!l.grid.fill && "column" === n.grid.fill)) &&
              r.addClass(`${n.containerModifierClass}grid-column`),
            e.emitContainerClasses()),
          ["navigation", "pagination", "scrollbar"].forEach((t) => {
            const s = n[t] && n[t].enabled,
              i = l[t] && l[t].enabled;
            s && !i && e[t].disable(), !s && i && e[t].enable();
          });
        const u = l.direction && l.direction !== n.direction,
          h = n.loop && (l.slidesPerView !== n.slidesPerView || u);
        u && s && e.changeDirection(), g(e.params, l);
        const f = e.params.enabled;
        Object.assign(e, {
          allowTouchMove: e.params.allowTouchMove,
          allowSlideNext: e.params.allowSlideNext,
          allowSlidePrev: e.params.allowSlidePrev,
        }),
          p && !f ? e.disable() : !p && f && e.enable(),
          (e.currentBreakpoint = o),
          e.emit("_beforeBreakpoint", l),
          h &&
            s &&
            (e.loopDestroy(),
            e.loopCreate(),
            e.updateSlides(),
            e.slideTo(t - i + e.loopedSlides, 0, !1)),
          e.emit("breakpoint", l);
      },
      getBreakpoint: function (e, t, s) {
        if ((void 0 === t && (t = "window"), !e || ("container" === t && !s)))
          return;
        let i = !1;
        const n = r(),
          a = "window" === t ? n.innerHeight : s.clientHeight,
          o = Object.keys(e).map((e) => {
            if ("string" == typeof e && 0 === e.indexOf("@")) {
              const t = parseFloat(e.substr(1));
              return { value: a * t, point: e };
            }
            return { value: e, point: e };
          });
        o.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
        for (let r = 0; r < o.length; r += 1) {
          const { point: e, value: a } = o[r];
          "window" === t
            ? n.matchMedia(`(min-width: ${a}px)`).matches && (i = e)
            : a <= s.clientWidth && (i = e);
        }
        return i || "max";
      },
    },
    checkOverflow: {
      checkOverflow: function () {
        const e = this,
          { isLocked: t, params: s } = e,
          { slidesOffsetBefore: i } = s;
        if (i) {
          const t = e.slides.length - 1,
            s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
          e.isLocked = e.size > s;
        } else e.isLocked = 1 === e.snapGrid.length;
        !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
          !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
          t && t !== e.isLocked && (e.isEnd = !1),
          t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
      },
    },
    classes: {
      addClasses: function () {
        const e = this,
          {
            classNames: t,
            params: s,
            rtl: i,
            $el: n,
            device: r,
            support: a,
          } = e,
          o = (function (e, t) {
            const s = [];
            return (
              e.forEach((e) => {
                "object" == typeof e
                  ? Object.keys(e).forEach((i) => {
                      e[i] && s.push(t + i);
                    })
                  : "string" == typeof e && s.push(t + e);
              }),
              s
            );
          })(
            [
              "initialized",
              s.direction,
              { "pointer-events": !a.touch },
              { "free-mode": e.params.freeMode && s.freeMode.enabled },
              { autoheight: s.autoHeight },
              { rtl: i },
              { grid: s.grid && s.grid.rows > 1 },
              {
                "grid-column":
                  s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
              },
              { android: r.android },
              { ios: r.ios },
              { "css-mode": s.cssMode },
              { centered: s.cssMode && s.centeredSlides },
              { "watch-progress": s.watchSlidesProgress },
            ],
            s.containerModifierClass
          );
        t.push(...o), n.addClass([...t].join(" ")), e.emitContainerClasses();
      },
      removeClasses: function () {
        const { $el: e, classNames: t } = this;
        e.removeClass(t.join(" ")), this.emitContainerClasses();
      },
    },
    images: {
      loadImage: function (e, t, s, i, n, a) {
        const o = r();
        let l;
        function c() {
          a && a();
        }
        d(e).parent("picture")[0] || (e.complete && n)
          ? c()
          : t
          ? ((l = new o.Image()),
            (l.onload = c),
            (l.onerror = c),
            i && (l.sizes = i),
            s && (l.srcset = s),
            t && (l.src = t))
          : c();
      },
      preloadImages: function () {
        const e = this;
        function t() {
          null != e &&
            e &&
            !e.destroyed &&
            (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
            e.imagesLoaded === e.imagesToLoad.length &&
              (e.params.updateOnImagesReady && e.update(),
              e.emit("imagesReady")));
        }
        e.imagesToLoad = e.$el.find("img");
        for (let s = 0; s < e.imagesToLoad.length; s += 1) {
          const i = e.imagesToLoad[s];
          e.loadImage(
            i,
            i.currentSrc || i.getAttribute("src"),
            i.srcset || i.getAttribute("srcset"),
            i.sizes || i.getAttribute("sizes"),
            !0,
            t
          );
        }
      },
    },
  },
  B = {};
class H {
  constructor() {
    let e, t;
    for (var s = arguments.length, i = new Array(s), n = 0; n < s; n++)
      i[n] = arguments[n];
    if (
      (1 === i.length &&
      i[0].constructor &&
      "Object" === Object.prototype.toString.call(i[0]).slice(8, -1)
        ? (t = i[0])
        : ([e, t] = i),
      t || (t = {}),
      (t = g({}, t)),
      e && !t.el && (t.el = e),
      t.el && d(t.el).length > 1)
    ) {
      const e = [];
      return (
        d(t.el).each((s) => {
          const i = g({}, t, { el: s });
          e.push(new H(i));
        }),
        e
      );
    }
    const r = this;
    (r.__swiper__ = !0),
      (r.support = C()),
      (r.device = E({ userAgent: t.userAgent })),
      (r.browser = x()),
      (r.eventsListeners = {}),
      (r.eventsAnyListeners = []),
      (r.modules = [...r.__modules__]),
      t.modules && Array.isArray(t.modules) && r.modules.push(...t.modules);
    const a = {};
    r.modules.forEach((e) => {
      e({
        swiper: r,
        extendParams: N(t, a),
        on: r.on.bind(r),
        once: r.once.bind(r),
        off: r.off.bind(r),
        emit: r.emit.bind(r),
      });
    });
    const o = g({}, G, a);
    return (
      (r.params = g({}, o, B, t)),
      (r.originalParams = g({}, r.params)),
      (r.passedParams = g({}, t)),
      r.params &&
        r.params.on &&
        Object.keys(r.params.on).forEach((e) => {
          r.on(e, r.params.on[e]);
        }),
      r.params && r.params.onAny && r.onAny(r.params.onAny),
      (r.$ = d),
      Object.assign(r, {
        enabled: r.params.enabled,
        el: e,
        classNames: [],
        slides: d(),
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal: () => "horizontal" === r.params.direction,
        isVertical: () => "vertical" === r.params.direction,
        activeIndex: 0,
        realIndex: 0,
        isBeginning: !0,
        isEnd: !1,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: !1,
        allowSlideNext: r.params.allowSlideNext,
        allowSlidePrev: r.params.allowSlidePrev,
        touchEvents: (function () {
          const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
            t = ["pointerdown", "pointermove", "pointerup"];
          return (
            (r.touchEventsTouch = {
              start: e[0],
              move: e[1],
              end: e[2],
              cancel: e[3],
            }),
            (r.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }),
            r.support.touch || !r.params.simulateTouch
              ? r.touchEventsTouch
              : r.touchEventsDesktop
          );
        })(),
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: r.params.focusableElements,
          lastClickTime: u(),
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          isTouchEvent: void 0,
          startMoving: void 0,
        },
        allowClick: !0,
        allowTouchMove: r.params.allowTouchMove,
        touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
        imagesToLoad: [],
        imagesLoaded: 0,
      }),
      r.emit("_swiper"),
      r.params.init && r.init(),
      r
    );
  }
  enable() {
    const e = this;
    e.enabled ||
      ((e.enabled = !0),
      e.params.grabCursor && e.setGrabCursor(),
      e.emit("enable"));
  }
  disable() {
    const e = this;
    e.enabled &&
      ((e.enabled = !1),
      e.params.grabCursor && e.unsetGrabCursor(),
      e.emit("disable"));
  }
  setProgress(e, t) {
    const s = this;
    e = Math.min(Math.max(e, 0), 1);
    const i = s.minTranslate(),
      n = (s.maxTranslate() - i) * e + i;
    s.translateTo(n, void 0 === t ? 0 : t),
      s.updateActiveIndex(),
      s.updateSlidesClasses();
  }
  emitContainerClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const t = e.el.className
      .split(" ")
      .filter(
        (t) =>
          0 === t.indexOf("swiper") ||
          0 === t.indexOf(e.params.containerModifierClass)
      );
    e.emit("_containerClasses", t.join(" "));
  }
  getSlideClasses(e) {
    const t = this;
    return t.destroyed
      ? ""
      : e.className
          .split(" ")
          .filter(
            (e) =>
              0 === e.indexOf("swiper-slide") ||
              0 === e.indexOf(t.params.slideClass)
          )
          .join(" ");
  }
  emitSlidesClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const t = [];
    e.slides.each((s) => {
      const i = e.getSlideClasses(s);
      t.push({ slideEl: s, classNames: i }), e.emit("_slideClass", s, i);
    }),
      e.emit("_slideClasses", t);
  }
  slidesPerViewDynamic(e, t) {
    void 0 === e && (e = "current"), void 0 === t && (t = !1);
    const {
      params: s,
      slides: i,
      slidesGrid: n,
      slidesSizesGrid: r,
      size: a,
      activeIndex: o,
    } = this;
    let l = 1;
    if (s.centeredSlides) {
      let e,
        t = i[o].swiperSlideSize;
      for (let s = o + 1; s < i.length; s += 1)
        i[s] &&
          !e &&
          ((t += i[s].swiperSlideSize), (l += 1), t > a && (e = !0));
      for (let s = o - 1; s >= 0; s -= 1)
        i[s] &&
          !e &&
          ((t += i[s].swiperSlideSize), (l += 1), t > a && (e = !0));
    } else if ("current" === e)
      for (let d = o + 1; d < i.length; d += 1) {
        (t ? n[d] + r[d] - n[o] < a : n[d] - n[o] < a) && (l += 1);
      }
    else
      for (let d = o - 1; d >= 0; d -= 1) {
        n[o] - n[d] < a && (l += 1);
      }
    return l;
  }
  update() {
    const e = this;
    if (!e || e.destroyed) return;
    const { snapGrid: t, params: s } = e;
    function i() {
      const t = e.rtlTranslate ? -1 * e.translate : e.translate,
        s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
      e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
    }
    let n;
    s.breakpoints && e.setBreakpoint(),
      e.updateSize(),
      e.updateSlides(),
      e.updateProgress(),
      e.updateSlidesClasses(),
      e.params.freeMode && e.params.freeMode.enabled
        ? (i(), e.params.autoHeight && e.updateAutoHeight())
        : ((n =
            ("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) &&
            e.isEnd &&
            !e.params.centeredSlides
              ? e.slideTo(e.slides.length - 1, 0, !1, !0)
              : e.slideTo(e.activeIndex, 0, !1, !0)),
          n || i()),
      s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
      e.emit("update");
  }
  changeDirection(e, t) {
    void 0 === t && (t = !0);
    const s = this,
      i = s.params.direction;
    return (
      e || (e = "horizontal" === i ? "vertical" : "horizontal"),
      e === i ||
        ("horizontal" !== e && "vertical" !== e) ||
        (s.$el
          .removeClass(`${s.params.containerModifierClass}${i}`)
          .addClass(`${s.params.containerModifierClass}${e}`),
        s.emitContainerClasses(),
        (s.params.direction = e),
        s.slides.each((t) => {
          "vertical" === e ? (t.style.width = "") : (t.style.height = "");
        }),
        s.emit("changeDirection"),
        t && s.update()),
      s
    );
  }
  changeLanguageDirection(e) {
    const t = this;
    (t.rtl && "rtl" === e) ||
      (!t.rtl && "ltr" === e) ||
      ((t.rtl = "rtl" === e),
      (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
      t.rtl
        ? (t.$el.addClass(`${t.params.containerModifierClass}rtl`),
          (t.el.dir = "rtl"))
        : (t.$el.removeClass(`${t.params.containerModifierClass}rtl`),
          (t.el.dir = "ltr")),
      t.update());
  }
  mount(e) {
    const t = this;
    if (t.mounted) return !0;
    const s = d(e || t.params.el);
    if (!(e = s[0])) return !1;
    e.swiper = t;
    const n = () =>
      `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let r = (() => {
      if (e && e.shadowRoot && e.shadowRoot.querySelector) {
        const t = d(e.shadowRoot.querySelector(n()));
        return (t.children = (e) => s.children(e)), t;
      }
      return s.children ? s.children(n()) : d(s).children(n());
    })();
    if (0 === r.length && t.params.createElements) {
      const e = i().createElement("div");
      (r = d(e)),
        (e.className = t.params.wrapperClass),
        s.append(e),
        s.children(`.${t.params.slideClass}`).each((e) => {
          r.append(e);
        });
    }
    return (
      Object.assign(t, {
        $el: s,
        el: e,
        $wrapperEl: r,
        wrapperEl: r[0],
        mounted: !0,
        rtl: "rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction"),
        rtlTranslate:
          "horizontal" === t.params.direction &&
          ("rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction")),
        wrongRTL: "-webkit-box" === r.css("display"),
      }),
      !0
    );
  }
  init(e) {
    const t = this;
    if (t.initialized) return t;
    return (
      !1 === t.mount(e) ||
        (t.emit("beforeInit"),
        t.params.breakpoints && t.setBreakpoint(),
        t.addClasses(),
        t.params.loop && t.loopCreate(),
        t.updateSize(),
        t.updateSlides(),
        t.params.watchOverflow && t.checkOverflow(),
        t.params.grabCursor && t.enabled && t.setGrabCursor(),
        t.params.preloadImages && t.preloadImages(),
        t.params.loop
          ? t.slideTo(
              t.params.initialSlide + t.loopedSlides,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0
            )
          : t.slideTo(
              t.params.initialSlide,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0
            ),
        t.attachEvents(),
        (t.initialized = !0),
        t.emit("init"),
        t.emit("afterInit")),
      t
    );
  }
  destroy(e, t) {
    void 0 === e && (e = !0), void 0 === t && (t = !0);
    const s = this,
      { params: i, $el: n, $wrapperEl: r, slides: a } = s;
    return (
      void 0 === s.params ||
        s.destroyed ||
        (s.emit("beforeDestroy"),
        (s.initialized = !1),
        s.detachEvents(),
        i.loop && s.loopDestroy(),
        t &&
          (s.removeClasses(),
          n.removeAttr("style"),
          r.removeAttr("style"),
          a &&
            a.length &&
            a
              .removeClass(
                [
                  i.slideVisibleClass,
                  i.slideActiveClass,
                  i.slideNextClass,
                  i.slidePrevClass,
                ].join(" ")
              )
              .removeAttr("style")
              .removeAttr("data-swiper-slide-index")),
        s.emit("destroy"),
        Object.keys(s.eventsListeners).forEach((e) => {
          s.off(e);
        }),
        !1 !== e &&
          ((s.$el[0].swiper = null),
          (function (e) {
            const t = e;
            Object.keys(t).forEach((e) => {
              try {
                t[e] = null;
              } catch (s) {}
              try {
                delete t[e];
              } catch (s) {}
            });
          })(s)),
        (s.destroyed = !0)),
      null
    );
  }
  static extendDefaults(e) {
    g(B, e);
  }
  static get extendedDefaults() {
    return B;
  }
  static get defaults() {
    return G;
  }
  static installModule(e) {
    H.prototype.__modules__ || (H.prototype.__modules__ = []);
    const t = H.prototype.__modules__;
    "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
  }
  static use(e) {
    return Array.isArray(e)
      ? (e.forEach((e) => H.installModule(e)), H)
      : (H.installModule(e), H);
  }
}
function j(e) {
  let { swiper: t, extendParams: s, on: n, emit: r } = e;
  function a(e) {
    let s;
    return (
      e &&
        ((s = d(e)),
        t.params.uniqueNavElements &&
          "string" == typeof e &&
          s.length > 1 &&
          1 === t.$el.find(e).length &&
          (s = t.$el.find(e))),
      s
    );
  }
  function o(e, s) {
    const i = t.params.navigation;
    e &&
      e.length > 0 &&
      (e[s ? "addClass" : "removeClass"](i.disabledClass),
      e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = s),
      t.params.watchOverflow &&
        t.enabled &&
        e[t.isLocked ? "addClass" : "removeClass"](i.lockClass));
  }
  function l() {
    if (t.params.loop) return;
    const { $nextEl: e, $prevEl: s } = t.navigation;
    o(s, t.isBeginning && !t.params.rewind), o(e, t.isEnd && !t.params.rewind);
  }
  function c(e) {
    e.preventDefault(),
      (!t.isBeginning || t.params.loop || t.params.rewind) &&
        (t.slidePrev(), r("navigationPrev"));
  }
  function p(e) {
    e.preventDefault(),
      (!t.isEnd || t.params.loop || t.params.rewind) &&
        (t.slideNext(), r("navigationNext"));
  }
  function u() {
    const e = t.params.navigation;
    if (
      ((t.params.navigation = (function (e, t, s, n) {
        const r = i();
        return (
          e.params.createElements &&
            Object.keys(n).forEach((i) => {
              if (!s[i] && !0 === s.auto) {
                let a = e.$el.children(`.${n[i]}`)[0];
                a ||
                  ((a = r.createElement("div")),
                  (a.className = n[i]),
                  e.$el.append(a)),
                  (s[i] = a),
                  (t[i] = a);
              }
            }),
          s
        );
      })(t, t.originalParams.navigation, t.params.navigation, {
        nextEl: "swiper-button-next",
        prevEl: "swiper-button-prev",
      })),
      !e.nextEl && !e.prevEl)
    )
      return;
    const s = a(e.nextEl),
      n = a(e.prevEl);
    s && s.length > 0 && s.on("click", p),
      n && n.length > 0 && n.on("click", c),
      Object.assign(t.navigation, {
        $nextEl: s,
        nextEl: s && s[0],
        $prevEl: n,
        prevEl: n && n[0],
      }),
      t.enabled || (s && s.addClass(e.lockClass), n && n.addClass(e.lockClass));
  }
  function h() {
    const { $nextEl: e, $prevEl: s } = t.navigation;
    e &&
      e.length &&
      (e.off("click", p), e.removeClass(t.params.navigation.disabledClass)),
      s &&
        s.length &&
        (s.off("click", c), s.removeClass(t.params.navigation.disabledClass));
  }
  s({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: !1,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock",
      navigationDisabledClass: "swiper-navigation-disabled",
    },
  }),
    (t.navigation = {
      nextEl: null,
      $nextEl: null,
      prevEl: null,
      $prevEl: null,
    }),
    n("init", () => {
      !1 === t.params.navigation.enabled ? f() : (u(), l());
    }),
    n("toEdge fromEdge lock unlock", () => {
      l();
    }),
    n("destroy", () => {
      h();
    }),
    n("enable disable", () => {
      const { $nextEl: e, $prevEl: s } = t.navigation;
      e &&
        e[t.enabled ? "removeClass" : "addClass"](
          t.params.navigation.lockClass
        ),
        s &&
          s[t.enabled ? "removeClass" : "addClass"](
            t.params.navigation.lockClass
          );
    }),
    n("click", (e, s) => {
      const { $nextEl: i, $prevEl: n } = t.navigation,
        a = s.target;
      if (t.params.navigation.hideOnClick && !d(a).is(n) && !d(a).is(i)) {
        if (
          t.pagination &&
          t.params.pagination &&
          t.params.pagination.clickable &&
          (t.pagination.el === a || t.pagination.el.contains(a))
        )
          return;
        let e;
        i
          ? (e = i.hasClass(t.params.navigation.hiddenClass))
          : n && (e = n.hasClass(t.params.navigation.hiddenClass)),
          r(!0 === e ? "navigationShow" : "navigationHide"),
          i && i.toggleClass(t.params.navigation.hiddenClass),
          n && n.toggleClass(t.params.navigation.hiddenClass);
      }
    });
  const f = () => {
    t.$el.addClass(t.params.navigation.navigationDisabledClass), h();
  };
  Object.assign(t.navigation, {
    enable: () => {
      t.$el.removeClass(t.params.navigation.navigationDisabledClass), u(), l();
    },
    disable: f,
    update: l,
    init: u,
    destroy: h,
  });
}
Object.keys(_).forEach((e) => {
  Object.keys(_[e]).forEach((t) => {
    H.prototype[t] = _[e][t];
  });
}),
  H.use([
    function (e) {
      let { swiper: t, on: s, emit: i } = e;
      const n = r();
      let a = null,
        o = null;
      const l = () => {
          t &&
            !t.destroyed &&
            t.initialized &&
            (i("beforeResize"), i("resize"));
        },
        d = () => {
          t && !t.destroyed && t.initialized && i("orientationchange");
        };
      s("init", () => {
        t.params.resizeObserver && void 0 !== n.ResizeObserver
          ? t &&
            !t.destroyed &&
            t.initialized &&
            ((a = new ResizeObserver((e) => {
              o = n.requestAnimationFrame(() => {
                const { width: s, height: i } = t;
                let n = s,
                  r = i;
                e.forEach((e) => {
                  let { contentBoxSize: s, contentRect: i, target: a } = e;
                  (a && a !== t.el) ||
                    ((n = i ? i.width : (s[0] || s).inlineSize),
                    (r = i ? i.height : (s[0] || s).blockSize));
                }),
                  (n === s && r === i) || l();
              });
            })),
            a.observe(t.el))
          : (n.addEventListener("resize", l),
            n.addEventListener("orientationchange", d));
      }),
        s("destroy", () => {
          o && n.cancelAnimationFrame(o),
            a && a.unobserve && t.el && (a.unobserve(t.el), (a = null)),
            n.removeEventListener("resize", l),
            n.removeEventListener("orientationchange", d);
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i, emit: n } = e;
      const a = [],
        o = r(),
        l = function (e, t) {
          void 0 === t && (t = {});
          const s = new (o.MutationObserver || o.WebkitMutationObserver)(
            (e) => {
              if (1 === e.length) return void n("observerUpdate", e[0]);
              const t = function () {
                n("observerUpdate", e[0]);
              };
              o.requestAnimationFrame
                ? o.requestAnimationFrame(t)
                : o.setTimeout(t, 0);
            }
          );
          s.observe(e, {
            attributes: void 0 === t.attributes || t.attributes,
            childList: void 0 === t.childList || t.childList,
            characterData: void 0 === t.characterData || t.characterData,
          }),
            a.push(s);
        };
      s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
        i("init", () => {
          if (t.params.observer) {
            if (t.params.observeParents) {
              const e = t.$el.parents();
              for (let t = 0; t < e.length; t += 1) l(e[t]);
            }
            l(t.$el[0], { childList: t.params.observeSlideChildren }),
              l(t.$wrapperEl[0], { attributes: !1 });
          }
        }),
        i("destroy", () => {
          a.forEach((e) => {
            e.disconnect();
          }),
            a.splice(0, a.length);
        });
    },
  ]);
export { j as N, H as S };
