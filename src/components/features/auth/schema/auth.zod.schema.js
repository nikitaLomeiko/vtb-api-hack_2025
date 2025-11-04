import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email("Введите корректный email"),
});

export const codeSchema = z.object({
  code: z.string().length(6, "Код должен содержать 6 цифр").regex(/^\d+$/, "Код должен содержать только цифры"),
});

export const pinSchema = z
  .object({
    pin: z
      .string()
      .length(4, "Пин-код должен содержать 4 цифры")
      .regex(/^\d+$/, "Пин-код должен содержать только цифры"),
    confirmPin: z.string().length(4, "Подтвердите пин-код"),
  })
  .refine((data) => data.pin === data.confirmPin, {
    message: "Пин-коды не совпадают",
    path: ["confirmPin"],
  });

export const authStages = {
  EMAIL: "email",
  CODE: "code",
  PIN: "pin",
};
