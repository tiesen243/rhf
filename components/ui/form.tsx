import { Slot } from '@radix-ui/react-slot'
import { forwardRef, useId } from 'react'
import { Controller, type FieldValues, type Path, type UseFormReturn } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type FormProps = React.FormHTMLAttributes<HTMLFormElement>

export const Form = forwardRef<HTMLFormElement, FormProps>(({ className = '', ...props }, ref) => (
  <form {...props} ref={ref} className={cn('flex flex-col gap-4', className)} />
))
Form.displayName = 'Form'

interface FormFieldProps<T extends FieldValues = FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'onChange' | 'onBlur'> {
  name: Path<T>
  control: UseFormReturn<T>['control']
  label?: string
  description?: string
  asChild?: boolean
  classes?: {
    root?: string
    label?: string
    input?: string
    description?: string
    message?: string
  }
}

export const FormField = <T extends FieldValues>({
  name,
  control,
  label = '',
  description = '',
  asChild = false,
  classes = {},
  ...props
}: FormFieldProps<T>): React.ReactElement => {
  const id = useId()

  const ids = {
    field: `${id}-form-field`,
    description: `${id}-form-field-description`,
    message: `${id}-form-field-message`,
  }

  const Comp = asChild ? Slot : Input

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error }, formState: { isSubmitting } }) => (
        <fieldset
          name={field.name}
          disabled={isSubmitting}
          className={cn('space-y-2', classes.root)}
        >
          {label && (
            <Label htmlFor={ids.field} className={cn(error && 'text-destructive', classes.label)}>
              {label}
            </Label>
          )}

          <Comp
            {...field}
            {...props}
            id={ids.field}
            className={cn(
              error && 'border-destructive focus-visible:outline-destructive',
              classes.input,
            )}
            aria-describedby={error ? `${ids.description} ${ids.message}` : ids.description}
            aria-invalid={!!error}
          />

          {description && (
            <p
              id={ids.description}
              className={cn('text-sm text-muted-foreground', classes.description)}
            >
              {description}
            </p>
          )}

          {error && (
            <small id={ids.message} className={cn('text-destructive', classes.message)}>
              {error.message}
            </small>
          )}
        </fieldset>
      )}
    />
  )
}
