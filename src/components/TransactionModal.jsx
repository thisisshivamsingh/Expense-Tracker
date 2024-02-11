import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { editExpense, deleteExpense } from "../features/expenseTrackSlice";

const TransactionModal = ({ isOpen, onClose, transactionDet, setTransactionDet }) => {
  const [error, setError] = useState(false);
  const balance = useSelector((state) => state.expenseTrack.balance);
  const dispatch = useDispatch();

    // Function to handle editing an expense
  const editExpenseHandler = (event) => {
    event.preventDefault();
    const amount = parseFloat(transactionDet.amount);
    if (!isNaN(amount) && amount > 0) {
      if (Number(balance) >= Number(amount)) {
        dispatch(editExpense(transactionDet));
        onClose();
        setError(false);
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }
  };

   // Function to handle deleting an expense
  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(deleteExpense({ transactionDetId: transactionDet.id }));
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton></Modal.Header>
      {error && (
        <div className="alert alert-danger mx-3 mb-0" role="alert">
          Low Balance!
        </div>
      )}
      <Modal.Body>
        <Form>
          <Form.Group className="border border-dark my-2">
            <Form.Control
              type="text"
              placeholder="Description"
              value={transactionDet.description}
              onChange={(e) =>
                setTransactionDet({ ...transactionDet, description: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="border border-dark my-2">
            <Form.Control
              type="number"
              placeholder="Amount"
              value={transactionDet.amount}
              onChange={(e) =>
                setTransactionDet({ ...transactionDet, amount: e.target.value })
              }
            />
          </Form.Group>
          <div className="col-12 mt-3">
            <Button
              
              className="btn btn-secondary btn-lg btn-block rounded-0"
              style={{ width: "100%" }}
              onClick={editExpenseHandler}
            >
              Edit
            </Button>
          </div>
          <div className="col-12 mt-3">
            <Button
              
              className="btn btn-secondary btn-lg btn-block rounded-0"
              style={{ width: "100%" }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TransactionModal;
