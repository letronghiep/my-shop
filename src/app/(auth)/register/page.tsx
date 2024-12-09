"use client";
import { RegisterForm } from "@/components/register";
import { SignUpFormType } from "@/schemas/SignUpSchema";
import useAuthStore from "@/stores/userStore";
import { notification } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import '../../globals.css'

type Props = {};

function Register({}: Props) {
  const searchParams = useSearchParams();
  const { signup, isAuthenticated, loading } = useAuthStore();
  const redirectTo = searchParams.get("next") || "/";
  const router = useRouter();
  const handleSubmitForm = async (formData: SignUpFormType) => {
    // Handle form submission logic here
    try {
      await signup(formData);
    } catch (error) {
      notification.error({
        message: error as string,
        showProgress: true,
      });
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      router.replace(decodeURIComponent(redirectTo));
    }
  }, [isAuthenticated, redirectTo, router]);
  return <RegisterForm title="" onSubmit={handleSubmitForm} />;
}

export default Register;
