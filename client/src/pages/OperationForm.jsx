import React, { useState, useEffect, useRef, useContext } from "react";
import { useDispatch } from "react-redux";
import { getCategories, postOperation, addCat } from "../redux/actions";
import AppContext from "../AppContext";
import styled from "styled-components";
import CatModal from "../components/CatModal";
import * as MdIcons from "react-icons/md";
import Swal from "sweetalert2";

export default function OperationForm() {
  const { categories } = useContext(AppContext);

  const [operation, setOperation] = useState({
    date: "",
    type: "",
    concept: "",
    amount: "",
    category: "",
  });
  const [disableBtn, setDisableBtn] = useState(true);
  const [catModal, setCatModal] = useState(false);
  const [newCat, setNewCat] = useState("");

  const dispatch = useDispatch();

  const formRef = useRef();

  function validate(op) {
    let flag = false;
    if (op.date.length > 0) {
      if (op.concept.length > 0) {
        if (op.type.length > 0) {
          if (op.amount > 0) flag = true;
        }
      }
    }
    return flag;
  }

  function handleChange(e) {
    setOperation({
      ...operation,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    let post = {
      operation: {
        date: operation.date,
        type: operation.type,
        concept: operation.concept,
        amount: Number(operation.amount),
        category: Number(operation.category),
      },
    };
    try {
      dispatch(postOperation(post));
    } catch (error) {
      console.log(error);
    }

    setOperation({
      date: "",
      type: "",
      concept: "",
      amount: "",
      category: "",
    });

    formRef.current.reset();

    Swal.fire({
      position: "center",
      icon: "success",
      title: "The operation has been added successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  function handleAddCategory() {
    setCatModal(true);
  }

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    setDisableBtn(!validate(operation));
  }, [operation]);

  useEffect(() => {
    if (newCat) {
      let cat = {
        category: {
          name: newCat,
        },
      };
      dispatch(addCat(cat));
      setNewCat("");
      setTimeout(() => {
        dispatch(getCategories());
      }, 1500);
    }
  }, [dispatch, newCat]);

  return (
    <FormContainer>
      {catModal && <CatModal setCatModal={setCatModal} setNewCat={setNewCat} />}
      <form className="form-container" onSubmit={handleSubmit} ref={formRef}>
        <label className="form-labels">
          <h4>Date:</h4>
        </label>
        <input
          className="input-date"
          name="date"
          value={operation.date}
          onChange={handleChange}
          type="date"
        />
        <label className="form-labels">
          <h4>Type:</h4>
        </label>
        <select
          className="select-type"
          name="type"
          onChange={handleChange}
          defaultValue="Select type"
        >
          <option disabled hidden>
            Select type
          </option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <label className="form-labels">
          <h4>Category:</h4>
        </label>
        <div className="add-cat-section">
          <select
            className="select-cat"
            name="category"
            onChange={handleChange}
            defaultValue="Select category"
          >
            <option disabled hidden>
              Select category
            </option>
            {categories.results &&
              categories.results.map((c, i) => {
                return (
                  <option key={i} value={c.id}>
                    {c.name}
                  </option>
                );
              })}
          </select>
          <div className="add-cat-icon">
            <MdIcons.MdAddBox onClick={handleAddCategory} />
          </div>
        </div>

        <label className="form-labels">
          <h4>Concept:</h4>
        </label>
        <textarea
          className="input-concept"
          name="concept"
          value={operation.concept}
          onChange={handleChange}
          cols="30"
          rows="5"
          placeholder="e.g. salary, credit card..."
        ></textarea>
        <label className="form-labels">
          <h4>Amount:</h4>
        </label>
        <input
          className="input-amount"
          name="amount"
          value={operation.amount}
          onChange={handleChange}
          type="text"
          placeholder="Insert the amount"
        />
        <AddBtn type="submit" disabled={disableBtn}>
          ADD
        </AddBtn>
      </form>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  width: 80%;
  height: 700px;
  margin: auto;
  margin-top: 20px;
  .form-container {
    display: flex;
    flex-direction: column;
  }
  .input-date {
    font-size: 18px;
    margin-bottom: 20px;
    text-align: center;
    height: 35px;
    border: solid 1px darkgray;
    border-radius: 8px;
    padding-right: 10px;
  }
  .select-type {
    font-size: 18px;
    margin-bottom: 20px;
    height: 35px;
    border: solid 1px darkgray;
    border-radius: 8px;
    padding-left: 5px;
  }
  .input-concept {
    padding-left: 5px;
    padding-top: 5px;
    font-size: 20px;
    margin-bottom: 20px;
    border: solid 1px darkgray;
    border-radius: 8px;
  }
  .input-amount {
    font-size: 20px;
    margin-bottom: 20px;
    height: 50px;
    padding-right: 10px;
    border: solid 1px darkgray;
    border-radius: 8px;
    padding-left: 8px;
  }
  .form-labels {
    margin-bottom: 7px;
  }
  .add-cat-section {
    display: flex;
    justify-content: space-between;
    .select-cat {
      font-size: 18px;
      margin-bottom: 20px;
      width: 100%;
      height: 35px;
      border: solid 1px darkgray;
      border-radius: 8px;
      padding-left: 5px;
    }
    .add-cat-icon {
      text-align: right;
      height: 35px;
      line-height: 35px;
      font-size: 36px;
      margin-left: 10px;
      cursor: pointer;
    }
  }

  .msg {
    color: #0e910e;
    font-size: 18px;
    text-align: center;
    margin-top: 10px;
  }
`;

const AddBtn = styled.button`
  min-width: 40px;
  height: 50px;
  font-size: 18px;
  color: #00ff00;
  background-color: #0e910e;
  border: none;
  border-radius: 8px;
  &:hover {
    background-color: #19b319;
  }
  &:disabled {
    color: grey;
    background-color: darkgrey;
  }
`;
