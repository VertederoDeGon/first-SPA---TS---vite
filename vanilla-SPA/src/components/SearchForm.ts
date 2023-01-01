export function SearchForm(): HTMLFormElement {
  const $form: HTMLFormElement = document.createElement('form'),
    $input: HTMLInputElement = document.createElement('input')

  $input.name = 'search'
  $input.type = 'search'
  $input.autocomplete = 'off'
  $input.placeholder = 'Search it'

  $form.classList.add('form-search')
  $form.appendChild($input)

  if (localStorage.getItem('wpQuery') && location.hash.includes('#/search')) {
    $form.search.value = localStorage.getItem('wpQuery')
  }

  document.addEventListener('submit', e => {
    if (e.target === $form) {
      e.preventDefault()
      if ($form.search.value.trim() !== '')
        localStorage.setItem('wpQuery', $form.search.value)

      location.hash = '#/search?search=' + $form.search.value.toLowerCase()
    }
  })

  return $form
}
