import { WpApiObject } from '../types/WpApiObject'

export function SearchCard(searchedPost: WpApiObject | unknown) {
  const $article: HTMLElement = document.createElement('article'),
    $h2: HTMLElement = document.createElement('h2'),
    $p: HTMLParagraphElement = document.createElement('p'),
    $a: HTMLAnchorElement = document.createElement('a')

  $article.classList.add('post-card')

  $h2.innerHTML = searchedPost.title

  $a.href = '#/' + searchedPost._embedded.self[0].slug
  $a.textContent = 'View publication'

  $p.style.display = 'block'

  $p.appendChild($a)

  $article.appendChild($h2)
  $article.appendChild($p)

  return $article
}
