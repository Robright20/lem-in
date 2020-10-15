#include "test.h"

void	ft_memcpy_test(void)
{
	char *src;
	char *dst;
	int	i;

	src = malloc(10);
	if (!src)
		return ;
	i = -1;
	while (++i < 10)
		src[i] = 'A' + (i % 26);
	print_memory(src, 10);
	dst = malloc(10);
	ft_memcpy(dst, src, 10);
	print_memory(dst, 10);
}
