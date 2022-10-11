import React, { useContext, useEffect, useState } from "react";
import AppContext from "../AppContext";
import { useDispatch } from "react-redux";
import { getOperations, editOperation, delOperation } from "../redux/actions";
import styled from "styled-components";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";

export default function Operations() {
  const { allOperations } = useContext(AppContext);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editId, setEditId] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [deleteItem, setDeleteItem] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOperations());
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
      console.log("useeffect "+ editId)
      let del = {
        id: editId.toString(),
      };
      dispatch(delOperation(del));
      setEditId("");
      setTimeout(() => {
        dispatch(getOperations());
      }, 1500);
      setDeleteItem(false)
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

  return (
    <>
      {editModal && (
        <EditModal setEditModal={setEditModal} setEditAmount={setEditAmount} />
      )}
      {deleteModal && (
        <DeleteModal setDeleteModal={setDeleteModal} setDeleteItem={setDeleteItem}/>
      )}
      {allOperations &&
        allOperations.map((op) => {
          return (
            <OperationDiv key={op.id}>
              <div className="date">{op.date}</div>
              <div
                className={
                  op.type === "Income" ? "type-income" : "type-expense"
                }
              >
                {op.type}
              </div>
              <div className="amount">
                {op.type === "Income" ? `${op.amount} $` : `- ${op.amount} $`}
              </div>
              <div className="edit-op">
                <div className="edit">
                  <FaIcons.FaRegEdit onClick={() => handleEdit(op.id)} />
                </div>
                <div className="close">
                  <AiIcons.AiOutlineCloseSquare onClick={() => handleDelete(op.id)} />
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
  padding: 3px 10px 3px 10px;
  margin: 2px 0px 2px 0px;
  border-bottom: 1px solid #e2e2e2;
  .date {
    width: 90px;
    font-size: 16px;
    padding-top: 5px;
  }
  .type-income {
    font-size: 15px;
    width: 65px;
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
    font-size: 15px;
    width: 65px;
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
    width: 70px;
    text-align: right;
    align-items: center;
    padding-top: 5px;
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
