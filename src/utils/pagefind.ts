let pagefind: any = null;

export const getPagefind = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (pagefind) {
      resolve(pagefind);
      return;
    }
    
    if ((window as any).pagefind) {
      pagefind = (window as any).pagefind;
      resolve(pagefind);
      return;
    }

    window.addEventListener('pagefindReady', () => {
      pagefind = (window as any).pagefind;
      resolve(pagefind);
    }, { once: true });

    window.addEventListener('pagefindError', (event: any) => {
      reject(event.detail);
    }, { once: true });
  });
}
