/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   test.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: fokrober <fokrober@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/11 10:20:24 by fokrober          #+#    #+#             */
/*   Updated: 2020/10/15 18:47:17 by fokrober         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "test.h"

//# include "ft_memcpy_test.c"
//# include "ft_memdel_test.c"
//# include "ft_strsub_test.c"
//# include "ft_bzero_test.c"
/* 
**		[Libft testing]
**
**
**	void	ft_putstr(char const *str);
**	void	ft_putnbr(int n);
**	void	ft_putendl(char *s, int fd);
**	int	ft_strnequ(char const *s1, char const *s2, size_t n);
**	int	ft_atoi(const char *str);
**	void	*ft_memalloc(size_t size);
**	void	*ft_memcpy(void *dst, const void *src, size_t n);
**	void	ft_memdel(void **ap);
**	char	*ft_strsub(char const *s, unsigned int start, size_t len);
**	void	ft_bzero(void *s, size_t n);
**
*/

int	main(int ac, char **av)
{
	(void)(ac && av);
#ifdef TEST1
	ft_putstr_test();
#elif TEST2
	ft_putnbr_test();
#elif TEST3
	ft_putendl_fd_test(1);
	ft_putendl_fd_test(2);
#elif TEST4
	ft_strnequ_test();
#elif TEST5
	ft_atoi_test();
#elif TEST6
	ft_memalloc_test(-1);
	ft_memalloc_test(0);
	ft_memalloc_test(40);
#elif TEST7
	ft_memcpy_test();
#elif TEST8
	ft_memdel_test();
#endif
	return (0);
}
