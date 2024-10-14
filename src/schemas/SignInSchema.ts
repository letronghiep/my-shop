import * as z from "zod";

export const SignInSchema = z.object({
  username: z.string().nonempty("Vui lòng điền vào mục này"),
  password: z
    .string()
    .min(8, { message: "Mật khẩu quá ngắn" })
    // .regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất 1 chữ in hoa")
    // .regex(/\d/, "Mật khẩu phải chứa ít nhất 1 chữ số")
    // .regex(
    //   /[!@#$%^&*(),.?":{}|<>]/,
    //   "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt"
    // )
    .nonempty("Vui lòng điền vào mục này"),
});

export type FormData = z.infer<typeof SignInSchema>;
