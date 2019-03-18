import { dbUpdate } from './ops'

export const UpdateNote = (id, kvals) => dbUpdate(id, kvals)
