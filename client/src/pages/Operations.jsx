import React, { useContext, useEffect, useState } from "react";
import AppContext from "../AppContext";
import { useDispatch } from "react-redux";
import {
  getOperations,
  editOperation,
  delOperation,
  getCategories,
  filterByCategory,
} from "../redux/actions";
import styled from "styled-components";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";

export default function Operations() {
  const { operations, categories } = useContext(AppContext);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editId, setEditId] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [deleteItem, setDeleteItem] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOperations());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (editAmount) {
      let edit = {
        id: editId,
        amount: Number(editAmount),
      };
      dispatch(editOperation(edit));
      setEditAmount("");
      setEditId("");
      setTimeout(() => {
        dispatch(getOperations());
      }, 1500);
    }
  }, [dispatch, editAmount, editId]);

  useEffect(() => {
    if (deleteItem) {
      let del = {
        id: editId.toString(),
      };
      dispatch(delOperation(del));
      setEditId("");
      setTimeout(() => {
        dispatch(getOperations());
      }, 1500);
      setDeleteItem(false);
    }
  }, [dispatch, deleteItem, editId]);

  async function handleEdit(e) {
    setEditModal(true);
    setEditId(e);
  }
  function handleDelete(e) {
    setDeleteModal(true);
    setEditId(e);
  }

  function handleChange(e) {
    dispatch(filterByCategory(e.target.value));
  }

  return (
    <>
      {editModal && (
        <EditModal setEditModal={setEditModal} setEditAmount={setEditAmount} />
      )}
      {deleteModal && (
        <DeleteModal
          setDeleteModal={setDeleteModal}
          setDeleteItem={setDeleteItem}
        />
      )}
      <OperationDiv>
        <div className="date-header">
          <h4>Date</h4>
        </div>
        <div className="type-header">
          <h4>Type</h4>
        </div>
        <div className="amount-header">
          <h4>Amount</h4>
        </div>
        <div className="select-header">
          <select
            className="cat-select"
            name="category"
            onChange={handleChange}
            defaultValue="Category"
          >
            <option disabled hidden>
              Category
            </option>
            <option key="all" value="All">
              All
            </option>
            {categories.results &&
              categories.results.map((c, i) => {
                return (
                  <option key={i} value={c.name}>
                    {c.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="edit-op">
          <h5>Edit</h5>
          <h5>|</h5>
          <h5>Delete</h5>
        </div>
      </OperationDiv>
      {operations &&
        operations.map((op) => {
          return (
            <OperationDiv key={op.id}>
              <div className="date">{op.date}</div>
              <div className="type-div">
                <div
                  className={
                    op.type === "Income" ? "type-income" : "type-expense"
                  }
                >
                  {op.type}
                </div>
              </div>

              <div className="amount">
                {op.type === "Income" ? `${op.amount} $` : `- ${op.amount} $`}
              </div>
              <div className="category">{op.categories[0].name}</div>
              <div className="edit-op">
                <div className="edit">
                  <FaIcons.FaRegEdit onClick={() => handleEdit(op.id)} />
                </div>
                <div className="close">
                  <AiIcons.AiOutlineCloseSquare
                    onClick={() => handleDelete(op.id)}
                  />
                </div>
              </div>
            </OperationDiv>
          );
        })}
    </>
  );
}

const OperationDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: "Lato";
  font-size: 18px;
  font-weight: 500;
  padding: 3px 2px 3px 2px;
  margin: 2px 0px 2px 0px;
  border-bottom: 1px solid #e2e2e2;
  .date-header {
    width: 20%;
    padding-top: 5px;
  }
  .type-header {
    text-align: left;
    width: 10%;
    padding-top: 5px;
    padding-left: 8px;
  }
  .amount-header {
    width: 25%;
    text-align: right;
    padding-top: 5px;
    padding-right: 10px;
    padding-right: 3px;
  }
  .select-header {
    width: 25%;
    text-align: center;
    padding-top: 4px;
  }

  .date {
    width: 20%;
    font-size: 14px;
    padding-top: 5px;
  }
  .type-div {
    width: 10%;
  }
  .type-income {
    font-size: 0.8em;
    width: 60px;
    height: 25px;
    color: white;
    background-color: #428d42;
    text-align: center;
    align-items: center;
    padding: 3px 3px 1px 3px;
    margin-top: 3px;
    border-radius: 7px;
  }
  .type-expense {
    font-size: 0.8em;
    width: 60px;
    height: 25px;
    color: white;
    background-color: #d44a4a;
    text-align: center;
    align-items: center;
    padding: 3px 5px 1px 5px;
    margin-top: 3px;
    border-radius: 7px;
  }
  .amount {
    width: 25%;
    text-align: right;
    align-items: center;
    padding-top: 5px;
    padding-right: 3px;
  }
  .category {
    font-size: 12px;
    font-weight: 600;
    text-align: center;
    align-self: center;
    width: 25%;
  }
  .cat-select {
    font-size: 16px;
    font-weight: bold;
    align-items: flex-end;
    width: 90px;
    border: none;
  }
  .edit-op {
    display: flex;
    align-items: center;
  }
  .edit {
    color: grey;
    font-size: 1.6rem;
    margin-right: 20px;
    margin-bottom: 3px;
    cursor: pointer;
  }
  .close {
    font-size: 1.8rem;
    cursor: pointer;
  }
`;
