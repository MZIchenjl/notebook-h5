import { DBName, TableName, Version } from './config.js'

const request = window.indexedDB.open(DBName, Version)

request.onupgradeneeded = event => {
  const db = event.target.result
  const objectStore = db.createObjectStore(TableName, {
    keyPath: 'id',
    autoIncrement: true
  })
  objectStore.createIndex('id', 'id', { unique: true })
  objectStore.createIndex('title', 'title', { unique: false })
}

request.onerror = () => {
  console.log("Why didn't you allow my web app to use IndexedDB?!")
}

export { NewNote } from './addNote'
export { GetNoteByID, GetAllNotes } from './getNote'
export { UpdateNote } from './updateNote'
export { DeleteNote } from './delNote'
