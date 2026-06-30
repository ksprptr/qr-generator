'use client';

import { FieldsProps } from '@/app/(page)/types/qr.types';

import Field, { inputClassName } from '../shared/Field';

/**
 * Component representing the contact (vCard) form fields
 */
export default function ContactFields({ form, setForm }: FieldsProps) {
  const { contact } = form;

  const update = (patch: Partial<typeof contact>) =>
    setForm((prev) => ({ ...prev, contact: { ...prev.contact, ...patch } }));

  return (
    <div className='space-y-4'>
      <div className='grid gap-4 sm:grid-cols-2'>
        <Field label='First name'>
          <input
            value={contact.firstName}
            onChange={(event) => update({ firstName: event.target.value })}
            className={inputClassName}
          />
        </Field>
        <Field label='Last name'>
          <input
            value={contact.lastName}
            onChange={(event) => update({ lastName: event.target.value })}
            className={inputClassName}
          />
        </Field>
      </div>

      <div className='grid gap-4 sm:grid-cols-2'>
        <Field label='Company'>
          <input
            value={contact.org}
            onChange={(event) => update({ org: event.target.value })}
            className={inputClassName}
          />
        </Field>
        <Field label='Job title'>
          <input
            value={contact.title}
            onChange={(event) => update({ title: event.target.value })}
            className={inputClassName}
          />
        </Field>
      </div>

      <div className='grid gap-4 sm:grid-cols-2'>
        <Field label='Phone'>
          <input
            type='tel'
            value={contact.phone}
            onChange={(event) => update({ phone: event.target.value })}
            className={inputClassName}
          />
        </Field>
        <Field label='Email'>
          <input
            type='email'
            value={contact.email}
            onChange={(event) => update({ email: event.target.value })}
            className={inputClassName}
          />
        </Field>
      </div>

      <Field label='Website'>
        <input
          value={contact.url}
          onChange={(event) => update({ url: event.target.value })}
          placeholder='https://example.com'
          className={inputClassName}
        />
      </Field>
    </div>
  );
}
