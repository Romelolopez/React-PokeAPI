import React, { useEffect, useState } from 'react'
import PokemonThumb from './PokeThumb'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import PokeDetail from './PokeDetail'


const App = (props) => {

    //States
    const [allPokemon, setAllPokemon] = useState([])
    const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
    const [pokeName, setPokeName] = useState();

    //Load all Pokemon 
    async function getAllPokemon() {
    //loadMore is equal to the link so we use loadMore for the fetch
    const res = await fetch(loadMore)
    const data = await res.json()

    //next is provided in the API (it has the link for the next 20) we use this to load the next 20 pokemon
    setLoadMore(data.next)


    //We use this function to get the links/stats for each pokemon
    function createPokemonObject(result) {
      //for each pokemon get a responce and data
      result.forEach(async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()

        //allPokemon is an array. if you just add "data" to setAllPokemon it will only add one at a time
        //So we must use dot notation to add each individual pokemon to the currentList 
        //allPokemon.push(data)

        setAllPokemon(currentList => [...currentList, data])

      })
    }

    createPokemonObject(data.results) //data.results is the parameters

  }
  
  

    useEffect(() => {
      
      getAllPokemon()
      
    //if there is a state in the square brackets and it changes, useEffect runs again. if brackets are empty, useEffect runs once
    // eslint-disable-next-line
    },[])
    

  //Function is used to get data from "PokeThumb"
  function childToParent(thumbName) {
    //Once we have the PokeThumb name when its clicked on we can send that data to the next component that needs it
    //which is PokeDetail. PokeDetail needs the name of the pokemon for the fetch to work in its component
    setPokeName(thumbName)
	//We use this to store thumbName in the local storage. So if a user refreshes the page it does not crash.
    localStorage.setItem("pokeName", JSON.stringify(thumbName))
  }
    
  return (
    
    <Router>
    <div className="app-container">
    <h1 className="title"><img src="PokeDex.png" alt="pokedex"/></h1>
        <p>(Click pokemon name to see details)</p>
      <Switch>
      <Route path="/PokeDetail" component={() => <PokeDetail name={pokeName} />} />
      <Route> 
      <div className="pokemon-container">
        <div className="all-container" >
          {/* the only way I could figure to sort the map was to sort it during the map  */}
          {allPokemon.sort((a, b) => a.id - b.id).map( (pokemonStats, index) => 
            <PokemonThumb 
            
              key={index}
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              pokeDexName={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
              childToParent={childToParent}
        
            />)}
          
        </div> 
          <button className="load-more" onClick={() => getAllPokemon()}>Load more</button>
      </div>
      </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;

