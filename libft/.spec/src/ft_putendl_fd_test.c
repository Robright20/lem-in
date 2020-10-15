#include "test.h"

void	ft_putendl_fd_test(int fd)
{
	ft_putendl_fd(NULL, fd);
	ft_putendl_fd("", fd);
	ft_putendl_fd("bonjour", fd);
}
