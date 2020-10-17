/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   libft.h                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mzaboub <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/03/29 23:32:55 by mzaboub           #+#    #+#             */
/*   Updated: 2020/10/17 02:36:10 by fokrober         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef LIBFT_H
# define LIBFT_H
# include <stddef.h>
# define RED "\033[31m"
# define GREEN "\033[32m"
# define YELLOW "\033[93m"
# define EOC "\033[0m"

void	ft_putstr(char const *str);
void	ft_putnbr(int n);
void	ft_putendl_fd(char *s, int fd);
int		ft_strnequ(char const *s1, char const *s2, size_t n);
int		ft_strequ(char const *s1, char const *s2);
char	*ft_strchr(char const *s1, int c);
int		ft_atoi(const char *str);
void	*ft_memalloc(size_t size);
void	*ft_memcpy(void *dst, const void *src, size_t n);
void	ft_memdel(void **ap);
char	*ft_strsub(char const *s, unsigned int start, size_t len);
void	ft_bzero(void *s, size_t n);
#endif
