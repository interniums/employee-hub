import { z } from 'zod'

const SignSchema = z
  .object({
    email: z.string().min(1, { message: 'Email is required' }).email(),
    password: z
      .string()
      .min(8, { message: 'Password should contain at least 8 characters' })
      .max(24, { message: 'Password should not contain more than 24 characters' }),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  })

export default SignSchema
