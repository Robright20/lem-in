/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: fokrober <fokrober@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/30 22:38:28 by fokrober          #+#    #+#             */
/*   Updated: 2020/11/13 19:06:24 by fokrober         ###   ########.fr       */
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

void    print_memory(const void *addr, size_t size);

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

void	ft_putfarm(int fd, char *data, char *type)
{
		ft_putstr(fd, "##begin-");
		ft_putendl(fd, type);
		ft_putstr(fd, data);
		ft_putstr(fd, "##end-");
		ft_putendl(fd, type);
}

void	ft_putcmd(int fd, char *type, char *data)
{
		ft_putstr(fd, type);
		ft_putstr(fd, " ");
		ft_putendl(fd, data);
}

void	u_realloc(char **res, int pos, int ret)
{
	char	*tmp;
	int		i;

	tmp = (char *)malloc(2 + pos + ret);
	if (!tmp)
	{
		perror("u_realloc");
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

char	*get_node(char *line)
{
	char	*tmp;
	int		len;
	int		count;
	int		size;

	len = 0;
	count = 0;
	size = 0;
	while (line[len] && line[len] != '\n')
	{
		if (!count)
			size++;
		if (line[len] == ' ' || line[len] == '\t')
		{
			while (line[len] == ' ' || line[len] == '\t')
				len++;
			count++;
			continue ;
		}
		len++;
	}
	if (count == 2)
	{
		tmp = (char *)malloc(size + 1);
		if (!tmp)
			exit(EXIT_FAILURE);
		len = -1;
		while (++len < size)
			tmp[len] = line[len];
		tmp[len] = 0;
		return (tmp);
	}
	return (NULL);
}

char	*get_edge(char *line)
{
	int		len;
	int		dash_count;
	char	*tmp;
	int		i;

	len = 0;
	dash_count = 0;
	while (line[len] && line[len] != '\n')
	{
		if (line[len] == '-')
			dash_count += 1;
		len++;
	}
	if (dash_count == 1)
	{
		tmp = (char *)malloc(len);
		if (!tmp)
			exit(EXIT_FAILURE);
		i = -1;
		while (++i < len)
			tmp[i] = line[i];
		tmp[len] = 0;
		return (tmp);
	}
	return (NULL);
}

int		main(void)
{
	pid_t	child;
	int		fd[2];
	t_str	farm;
	char	*res;
	int		i;

	if (pipe(fd) < 0)
		return (1);
	farm = get_farm();
	child = fork();
	if (child < 0)
		ft_putendl(2, "error");
	else if (child > 0)
	{
		close(fd[0]);
		ft_putfarm(fd[1], farm.val, "farm");
		sleep(10);
		i = 0;
		while (farm.val[i])
		{
			if (farm.val[i] != '#')
			{
				if ((res = get_node(farm.val + i)))
				{
					ft_putcmd(fd[1], "##visited-node", res);
					free(res);
					sleep(3);
				}
				else if ((res = get_edge(farm.val + i)))
				{
					ft_putcmd(fd[1], "##visited-edge", res);
					free(res);
					sleep(3);
				}
			}
			while (farm.val[i] && farm.val[i] != '\n')
				i++;
			if (farm.val[i] == '\n')
				i++;
		}
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
