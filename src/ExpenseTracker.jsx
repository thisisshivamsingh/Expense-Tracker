import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBalance, addExpense } from "./features/expenseTrackSlice";
import AddModal from "./components/AddModal";
import TransactionModal from "./components/TransactionModal";

const ExpenseTracker = () => {
  // Get balance, expense, and transactions from the Redux store
  const balance = useSelector((state) => state.expenseTrack.balance);
  const expense = useSelector((state) => state.expenseTrack.expense);
  const transactions = useSelector((state) => state.expenseTrack.transactions);
  const dispatch = useDispatch(); // Initialize useDispatch hook

  // State variables for managing modal visibility and transaction details
  const [showModal, setShowModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [transactionDet, setTransactionDet] = useState({
    id: "",
    description: "",
    amount: 0,
    mode: "",
  });

  // Function to handle adding balance or expense
  const handleAddBalance = (options) => {
    setShowModal(true); // Show the modal
    setTransactionType(options); // Set the transaction type
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
  };

  // Function to handle editing a transaction
  const handleEdit = (details) => {
    setTransactionDet(details); // Set transaction details
    setShowTransactionModal(true); // Show the transaction modal
    setTransactionType("expense"); // Set transaction type to expense
  };

  // Function to handle form submission in the modal
  const handleFormSubmit = (formData) => {
    if (transactionType === "expense") {
      // If transaction type is expense, dispatch addExpense action
      dispatch(addExpense({ id: new Date(), ...formData }));
    } else if (transactionType === "balance") {
      // If transaction type is balance, dispatch addBalance action
      dispatch(addBalance({ id: new Date(), ...formData }));
    }
    handleCloseModal(); // Close the modal after form submission
  };

  return (
    <div>
      {/* Expense Tracker UI */}
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-80 border" style={{ width: "34%" }}>
        {/* Header */}
        <div className="content text-center">
          <h4>Expense Tracker</h4>
        </div>

        {/* Balance and Expense display */}
        <div className="container border">
          <div className="row justify-content-center">
            <div className="col-md-5 text-center">
              <h5 className="card-title">Balance</h5>
              <p className="card-text font-weight-bold">$ {balance}</p>
            </div>
            <div className="col-md-5 text-center">
              <h5 className="card-title">Expense</h5>
              <p className="card-text font-weight-bold">$ {expense}</p>
            </div>
          </div>
        </div>

        {/* Buttons for adding balance and expense */}
        <div className="col-12 mt-3">
          <button type="button" className="btn btn-secondary btn-lg btn-block rounded-0" style={{ width: "100%" }} onClick={() => handleAddBalance("balance")}>
            Add amount
          </button>
        </div>
        <div className="col-12 mt-3">
          <button type="button" className="btn btn-secondary btn-lg btn-block rounded-0" style={{ width: "100%" }} onClick={() => handleAddBalance("expense")}>
            Add expense
          </button>
        </div>

        {/* Recent Transactions */}
        <div className="content">
          <h4 className="text-left">Recent Transactions</h4>
        </div>
        {/* Display transactions */}
        {transactions.map((transaction) => (
          <div className="col-12 mt-3 py-8" key={transaction.id} style={{ height: "100%" }}>
            <div type="button" className="border border-dark my-8 rounded-0 d-flex align-items-center justify-content-between px-2" style={{ height: "100%", width: "100%" }} onClick={() => handleEdit({ id: transaction.id, description: transaction.description, amount: transaction.amount })}>
              <div>
                {transaction.description}
              </div>
              <div>$ {transaction.amount}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal component */}
      <AddModal isOpen={showModal} onClose={handleCloseModal} mode={transactionType} onFormSubmit={handleFormSubmit} />

      {/* Transaction Modal component */}
      <TransactionModal isOpen={showTransactionModal} onClose={() => setShowTransactionModal(false)} transactionDet={{ ...transactionDet }} setTransactionDet={setTransactionDet} />
    </div>
  );
};

export default ExpenseTracker;
