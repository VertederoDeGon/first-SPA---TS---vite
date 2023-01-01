export function ContactForm(): HTMLFormElement {
  const $form: HTMLFormElement = document.createElement('form')
  const styles = document.getElementById('dynamic-styles')

  const css = `.contact-form { --form-ok-color: #4caf50;--form-error-color: #f44336;margin-left: auto;margin-right: auto;width: 80%;}.contact-form > * {display: block;padding: 0.5rem;margin: 1rem auto;width: 100%;}.contact-form textarea {resize: none;}.contact-form legend,.contact-form-response {font-size: 1.5rem;font-weight: bold;text-align: center;}.contact-form input,.contact-form textarea {font-size: 1rem;font-family: monospace;  }.contact-form input[type='submit'] {width: 50%;font-weight: bold;cursor: pointer;}.contact-form *::placeholder {color: #f2f2f2;}.contact-form [required]:valid {border: var(--form-ok-color) solid thin;}.contact-form [required]:invalid {border: var(--form-error-color) solid thin;}.contact-form-error {margin-top: -1rem;color: #f2f2f2;background-color: var(--form-error-color);font-size: 80%;transition: all 800ms ease;}.contact-form-error.is-active {display: block;animation: show-message 1s 1 normal 0s ease-out both;}.contact-form-loader {text-align: center;}.none {display: none;}@keyframes show-message {0% {visivibility: hidden;opacity: 0;}100% {visibility: visible;opacity: 1;}}`

  const $legend: HTMLLegendElement = document.createElement('legend'),
    $nameInput: HTMLInputElement = document.createElement('input'),
    $emailInput: HTMLInputElement = document.createElement('input'),
    $subjectInput: HTMLInputElement = document.createElement('input'),
    $textarea: HTMLTextAreaElement = document.createElement('textarea'),
    $submitInput: HTMLInputElement = document.createElement('input'),
    $loaderDiv: HTMLDivElement = document.createElement('div'),
    $loader: HTMLImageElement = document.createElement('img'),
    $responseDiv: HTMLDivElement = document.createElement('div'),
    $response: HTMLParagraphElement = document.createElement('p'),
    $inputs = [$nameInput, $emailInput, $subjectInput, $textarea]

  let $span: HTMLSpanElement,
    $inputTarget: HTMLInputElement,
    pattern: string,
    regex: RegExp

  $form.classList.add('contact-form')
  $form.action = 'https://formsubmit.co/oregonz.go@gmail.com'
  $form.target = '_blank'
  $form.method = 'POST'

  $legend.textContent = 'Send us your comments'
  $form.appendChild($legend)

  $nameInput.type = 'text'
  $nameInput.name = 'name'
  $nameInput.placeholder = 'Enter your name'
  $nameInput.title =
    'This field accepts only words and blanks. This field can not exceed 50 characters'
  $nameInput.pattern = '^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\\s]{1,50}$'
  $nameInput.required = true
  $form.appendChild($nameInput)

  $emailInput.type = 'email'
  $emailInput.name = 'email'
  $emailInput.placeholder = 'Enter your email'
  $emailInput.title = 'Invalid email'
  $emailInput.pattern =
    '^[A-Za-z0-9]+(\\.[A-Za-z0-9]+|-[A-Za-z0-9]+|_[A-Za-z0-9]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,15})$'
  $emailInput.required = true
  $form.appendChild($emailInput)

  $subjectInput.type = 'text'
  $subjectInput.name = 'subject'
  $subjectInput.placeholder = 'Subject'
  $subjectInput.title = 'The subject is required'
  $subjectInput.required = true
  $form.appendChild($subjectInput)

  $textarea.name = 'comments'
  $textarea.cols = 50
  $textarea.rows = 5
  $textarea.placeholder = 'Enter your comments'
  $textarea.title = 'Your comment can not exceed 50 characters 255 characters'
  $textarea.dataset.pattern = '^(\\n|.){1,255}$'

  $textarea.required = true
  $form.appendChild($textarea)

  $submitInput.type = 'submit'
  $submitInput.value = 'Send'
  $form.appendChild($submitInput)

  $loaderDiv.classList.add('contact-form-loader', 'none')
  $loader.src = '../../assets/loader.svg'
  $loader.alt = 'Loading...'
  $loaderDiv.appendChild($loader)
  $form.appendChild($loaderDiv)

  $responseDiv.classList.add('contact-form-response', 'none')
  $response.textContent = 'The data has been sent'
  $responseDiv.appendChild($response)
  $form.appendChild($responseDiv)

  $inputs.forEach(input => {
    $span = document.createElement('span')
    $span.id = input.name
    $span.textContent = input.title
    $span.classList.add('contact-form-error', 'none')
    input.insertAdjacentElement('afterend', $span)
  })

  document.addEventListener('input', e => {
    if (!e.target) return

    if ((e.target as HTMLInputElement).matches('.contact-form [required]')) {
      $inputTarget = e.target as HTMLInputElement

      if ($inputTarget.pattern || $textarea.dataset.pattern)
        pattern = $inputTarget.pattern! || $textarea.dataset.pattern!
      else console.error('Pattern is not defined')

      if (!document.getElementById($inputTarget.name))
        return console.error(
          'document.getElementById($input.name) does not exists'
        )

      if (pattern && $inputTarget.value !== '') {
        regex = new RegExp(pattern, 'i')
        return regex.exec($inputTarget.value)
          ? document
              .getElementById($inputTarget.name)!
              .classList.remove('is-active')
          : document
              .getElementById($inputTarget.name)!
              .classList.add('is-active')
      }

      if (pattern && $inputTarget.value === '') {
        regex = new RegExp(pattern, 'i')
        return regex.exec($inputTarget.value)
          ? document
              .getElementById($inputTarget.name)!
              .classList.add('is-active')
          : document
              .getElementById($inputTarget.name)!
              .classList.remove('is-active')
      }

      if (!pattern)
        return $inputTarget.value === ''
          ? document
              .getElementById($inputTarget.name)!
              .classList.remove('is-active')
          : document
              .getElementById($inputTarget.name)!
              .classList.add('is-active')
    }
  })

  document.addEventListener('submit', async e => {
    e.preventDefault()
    type ErrRes = { status: number; statusText: string }
    type FormSubmitApi = { success: boolean; message: string }

    $loaderDiv.classList.remove('none')

    try {
      const res = await fetch(
          'https://formsubmit.co/ajax/oregonz.go@gmail.com',
          {
            method: 'POST',
            body: new FormData(e.target as HTMLFormElement),
          }
        ),
        json: FormSubmitApi = await res.json()

      if (!res.ok) throw { status: res.status, statusText: res.statusText }

      $loaderDiv.classList.add('none')

      $responseDiv.classList.remove('none')

      $response.textContent = json.message

      $form.reset()
    } catch (err: unknown) {
      $response.innerHTML = `Error: ${(err as ErrRes).status ?? 'Unknown'}: 
        ${(err as ErrRes).statusText || 'An error has occurred, try again'}`
      console.log(err)
    } finally {
      setTimeout(() => {
        $responseDiv.classList.add('none')
        $response.textContent = ''
      }, 3000)
    }
  })

  if (styles) styles!.textContent = css

  return $form
}
