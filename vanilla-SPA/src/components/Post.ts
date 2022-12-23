import { WpApiObject } from '../types/WpApiObject'

export function Post(post: WpApiObject): HTMLElement {
  const $postPage: HTMLElement = document.createElement('section'),
    $aside: HTMLElement = document.createElement('aside'),
    $h2: HTMLElement = document.createElement('h2'),
    $time: HTMLTimeElement = document.createElement('time'),
    $hr: HTMLHRElement = document.createElement('hr'),
    $article: HTMLElement = document.createElement('article')

  let { content, title } = post

  $postPage.classList.add('post-page')

  $h2.textContent = title.rendered

  $time.dateTime = post.date
  $time.textContent = new Date(post.date).toLocaleString()

  $article.innerHTML = content.rendered

  $aside.appendChild($h2)
  $aside.appendChild($time)

  $postPage.appendChild($aside)
  $postPage.appendChild($hr)
  $postPage.appendChild($article)

  return $postPage
}
