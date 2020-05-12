import React from "react";
import Ad from "./Ad";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
        ></Ad>
      ))}
    </StyledDiv>
  );
};

export default AdList;
