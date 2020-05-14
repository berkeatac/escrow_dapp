import React from "react";
import Ad from "./Ad";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  & > * {
    margin-bottom: 10px;
  }
`;

const AdList = ({
  items,
  purchaseItem,
  verifyPurchase,
  cancelPurchase,
  account,
  couriers,
  setPurchaseFee,
  deleteItem,
}) => {
  return (
    <StyledDiv>
      {items.reverse().map((item) => (
        <Ad
          item={item}
          key={item.id}
          purchaseItem={purchaseItem}
          verifyPurchase={verifyPurchase}
          cancelPurchase={cancelPurchase}
          account={account}
          couriers={couriers}
          setPurchaseFee={setPurchaseFee}
          deleteItem={deleteItem}
        ></Ad>
      ))}
    </StyledDiv>
  );
};

export default AdList;
