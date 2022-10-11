import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { postOperation } from "../redux/actions";
import styled from "styled-components";

export default function OperationForm() {
  const [operation, setOperation] = useState({
    date: "",
    type: "",
    concept: "",
    amount: "",
  });
  const [disableBtn, setDisableBtn] = useState(true);
  const [msg, setMsg] = useState("");

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
      },
    };
    try {
      dispatch(postOperation(post));
    } catch (error) {
      console.log(error)
    }
    

    setOperation({
      date: "",
      type: "",
      concept: "",
      amount: "",
    });

    formRef.current.reset();

    setMsg("The operation has been added successfully");
    setTimeout(() => {
      setMsg("");
    }, 3000);
  }

  useEffect(() => {
    setDisableBtn(!validate(operation));
  }, [operation]);

  return (
    <FormContainer>
      <form className="form-container" onSubmit={handleSubmit} ref={formRef}>
        <input
          className="input-date"
          name="date"
          value={operation.date}
          onChange={handleChange}
          type="date"
        />
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
        <textarea
          className="input-concept"
          name="concept"
          value={operation.concept}
          onChange={handleChange}
          cols="30"
          rows="5"
          placeholder="Concept"
        ></textarea>

        <input
          className="input-amount"
          name="amount"
          value={operation.amount}
          onChange={handleChange}
          type="text"
          placeholder="Amount"
        />
        <AddBtn type="submit" disabled={disableBtn}>
          ADD
        </AddBtn>
      </form>
      <div className="msg">{msg && msg}</div>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  width: 50vw;
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
