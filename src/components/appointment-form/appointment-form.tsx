'use client';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldLabel, FieldDescription, FieldError } from '../ui/field';
import { Input } from '../ui/input';

const appointmentFormSchema = z.object({
  tutorName: z.string().min(3, 'O nome do tutor é obrigatorio'),
  // petName: z.string().min(3, 'O nome do pet é obrigatorio'),
  // phone: z.string().min(11, 'O telefone é obrigatorio'),
  // description: z.string().min(3, 'A descrição é obrigatoria'),
});

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

export function AppointmentForm() {
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      tutorName: '',
      // petName: '',
      // phone: '',
      // description: '',
    },
  });

  const onSubmit = (data: AppointmentFormValues) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="brand">Novo Agendamento</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agende um atendimento</DialogTitle>
          <DialogDescription>
            Preencha os dados do cliente oara realizar o agendamento:
          </DialogDescription>
        </DialogHeader>
        <form action="" className="" onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="tutorName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Nome do tutor</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Nome do tutor"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <input type="text" {...form.register('tutorName')} />
          <Button type="submit">Agendar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
