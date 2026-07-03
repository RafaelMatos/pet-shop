import { PeriodSection } from '@/components/period-section';
import { Appointment as AppointmnetPrisma } from '@/generated/prisma/client';
import { Appointment, AppointmentPeriodDay } from '@/types/appointment';

const today = new Date();

const createDate = (daysFromToday: number, hour: number, minute = 0) => {
  const date = new Date(today);
  date.setDate(today.getDate() + daysFromToday);
  date.setHours(hour, minute, 0, 0);
  return date;
};

const appointments = [
  {
    id: '1',
    petName: 'Rex',
    description: 'Consulta',
    tutorName: 'João',
    phone: '1234567890',
    scheduledAt: createDate(0, 9, 0), // Hoje às 09:00
  },
  {
    id: '2',
    petName: 'Mimi',
    description: 'Vacinação',
    tutorName: 'João',
    phone: '1234567890',
    scheduledAt: createDate(1, 10, 30), // Amanhã às 10:30
  },
  {
    id: '3',
    petName: 'Sol',
    description: 'Retorno',
    tutorName: 'Rafael',
    phone: '1234567890',
    scheduledAt: createDate(2, 14, 0), // Daqui 2 dias às 14:00
  },
  {
    id: '4',
    petName: 'Nina',
    description: 'Banho e Tosa',
    tutorName: 'Natalia',
    phone: '1234567890',
    scheduledAt: createDate(3, 16, 15), // Daqui 3 dias às 16:15
  },
  {
    id: '5',
    petName: 'Rex',
    description: 'Consulta',
    tutorName: 'João',
    phone: '1234567890',
    scheduledAt: createDate(5, 11, 45), // Daqui 5 dias às 11:45
  },
];

const getPeriod = (hour: number): AppointmentPeriodDay => {
  if (hour >= 9 && hour <= 12) return 'morning';
  if (hour > 12 && hour <= 18) return 'afternoon';
  return 'evening';
};

function groupAppointmentByPeriod(appointments: AppointmnetPrisma[]) {
  const transformedAppointments: Appointment[] = appointments.map((apt) => {
    return {
      ...apt,
      time: apt.scheduledAt.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      period: getPeriod(apt.scheduledAt.getHours()),
    };
  });

  const morningAppointments = transformedAppointments.filter(
    (apt) => apt.period === 'morning'
  );
  const afternoonAppointments = transformedAppointments.filter(
    (apt) => apt.period === 'afternoon'
  );
  const eveningAppointments = transformedAppointments.filter(
    (apt) => apt.period === 'evening'
  );
}

export default function Home() {
  return (
    <div className="bg-background-primary p-6">
      <div className="flex items-center justify-between md:mb-8">
        <div>
          <h1 className="text-title-size text-content-primary mb-2">
            Sua agenda
          </h1>
          <p className="text-paragraph-medium-size text-content-secondary">
            Aqui você pode ver todos os clientes e servços agendados para hoje.
          </p>
        </div>
      </div>
      <PeriodSection period={{ title: 'Manhã', type: 'morning', timeRange: '09:00 - 12:00', appointments: [] }} />
    </div>
  );
}
