'use client';

import { defaultForm, ERROR_LEVEL_OPTIONS, SIZE_OPTIONS } from '../data/qr.data';
import { ErrorLevel, QrType } from '../enums/qr.enums';
import { buildPayload } from '../helpers/qr.helpers';
import { QrFormProps } from '../types/qr.types';
import FieldsSelector from './FieldsSelector';
import Field, { inputClassName } from './shared/Field';
import QrResult from './shared/QrResult';
import { motion } from 'motion/react';
import { useState } from 'react';

interface Props {
  type: QrType;
}

/**
 * Component representing the QR generator
 **/
export default function QrGenerator({ type }: Props) {
  const [form, setForm] = useState<QrFormProps>(defaultForm);

  const payload = buildPayload(type, form);
  const levelHint = ERROR_LEVEL_OPTIONS.find((option) => option.value === form.level)?.hint;
  const sizeHint = SIZE_OPTIONS.find((option) => option.value === form.size)?.hint;

  return (
    <div className='grid gap-6 lg:grid-cols-[1fr_minmax(300px,380px)]'>
      {/* Inputs */}
      <motion.section
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className='flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-900'>
        <FieldsSelector type={type} form={form} setForm={setForm} />

        {/* Output settings */}
        <div className='grid gap-4 border-t border-zinc-200 pt-6 sm:grid-cols-2 dark:border-zinc-800'>
          <Field label='Error correction' hint={levelHint}>
            <select
              value={form.level}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, level: event.target.value as ErrorLevel }))
              }
              className={inputClassName}>
              {ERROR_LEVEL_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label='Export size' hint={sizeHint}>
            <select
              value={form.size}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, size: Number(event.target.value) }))
              }
              className={inputClassName}>
              {SIZE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </motion.section>

      {/* Result */}
      <div className='self-start lg:sticky lg:top-6'>
        <QrResult payload={payload} level={form.level} size={form.size} />
      </div>
    </div>
  );
}
