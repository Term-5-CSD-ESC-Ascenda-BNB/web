import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { registerSchema } from './registerSchema';

export function useRegisterForm() {
  return useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    },
    validate: zodResolver(registerSchema),
  });
}
