#include <unistd.h>
#include <stdlib.h>
#include <wait.h>

int		ft_putendl(int fd, char *s)
{
	int		len;

	len = 0;
	while (s[len])
		len++;
	write(fd, s, len);
	write(fd, "\n", 1);
	return (len + 1);
}

char	*ft_itoa(int number)
{
	unsigned int	u_number;
	int				len;
	char			sign;
	char			*buf;

	sign = number < 0;
	u_number = (1 - 2 * sign) * number;
	len = 0;
	while (++len && number / 10)
		number /= 10;
	len += sign;
	if (!(buf = malloc(len + 1)))
		return (NULL);
	buf[len] = 0;
	if (u_number == 0 || sign)
		buf[0] = sign ? '-' : '0';
	while (u_number > 0)
	{
		len--;
		buf[len] = u_number % 10 + '0';
		u_number /= 10;
	}
	return (buf);
}

int		main(void)
{
	int		fd1[2];
	pid_t	child;

	if (pipe(fd1) == -1)
	{
		ft_putendl(2, "ERROR");
		return (1);
	}
	child = fork();
	if (child < 0)
	{
		ft_putendl(2, "ERROR");
		return (1);
	}
	else if (child > 0)
	{
		ft_putendl(1, "Parent Process");
		close(fd1[0]);
		ft_putendl(fd1[1], "Hey form main.c");
		close(fd1[1]);
		wait(NULL);
		return (1);
	}
	else
	{
		execl("./server.js", "", ft_itoa(fd1[0]), ft_itoa(fd1[1]), (void*)NULL);
		return (1);
	}
	return (0);
}
