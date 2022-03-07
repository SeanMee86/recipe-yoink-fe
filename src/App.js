import axios from 'axios';
import {useState} from "react";

function App() {

  const [url, setUrl] = useState(null);
  const [selectors, setSelectors] = useState({
      ingredientSelector: null,
      directionsSelector: null
  });
  const [ingredients, setIngredients] = useState(null);
  const [directions, setDirections] = useState(null);

  const base_url = 'http://localhost:8000';

  const onUrlChange = (e) => {
    setUrl(e.target.value)
  }

  const onIngSelectorChange = (e) => {
    setSelectors(prevState => {
        return {
            ...prevState,
            ingredientSelector: e.target.value
        }
    })
  }

  const onDirSelectorChange = (e) => {
      setSelectors(prevState => {
          return {
              ...prevState,
              directionsSelector: e.target.value
          }
      })
  }

  const onSubmit = () => {
    axios.post(`${base_url}/getUrl`, {url, selectors})
        .then(res => {
            setIngredients(res.data.ingredients)
            setDirections(res.data.directions)
        })
  }

  return (
    <div className="App">
        <label>
            Site URL <br/>
            <input onChange={onUrlChange} type="text"/>
        </label>
        <br/>
        <label>
            Selector for Ingredients <br/>
            <input onChange={onIngSelectorChange} type="text"/>
        </label>
        <br/>
        <label>
            Selector for Directions <br/>
            <input onChange={onDirSelectorChange} type="text"/>
        </label>
        <br/><br/>
        <button onClick={onSubmit}>Call Service</button>
        { ingredients && <h2>Ingredients:</h2> }
        <div style={{padding: '60px'}} dangerouslySetInnerHTML={{__html: ingredients}}/>
        { directions && <h2>Directions:</h2> }
        <div style={{padding: '60px'}} dangerouslySetInnerHTML={{__html: directions}}/>
    </div>
  );
}

export default App;
