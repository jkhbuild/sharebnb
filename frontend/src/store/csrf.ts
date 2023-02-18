import { stringify } from "querystring";

interface optionsType extends RequestInit {
    headers?: Record<string, string>;
}

async function csrfFetch(url: string, options?: optionsType): Promise<Response> {
    const optionsParams = options || {}
    optionsParams.method = optionsParams.method || "GET";
    optionsParams.headers = optionsParams.headers || {};

    if (optionsParams?.method?.toUpperCase() !== "GET") {
        if (!optionsParams.headers["Content-Type"] && !(optionsParams.body instanceof FormData)
        ) {
        optionsParams.headers["Content-Type"] = "application/json";
        }

        const csrfToken = sessionStorage.getItem("X-CSRF-Token");
        if (csrfToken) {
            optionsParams.headers["X-CSRF-Token"] = csrfToken
        }
    }

    const res = await fetch(url, optionsParams);

    if (res.status >= 400) throw res;
    return res;
}

export default csrfFetch;