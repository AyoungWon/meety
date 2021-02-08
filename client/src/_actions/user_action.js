import axios from 'axios'
import { LOGIN_USER, REGISTER_USER, AUTH_USER  } from './types'
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
export function registerUser(dataSubmit) {
  const request = axios.post('/api/users/register',dataSubmit)
  .then(response => 
     response.data
  )

  return {
    //action
    type: REGISTER_USER ,
    payload: request
  }

}
export function auth() {
  const request = axios.get('/api/users/auth')
  .then(response => 
     response.data
  )

  return {
    //action
    type: AUTH_USER ,
    payload: request
  }

}