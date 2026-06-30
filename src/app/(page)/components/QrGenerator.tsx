'use client';

import { defaultForm, ERROR_LEVEL_OPTIONS } from '../data/qr.data';
import { ErrorLevel, QrType } from '../enums/qr.enums';
import { buildPayload } from '../helpers/qr.helpers';
import { QrFormProps } from '../types/qr.types';
import FieldsSelector from './FieldsSelector';
import Field, { inputClassName } from './shared/Field';
import QrResult from './shared/QrResult';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
  type: QrType;
}

/**
 * Component representing the QR generator
 */
export default function QrGenerator({ type }: Props) {
  const [form, setForm] = useState<QrFormProps>(defaultForm);

  const payload = buildPayload(type, form);

  return (
    <div className='grid gap-6 lg:grid-cols-[1fr_minmax(300px,380px)]'>
      {/* Inputs */}
      <motion.section
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className='flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8'>
        <FieldsSelector type={type} form={form} setForm={setForm} />

        {/* Error correction */}
        <div className='border-t border-zinc-200 pt-6'>
          <Field label='Error correction'>
            <select
              value={form.level}
              onChange={(event) => setForm((prev) => ({ ...prev, level: event.target.value as ErrorLevel }))}
              className={inputClassName}>
              {ERROR_LEVEL_OPTIONS.map((option) => (
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
        <QrResult payload={payload} level={form.level} />
      </div>
    </div>
  );
}
