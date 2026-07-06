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

export function AppointmentForm() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Agendar</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agende um atendimento</DialogTitle>
          <DialogDescription>
            Preencha os dados do cliente oara realizar o agendamento:
          </DialogDescription>
        </DialogHeader>
        <form action="" className="">
          <Button type="submit">Enviar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
