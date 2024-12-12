import axios from "axios"

export type IData = {
  id: string;
  premium: boolean;
  details: {
    name: string;
    description: string;
  }
}

const API = 'http://localhost:8080/families?'

export async function GET_API(skip: number, take: number) {
  const response = await axios.get(`${API}skip=${skip}&take=${take}`)
  return response.data as IData[]
}