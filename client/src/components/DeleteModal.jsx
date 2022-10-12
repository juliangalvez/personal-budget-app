import React from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

export default function EditModal({ setDeleteModal, setDeleteItem }) {

  function handleClose() {
    setDeleteModal(false);
  }

  function handleDelete() {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Deleted!",
      showConfirmButton: false,
      timer: 1200,
    });
    setDeleteItem(true);
    setDeleteModal(false);
  }

  return (
    <Overlay>
      <CommentsModal>
        <div className="comment-section">
          <label className="label-delete">Want to delete this operation?</label>
          <div className="btns">
            <BtnCancel className="close" onClick={handleClose}>
              Cancel
            </BtnCancel>
            <BtnOk className="ok" onClick={handleDelete}>
              Ok
            </BtnOk>
          </div>
        </div>
      </CommentsModal>
    </Overlay>
  );
}

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(33, 33, 33, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CommentsModal = styled.div`
  width: 250px;
  height: 150px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  background: #f6f6f6;
  box-shadow: 4px 0px 9px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  font-family: "Lato";

  .comment-section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .label-delete {
    font-size: 20px;
    text-align: center;
    width: 200px;
    height: 30px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .btns {
    margin-top: 20px;
    width: 200px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;
const BtnOk = styled.button`
  font-size: 16px;
  background-color: green;
  color: #08eb08;
  width: 80px;
  height: 40px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  &:disabled {
    color: grey;
    background-color: darkgrey;
  }
`;
const BtnCancel = styled.button`
  background-color: #ff5252;
  color: #ffffff;
  font-size: 16px;
  width: 80px;
  height: 40px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  &:disabled {
    color: grey;
    background-color: darkgrey;
  }
`;
