// Authorization header is globally set if token is present in localStorage
import http from './http'

export const login = user =>
  http.post('/users/login', user)
export const register = user =>
  http.post('/users', user)
export const createProduct = product =>
  http.post('/products', product)
export const getProducts = () =>
  http.get('/products')
export const updateProduct = (id, product) =>
  http.put(`/products/${id}`, product)
export const deleteProduct = id =>
  http.delete(`/products/${id}`)
