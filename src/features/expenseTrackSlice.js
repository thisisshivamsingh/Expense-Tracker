import { createSlice } from "@reduxjs/toolkit";

const expenseTrackSlice = createSlice({
  name: "expensetrack",
  initialState: {
    balance: 0,
    expense: 0,
    transactions: [],
  },
  reducers: {
    addExpense: (state, action) => {
      const { id, description, amount, mode } = action.payload;
      state.balance -= Number(amount);
      state.expense += Number(amount);
      state.transactions.unshift({ id, description, amount,mode });
    },

    addBalance: (state, action) => {
      const { id, description, amount,mode } = action.payload;
      state.balance += Number(amount);
      state.transactions.unshift({ id, description, amount,mode });
    },
    editExpense: (state, action) => {
     
      const { id, description, amount,mode } = action.payload;
      const index = state.transactions.findIndex(expense => expense.id === id);
      if (index !== -1) {
        const previousAmount = state.transactions[index].amount;
        state.transactions[index] = { id, description, amount,mode };
        
        const amountDifference = amount - previousAmount;

       
        state.balance = Number(state.balance) - amountDifference;
        state.expense = Number(state.expense) + amountDifference;
      }
  },
  
      
      deleteExpense: (state, action) => {
      
        const idToDelete = action.payload.transactionDetId;
        const deletedExpense = state.transactions.find(expense => expense.id === idToDelete);
       
        if (deletedExpense) {
          state.balance = Number(state.balance) + Number(deletedExpense.amount);
          state.expense = Number(state.expense) - Number(deletedExpense.amount);
          state.transactions = state.transactions.filter(expense => expense.id !== idToDelete);
        }
      }
  },
});

export const { addBalance, addExpense, editExpense, deleteExpense } =
  expenseTrackSlice.actions;
export default expenseTrackSlice.reducer;
