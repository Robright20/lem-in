#include "test.h"

void	ft_strnequ_test(void)
{
	printf("[%d]\n", ft_strnequ(NULL, NULL, 10));
	printf("[%d]\n", ft_strnequ(NULL, "", 10));
	printf("[%d]\n", ft_strnequ("", NULL, 10));
	printf("[%d]\n", ft_strnequ("bonjour", "bonjour a tous", 10));
	printf("[%d]\n", ft_strnequ("", "bonjour a tous", 10));
	printf("[%d]\n", ft_strnequ("bonjour", "", 10));
	printf("[%d]\n", ft_strnequ("", "", 10));
	printf("[%d]\n", ft_strnequ("b", "b", 10));
	printf("[%d]\n", ft_strnequ("bo", "bo", 10));
	printf("[%d]\n", ft_strnequ("bi", "bo", 10));
	printf("[%d]\n", ft_strnequ("bonjour", "bonjour", 10));
}
