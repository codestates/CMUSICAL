import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { SignButton } from '../components/styles/SignButton.styled';
import validation from '../functions/validation';

axios.defaults.withCredentials = true;

export const Container = styled.div`
  background: linear-gradient(135deg, #850c62, #f80759);
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AppWrapper = styled.div`
  background-color: #fff;
  min-width: 350px;
  min-width: 650px;
  padding: 30px;
  box-sizing: border-box;
  border-radius: 5px;
`;

export const Title = styled.div`
  color: #f80759;
  text-align: center;
  margin: 80px 0px 40px 0px;
`;

export default function SignUp() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    nickname: '',
    password: '',
    confirm: '',
  });

  const [formIsSubmitted, setFormIsSubmitted] = useState(false);

  const submitForm = () => {
    setFormIsSubmitted(true);
  };

  const [errors, setErrors] = useState({});
  const [dataIsCorrect, setDataIsCorrect] = useState(false);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));
    setDataIsCorrect(true);

    axios.post('https://localhost:4000/token/signup', { values }, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
      // const navigate = useNavigate();
      // navigate('/');
    });
  };

  useEffect(() => {
    //console.log(submitForm);
    if (Object.keys(errors).length === 0 && dataIsCorrect) {
      submitForm(true);
    }
  });

  return (
    <Container>
      <AppWrapper>
        <Title>CMUSICAL</Title>
        <form className="form-wrapper">
          <div className="username">
            <label className="label">ID</label>
            <input className="input" type="text" name="username" value={values.username} onChange={handleChange} />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <div className="email">
            <label className="label">Email</label>
            <input className="input" type="email" name="email" value={values.email} onChange={handleChange} />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="nickname">
            <label className="label">Nickname</label>
            <input className="input" type="text" name="nickname" value={values.nickname} onChange={handleChange} />
            {errors.nickname && <p className="error">{errors.nickname}</p>}
          </div>
          <div className="password">
            <label className="label">Password</label>
            <input className="input" type="password" name="password" value={values.password} onChange={handleChange} />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="confirm">
            <label className="label">Confirm</label>
            <input className="input" type="password" name="confirm" value={values.confirm} onChange={handleChange} />
            {errors.confirm && <p className="error">{errors.confirm}</p>}
          </div>
          <div>
            <SignButton onClick={handleFormSubmit}>Sign Up</SignButton>
          </div>
        </form>
      </AppWrapper>
    </Container>
  );
}
