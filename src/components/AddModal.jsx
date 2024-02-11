import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addBalance, addExpense } from "../features/expenseTrackSlice";

const AddModal = ({ isOpen, onClose, mode }) => {
  const [formData, setFormData] = useState({ amount: 0, description: "" });
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.expenseTrack.balance);

  // Function to handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { description, amount } = formData;

    if (amount > 0 && description.length > 0) {
      if (mode === "expense") {
        if (balance > amount) {
          dispatch(addExpense({ id: Date.now(), description, amount, mode }));
          setFormData({ amount: 0, description: "" });
          setError(false);
          onClose();
        } else {
          setError(true);
        }
      } else if (mode === "balance") {
        dispatch(addBalance({ id: Date.now(), description, amount, mode }));
        setFormData({ amount: 0, description: "" });
        setError(false);
        onClose();
      }
    }
  };

  return (
    <Modal
      show={isOpen}
      onHide={() => {
        setError(false);
        onClose();
      }}
    >
      <Modal.Header
        closeButton
        onClick={() => {
          setError(false);
        }}
      ></Modal.Header>

      {error ? (
        <div className="alert alert-danger mx-3 mb-0" role="alert">
          Low Balance!
        </div>
      ) : null}
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="border border-dark my-2">
            <Form.Control
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="border border-dark my-2">
            <Form.Control
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
            />
          </Form.Group>

          <div className="col-12 mt-3">
            <button
              type="submit"
              className="btn btn-secondary btn-lg btn-block rounded-0"
              style={{ width: "100%" }}
            >
              {mode === "expense" ? "Add Expense" : "Add Balance"}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
