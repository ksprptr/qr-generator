'use client';

import { WIFI_ENCRYPTIONS, WifiEncryption } from '@/app/(page)/enums/qr.enums';
import { FieldsProps } from '@/app/(page)/types/qr.types';

import Field, { inputClassName } from '../shared/Field';

/**
 * Component representing the WiFi form fields
 */
export default function WifiFields({ form, setForm }: FieldsProps) {
  const { wifi } = form;

  return (
    <div className='space-y-4'>
      <Field label='Network name (SSID)'>
        <input
          value={wifi.ssid}
          onChange={(event) => setForm((prev) => ({ ...prev, wifi: { ...prev.wifi, ssid: event.target.value } }))}
          placeholder='My WiFi'
          className={inputClassName}
        />
      </Field>

      <div className='grid gap-4 sm:grid-cols-2'>
        <Field label='Security'>
          <select
            value={wifi.encryption}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                wifi: { ...prev.wifi, encryption: event.target.value as WifiEncryption },
              }))
            }
            className={inputClassName}>
            <option value={WIFI_ENCRYPTIONS.WPA}>WPA / WPA2 / WPA3</option>
            <option value={WIFI_ENCRYPTIONS.WEP}>WEP</option>
            <option value={WIFI_ENCRYPTIONS.NOPASS}>No password</option>
          </select>
        </Field>

        {wifi.encryption !== WIFI_ENCRYPTIONS.NOPASS && (
          <Field label='Password'>
            <input
              type='text'
              value={wifi.password}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, wifi: { ...prev.wifi, password: event.target.value } }))
              }
              placeholder='••••••••'
              className={inputClassName}
            />
          </Field>
        )}
      </div>

      <label className='flex cursor-pointer items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400'>
        <input
          type='checkbox'
          checked={wifi.hidden}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, wifi: { ...prev.wifi, hidden: event.target.checked } }))
          }
          className='h-4 w-4 rounded accent-indigo-500'
        />
        Hidden network
      </label>
    </div>
  );
}
