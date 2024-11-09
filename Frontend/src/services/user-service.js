import axios from 'axios'

const base_url = 'http://localhost:8080/api/user'

export function loginService(payload) {
  return axios.post(base_url + '/login', payload)
}

export function registerService(payload) {
  return axios.post(base_url + '/register', payload)
}

export function verifyEmailForResetPassword(payload) {
  return axios.post(base_url + '/password-reset-request', payload)
}

export function resetPassword(url, payload) {
  return axios.post(url, payload)
}
