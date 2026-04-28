import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Contact API
export const sendContactMessage = async (data) => {
  const response = await api.post('/contact', data)
  return response.data
}

export const getContactMessages = async () => {
  const response = await api.get('/contact')
  return response.data
}

// Projects API
export const getProjects = async () => {
  const response = await api.get('/projects')
  return response.data
}

export const createProject = async (data) => {
  const response = await api.post('/projects', data)
  return response.data
}

export const updateProject = async (id, data) => {
  const response = await api.put(`/projects/${id}`, data)
  return response.data
}

export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`)
  return response.data
}

// Auth API
export const loginAdmin = async (credentials) => {
  const response = await api.post('/auth/login', credentials)
  return response.data
}

export default api
