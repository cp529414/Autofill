const scripts = new Map();
const styles = new Set();
export function loadStyle(url) {
  url = new URL(url, import.meta.url).href;
  if (styles.has(url)) return;
  styles.add(url);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  link.onerror = () => { styles.delete(url); link.remove(); };
  document.head.append(link);
}
export function loadScript(url) {
  url = new URL(url, import.meta.url).href;
  if (scripts.has(url)) return scripts.get(url);
  const promise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const fail = message => {
      clearTimeout(timeout);
      script.onload = script.onerror = null;
      script.remove();
      scripts.delete(url);
      reject(new Error(message));
    };
    const timeout = setTimeout(() => fail('Library load timed out'), 20000);
    script.src = url;
    script.onload = () => { clearTimeout(timeout); script.onload = script.onerror = null; resolve(); };
    script.onerror = () => fail('Library unavailable');
    document.head.append(script);
  });
  scripts.set(url, promise);
  return promise;
}
export async function initializeDemos(demos, status = document.querySelector('#load-status')) {
  const results = await Promise.allSettled(demos.map(async ([name, initialize]) => { await initialize(); return name; }));
  const ready = results.filter(result => result.status === 'fulfilled').map(result => result.value);
  const unavailable = results.flatMap((result, index) => result.status === 'rejected' ? [demos[index][0]] : []);
  if (status) status.textContent = `${ready.join(', ')} ready.${unavailable.length ? ` Could not load ${unavailable.join(', ')}. Check your connection and reload.` : ''}`;
  if (status) status.hidden = unavailable.length === 0;
  window.practiceReady = unavailable.length === 0;
  return unavailable.length === 0;
}
