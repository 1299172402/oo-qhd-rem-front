function postMessage(iframe, binding) {
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage({ type: "changeTheme", mode: binding.value }, "*");
  }
}

const postTheme = {
  bind(el, binding) {
    const iframe = el.nodeName === "IFRAME" ? el : el.querySelector("iframe");
    const loadHandler = () => postMessage(iframe, binding);
    iframe.addEventListener("load", loadHandler);
    el._loadHandler = loadHandler;
  },
  update(el, binding) {
    const iframe = el.nodeName === "IFRAME" ? el : el.querySelector("iframe");
    postMessage(iframe, binding);
  },
  unbind(el) {
    const iframe = el.nodeName === "IFRAME" ? el : el.querySelector("iframe");
    const loadHandler = el._loadHandler;
    iframe.removeEventListener("load", loadHandler);
    delete el._loadHandler;
  }
};

export default postTheme;