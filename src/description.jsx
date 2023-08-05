import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

const Description = ({ des }) => {
    return (

        <>
            {
                (!des) ? <h1 className="text-white">Select One to view Details</h1> : (
                    <>
                        <img className="profile" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${des.id}.svg`} />
                        <h1 className="pname mt-5">{des.name}</h1>
                        <div className="attribute mt-3 mb-5">
                            {
                                des.abilities.map(poke => {
                                    return(
                                    <div className="aname">
                                        <h3>{poke.ability.name}</h3>
                                    </div>
                                    )
                                })
                            }
                        </div>
                        <div className="abilities">
                            {
                            des.stats.map(poke =>{
                                return(
                                    <>
                                    <h4>{poke.stat.name} : <span className="badge bg-warning text-dark">{poke.base_stat}</span></h4>
                                    </>
                                )
                            })

                            }
                            {/* <h4>ATTACK : </h4>
                            <h4>DEFENCE : <span className="badge bg-warning text-dark">40</span></h4>
                            <h4>SPECIAL-ATTACK : <span className="badge bg-warning text-dark">50</span></h4>
                            <h4>SPEED : <span className="badge bg-warning text-dark">90</span></h4> */}
                        </div>
                    </>
                )
            }
        </>
    );
}

export default Description;