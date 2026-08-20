'use client';

import { FieldsProps } from '@/app/(page)/types/qr.types';

import Field, { inputClassName } from '../shared/Field';

/**
 * Component representing the phone form fields
 **/
export default function PhoneFields({ form, setForm }: FieldsProps) {
  return (
    <Field label='Phone number'>
      <input
        type='tel'
        value={form.phone}
        onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
        placeholder='+420 123 456 789'
        className={inputClassName}
      />
    </Field>
  );
}
