document.addEventListener(
  'DOMContentLoaded',
  () => {
    const scale = 1 / Math.min(window.devicePixelRatio || 1, 3)
    document
      .querySelector('meta[name=viewport]')
      .setAttribute(
        'content',
        `initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no`
      )
    document.getElementsByTagName(
      'html'
    )[0].style.fontSize = `${window.innerWidth / 10}px`
  },
  false
)
