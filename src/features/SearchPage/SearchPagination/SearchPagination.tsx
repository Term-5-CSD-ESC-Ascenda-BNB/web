import { SearchParamsSchema } from '@/schemas/searchParams';
import { Center, Pagination, type PaginationProps } from '@mantine/core';
import { useNavigate, useSearch } from '@tanstack/react-router';

interface SearchPaginationProps extends Omit<PaginationProps, 'total' | 'value' | 'onChange'> {
  totalPages: number;
}

export function SearchPagination({ totalPages, ...props }: SearchPaginationProps) {
  const search = useSearch({ from: '/search' });
  const navigate = useNavigate({});

  const result = SearchParamsSchema.safeParse(search);

  if (!result.success) {
    console.error('Invalid search parameters:', result.error);
    return null;
  }

  const page = result.data.page || 1;

  const handlePageChange = (newPage: number) => {
    // Update the search parameters with the new page number
    void navigate({
      to: '/search',
      search: {
        ...result.data,
        page: newPage,
      },
    });
  };

  return (
    <>
      <Center>
        <Pagination total={totalPages} value={page} onChange={handlePageChange} {...props} />
      </Center>
    </>
  );
}
