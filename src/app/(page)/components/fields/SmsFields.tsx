'use client';

import { FieldsProps } from '@/app/(page)/types/qr.types';

import Field, { inputClassName } from '../shared/Field';

/**
 * Component representing the SMS form fields
 */
export default function SmsFields({ form, setForm }: FieldsProps) {
  const { sms } = form;

  return (
    <div className='space-y-4'>
      <Field label='Phone number'>
        <input
          type='tel'
          value={sms.number}
          onChange={(event) => setForm((prev) => ({ ...prev, sms: { ...prev.sms, number: event.target.value } }))}
          placeholder='+420 123 456 789'
          className={inputClassName}
        />
      </Field>

      <Field label='Message'>
        <textarea
          rows={3}
          value={sms.message}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, sms: { ...prev.sms, message: event.target.value } }))
          }
          placeholder='SMS text…'
          className={inputClassName}
        />
      </Field>
    </div>
  );
}
