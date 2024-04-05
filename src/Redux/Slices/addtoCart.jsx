import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  carts:[],
  quantity:0,
}

// Handling Local Storage : from line no. 8 - 31 
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cartState', serializedState);
  } catch (err) {
    console.error('Error saving state to local storage:', err);
  }
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cartState');
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from local storage:', err);
    return initialState;
  }
};

const initialStateWithLocalStorage = loadState();

export const cartSlice = createSlice({
  name: 'counter',
  initialState:initialStateWithLocalStorage,
  reducers: {

      addtocart: (state,action) =>{
        const find = state.carts.findIndex(items=>items.id===action.payload.id)
        if(find>=0){
            state.carts[find].quantity +=1
        }else {
            const tempvar = {...action.payload,quantity:1}
            state.carts.push(tempvar)
        }
        saveState(state);
   },
   incrementQuantity: (state, action) => {
    const { id } = action.payload;
    const itemToIncrement = state.carts.find(item => item.id === id);

    if (itemToIncrement) {
      itemToIncrement.quantity++;
    }
    saveState(state);
  },
  decrementQuantity: (state, action) => {
    const { id } = action.payload;
    const itemToDecrement = state.carts.find(item => item.id === id);

    if (itemToDecrement && itemToDecrement.quantity > 0) {
      itemToDecrement.quantity--;
    }
    saveState(state);
  },
  removeItem: (state, action) => {
    const { id } = action.payload;
    const indexToRemove = state.carts.findIndex(item => item.id === id);

    if (indexToRemove !== -1) {
      state.carts.splice(indexToRemove, 1);
    }
    saveState(state);
  },
  },
})

export const {addtocart,incrementQuantity,decrementQuantity,removeItem} = cartSlice.actions
export default cartSlice.reducer