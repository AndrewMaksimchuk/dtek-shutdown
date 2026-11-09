const url = 'https://www.dtek-krem.com.ua/ua/shutdowns'
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));



async function main()
{
  const textOfInputFields = Bun.file("./textOfInputFields.json", { type: "application/json" })
  const field = await textOfInputFields.json()



  await using view = new Bun.WebView
  ({
    backend: 'chrome',
    width: 800,
    height: 700,
  });



  // console.log('navigate')
  await view.navigate(url);



  // Wait until modal window is show and close it
  await delay(5000)
  await view.press('Escape')
  await delay(1000)
  await view.press('Escape')



  // console.log('city')
  const city = "#city"
  await view.click(city, {timeout: 5000})
  await view.type(field.city)
  await delay(1000)
  const cityInputValue = '#cityautocomplete-list > div:nth-child(1)'
  await view.click(cityInputValue, {timeout: 5000})
  // await Bun.write("city.png", await view.screenshot());



  // console.log('street')
  const street = '#street'
  await view.click(street, {timeout: 5000})
  await view.type(field.street)
  await delay(1000)
  const streerInputValue = '#streetautocomplete-list > div:nth-child(1)'
  await view.click(streerInputValue, {timeout: 5000})
  // await Bun.write("street.png", await view.screenshot());



  // console.log('house')
  const house = '#house_num'
  await view.click(house, {timeout: 5000})
  await delay(2000)
  // await Bun.write("house1.png", await view.screenshot());
  await view.type(field.house)
  await delay(2000)
  // await Bun.write("house2.png", await view.screenshot());
  // Not stable input option fields for select number of house, sometime show options in different order
  // Need change to more precise selector or evaluate javascript
  const houseInputValue = '#house_numautocomplete-list > div:nth-child(1)'
  await view.click(houseInputValue, {timeout: 5000})



  // console.log('result')
  await delay(2000)
  await view.scrollTo("div.grouptab", { block: "start" })
  await view.scroll(0, -80)
  const screenshotLocation = "/tmp/shutdowns.png"
  await Bun.write(screenshotLocation, await view.screenshot({ format: "png" }))
  console.log(screenshotLocation)
}



main()
