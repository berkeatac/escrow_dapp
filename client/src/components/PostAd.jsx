import React, { useState } from "react";
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

const PostAd = ({ createItem }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  return (
    <Container>
      <StyledTextField
        id="title"
        label="Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <StyledTextField
        id="description"
        label="Description"
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
      />
      <StyledTextField
        type="number"
        id="price"
        label="Price"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      <StyledButton
        variant="contained"
        color="primary"
        onClick={() => createItem(title, desc, parseInt(price))}
      >
        Post Ad
      </StyledButton>
    </Container>
  );
};

export default PostAd;
