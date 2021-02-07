import axios from 'axios'
import { LOGIN_USER } from './types'
export function loginUser(dataSubmit) {
  const request = axios.post('/api/users/login',dataSubmit)
  .then(response => 
     response.data
  )

  return {
    //action
    type: LOGIN_USER ,
    payload: request
  }

}