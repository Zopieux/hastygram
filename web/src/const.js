import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);
export const timeAgo = new TimeAgo("en-US");

export const API_BASE = "/_";

export const apiFetch = ({path, method = "GET", body = null, ...opts}) => {
  return fetch(path, {
    method,
    credentials: "include",
    ...(body ? {body: JSON.stringify(body)} : {}),
    ...opts,
  });
};

export const humanCount = x =>
  new Intl.NumberFormat("en-US", {maximumFractionDigits: 0, notation: "compact", compactDisplay: "short"}).format(x);
