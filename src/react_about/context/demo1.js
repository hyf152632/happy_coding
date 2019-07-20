import React from 'react'
import { render } from 'react-testing-library'

const ThemeContext = React.createContext('light')

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    )
  }
}

function Toobar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  )
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context
  static contextType = ThemeContext
  render() {
    return <Button theme={this.context} />
  }
}
