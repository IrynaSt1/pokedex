import React from "react";
import { pokemonTypes } from "../pokemonTypes";
import { IoIosClose } from "react-icons/io";
import classes from "./PokemonInfo.module.css";

const PokemonInfo = ({ data, onClose }) => {
  const statsContent = [
    { title: "HP", field: "hp" },
    { title: "Attack", field: "attack" },
    { title: "Defense", field: "defense" },
    { title: "Sp Attack", field: "specialAttack" },
    { title: "Sp Defense", field: "specialDefense" },
    { title: "Speed", field: "speed" },
  ];
 
  return (
    <>
      {!data ? (
        ""
      ) : (
        <div className={classes.info}>
          <IoIosClose className={classes.close} onClick={onClose}></IoIosClose>
          <img
            src={
              data.sprites.other["dream_world"].front_default ??
              data.sprites.other["official-artwork"].front_default
            }
          />
          <h3>
            {data.name} #{data.id}
          </h3>

          <div className={classes.type}>
            {data.types.map((poke) => {
              const [{ name, color }] = pokemonTypes.filter(
                (item) => item.name === poke.type.name
              );
              return (
                <p style={{ backgroundColor: `${color}` }}>{poke.type.name}</p>
              );
            })}
          </div>
          <div className={classes.stats}>
            {statsContent &&
              statsContent.map((stat, index) => (
                <div className={classes.row} key={stat.field}>
                  <strong>{stat.title}</strong>
                  <span>{data?.stats[index].base_stat || 1}</span>
                </div>
              ))}

            <div className={classes.row}>
              <strong>Weight</strong> <span>{data.weight}</span>
            </div>
            <div className={classes.row}>
              <strong>Total moves</strong> <span>{data.moves.length}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonInfo;
