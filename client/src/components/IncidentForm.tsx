import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import Button from './Button';
import FormField from './FormField';
import ImageUpload from './ImageUpload';

/* ── Types ─────────────────────────────────────────────── */
export interface IncidentFormValues {
  description: string;
  location: string;
  image: File | null;
}

/* ── Validation rules ───────────────────────────────────── */
const RULES = {
  description: {
    required: 'Description is required.',
    minLength: { value: 20, message: 'Please provide at least 20 characters.' },
    maxLength: { value: 2000, message: 'Description must be under 2000 characters.' },
  },
  location: {
    required: 'Location is required.',
    minLength: { value: 3, message: 'Please enter a valid location.' },
  },
} as const;

/* ── Component ──────────────────────────────────────────── */
export default function IncidentForm() {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IncidentFormValues>({ mode: 'onTouched' });

  const descriptionValue = watch('description', '');

  const onSubmit = (data: IncidentFormValues) => {
    setIsSubmitting(true);
    const payload = { ...data, image: imageFile };
    // No API yet — log form data as instructed
    console.log('[IncidentForm] Submitted payload:', payload);
    setTimeout(() => setIsSubmitting(false), 800);
  };

  return (
    <form
      id="incident-form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8 space-y-7"
    >
      {/* ── Description ──────────────────────────────── */}
      <div className="relative">
        <Controller
          name="description"
          control={control}
          rules={RULES.description}
          defaultValue=""
          render={({ field }) => (
            <Textarea
              {...field}
              id="incident-description"
              label="Incident Description *"
              placeholder="e.g. A streetlight at the corner of Oak Ave and 5th St has been out for two weeks, creating a safety hazard at night…"
              rows={5}
              error={errors.description?.message}
              hint="Describe what happened — include as much detail as possible."
              fullWidth
            />
          )}
        />
        {/* Character counter — positioned below the textarea, right-aligned */}
        <span
          className={[
            'block text-right text-xs tabular-nums mt-1 pr-1',
            (descriptionValue?.length ?? 0) > 1900 ? 'text-amber-400' : 'text-gray-600',
          ].join(' ')}
        >
          {descriptionValue?.length ?? 0} / 2000
        </span>
      </div>

      {/* ── Location ─────────────────────────────────── */}
      <Controller
        name="location"
        control={control}
        rules={RULES.location}
        defaultValue=""
        render={({ field }) => (
          <Input
            {...field}
            id="incident-location"
            label="Location *"
            type="text"
            placeholder="e.g. Oak Ave & 5th St, Downtown"
            error={errors.location?.message}
            hint="Street address, neighbourhood, or landmark."
            fullWidth
          />
        )}
      />

      {/* ── Image Upload ─────────────────────────────── */}
      <FormField
        id="incident-image"
        label="Supporting Image"
        hint="Optional — attach a photo of the incident (JPG, PNG, WebP · max 5 MB)."
      >
        <ImageUpload onFileChange={setImageFile} />
      </FormField>

      {/* ── Actions ──────────────────────────────────── */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-gray-800">
        <Button
          id="incident-cancel-btn"
          type="button"
          variant="ghost"
          onClick={() => navigate('/')}
        >
          Cancel
        </Button>
        <Button
          id="incident-submit-btn"
          type="submit"
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg
                aria-hidden="true"
                className="w-4 h-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                />
              </svg>
              Submitting…
            </>
          ) : (
            'Submit Incident'
          )}
        </Button>
      </div>
    </form>
  );
}
