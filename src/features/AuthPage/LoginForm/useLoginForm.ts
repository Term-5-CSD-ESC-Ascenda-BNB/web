import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { loginSchema } from './loginSchema';

export function useLoginForm() {
  return useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(loginSchema),
  });
}
