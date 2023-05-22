import store from "@/store";

export default function jumpSupApp(path, query = {}) {
  const index = path.search(/#\//);
  const basePath = index === -1 ? path : path.slice(0, index);
  const url = new URL(`${basePath}?${new URLSearchParams({
    ...query,
    access_token: store.getters["user/token"]
  })}`);
  const donePath = index === -1 ? url.toString() : `${url.origin}/#/${url.search}`;
  window.open(donePath, "_blank");
}

export function addTokenToUrl(url) {
  if (!url) {
    // eslint-disable-next-line
    return "javascript:void(0)";
  }
  url += `${url.indexOf("?") !== -1 ? "&" : "?"}access_token=${store.getters["user/token"]}`;
  return url;
}