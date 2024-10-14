"use client";
import { RegisterForm } from "@/components/register";
import { SignUpFormType } from "@/schemas/SignUpSchema";
import React from "react";

type Props = {};

function Register({}: Props) {
  const handleSubmitForm = async (formData: SignUpFormType) => {
    // Handle form submission logic here
  };
  return <RegisterForm title="" onSubmit={handleSubmitForm} />;
}

export default Register;
