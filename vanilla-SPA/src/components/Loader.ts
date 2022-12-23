export function Loader() {
  const $loader: HTMLImageElement = document.createElement('img')
  $loader.src = '../../assets/loader.svg'
  $loader.alt = 'Loading...'
  $loader.classList.add('loader')

  return $loader
}
