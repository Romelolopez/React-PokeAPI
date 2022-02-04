import {Link} from "react-router-dom"


const PokemonThumb = ({id, image, pokeDexName, type, childToParent}) => {
    const style = type + " thumb-container";

    function handleClick(event){
        //When the pokemons name gets clicked, it gets saved in the const "name"
        const name = event.target.attributes.name.value
        //We pass name into the "childToParent function" which was passed down from parent
        childToParent(name)
        //This could all be done without being in a function but I needed the event
    }
    return (

        <div className={style}>
            <div className="number"><small>#0{id}</small></div>
            <img src={image} alt={"pokemon"} />
            <div className="detail-wrapper">
                    {/*Once the H3 is clicked the const name gets back to to parent class and populates "thumbName"*/}
                    {/* Name attribute is manually assigned to pokeDexName for h3 so it can easily be retrieved 
                    by the handle click and sent back to the parent class*/}

                    <Link to="/PokeDetail"><h3 onClick={(e) => handleClick(e)} name={pokeDexName}> {pokeDexName} </h3></Link>

                <small>Type: {type}</small>
            </div>
            
        </div>

    )
}

export default PokemonThumb