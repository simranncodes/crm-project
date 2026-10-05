import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Input from './ui/Input.jsx';
import Button from './ui/Button.jsx';
import api from '../api/axios.js';

const budgetOptions = [
  { value: '', label: 'Select a budget range' },
  { value: '<1000', label: 'Less than $1,000' },
  { value: '1000-5000', label: '$1,000 – $5,000' },
  { value: '5000-10000', label: '$5,000 – $10,000' },
  { value: '10000-50000', label: '$10,000 – $50,000' },
  { value: '50000+', label: '$50,000+' },
];

/**
 * Public lead capture form. Validates on the client with react-hook-form,
 * and relies on the server to re-validate every field (never trust the client).
 */
export default function LeadForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { budget: '' } });

  const onSubmit = async (formData) => {
    try {
      await api.post('/leads', { ...formData, PhoneNo: formData.PhoneNo.trim() });
      toast.success("Thanks! We've received your submission.");
      reset();
    } catch (error) {
      toast.error(error.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <Input
        label="Full Name"
        name="name"
        placeholder="Jane Doe"
        error={errors.name?.message}
        {...register('name', {
          required: 'Name is required',
          minLength: { value: 2, message: 'Name must be at least 2 characters' },
          maxLength: { value: 100, message: 'Name must be under 100 characters' },
        })}
      />

      <Input
        label="Email Address"
        name="email"
        type="email"
        placeholder="jane@company.com"
        error={errors.email?.message}
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}$/,
            message: 'Please provide a valid email address',
          },
        })}
      />

      <Input
        label="Phone Number"
        name="PhoneNo"
        type="tel"
        inputMode="numeric"
        placeholder="9876543210"
        error={errors.PhoneNo?.message}
        {...register('PhoneNo', {
          required: 'Phone number is required',
          pattern: {
            value: /^\d{10,15}$/,
            message: 'Phone number must be 10 to 15 digits',
          },
        })}
      />

      <div className="w-full">
        <label htmlFor="budget" className="mb-1.5 block text-sm font-medium text-slate-700">
          Budget Range
        </label>
        <select
          id="budget"
          className={`w-full rounded-xl border px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
            errors.budget ? 'border-red-400' : 'border-slate-300'
          }`}
          {...register('budget', { required: 'Please select a budget range' })}
        >
          {budgetOptions.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>}
      </div>

      <Input
        as="textarea"
        rows={4}
        label="Message"
        name="message"
        placeholder="Tell us a bit about your project…"
        error={errors.message?.message}
        {...register('message', {
          required: 'Message is required',
          minLength: { value: 10, message: 'Message must be at least 10 characters' },
          maxLength: { value: 1000, message: 'Message must be under 1000 characters' },
        })}
      />

      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Submit
      </Button>
    </form>
  );
}
