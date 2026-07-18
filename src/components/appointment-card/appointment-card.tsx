import { cn } from '@/lib/utils';
import { Appointment } from '@/types/appointment';
import { AppointmentForm } from '../appointment-form';
import { Button } from '../ui/button';
import { PenIcon as EditIcon } from 'lucide-react';

type AppointmentCardProps = {
  appointment: Appointment;
  isFirstInSection?: boolean;
};

export const AppointmentCard = ({
  appointment,
  isFirstInSection,
}: AppointmentCardProps) => {
  const { time, petName, tutorName, description } = appointment;

  return (
    <div
      className={cn(
        'grid grid-cols-2 md:grid-cols-[15%_35%_30%_20%] items-center py-3',
        !isFirstInSection && 'border-t border-[#2E2C30]'
      )}
    >
      <div className="text-left pr-4 md:pr-0">
        <span className="text-label-small text-content-primary font-semibold">
          {time}
        </span>
      </div>

      <div className="text-right md:text-left md:pr-4">
        <div className="flex items-center justify-end md:justify-start gap-1">
          <span className="text-label-small-size text-content-primary font-semibold">
            {petName}
          </span>
          <span className="text-paragraph-small-size text-content-secondary font-semibold">
            /
          </span>
          <span className="text-paragraph-small-size text-content-secondary font-semibold">
            {tutorName}
          </span>
        </div>
      </div>

      <div className="text-left pr-4 hidden mt-1 md:block md:mt-0 col-span-2 md:col-span-1 ">
        <span className="text-paragraph-small-size text-content-secondary">
          {description}
        </span>
      </div>

      <div className='text-right mt-2 md:mt-0 col-span-2 md:col-span-1 flex justify-end items-center gap-2'>
        <AppointmentForm appointment={appointment}>
          <Button variant="edit" size="icon">
            <EditIcon />
          </Button>
        </AppointmentForm>
      </div>
    </div>
  );
};
