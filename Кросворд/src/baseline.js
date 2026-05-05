export const template = (id) => {
  const el = document.querySelector('#' + id);
  if (el && el.content) {
    return el.content.innerHTML;
  }
  return '';
}

export const elementMethods = (selector = document) => {
  let el = null;
  if (typeof selector === 'string') {
    el = document.querySelector(selector);
  } else {
    el = selector;
  }

  return {
    first(selector) {
      const found = el.querySelector(selector);
      return found ? elementMethods(found) : null;
    },
    set innerHTML(value) {
      if (el) el.innerHTML = value;
    },
    get innerHTML() {
      return el ? el.innerHTML : '';
    },
    on(eventName, fn) {
      if (el) el.addEventListener(eventName, fn);
    }
  };
}