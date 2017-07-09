import http from './http'

export const login = user =>
  http.post('/users/login', user)
export const register = user =>
  http.post('/users', user)
export const createProduct = product =>
  http.post('/products', product)
export const getProducts = () =>
  http.get('/products')
