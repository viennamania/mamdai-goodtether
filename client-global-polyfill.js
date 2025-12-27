// Polyfill for global variable in browser environment
if (typeof global === 'undefined') {
  if (typeof window !== 'undefined') {
    window.global = window;
  } else if (typeof globalThis !== 'undefined') {
    globalThis.global = globalThis;
  }
}

// Polyfill for exports in browser environment
if (typeof exports === 'undefined') {
  if (typeof window !== 'undefined') {
    window.exports = {};
  } else if (typeof globalThis !== 'undefined') {
    globalThis.exports = {};
  }
}
