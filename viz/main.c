/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: fokrober <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/30 22:38:28 by fokrober          #+#    #+#             */
/*   Updated: 2020/10/31 10:54:16 by fokrober         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <wait.h>
#include <unistd.h>
#include <stdlib.h>

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

int		main(void)
{
	pid_t	child;
	int		fd[2];

	if (pipe(fd) < 0)
		return (1);
	child = fork();
	if (child < 0)
		ft_putendl(2, "error");
	else if (child > 0)
	{
		ft_putendl(1, "Parent Process");
		close(fd[0]);
		ft_putendl(fd[1], "hey!");
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
