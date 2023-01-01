import wp_api from '../api/wp_api'
import { App } from './App'

document.addEventListener('DOMContentLoaded', App)
window.addEventListener('hashchange', () => {
  wp_api.page = 2

  App()
})
