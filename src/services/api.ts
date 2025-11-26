import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.github.com',
})

export async function getRepositories(username: string) {
  try {
    const response = await api.get(`/users/${username}/repos`)

    return response.data
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      throw new Error('Usuário não encontrado no GitHub.')
    }
    throw new Error('Erro ao buscar repositórios.')
  }
}
