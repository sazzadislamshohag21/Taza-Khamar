(() => {
  const base = new URL('.', document.currentScript.src);
  let pending;
  globalThis.loadUrborCatalog = () => {
    if (!pending) {
      pending = (location.protocol === 'file:'
        ? new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = new URL('content-assets/catalog/products.js', base).href;
            script.onload = () => {
              script.remove();
              if (globalThis.UrborLocalCatalog) resolve(globalThis.UrborLocalCatalog);
              else reject(new Error('Local catalog unavailable'));
            };
            script.onerror = () => { script.remove(); reject(new Error('Local catalog unavailable')); };
            document.head.append(script);
          })
        : fetch(new URL('content-assets/catalog/products.json', base)).then(response => {
            if (!response.ok) throw new Error('Catalog unavailable');
            return response.json();
          })).catch(error => { pending = undefined; throw error; });
    }
    return pending;
  };
})();
