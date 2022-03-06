import axios from 'axios';
import {useState} from "react";

function App() {

  const [url, setUrl] = useState(null);
  const [selector, setSelector] = useState(null);
  const [recipe, setRecipe] = useState(null);

  const base_url = 'http://localhost:8000';

  const onUrlChange = (e) => {
    setUrl(e.target.value)
  }

  const onSelectorChange = (e) => {
    setSelector(e.target.value)
  }

  const onSubmit = () => {
    axios.post(`${base_url}/getUrl`, {url, selector})
        .then(res => {
          setRecipe(res.data)
        })
  }

  return (
    <div className="App">
      <input onChange={onUrlChange} type="text"/>
        <br/>
      <input onChange={onSelectorChange} type="text"/>
        <br/>
      <button onClick={onSubmit}>Call Service</button>
        <div style={{padding: '60px'}} dangerouslySetInnerHTML={{__html: recipe}}/>
    </div>
  );
}

export default App;
