import http from './http'

export const login = user =>
  http.post('/users/login', user)
export const register = user =>
  http.post('/users', user)
