import { iTask } from "./task"

export interface iUnited {
  id:number,
  firstName: string,
  lastName: string,
  email: string,
  image: string,
  title: string
  tasks?: iTask[]
}
