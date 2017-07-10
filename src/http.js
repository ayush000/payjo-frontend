import axios from 'axios'

const baseURL = 'http://localhost:3005/api'
export default axios.create({ baseURL })
