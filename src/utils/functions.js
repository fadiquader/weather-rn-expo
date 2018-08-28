
export function getRandomFromArray(arr, n) {
  if(n > arr.length) throw Error('Invalid length');
  const result = [];
  const len = arr.length;
  while (result.length <= n) {
    const x = Math.floor(Math.random()*len);
    const currentItem = arr[x];
    if(result.includes(currentItem)) continue;
    result.push(currentItem)
  }
  return result;
}
