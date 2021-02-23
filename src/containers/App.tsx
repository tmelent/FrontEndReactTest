import React from 'react'
import '../App.css'
import DataSelectionMenu from './DataSelectionMenu'

const App = ():JSX.Element => {  
  return (
    <div className="App">
      <header className="App-header">
        <DataSelectionMenu />
      </header>
    </div>
  )
}

export default App