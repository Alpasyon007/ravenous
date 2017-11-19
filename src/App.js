import React from 'react';
import './App.css';

import BusinessList from './components/business-list/business-list';
import SearchBar from './components/search-bar/search-bar';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar />
        <BusinessList />
      </div>
    );
  }
}

export default App;