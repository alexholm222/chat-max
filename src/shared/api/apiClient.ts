import axios from "axios";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' }
})

export const apiAvatarTest = axios.create({
    baseURL: 'https://picsum.photos/200/300',
})




