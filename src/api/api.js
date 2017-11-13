export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify({
    data: value,
    time: new Date().getTime()
  }))
}

export const getLocalStorage = (key) => {
  var storageValue = localStorage.getItem(key)
  if (storageValue) {
    storageValue = JSON.parse(storageValue)
    if (new Date().getTime() - storageValue.time <= 3600 * 24) {
      return JSON.parse(storageValue.data)
    }
  }
}
