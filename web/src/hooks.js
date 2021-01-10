import {useEffect} from 'react';

export function useTitle(titleOrFn, ...deps) {
  useEffect(() => {
    document.title = (typeof titleOrFn === "function") ? titleOrFn() : titleOrFn;
  }, [...deps]);
}
