/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   test.h                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: fokrober <fokrober@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/11 10:32:26 by fokrober          #+#    #+#             */
/*   Updated: 2020/10/15 18:47:32 by fokrober         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef TEST_H
# define TEST_H
# include <stdio.h>
# include <limits.h>
# include <unistd.h>
# include <stdlib.h>
# include "libft.h"

void	ft_putstr_test(void);
void	ft_putnbr_test(void);
void	ft_putendl_fd_test(int fd);
void	ft_strnequ_test(void);
void	ft_atoi_test(void);
void	ft_memalloc_test(size_t size);
void	ft_memcpy_test(void);
void	ft_memdel_test(void);
void    print_memory(const void *addr, size_t size);
#endif
