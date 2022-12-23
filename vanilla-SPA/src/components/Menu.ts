export function Menu(): HTMLElement {
  const $home: HTMLAnchorElement = document.createElement('a'),
    $search: HTMLAnchorElement = document.createElement('a'),
    $contact: HTMLAnchorElement = document.createElement('a'),
    $jonMircha: HTMLAnchorElement = document.createElement('a'),
    $span: HTMLSpanElement = document.createElement('span'),
    $menu: HTMLElement = document.createElement('nav')

  $home.href = '#/'
  $home.textContent = 'Home'

  $search.href = '#/search'
  $search.textContent = 'Search'

  $contact.href = '#/contacts'
  $contact.textContent = 'Contacts'

  $jonMircha.href = 'https://aprendejavascript.org'
  $jonMircha.textContent = 'Learn Javascript'
  $jonMircha.rel = 'noopener'
  $jonMircha.target = '_blank'

  $span.textContent = '-'

  $menu.classList.add('menu')
  $menu.appendChild($home)
  $menu.appendChild(document.importNode($span, true))
  $menu.appendChild($contact)
  $menu.appendChild(document.importNode($span, true))
  $menu.appendChild($search)
  $menu.appendChild($span)
  $menu.appendChild($jonMircha)

  return $menu
}
