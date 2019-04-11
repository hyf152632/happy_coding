import React, { useEffect } from 'react'
import useUpdate from './../../../src/react_about/hooks/useUpdate'
import { cleanup } from 'react-hooks-testing-library'
import { render } from 'react-testing-library'

const info = { name: 'huo' }
function Example() {
  const changeInfo = name => (info.name = name)
  useUpdate(() => changeInfo('ma'))
  return null
  //   useEffect(() => {
  //     changeInfo('ma');
  //     return function cleanup() {
  //       changeInfo('q');
  //     };
  //   });
}

describe('test useUpdate', () => {
  afterEach(cleanup)
  test('should exe correct', () => {
    const { rerender, unmount } = render(<Example />)
    expect(info.name).toEqual('huo')

    rerender(<Example />)

    expect(info.name).toEqual('ma')

    unmount()
    expect(info.name).toEqual('ma')
  })
})
