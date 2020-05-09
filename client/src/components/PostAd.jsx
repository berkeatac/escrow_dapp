import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const StyledTextField = styled(TextField)`
  width: 50vw;
`;

const StyledButton = styled(Button)`
  width: 50vw;
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px grey solid;
  & > .MuiFormControl-root {
    margin: 15px auto;
  }
  & > .MuiButtonBase-root {
    margin: 15px auto;
  }
`;

const PostAd = () => {
  return (
    <Container>
      <StyledTextField id="title" label="Title" />
      <StyledTextField id="description" label="Description" />
      <StyledButton variant="contained" color="primary">
        Post Ad
      </StyledButton>
    </Container>
  );
};

export default PostAd;
