export type Order = {
  id: number
  user_id: number
  status: 'active' | 'complete'
}