import { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';

interface ImageUploadProps {
  onFileChange: (file: File | null) => void;
  hasError?: boolean;
}

const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const ACCEPTED_TYPES = { 'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif'] };

export default function ImageUpload({ onFileChange, hasError = false }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dropError, setDropError] = useState<string | null>(null);

  const onDrop = useCallback(
    (accepted: File[], rejected: FileRejection[]) => {
      setDropError(null);

      if (rejected.length > 0) {
        const code = rejected[0].errors[0].code;
        if (code === 'file-too-large') {
          setDropError(`File exceeds ${MAX_SIZE_MB} MB limit.`);
        } else {
          setDropError('Only image files are accepted.');
        }
        return;
      }

      if (accepted.length === 0) return;

      const file = accepted[0];
      setFileName(file.name);
      onFileChange(file);

      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    },
    [onFileChange],
  );

  const handleRemove = () => {
    setPreview(null);
    setFileName(null);
    setDropError(null);
    onFileChange(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: MAX_SIZE_BYTES,
    multiple: false,
  });

  /* ── Preview state ──────────────────────────────── */
  if (preview) {
    return (
      <div className="relative rounded-2xl overflow-hidden border border-gray-700 bg-gray-900">
        <img
          src={preview}
          alt="Incident preview"
          className="w-full max-h-72 object-cover"
        />
        {/* Overlay bar */}
        <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-4 py-2.5 bg-gray-950/80 backdrop-blur-sm border-t border-gray-800">
          <span className="text-xs text-gray-400 truncate max-w-[60%]">{fileName}</span>
          <button
            type="button"
            id="image-upload-remove-btn"
            onClick={handleRemove}
            className="text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    );
  }

  /* ── Drop zone ──────────────────────────────────── */
  return (
    <div>
      <div
        {...getRootProps()}
        id="image-upload-dropzone"
        className={[
          'flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-10 cursor-pointer transition-all duration-200 text-center',
          isDragActive
            ? 'border-indigo-500 bg-indigo-900/10 scale-[1.01]'
            : hasError || dropError
            ? 'border-red-500/60 bg-red-900/5 hover:border-red-400'
            : 'border-gray-700 bg-gray-900/40 hover:border-indigo-600 hover:bg-indigo-900/5',
        ].join(' ')}
        aria-label="Image upload drop zone"
      >
        <input {...getInputProps()} id="image-upload-input" />

        {/* Upload icon */}
        <div
          className={[
            'w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
            isDragActive ? 'bg-indigo-600/20' : 'bg-gray-800',
          ].join(' ')}
        >
          <svg
            aria-hidden="true"
            className={`w-6 h-6 ${isDragActive ? 'text-indigo-400' : 'text-gray-500'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
        </div>

        {isDragActive ? (
          <p className="text-sm font-medium text-indigo-400">Drop the image here…</p>
        ) : (
          <>
            <div>
              <p className="text-sm font-medium text-gray-300">
                Drag & drop an image, or{' '}
                <span className="text-indigo-400 underline underline-offset-2">browse</span>
              </p>
              <p className="text-xs text-gray-600 mt-1">
                JPG, PNG, WebP, GIF · max {MAX_SIZE_MB} MB
              </p>
            </div>
          </>
        )}
      </div>

      {dropError && (
        <p role="alert" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
          <svg aria-hidden="true" className="w-3.5 h-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 9a1 1 0 0 0 0 2v3a1 1 0 0 0 2 0v-3a1 1 0 0 0-1-1H9z" clipRule="evenodd" />
          </svg>
          {dropError}
        </p>
      )}
    </div>
  );
}
