import axios from 'axios'
const API_URL = 'http://localhost:3005/api'
// For every request
// if status is unauthorized
// invalidate token
// and redirect to login
export default {
  get: url => axios.get(`${API_URL}${url}`),
  post: (url, params) => axios.post(`${API_URL}${url}`, params),
  get_auth: url => axios.get(`${API_URL}${url}`),
  post_auth: (url, params) => axios.post(`${API_URL}${url}`, params),
}
