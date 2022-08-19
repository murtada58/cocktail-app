import React from 'react';
import { useParams } from 'react-router-dom';
import './CocktailDetails.scss'




export function CocktailDetails({cocktails}) {
    let { id } = useParams();
    const cocktail = cocktails.filter(cocktail => cocktail.idDrink === id)[0];
    

  return <> 
    <div className='cocktail-details'>

        <h1>Cocktail Details</h1>
      
        <h2>{cocktail.strDrink}</h2>

        <h3 className = {`${cocktail.strAlcoholic==='Alcoholic' ? 'alcoholic' : 'non-alcoholic'}-label`}>{cocktail.strAlcoholic}</h3>

        <img className='cocktail-image' src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />

        <h3>Ingredients</h3>
        <ul className = 'ingredients-list'>{cocktail.ingredients.map(ingredient => <li>{ingredient.measure} {ingredient.ingredient}</li>)}</ul>

        <h3>Preparation</h3>
        <p>{cocktail.strInstructions}</p>


    </div>
  </>;
}
