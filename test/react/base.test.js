import React, { useState } from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'
import { act } from 'react-dom/test-utils'

const Greeting = () => <div>Hello World</div>

const Page = () => {
  const sleep = (ms = 0) => {
    return new Promise((resolve, _) => {
      return setTimeout(resolve, ms)
    })
  }

  const [itemList, setItemList] = useState([])
  async function loadItem() {
    const len = 10
    await sleep(1000)
    return setItemList(Array.from({ length: len }, (val, ind) => `Item #${ind}: number${ind}`))
  }
  return (
    <div>
      <button onClick={loadItem}>Load</button>
      <ul>
        {itemList.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

afterEach(cleanup)

describe('test render', () => {
  test('It should return true', () => {
    const { getByText } = render(<Greeting />)

    expect(getByText('Hello World')).not.toBeUndefined()
  })

  test('loads item eventually', async () => {
    const { getByText, findAllByText } = render(<Page />)

    //Click button
    act(() => {
      fireEvent.click(getByText('Load'))
    })

    //Wait for page to update with query text
    const items = await findAllByText(/Item #[0-9]: /)

    expect(items).toHaveLength(10)
  })
})
