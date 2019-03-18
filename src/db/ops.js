import { DBName, TableName, Version } from './config.js'

export const dbGet = (val, key = 'id') =>
  new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DBName, Version)
    request.onsuccess = event => {
      const db = event.target.result
      const transaction = db.transaction([TableName], 'readwrite')
      const objectStore = transaction.objectStore(TableName)
      const idx = objectStore.index(key)
      const requestGet = idx.get(val)
      requestGet.onsuccess = event => {
        resolve(event.target.result)
      }
      requestGet.onerror = event => {
        reject(event)
      }
    }
    request.onerror = event => {
      reject(event)
    }
  })

export const dbAdd = data =>
  new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DBName, Version)
    request.onsuccess = event => {
      const db = event.target.result
      const transaction = db.transaction([TableName], 'readwrite')
      const objectStore = transaction.objectStore(TableName)
      const requestAdd = objectStore.add(data)
      requestAdd.onsuccess = event => {
        resolve(event)
      }
      requestAdd.onerror = event => {
        reject(event)
      }
    }
    request.onerror = event => {
      reject(event)
    }
  })

export const dbUpdate = (val, kvals = {}, key = 'id') =>
  new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DBName, Version)
    request.onsuccess = function (event) {
      const db = event.target.result
      const transaction = db.transaction([TableName], 'readwrite')
      const objectStore = transaction.objectStore(TableName)
      const idx = objectStore.index(key)
      const handler = idx.get(val)
      handler.onsuccess = e => {
        const data = e.target.result
        for (let prop in kvals) {
          if (data.hasOwnProperty(prop)) {
            data[prop] = kvals[prop]
          }
        }
        const requestUpdate = objectStore.put(data)
        requestUpdate.onerror = function (event) {
          reject(event)
        }
        requestUpdate.onsuccess = function (event) {
          resolve(event)
        }
      }
      handler.onerror = event => {
        reject(event)
      }
    }
    request.onerror = event => {
      reject(event)
    }
  })

export const dbDelete = kval =>
  new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DBName, Version)
    request.onsuccess = event => {
      const db = event.target.result
      const transaction = db.transaction([TableName], 'readwrite')
      const objectStore = transaction.objectStore(TableName)
      const requestDelete = objectStore.delete(kval)
      requestDelete.onsuccess = event => {
        resolve(event)
      }
      requestDelete.onerror = event => {
        reject(event)
      }
    }
    request.onerror = event => {
      reject(event)
    }
  })

export const dbGetAll = () =>
  new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DBName, Version)
    request.onsuccess = event => {
      const db = event.target.result
      const transaction = db.transaction([TableName], 'readwrite')
      const objectStore = transaction.objectStore(TableName)
      const requestCursor = objectStore.openCursor()
      const ret = []
      requestCursor.onsuccess = event => {
        const cursor = event.target.result
        if (cursor) {
          ret.push(cursor.value)
          cursor.continue()
        } else {
          resolve(ret)
        }
      }
      requestCursor.onerror = event => {
        reject(event)
      }
    }
    request.onerror = event => {
      reject(event)
    }
  })
