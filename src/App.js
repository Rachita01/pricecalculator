import {useState} from 'react';
import './App.css';
import DataComponent from './components/DataComponent/DataComponent';

function App() {
  const [searchTerm,setSearchTerm] = useState(""); 
  const [showDataComponent, setShowDataComponent] = useState(false); 

  const handleSearch = event => {
    setShowDataComponent(searchTerm.trim() !== '')
  }

  const handleChange = e => {
    setSearchTerm(e.target.value)
    if(e.target.value === ""){
      setShowDataComponent(false)
    }
  }

  const handleEnterKey = (e) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      // Pressed Enter key and input has text
      handleSearch();
    }
  };
  return (
    <div>
      <h1>Price Calculator</h1>
      <div>
        <h3>Search your item here:</h3>
        
        <input
        type="text"
        placeholder='Search Item'
        value={searchTerm}
        onChange={handleChange}
        onKeyUp={handleEnterKey}
      />
      <button onClick={handleSearch}>Search</button>

      {showDataComponent && <DataComponent searchTerm={searchTerm} />}
      </div>
    </div>
  );
}

export default App;
