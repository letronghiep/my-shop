"use client";
import { LoginForm } from "@/components/login";
import { FormData } from "@/schemas/SignInSchema";
import useAuthStore from "@/stores/userStore";
import { notification } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import "../../globals.css";
type Props = {};

export default function Login({}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("next") || "/";
  const { login, isAuthenticated, loading } = useAuthStore();
  const onSubmit = async (data: FormData) => {
    try {
      await login(data);
    } catch (error) {
      notification.error({
        message: error as string,
        showProgress: true,
        placement: "top",
      });
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      router.replace(decodeURIComponent(redirectTo));
    }
  }, [isAuthenticated, redirectTo, router]);
  useEffect(() => {
    localStorage.clear();
  }, []);
  return <LoginForm title="" onSubmit={onSubmit} loading={loading} />;
}
