import { Loader } from '../components/Loader'
import { Header } from '../components/Header'
import { Main } from '../components/Main'
import { Router } from '../components/Router'

export function App() {
  const $app: HTMLElement = document.getElementById('app') as HTMLElement

  while ($app.lastChild) $app.lastChild.remove()

  $app.appendChild(Header())
  $app.appendChild(Main())
  $app.appendChild(Loader())

  Router()
}
