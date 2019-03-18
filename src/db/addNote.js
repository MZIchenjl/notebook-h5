import { dbAdd } from './ops'

export const NewNote = () => {
  const now = Date.now()
  return dbAdd({
    title: '',
    content: '',
    createAt: now,
    updateAt: now
  })
}
