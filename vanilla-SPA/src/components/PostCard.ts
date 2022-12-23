import { WpApiObject } from '../types/WpApiObject'

export function PostCard(post: WpApiObject): HTMLElement {
  const $article: HTMLElement = document.createElement('article'),
    $img: HTMLImageElement = document.createElement('img'),
    $h2: HTMLElement = document.createElement('h2'),
    $p: HTMLParagraphElement = document.createElement('p'),
    $time: HTMLTimeElement = document.createElement('time'),
    $a: HTMLAnchorElement = document.createElement('a')

  let { slug, title, _embedded } = post

  $article.classList.add('post-card')

  $img.src =
    _embedded['wp:featuredmedia'][0].source_url ||
    post.jetpack_featured_media_url

  $img.alt = title.rendered

  $h2.textContent = title.rendered

  $time.dateTime = post.date
  $time.textContent = `${new Date(post.date).toLocaleString()}`

  $a.href = '#/' + slug
  $a.textContent = 'View post'

  $p.appendChild($time)
  $p.appendChild($a)

  $article.appendChild($img)
  $article.appendChild($h2)

  $article.appendChild($p)

  return $article
}
