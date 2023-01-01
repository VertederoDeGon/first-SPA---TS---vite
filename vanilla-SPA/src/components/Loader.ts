export function Loader() {
  const $loader: HTMLImageElement = document.createElement('img')
  $loader.src =
    'https://raw.githubusercontent.com/SamHerbert/SVG-Loaders/5deed925369e57e9c58ba576ce303466984db501/svg-loaders/three-dots.svg'
  $loader.alt = 'Loading...'
  $loader.classList.add('loader')

  return $loader
}
