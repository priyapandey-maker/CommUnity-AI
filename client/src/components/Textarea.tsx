import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ hasError = false, className = '', ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={5}
        {...props}
        aria-invalid={hasError}
        className={[
          'w-full rounded-xl bg-gray-900 border px-4 py-3 text-sm text-gray-100 placeholder-gray-600',
          'transition-colors duration-150 resize-none',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 focus:ring-offset-gray-950',
          hasError
            ? 'border-red-500/70 focus:ring-red-500'
            : 'border-gray-700 hover:border-gray-600',
          className,
        ].join(' ')}
      />
    );
  },
);

Textarea.displayName = 'Textarea';
export default Textarea;
