import React from 'react';
import '../App.css';
import PersonTable from './PersonTable';

function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">        
        <PersonTable />
      </header>
    </div>
  );
}

export default App;
