import React, { useState } from 'react';
import './ListView.scss';
import { Link } from 'react-router-dom';
import Select from 'react-select';

export function Filter({activeFilters, setActiveFilters, keyText}) {
  return <div className={'filter ' + ["active", "neutral", "inactive"][activeFilters[keyText].state]}
      onClick={() => {
        activeFilters[keyText].state = (activeFilters[keyText].state + 1) % 3;
        setActiveFilters({...activeFilters});
      }}
    >
    {activeFilters[keyText].displayText[activeFilters[keyText].state]}
  </div>
}

export function ListView({cocktails, allIngredients, allGlasses}) {
  const [searchText, setSearchText] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    isAlcholic: {state: 1, displayText: ["Alcholic only", "Both alcholic and non-alcholic", "Non-Alcholic only"]}
  });
  const [includedIngredients, setIncludedIngredients] = useState([]);
  const [excludedIngredients, setexcludedIngredients] = useState([]);
  const [includedGlasses, setIncludedGlasses] = useState([]);
  const [excludedGlasses, setExcludedGlasses] = useState([]);
  
  const dropdownStyles = {
    option: provided => ({
      ...provided,
      color: 'black'
    }),
    control: provided => ({
      ...provided,
      color: 'black'
    })
  }
  
  return <div className='list-view'> 
    <div className='search-box'>
        <input id='search-bar' type="text" placeholder='Search by name...' value={searchText} onChange={e => setSearchText(e.target.value)}/>
        <div className='filters-box'>
          {Object.keys(activeFilters).map(keyText => (
            <Filter activeFilters={activeFilters} setActiveFilters={setActiveFilters} keyText={keyText} key={keyText}/>
          ))}
        </div>
        <details className='details-filter-box'>
          <summary>Glass filters</summary>
          <div className='dropdown-filter-container'>
            <div className='dropdown-filter'>
              <p>In</p>
              <Select
                styles={dropdownStyles}
                isMulti
                options={allGlasses.map((glass) => {return{ value: glass, label: glass }})} 
                onChange={(selectedOptions) => {setIncludedGlasses(selectedOptions.map(option => option.value))}}
                placeholder = "Include these glasses"
              />
            </div>

            <div className='dropdown-filter'>
              <p>Not in</p>
              <Select
                styles={dropdownStyles}
                isMulti
                options={allGlasses.map((glass) => {return{ value: glass, label: glass }})} 
                onChange={(selectedOptions) => {setExcludedGlasses(selectedOptions.map(option => option.value))}}
                placeholder = "Exclude these glasses"
              />
            </div>
          </div>
        </details>

        <details className='details-filter-box'>
          <summary>Ingredients filters</summary>
          <div className='dropdown-filter-container'>
            <div className='dropdown-filter'>
              <p>Contains</p>
              <Select
                styles={dropdownStyles}
                isMulti
                options={allIngredients.map((ingredient) => {return{ value: ingredient, label: ingredient }})} 
                onChange={(selectedOptions) => {setIncludedIngredients(selectedOptions.map(option => option.value))}}
                placeholder = "Include these ingredients"
              />
            </div>

            <div className='dropdown-filter'>
              <p>Does not contain</p>
              <Select
                styles={dropdownStyles}
                isMulti
                options={allIngredients.map((ingredient) => {return{ value: ingredient, label: ingredient }})}
                onChange={(selectedOptions) => {setexcludedIngredients(selectedOptions.map(option => option.value))}}
                placeholder = "Exclude these ingredients"
              />
            </div>
          </div>
        </details>
    </div>
    <div className='cocktail-list'>
      {cocktails.length === 0?
        <h2>...Loading</h2> :
      
      cocktails.filter(cocktail => cocktail.strDrink.toLowerCase().includes(searchText.toLowerCase()) &&
        [
          cocktail.strAlcoholic === "Alcoholic",
          true,
          cocktail.strAlcoholic !== "Alcoholic"
        ][activeFilters.isAlcholic.state] &&
        (
          includedGlasses.length === 0 ||
          includedGlasses.includes(cocktail.strGlass.toLowerCase())
        ) &&
        (
          excludedGlasses.length === 0 ||
          !excludedGlasses.includes(cocktail.strGlass.toLowerCase())
        ) &&
        (
          includedIngredients.length === 0 ||
          cocktail.ingredients.some(ingredient => 
            includedIngredients.includes(ingredient.ingredient.toLowerCase())
          )
        ) &&
        (
          excludedIngredients.length === 0 ||
          !cocktail.ingredients.some(ingredient => 
            excludedIngredients.includes(ingredient.ingredient.toLowerCase())
          )
        )
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

