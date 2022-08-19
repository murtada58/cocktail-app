import React, { useState } from 'react';
import './ListView.scss';
import { Link } from 'react-router-dom';

export function Filter({activeFilters, setActiveFilters, keyText}) {
  return <div className={'filter ' + ["active", "neutral", "inactive"][activeFilters[keyText].state]}
      onClick={() => {
        activeFilters[keyText].state = (activeFilters[keyText].state + 1) % 3;
        setActiveFilters({...activeFilters});
      }}
    >
    {["+", "=", "-"][[activeFilters[keyText].state]]} {activeFilters[keyText].displayText}
  </div>
}

export function ListView({cocktails, allIngredients}) {
  const [searchText, setSearchText] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    isAlcholic: {state: 1, displayText: "Alcholic"}
  });
  console.log(allIngredients)
  return <div className='list-view'> 
    <div className='search-box'>
        <input id='search-bar' type="text" placeholder='Search by name...' value={searchText} onChange={e => setSearchText(e.target.value)}/>
        <div className='filters-box'>
          {Object.keys(activeFilters).map(keyText => (
            <Filter activeFilters={activeFilters} setActiveFilters={setActiveFilters} keyText={keyText} key={keyText}/>
          ))}
        </div>
    </div>
    <div className='cocktail-list'>
      {cocktails.length === 0?
        <h2>...Loading</h2> :
      
      cocktails.filter(cocktail => cocktail.strDrink.toLowerCase().includes(searchText.toLowerCase()) &&
        [
          cocktail.strAlcoholic === "Alcoholic",
          true,
          cocktail.strAlcoholic !== "Alcoholic"
        ][activeFilters.isAlcholic.state]
      ).map(cocktail => (
        <Link to={`/cocktail/${cocktail.idDrink}`} key={cocktail.idDrink}>
                <div className='card'>
          <img className='cocktail-thumbnail' src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
          <h4 className='cocktail-name'>{cocktail.strDrink}</h4>
        </div>
        </Link>

      ))
    }
    </div>
  </div>;
}

