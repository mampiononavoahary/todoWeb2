import React, { useState, useEffect, useCallback, useContext, useMemo, useRef, useReducer } from 'react';

// Définir le contexte pour stocker les données saisies
const InputContext = React.createContext();

// Actions possibles pour le reducer
const ADD_ITEM = 'ADD_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';

// Le reducer pour gérer les actions
const inputReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.payload];
    case UPDATE_ITEM:
      return state.map(item => item.id === action.payload.id ? action.payload : item);
    case DELETE_ITEM:
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
};

const InputTableComponent = () => {
  // State pour le champ de saisie
  const [inputValue, setInputValue] = useState('');

  // State pour stocker les éléments saisis
  const [items, dispatch] = useReducer(inputReducer, []);

  // Utiliser useRef pour stocker la référence au champ de saisie
  const inputRef = useRef();

  // Utiliser useEffect pour mettre le focus sur le champ de saisie au chargement du composant
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Fonction pour ajouter un nouvel élément
  const addItem = useCallback(() => {
    if (inputValue.trim() !== '') {
      const newItem = {
        id: new Date().getTime(),
        text: inputValue.trim(),
      };
      dispatch({ type: ADD_ITEM, payload: newItem });
      setInputValue('');
    }
  }, [inputValue]);

  // Fonction pour mettre à jour un élément existant
  const updateItem = useCallback((id, newText) => {
    const updatedItem = {
      id: id,
      text: newText.trim(),
    };
    dispatch({ type: UPDATE_ITEM, payload: updatedItem });
  }, []);

  // Fonction pour supprimer un élément
  const deleteItem = useCallback((id) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  }, []);

  // Utiliser useMemo pour éviter de recalculer le tableau à chaque rendu
  const tableRows = useMemo(() => {
    return items.map(item => (
      <tr key={item.id}>
        <td>{item.text}</td>
        <td>
          <button onClick={() => updateItem(item.id, prompt('Entrez la nouvelle valeur :', item.text))}>
            Modifier
          </button>
          <button onClick={() => deleteItem(item.id)}>Supprimer</button>
        </td>
      </tr>
    ));
  }, [items, updateItem, deleteItem]);

  return (
    <InputContext.Provider value={{ items }}>
      <div>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addItem}>Ajouter</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Élément</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </InputContext.Provider>
  );
};

export default InputTableComponent;
