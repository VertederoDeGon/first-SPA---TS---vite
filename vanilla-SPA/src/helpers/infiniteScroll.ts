import wp_api from '../api/wp_api'
import { PostCard } from '../components/PostCard'
import { SearchCard } from '../components/SearchCard'
import { ajax } from './ajax'
/**
 * @param Component High Order Component (HOC)
 */
export async function infiniteScroll(lastPost: Element): Promise<void> {
  let wpQuery: string = localStorage.getItem('wpQuery')!,
    apiURI: string,
    p: unknown[]

  const observer: IntersectionObserver = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach(async (e: IntersectionObserverEntry) => {
        if (e.isIntersecting) {
          observer.disconnect()
          wp_api.page++
          await ajax({
            url: apiURI,
            cbSuccess: posts => {
              p = posts
              console.log('P VALUE: ', p)
              if (posts.length === 0) {
                if (document.querySelector<HTMLImageElement>('.loader'))
                  document.querySelector<HTMLImageElement>(
                    '.loader'
                  )!.style.display = 'none'

                observer.disconnect()
                return
              }

              if (!location.hash || location.hash === '#/') {
                apiURI = wp_api.POSTS + '&page=' + wp_api.page
                posts.forEach(post =>
                  document.getElementById('posts')?.appendChild(PostCard(post))
                )
              } else if (location.hash.includes('#/search')) {
                apiURI = wp_api.SEARCH + wpQuery + '&page=' + wp_api.page
                posts.forEach(async post =>
                  document
                    .getElementById('posts')
                    ?.appendChild(SearchCard(post))
                )
              } else {
                observer.disconnect()
                return
              }
            },
          })
          if (p.length === 0) {
            observer.disconnect()
            return
          }
          observer.observe(document.getElementById('posts')?.lastElementChild!)
        }
      })
    },
    {
      root: null,
      threshold: 1,
      rootMargin: '300px 0px',
    }
  )

  if (!location.hash || location.hash === '#/') {
    apiURI = wp_api.POSTS + '&page=' + wp_api.page
  } else if (location.hash.includes('#/search')) {
    apiURI = wp_api.SEARCH + wpQuery + '&page=' + wp_api.page
  } else if (location.hash.includes('#/contacts')) {
    observer.disconnect()
    return
  } else {
    observer.disconnect()
    return
  }

  if (lastPost && lastPost instanceof Element) observer.observe(lastPost)
}
