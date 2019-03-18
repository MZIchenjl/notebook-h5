import { dbGet, dbGetAll } from './ops'

export const GetNoteByID = id => dbGet(id)
export const GetAllNotes = () => dbGetAll()
