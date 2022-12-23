export function SearchForm(): HTMLFormElement {
  const $form: HTMLFormElement = document.createElement('form'),
    $input: HTMLInputElement = document.createElement('input')

  $input.name = 'search'
  $input.type = 'search'
  $input.autocomplete = 'off'
  $input.placeholder = 'Search it'

  $form.classList.add('form-search')
  $form.appendChild($input)

  document.addEventListener('submit', e => {
    if (e.target === $form) {
      e.preventDefault()
      location.hash = '#/search?search=' + $form.search.value.toLowerCase()
    }
  })

  return $form
}
