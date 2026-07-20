'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const appointmentSchema = z.object({
  tutorName: z.string(),
  petName: z.string(),
  phone: z.string(),
  description: z.string(),
  scheduledAt: z.date(),
  // time: z.string(),
});

type AppointmentData = z.infer<typeof appointmentSchema>;

export async function createAppointment(data: AppointmentData) {
  try {
    const parsedData = appointmentSchema.parse(data);
    const { scheduledAt, ...rest } = parsedData;

    const hour = scheduledAt.getHours();

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
        scheduledAt: parsedData.scheduledAt,
      },
    });

    if (existingAppointments) {
      return { error: 'Ja existe um agendamento nesse horario' };
    }

    await prisma.appointment.create({
      data: {
        ...rest,
        scheduledAt: new Date(parsedData.scheduledAt),
      },
    });
    revalidatePath('/');
  } catch (err) {
    console.error(err);
    return { error: 'Não foi possível salvar o agendamento. Tente novamente.' };
  }
}

export async function updateAppointment(id: string, data: AppointmentData) {
  try {
    const parsedData = appointmentSchema.parse(data)

    const { scheduledAt, ...rest } = parsedData;

    const hour = scheduledAt.getHours();

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
        scheduledAt: parsedData.scheduledAt,
        id: {
          not: id
        }
      },
    });

    if (existingAppointments) {
      return { error: 'Ja existe um agendamento nesse horario' };
    }

    await prisma.appointment.update({
      where: {
        id
      },
      data: {
        ...parsedData,
        scheduledAt: new Date(parsedData.scheduledAt)
      }
    })
    revalidatePath('/')


  } catch (error) {
    console.log("Erro ao atualizar: ", error)
    return { error: 'Não foi possível atualizar o agendamento. Tente novamente.' };
  }
}


export async function deleteAppointment(id: string) {
  try {

    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        id
      },
    });

    if (!existingAppointment) {
      return { error: 'Agendamento não encontrado.' };
    }

    await prisma.appointment.delete({
      where: {
        id
      }
    })
    revalidatePath('/')
  } catch (error) {
    console.log("Erro ao deletar: ", error)
    return { error: 'Não foi possível deletar o agendamento. Tente novamente.' };
  }
}