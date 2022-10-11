import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOperations } from "../redux/actions";
import AppContext from "../AppContext";
import styled from "styled-components";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

export default function Home() {
  const { operations, balance } = useContext(AppContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOperations());
  }, [dispatch]);

  return (
    <>
      <HomeDiv>
        <div className="balance-div">
          <div className="balance-text"><h3>Current balance:</h3></div>
          <div className="balance-amount">{balance} $</div>
        </div>
        <div>
          {operations && operations.length > 0 ? (
            <div>
            <h3>Last 10 operations:</h3>
              {operations.map((op) => {
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
                      {op.type === "Income"
                        ? `${op.amount} $`
                        : `- ${op.amount} $`}
                    </div>
                  </OperationDiv>
                );
              })}
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </HomeDiv>
    </>
  );
}

const HomeDiv = styled.div`
  display: flex;
  flex-direction: column;
  .balance-div {
    display: flex;
    justify-content: flex-end;

    align-self: center;
    width: 100%;
    height: 50px;
    line-height: 50px;

    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;

    .balance-text {
      font-size: 18px;
      margin-right: 20px;
    }
    .balance-amount {
      font-size: 32px;
      font-weight: 600;
      background-color: #90ffac;
      border-radius: 10px;
      padding-left: 20px;
      padding-right: 20px;
    }
  }
`;

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
