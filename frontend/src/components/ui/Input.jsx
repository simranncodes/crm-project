import { forwardRef } from 'react';

/**
 * Reusable form input with label, error message, and forwarded ref
 * so it plugs directly into react-hook-form's register().
 */
const Input = forwardRef(({ label, error, as = 'input', className = '', ...props }, ref) => {
  const Component = as;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={props.id || props.name} className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <Component
        ref={ref}
        id={props.id || props.name}
        className={`w-full rounded-xl border px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
          error ? 'border-red-400' : 'border-slate-300'
        } ${className}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${props.name}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${props.name}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
