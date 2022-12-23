export function Main() {
  const $main: HTMLElement = document.createElement('main')
  $main.id = 'posts'

  if (!location.hash.includes('#/search')) $main.classList.add('grid-fluid')
  return $main
}
