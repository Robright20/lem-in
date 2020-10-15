#include "test.h"

void	ft_memdel_test(void)
{
	char *old;
	char *new;
	int	i;

	old = malloc(10);
	if (!old)
		exit(EXIT_FAILURE);
	i = -1;
	while (++i < 10)
		old[i] = 'A' + (i % 26);
	print_memory(old, 10);
	ft_memdel((void**)&old);
	printf("[%p]\n", old);
	new = malloc(10);
	if (!new)
		exit(EXIT_FAILURE);
	print_memory(new, 10);
}
