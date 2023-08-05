import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

const Card = ({ pokemon, loading, pokeInfo }) => {
    return (
        <>
            {
                loading ? <h1>Loading....</h1> :
                    pokemon.map((item) => {
                        return (
                            <>
                                <div className="card" key={item.id} onClick={()=>pokeInfo(item)}>
                                    <div className="card-body">
                                        <img src={item.sprites.front_default} className="pokepic" />
                                        <h3 className="pokename text-uppercase">{item.name}</h3>
                                    </div>
                                </div>
                            </>
                        )
                    })
            }
        </>

    );
}

export default Card;