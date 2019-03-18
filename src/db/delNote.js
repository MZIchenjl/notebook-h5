import { dbDelete } from './ops'

export const DeleteNote = id => dbDelete(id)
