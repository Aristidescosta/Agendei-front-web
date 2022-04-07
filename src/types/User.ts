export type User = {
  _id: number,
  username: string,
  email: string,
  password?:string,
  status: string,
  confirmationCode: number,
}