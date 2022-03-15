async function fetchFbcApp () {
  try {
    const response = await fetch('https://bootcamp.fjord.jp/')

    if (response.ok) {
      const data = await response.text()
      console.log(data)
    } else {
      console.error('エラーレスポンス', response)
    }
  } catch (error) {
    console.error(error)
  }
}

fetchFbcApp()
