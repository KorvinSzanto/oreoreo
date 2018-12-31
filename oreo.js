

/** Convert a string to a valid "oreo" sequence */
function sequence(oreo) {
  return oreo.toLowerCase()
    .replace(/[^or]/g, '')
    .split(/([or])/)
    .filter(i => i)
    .map(i => i === 'r' ? 're' : i)
}

/** Build an HTMLElement from a given segment */
function segment(type, index, offset) {
  let segment = images.middle

  if (type === Segment.o) {
    segment = index === 0 ? images.top : images.bottom
  }

  const img = document.createElement("img")
  img.src = segment
  img.classList.add("segment")
  img.style.marginTop = offset + "px"
  img.style.zIndex = 100000 - index

  return img
}

/** Adjust a given offset depending on given state */
function adjustOffset(offset, type, lastType) {
  const same = lastType === type

  let adjustment
  switch (type) {
    case Segment.o:
      adjustment = same ? 12 : 0
      break
    case Segment.re:
      adjustment = same ? 5.5 : 18
      break
  }

  return offset + adjustment
}

/** Apply an oreo sequence to a container */
function apply(element, sequence) {
  const oreo = document.createElement("div")
  oreo.classList.add('oreo')

  // Empty the element
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }

  // Apply the oreo
  let index = 0
  let offset = 0
  let lastType = null

  for (layer of sequence) {
    offset = adjustOffset(offset, layer, lastType)
    const element = segment(layer, index++, offset)
    oreo.appendChild(element)
    lastType = layer
  }

  // Resize
  oreo.style.height = (offset + 43) + "px"
  element.appendChild(oreo)
}

// Update the initial value to the hash value if one is set
if (window.location.hash) input.value = window.location.hash.substr(1)

/** Event handler to update oreo */
const handleKeyUp = () => {
  const exploded = sequence(window.location.hash = input.value)
  apply(oreo, sequence)
  window.location.hash = sequence.join()
}

input.addEventListener('keyup', handleKeyUp, {once: false})
handleKeyUp()
