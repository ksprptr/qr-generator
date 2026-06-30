'use client';

import { FieldsProps } from '@/app/(page)/types/qr.types';

import Field, { inputClassName } from '../shared/Field';

/**
 * Component representing the email form fields
 */
export default function EmailFields({ form, setForm }: FieldsProps) {
  const { email } = form;

  return (
    <div className='space-y-4'>
      <Field label='Recipient'>
        <input
          type='email'
          value={email.to}
          onChange={(event) => setForm((prev) => ({ ...prev, email: { ...prev.email, to: event.target.value } }))}
          placeholder='name@example.com'
          className={inputClassName}
        />
      </Field>

      <Field label='Subject'>
        <input
          value={email.subject}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, email: { ...prev.email, subject: event.target.value } }))
          }
          placeholder='Email subject'
          className={inputClassName}
        />
      </Field>

      <Field label='Message'>
        <textarea
          rows={3}
          value={email.body}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, email: { ...prev.email, body: event.target.value } }))
          }
          placeholder='Message body…'
          className={inputClassName}
        />
      </Field>
    </div>
  );
}
