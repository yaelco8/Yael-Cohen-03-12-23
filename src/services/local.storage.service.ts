export function saveToStorage(key:string, val:string) {
    localStorage.setItem(key, JSON.stringify(val));
  }
  
 export function loadFromStorage(key:string) {
    const val = localStorage.getItem(key);
    if(val===null)return
    return JSON.parse(val);
  }