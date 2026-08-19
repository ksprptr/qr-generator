'use client';

import { FieldsProps } from '@/app/(page)/types/qr.types';

import Field, { inputClassName } from '../shared/Field';

/**
 * Component representing the URL form fields
 **/
export default function UrlFields({ form, setForm }: FieldsProps) {
  return (
    <Field label='URL address'>
      <input
        type='text'
        inputMode='url'
        autoFocus
        value={form.url}
        onChange={(event) => setForm((prev) => ({ ...prev, url: event.target.value }))}
        placeholder='example.com or https://example.com'
        className={inputClassName}
      />
    </Field>
  );
}
