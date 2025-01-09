import * as z from "zod";
export const GeoSchema = z.object({
  user_adjusted: z.boolean(),
  region: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
})
export const ShippingSchemaType = z.object({
  name: z.string().nonempty("Vui lòng điền trường này"),
  phone: z
    .string()
    .regex(/^\d+(?:[-.]\d+)*$/)
    .max(10, "Số điện thoại không hợp lệ"),
  address: z.string().nonempty("Vui lòng điền trường này"),
  city: z.string(),
  district: z.string(),
  ward: z.string(),
  detail_address: z.string(),
  zip: z.string().nonempty("Vui lòng điền trường này"),
  geo_info: GeoSchema,
  is_delivery_address: z.boolean(),
  is_return_address: z.boolean(),
  
});

export type ShippingSchema = z.infer<typeof ShippingSchemaType>;
