'use client';

import { useState } from 'react';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DatePickerProps {
  className?: string;
  disabled?: boolean;
  maxDate?: string;
  minDate?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (date?: string) => void;
}

export function DatePicker({
  className,
  disabled = false,
  maxDate,
  minDate,
  placeholder = 'Pilih Tanggal',
  value,
  onChange,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const parsedValue = value ? new Date(value) : undefined;
  const parsedMinDate = minDate ? new Date(minDate) : undefined;
  const parsedMaxDate = maxDate ? new Date(maxDate) : undefined;

  const handleChange = (date?: Date) => {
    if (onChange) {
      onChange(date ? format(date, 'yyyy-MM-dd') : undefined);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant="outline"
          data-empty={!value}
          className={cn(
            'data-[empty=true]:text-muted-foreground w-60 justify-start text-left font-normal',
            className
          )}
        >
          <CalendarIcon />
          {value ? format(value, 'd MMMM yyyy') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={parsedValue}
          onSelect={handleChange}
          disabled={date => {
            if (parsedMinDate && date < parsedMinDate) return true;
            if (parsedMaxDate && date > parsedMaxDate) return true;
            return false;
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
