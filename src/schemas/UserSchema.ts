import * as z from "zod";

export const UserSchemaType = z.object({
  username: z.string().nonempty("Vui lòng điền vào mục này"),
  userId: z.number(),
  userSlug: z.string().nonempty("Vui lòng điền vào mục này"),
  userFullName: z.string().nonempty("Vui lòng điền vào mục này"),
  userEmail: z
    .string()
    .nonempty("Vui lòng điền vào trường này")
    .email("Định dạng email chưa đúng"),
  userAvatar: z.string(),
  userRole: z.string(),
  userStatus: z.string(),
  userSalt: z.string(),
  userPhone: z.string(),
  userSex: z.string(),
  userCreatedAt: z.date(),
  userUpdatedAt: z.date(),
  userDateOfBirth: z.date(),
});

export type UserSchema = z.infer<typeof UserSchemaType>;
