/* 为了防止refresh频繁调用，设置一个延迟（防抖函数） */
export function debounce(func, delay) {
  let timer = null
  return function(...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
  }, delay);
  }
}