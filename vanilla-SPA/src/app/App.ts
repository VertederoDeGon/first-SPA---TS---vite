import { Loader } from '../components/Loader'
import { Header } from '../components/Header'
import { Main } from '../components/Main'
import { Router } from '../components/Router'
import { infiniteScroll } from '../helpers/infiniteScroll'
import wp_api from '../api/wp_api'
import { ajax } from '../helpers/ajax'

export async function App() {
  const $app: HTMLElement = document.getElementById('app') as HTMLElement

  while ($app.lastChild) $app.lastChild.remove()

  $app.appendChild(Header())
  $app.appendChild(Main())
  $app.appendChild(Loader())

  await Router()

  if ($app.querySelector('#posts')) {
    infiniteScroll($app.querySelector('#posts')!.lastElementChild!)
  }
}
