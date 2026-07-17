'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const appointmentSchema = z.object({
  tutorName: z.string(),
  petName: z.string(),
  phone: z.string(),
  description: z.string(),
  scheduleAt: z.date(),
  time: z.string(),
});

type AppointmentData = z.infer<typeof appointmentSchema>;

export async function createAppointment(data: AppointmentData) {
  try {
    const parsedData = appointmentSchema.parse(data);
    const { scheduleAt, time, ...rest } = parsedData;

    const hour = scheduleAt.getHours();

    const isMorning = hour >= 9 && hour < 12;
    const isAfternoon = hour >= 13 && hour < 18;
    const isEvening = hour >= 19 && hour < 21;

    if (!isMorning && !isAfternoon && !isEvening) {
      return {
        error:
          'Agendamentos só podem ser feitos entre 9h-12h, 13h-18h e 19h-21h',
      };
    }

    const existingAppointments = await prisma.appointment.findFirst({
      where: {
        scheduledAt: parsedData.scheduleAt,
      },
    });

    if (existingAppointments) {
      return { error: 'Ja existe um agendamento nesse horario' };
    }

    await prisma.appointment.create({
      data: {
        ...rest,
        scheduledAt: new Date(parsedData.scheduleAt),
      },
    });
    revalidatePath('/');
  } catch (err) {
    console.error(err);
    return { error: 'Não foi possível salvar o agendamento. Tente novamente.' };
  }
}
