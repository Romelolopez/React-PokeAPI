import React, { useEffect, useState } from 'react'

const PokeDetail = ({name}) => {

    const [allPokemon, setAllPokemon] = useState([])
    const [thumbName] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("pokeName");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
      });


  useEffect(() => {
    window.scrollTo(0, 0)
    async function getAllPokemonInfo(){
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${thumbName}`)
        const data = await res.json()

        setAllPokemon([data])
    };
    
    getAllPokemonInfo()

    //if there is a state in the square brackets and it changes, useEffect runs again. 
    //if brackets are empty, useEffect runs once
    //thumbName in the brackets because it is the state that changes
}, [thumbName])



    return (
        <div class="second-page-c">

        <h1>{thumbName.charAt(0).toUpperCase() + thumbName.slice(1)}</h1>

          {allPokemon.map( (pokemonStats, index) => 
          <div key = {index} class="poke-display"> 
              <img className="dImg" src={pokemonStats.sprites.other.dream_world.front_default} alt={thumbName} /> 
					<div className="pokeDetail"> 
						<div className="atribute">Type: {pokemonStats.types[0].type.name}</div> 
						{/* checks if they only have one ability. if so, print the one */}
						<div className="atribute">{pokemonStats.abilities.length === 1 ? `Ability: ${pokemonStats.abilities[0].ability.name}` :
						`Ability: ${pokemonStats.abilities[0].ability.name} and ${pokemonStats.abilities[1].ability.name}`}</div>
						<div className="atribute">Weight: {pokemonStats.weight}</div>
						<div className="atribute">Height: {pokemonStats.height}</div>
                        <div className="atribute">Base XP: {pokemonStats.base_experience}</div>
                        
					</div>
          </div>
          
          )}
          
 
        </div>
    )
}

export default PokeDetail;