#include "test.h"

void	ft_bzero_test(void)
{
	char *src;
	int	i;

	src = malloc(10);
	if (!src)
		return ;
	i = -1;
	while (++i < 10)
		src[i] = 'A' + (i % 26);
	print_memory(src, 10);
	ft_bzero(src, 10);
	print_memory(src, 10);
}
