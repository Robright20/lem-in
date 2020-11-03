/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: fokrober <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/30 22:38:28 by fokrober          #+#    #+#             */
/*   Updated: 2020/11/03 19:08:21 by fokrober         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <wait.h>
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>
#define BUFFER_SIZE 10

typedef struct	s_str
{
	char	*val;
	size_t	len;
}				t_str;

int		ft_putstr(int fd, char *s)
{
	int		len;

	len = 0;
	while (s[len])
		len++;
	write(fd, s, len);
	return (len + 1);
}

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

void	ft_putdata(int fd, char *data, char *type)
{
		ft_putstr(fd, "##begin-");
		ft_putendl(fd, type);
		ft_putstr(fd, data);
		ft_putstr(fd, "##end-");
		ft_putendl(fd, type);
}

void	u_realloc(char **res, int pos, int ret)
{
	char	*tmp;
	int		i;

	tmp = (char *)malloc(2 + pos + ret);
	if (!tmp)
	{
		perror("update result");
		exit(EXIT_FAILURE);
	}
	i = -1;
	while (++i < pos + 1)
		tmp[i] = (*res)[i];
	tmp[1 + pos + ret] = 0;
	if (pos > 0)
		free(*res);
	*res = tmp;
}

t_str	get_farm(void)
{
	char	*buf;
	t_str	res;
	int		i;
	int		ret;

	buf = (char *)malloc(BUFFER_SIZE);
	if (!buf)
	{
		perror("get_farm");
		exit(EXIT_FAILURE);
	}
	res.len = -1;
	while ((ret = read(STDIN_FILENO, buf, BUFFER_SIZE)) > 0)
	{
		u_realloc(&res.val, res.len, ret);
		i = -1;
		while (++i < ret)
			res.val[++res.len] = buf[i];
	}
	return (res);
}

int		main(void)
{
	pid_t	child;
	int		fd[2];
	t_str	farm;

	if (pipe(fd) < 0)
		return (1);
	farm = get_farm();
	child = fork();
	if (child < 0)
		ft_putendl(2, "error");
	else if (child > 0)
	{
		close(fd[0]);
		ft_putdata(fd[1], farm.val, "farm");
		wait(NULL);
	}
	else
	{
		close(fd[1]);
		dup2(fd[0], STDIN_FILENO);
		execl("./server.js", "", (void*)NULL);
	}
	close(fd[0]);
	close(fd[1]);
	return (0);
}
