#include "test.h"

void	ft_memalloc_test(size_t size)
{
	char buff[20];
	size_t i = -1;
	char *k = malloc(size);
	while (k && ++i < size)
		k[i] = 'a' + (i % 26);
	sprintf(buff, "[%p] ", k);
	ft_putstr(buff);
	print_memory(k, size);
	free(k);
	char *s = ft_memalloc(size);
	sprintf(buff, "[%p] ", s);
	ft_putstr(buff);
	print_memory(s, size);
	free(s);
}
