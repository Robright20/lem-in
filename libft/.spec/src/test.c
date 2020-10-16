/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   test.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: fokrober <fokrober@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/11 10:20:24 by fokrober          #+#    #+#             */
/*   Updated: 2020/10/16 04:17:09 by fokrober         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "test.h"

/* 
**		[Libft testing]
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
#elif TEST9
	ft_strsub_test();
#elif TEST10
	ft_bzero_test();
#endif
	return (0);
}
