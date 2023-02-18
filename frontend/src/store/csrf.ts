interface headerType {
    "Content-Type": string,
    "X-CSRF-Token": string | null
}
interface optionsType {
    body: any,
    method: string,
    headers: headerType
}

async function csrfFetch(url: string, options: optionsType) {
  options.method = options.method || "GET";
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== "GET") {
    if (
      !options.headers["Content-Type"] &&
      !(options.body instanceof FormData)
    ) {
      options.headers["Content-Type"] = "application/json";
    }
    options.headers["X-CSRF-Token"] = sessionStorage.getItem("X-CSRF-Token");
  }

  const res = await fetch(url, options);

  if (res.status >= 400) throw res;
  return res;
}

export default csrfFetch;