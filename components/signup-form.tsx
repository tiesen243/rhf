'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'

export const SignupForm: React.FC = () => {
  const form = useForm<FormValues>({ resolver })

  const handleSubmit = form.handleSubmit(async (data) => {
    /* Call your API here */
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast.success('Account created!', {
      description: JSON.stringify(data, null, 2),
    })
  })

  return (
    <Form className="w-full max-w-screen-md" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <FormField
          {...field}
          key={field.name}
          register={form.register}
          error={form.formState.errors[field.name]}
        />
      ))}

      <Button isLoading={form.formState.isSubmitting}>Register</Button>
    </Form>
  )
}

const schema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email(),
    password: z
      .string()
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/,
        'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.',
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

type FormValues = z.infer<typeof schema>

const resolver = zodResolver(schema)

const fields = [
  { name: 'name' as const, label: 'Name', type: 'text' },
  { name: 'email' as const, label: 'Email', type: 'email' },
  { name: 'password' as const, label: 'Password', type: 'password' },
  { name: 'confirmPassword' as const, label: 'Confirm Password', type: 'password' },
]
