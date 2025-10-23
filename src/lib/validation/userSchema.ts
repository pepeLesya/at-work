import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(2, 'Имя должно быть от 2 до 64 символов').max(64),
  username: z.string().min(2, 'Никнейм должен быть от 2 до 64 символов').max(64),
  email: z.string().email('Некорректный email'),
  city: z.string().min(2, 'Город должен быть от 2 до 64 символов').max(64),
  phone: z.string().regex(/^\d+$/, 'Телефон должен содержать только цифры'),
  companyName: z.string().min(2, 'Название компании должно быть от 2 до 64 символов').max(64),
});

export type UserFormData = z.infer<typeof userSchema>;