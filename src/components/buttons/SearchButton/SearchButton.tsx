import { IconButton } from '@/components/IconButton/IconButton';
import { IconSearch } from '@tabler/icons-react';

export function SearchButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <IconButton icon={<IconSearch size={20} />} {...props} />;
}
