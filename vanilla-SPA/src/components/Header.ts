import { Menu } from './Menu'
import { SearchForm } from './SearchForm'
import { Title } from './title'

export function Header(): HTMLElement {
  const $header: HTMLElement = document.createElement('header')
  $header.classList.add('header')
  $header.appendChild(Title())
  $header.appendChild(Menu())
  $header.appendChild(SearchForm())
  return $header
}
