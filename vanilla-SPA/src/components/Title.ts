import api from '../api/wp_api'

export function Title(): HTMLElement {
  const $h1: HTMLElement = document.createElement('h1'),
    $domainLink: HTMLAnchorElement = document.createElement('a')

  $domainLink.href = api.DOMAIN
  $domainLink.target = '_blank'
  $domainLink.rel = 'noopener'
  $domainLink.textContent = api.NAME.toUpperCase()

  $h1.appendChild($domainLink)

  return $h1
}
