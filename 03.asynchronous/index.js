async function main () {
  try {
    const text = await fetchFbcApp()
    console.log(text)
  } catch (e) {
    console.error(e)
  }
}

async function fetchFbcApp () {
  const response = await fetch('https://bootcamp.fjord.jp/')

  if (response.ok) {
    const text = await response.text()
    return text
  } else {
    throw new Error(`${response.status}`)
  }
}

main()
