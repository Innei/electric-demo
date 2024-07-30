import { setAppIsReady } from './atoms/app'
import { authConfigManager } from './lib/auth'

export const initializeApp = () => {
  authConfigManager.setConfig({
    basePath: '/auth',
    baseUrl: import.meta.env.ELECTRIC_API_URL,
    credentials: 'include',
  })

  setAppIsReady(true)
}
