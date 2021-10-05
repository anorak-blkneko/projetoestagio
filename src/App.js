import React, {Component} from 'react';

import Header from './components/Header';
import ServBox from './components/Servico';

function App() {
  return (
    <div className="container">
      <Header title="Serviços App"/>
      <br />
      <ServBox />
    </div>
  );
}

export default App;
