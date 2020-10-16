#include "test.h"

void	ft_strsub_test(void)
{
	char *src;
	char *dst;
	int	i;

	src = malloc(10);
	if (!src)
		return ;
	i = -1;
	while (++i < 10)
		src[i] = 'A' + (i % 25);
	write(1, src, 10);
	puts(src);
	dst = ft_strsub(src, 3, 7);
	puts(dst);
}
