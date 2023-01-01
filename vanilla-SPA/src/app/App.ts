import { Loader } from '../components/Loader'
import { Header } from '../components/Header'
import { Main } from '../components/Main'
import { Router } from '../components/Router'
import { infiniteScroll } from '../helpers/infiniteScroll'

export async function App() {
  const $app: HTMLElement = document.getElementById('app') as HTMLElement

  while ($app.lastChild) $app.lastChild.remove()

  $app.appendChild(Header())
  $app.appendChild(Main())
  $app.appendChild(Loader())

  await Router()

  if (
    $app.querySelector('#posts') &&
    localStorage.getItem('wpQuery') &&
    !location.hash.includes('#/contacts')
  ) {
    infiniteScroll($app.querySelector('#posts')!.lastElementChild!)
  }
}
