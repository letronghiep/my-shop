"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "antd";
import { motion } from "framer-motion";
import Input from "../inputs/Input";

import useLocalStorage from "@/hooks/useLocalStorage";
import useResponsive from "@/hooks/useResponsive";
import { SignUpFormType, SignUpSchema } from "@/schemas/SignUpSchema";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Button from "../Button";
interface FormProps {
  title: string;
  onSubmit: (data: SignUpFormType) => Promise<void>;
}
function RegisterForm({ title, onSubmit }: FormProps) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpFormType>({
    resolver: zodResolver(SignUpSchema),
  });
  const { Text } = Typography;
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("next") || "/";

  const { isMobile, isTablet, isDesktop } = useResponsive();
  return (
      <div
        className=""
        style={{
          backgroundImage: 'url("/bg-img.png")',
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
          height: "100vh",
          display: "flex",
        }}
      >
        <div className="fixed top-0 right-0 left-0 bottom-0 h-full bg-neutral-800/60" />
        <div className="flex items-center justify-between w-full">
          <div className="hidden md:flex z-[1000] text-left md:flex-col md:justify-center text-white mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div>
                <div className="flex items-center gap-x-2 mb-[60px]">
                  <Image
                    alt="Logo"
                    src="/logo-white.svg"
                    width={250}
                    height={250}
                  />
                </div>
              </div>
              <p className="max-w-[350px]">{title}</p>
            </motion.div>
          </div>
          <motion.div
            initial={{
              x: isMobile ? "0%" : "100%",
              opacity: isMobile ? 1 : 0,
            }}
            animate={{
              x: "0%",
              opacity: 1,
            }}
            transition={{
              duration: 1.5,
            }}
            className="p-6 rounded-lg shadow shadow-neutral-500 md:w-[400px] bg-white my-auto z-[1000] mx-auto w-[90%]"
          >
            <div>
              <h2 className="text-xl font-semibold mb-5">Đăng ký</h2>
              <form
                className="flex flex-col gap-y-3"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  type="text"
                  placeholder="Tên đăng nhập"
                  name="username"
                  register={register}
                  error={errors.username}
                  size="sm"
                  variant={`${errors.username ? "danger" : "default"}`}
                />
                <Input
                  type="text"
                  placeholder="Họ và tên"
                  name="fullname"
                  register={register}
                  error={errors.fullname}
                  size="sm"
                  variant={`${errors.fullname ? "danger" : "default"}`}
                />
                <Input
                  type="password"
                  placeholder="Mật khẩu"
                  name="password"
                  register={register}
                  error={errors.password}
                  size="sm"
                  variant={`${errors.password ? "danger" : "default"}`}
                />
                <Input
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  name="confirmPassword"
                  register={register}
                  error={errors.confirmPassword}
                  size="sm"
                  variant={`${errors.confirmPassword ? "danger" : "default"}`}
                />
                <Button
                  size="md"
                  className="text-center justify-center items-center"
                  variant="default"
                  type="submit"
                >
                  Đăng ký
                </Button>
                <div className="my-3 flex flex-col items-center justify-center">
                  <p className="text-sm text-neutral-800">
                    Bạn đã có tài khoản?
                    <Link
                      className="text-blue-500 hover:underline ml-2 "
                      href={`/login?${searchParams}`}
                    >
                      Đăng nhập
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
  );
}

export default RegisterForm;
