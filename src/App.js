import React, { useEffect, useState } from 'react';
import './App.css';
import { ListView } from './ListView';
import { CocktailDetails } from './CocktailDetails';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from 'react-router-dom';

export default function App() {
  const [cocktails, setCocktails] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);

  useEffect(() => {
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    Promise.all(
      alphabet.map((letter) =>
        new Promise((resolve, reject) => {
          fetch(`api/json/v1/1/search.php?f=${letter}`)
            .then(response => response.json())
            .then(data => resolve(data))
        })
      )
    )
      .then((data) => {
        setCocktails(data.reduce((prev, curr) => curr.drinks ? [...prev, ...(curr.drinks)] : prev, []).map(cocktail => {
          let ingredients = [];

          for (let i = 1; i < 16; i++) {
            if (!cocktail["strIngredient" + i]) { continue; }
            ingredients.push({
              ingredient: cocktail["strIngredient" + i],
              measure: cocktail["strMeasure" + i]
            });
            allIngredients.push(cocktail["strIngredient" + i]);
            setAllIngredients(allIngredients);
          }
          return { ...cocktail, ingredients: ingredients }
        }))
      })
  }, [])



  return (
    <Router>
      <div>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <nav>
            Home
          </nav>
        </Link>

        <Routes>
          <Route path="/cocktail/:id" element={<CocktailDetails cocktails={cocktails} />} />
          <Route path="/" element={<ListView cocktails={cocktails} allIngredients={allIngredients} />} />
        </Routes>
      </div>
    </Router>
  );
}