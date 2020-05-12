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

const AdList = ({items}) => {
  return (
    <StyledDiv>
      {items.reverse().map( item => <Ad item={item}></Ad>)}
    </StyledDiv>
  );
};

export default AdList;
