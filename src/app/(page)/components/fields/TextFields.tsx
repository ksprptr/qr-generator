'use client';

import { FieldsProps } from '@/app/(page)/types/qr.types';

import Field, { inputClassName } from '../shared/Field';

/**
 * Component representing the text form fields
 */
export default function TextFields({ form, setForm }: FieldsProps) {
  return (
    <Field label='Text'>
      <textarea
        rows={4}
        value={form.text}
        onChange={(event) => setForm((prev) => ({ ...prev, text: event.target.value }))}
        placeholder='Any text…'
        className={inputClassName}
      />
    </Field>
  );
}
