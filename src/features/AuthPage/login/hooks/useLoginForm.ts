import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { loginSchema } from '../schema';

export function useLoginForm() {
  return useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(loginSchema),
  });
}
