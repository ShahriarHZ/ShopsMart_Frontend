import { InputHTMLAttributes, forwardRef } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, id, ...rest }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="form-control w-full">
        <label htmlFor={inputId} className="label pb-1">
          <span className="label-text font-medium">{label}</span>
        </label>
        <input
          id={inputId}
          ref={ref}
          className={`input input-bordered w-full focus:outline-primary ${error ? 'input-error' : ''}`}
          {...rest}
        />
        {error && (
          <label className="label pt-1">
            <span className="label-text-alt text-error">{error}</span>
          </label>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
