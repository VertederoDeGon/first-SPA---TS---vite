import { WpApiObject } from '../types/WpApiObject'

export async function ajax(props: {
  url: string
  cbSuccess: (data: WpApiObject) => void | Promise<void>
}) {
  let { url, cbSuccess } = props

  await fetch(url)
    .then(res => (res.ok ? res.json() : Promise.reject(res)))
    .then((json: WpApiObject) => {
      cbSuccess(json)
    })
    .catch(err => {
      console.error(err)

      const $loader = document.querySelector('.loader') as HTMLImageElement,
        $posts = document.getElementById('posts') as HTMLElement,
        $error: HTMLDivElement = document.createElement('div'),
        $errorText: HTMLParagraphElement = document.createElement('p')

      $errorText.textContent = `Error ${err.status || 'Unknown'}: ${
        err.statusText || 'An error has ocurred.'
      }`
      $error.classList.add('error')
      $error.appendChild($errorText)

      $posts ? $posts.appendChild($error) : document.body.appendChild($error)

      if ($loader) $loader.style.display = 'none'
    })
}
