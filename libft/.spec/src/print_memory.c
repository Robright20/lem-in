#include <unistd.h>

void	base_co(const unsigned char *ptr, size_t i, size_t j, size_t size)
{
	int 		k;
	const char 	*base;

	base = "0123456789abcdef";
	while (i < 16 && i + j < size)
	{
		k = *(ptr + i + j);
		write(1, &base[(k / 16) % 16], 1);
		write(1, &base[(k % 16)], 1);
		if (i % 2 != 0)
			write(1, " ", 1);
		i++;
	}
	while (i < 16)
	{
		write(1, "  ", 2);
		if (i % 2 != 0)
			write(1, " ", 1);
		i++;
	}
}

void    print_memory(const void *addr, size_t size)
{
	size_t				i;
	size_t				j;
	int 				k;
	const unsigned char	*ptr;

	if (!addr && write(1, "(null)\n", 7))
		return ;
	j = 0;
	ptr = addr;
	while (j < size)
	{
		i = 0;
		base_co(ptr, i, j, size);
		while (i < 16 && i + j < size)
		{
			k = *(ptr + i + j);
			if (k >= 32 && k <= 122)
				write(1, &k, 1);
			else
				write(1, ".", 1);
			i++;
		}
		j += 16;
		write(1, "\n", 1);
	}
}
