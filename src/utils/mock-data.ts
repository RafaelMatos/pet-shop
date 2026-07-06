import { createDate } from './appointment-utils';

export const APPOINTMENTS = [
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
    scheduledAt: createDate(5, 20, 45), // Daqui 5 dias às 11:45
  },
];
