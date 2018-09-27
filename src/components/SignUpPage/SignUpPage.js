import React from 'react';
import ModalOpenerButton from "../modal-openers/ModalOpenerButton/ModalOpenerButton";
import SignUpForm from "../forms/SignupForm/SignUpForm";

const SignUpPage = (props) => {
  return (
    <div>
      <ModalOpenerButton ModalComponent={SignUpForm}>Join Us</ModalOpenerButton>
    </div>
  )
};
export default SignUpPage;