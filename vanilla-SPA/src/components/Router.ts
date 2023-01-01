import { ajax } from '../helpers/ajax'
import api from '../api/wp_api'
import { PostCard } from './PostCard'
import { Post } from './Post'
import { WpApiObject } from '../types/WpApiObject'
import { SearchCard } from './SearchCard'
import { ContactForm } from './ContactForm'

//invokes the requests depending on the section of the content we are requesting.
export async function Router() {
  const $posts = document.getElementById('posts') as HTMLElement,
    $loader = document.querySelector('.loader') as HTMLImageElement,
    $sectionsH2: HTMLElement = document.createElement('h2')

  while ($posts.lastChild) $posts.lastChild.remove()

  $posts.appendChild($sectionsH2)

  if (!location.hash || location.hash === '#/') {
    //todo
    $sectionsH2.remove()
    await ajax({
      url: api.POSTS,
      cbSuccess: posts => {
        posts.forEach((post: WpApiObject) => $posts.appendChild(PostCard(post)))
      },
    })
  } else if (location.hash.includes('#/search')) {
    //todo
    const urlSearch = new URLSearchParams(location.hash.slice(8))

    if (!localStorage.getItem('wpQuery')) {
      $sectionsH2.textContent = 'Search some posts!'
      $loader.style.display = 'none'
      return
    }

    location.hash = '#/search?search=' + localStorage.getItem('wpQuery')
    $sectionsH2.textContent = 'Searching...'
    $sectionsH2.remove()
    await ajax({
      url: `${api.SEARCH}${
        urlSearch.get('search') || localStorage.getItem('wpQuery')
      }`,
      cbSuccess: async searchedPosts => {
        if (searchedPosts.length === 0) {
          const $p: HTMLParagraphElement = document.createElement('p'),
            $mark: HTMLElement = document.createElement('mark')

          $p.classList.add('error')
          $p.textContent = 'No search results were found for the term '
          $mark.textContent = urlSearch.get('search') + '.'
          $p.appendChild($mark)

          $posts.appendChild($p)
          $loader.style.display = 'none'
        } else {
          $loader.style.display = 'block'
          searchedPosts.forEach(async post =>
            $posts.appendChild(SearchCard(post))
          )
        }
      },
    })
  } else if (location.hash.includes('#/contacts')) {
    //todo
    $sectionsH2.remove()
    $loader.style.display = 'none'
    $posts.appendChild(ContactForm())
  } else {
    //todo
    $sectionsH2.remove()
    await ajax({
      //slice to delete "#/" at the beginning
      url: api.POST + '?slug=' + location.hash.slice(2),
      cbSuccess: (post: WpApiObject[]) => {
        $posts.appendChild(Post(post[0]))
        $loader.style.display = 'none'
      },
    })
  }
}
