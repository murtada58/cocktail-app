import React from 'react';
import { useParams } from 'react-router-dom';
import './CocktailDetails.scss'




export function CocktailDetails({cocktails}) {
    console.log(cocktails); 
    let { id } = useParams();
    if (cocktails.length === 0) {
      return <div className = 'details-page'>
        <h2 className='loading-message'>...Loading</h2>
      </div>
    }

    const cocktail = cocktails.filter(cocktail => cocktail.idDrink === id)[0];
    

  return <> 
    <div className = 'details-page'>
      <div className='cocktail-details'>

          <h1 className='heading'>Cocktail Details</h1>
        
          <h2>{cocktail.strDrink}</h2>

          <h3 className = {`${cocktail.strAlcoholic==='Alcoholic' ? 'alcoholic' : 'non-alcoholic'}-label`}>{cocktail.strAlcoholic}</h3>

          <img className='cocktail-image' src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />

          <h3>Ingredients</h3>
          <ul className = 'ingredients-list'>{cocktail.ingredients.map(ingredient => <li>{ingredient.measure} {ingredient.ingredient}</li>)}</ul>

          <h3>Preparation</h3>
          <p className='instructions'>{cocktail.strInstructions}</p>


      </div>
    </div>
  </>;
}
