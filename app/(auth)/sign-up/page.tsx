"use client";
import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/valdations";
import React from "react";

const page = () => (
  <AuthForm
    type="SIGN_UP"
    schema={signUpSchema}
    defaultValues={{
      email: "",
      fullName: "",
      password: "",
      universityCard: "",
      universityId: 0,
    }}
    onSubmit={signUp}
  />
);

export default page;
