import React from "react";
import { pokemonTypes } from "../pokemonTypes";
import classes from "./Card.module.css";

const Card = ({ id, name, image, types, loadInfo }) => {
  const handleClick = () => {
    loadInfo(id);
  };
  return (
    <li className={classes.card} key={id} onClick={handleClick}>
      <img src={image} height={128} width={128} alt={name} />
      <h3>{name}</h3>
      <div className={classes.type}>
        {types.map((poke) => {
          const [{ name, color }] = pokemonTypes.filter(
            (item) => item.name === poke.type.name
          );
          return (
            <p style={{ backgroundColor: `${color}` }}>{poke.type.name}</p>
          );
        })}
      </div>
    </li>
  );
};

export default Card;
