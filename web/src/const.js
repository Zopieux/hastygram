// TODO: relative URL
const API = "http://localhost:8000";

export const apiFetch = ({path, method = "GET", body = null, ...opts}) => {
  return fetch(`${API}${path}`, {
    method,
    credentials: "include",
    ...(body ? {body: JSON.stringify(body)} : {}),
    ...opts,
  });
};

export const humanCount = x =>
  new Intl.NumberFormat("en-US", {maximumFractionDigits: 0, notation: "compact", compactDisplay: "short"}).format(x);
