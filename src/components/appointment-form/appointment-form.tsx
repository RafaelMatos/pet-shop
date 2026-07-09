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
import { Dog, Phone, User } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { IMaskInput } from 'react-imask';

const appointmentFormSchema = z.object({
  tutorName: z.string().min(3, 'O nome do tutor é obrigatorio'),
  petName: z.string().min(3, 'O nome do pet é obrigatorio'),
  phone: z.string().min(11, 'O telefone é obrigatorio'),
  description: z.string().min(3, 'A descrição é obrigatoria'),
});

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

export function AppointmentForm() {
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      tutorName: '',
      petName: '',
      phone: '',
      description: '',
    },
  });

  const onSubmit = (data: AppointmentFormValues) => {
    console.log(data);
  };

  return (
    <Dialog >
      <DialogTrigger>
        <Button variant="brand">Novo Agendamento</Button>
      </DialogTrigger>

      <DialogContent variant="appointment">
        <DialogHeader>
          <DialogTitle>Agende um atendimento</DialogTitle>
          <DialogDescription>
            Preencha os dados do cliente para realizar o agendamento:
          </DialogDescription>
        </DialogHeader>
        <form action="" className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="tutorName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className='text-label-medium-size text-content-primary'>Nome do tutor</FieldLabel>
                <div className='relative '>
                  <User className='absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand' size={20} />
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Nome do tutor"
                    className='pl-10'
                    autoComplete="off"
                  />
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="petName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className='text-label-medium-size text-content-primary'>Nome do pet</FieldLabel>
                <div className='relative '>
                  <Dog className='absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand' size={20} />
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Nome do seu pet"
                    className='pl-10'
                    autoComplete="off"
                  />
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className='text-label-medium-size text-content-primary'>Telefone</FieldLabel>
                <div className='relative '>
                  <Phone className='absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand' size={20} />
                  <IMaskInput
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="(XX) XXXXX-XXXX"
                    className="pl-10 flex h-12 w-full rounded-md border border-border-primary bg-background-tertiary px-3 py-2 text-sm text-content-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-content-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-border-brand disabled:cursor-not-allowed disabled:opacity-50 hover:border-border-secondary focus:border-border-brand focus-visible:border-border-brand aria-invalid:ring-destructive/20 aria-invalid:border-destructive"
                    autoComplete="off"
                    mask='(00) 00000-0000'
                    radix='integer'
                    unmask={false}
                  />
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className='text-label-medium-size text-content-primary'>Descrição do serviço</FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Descrição do serviço"
                  className='resize-none'
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button type="submit" variant="brand">Agendar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
