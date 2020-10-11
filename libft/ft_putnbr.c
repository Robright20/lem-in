/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_putnbr.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: fokrober <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/04/06 19:09:19 by fokrober          #+#    #+#             */
/*   Updated: 2020/10/11 08:59:01 by fokrober         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <unistd.h>
#define MIN_INT -2147483648

void	ft_putnbr(int n)
{
	char	digit;

	if (n == MIN_INT)
	{
		ft_putnbr(-214748364);
		n = 8;
	}
	n < 0 ? (n *= -1 * write(1, "-", 1)) : 0;
	if (n < 10 && (digit = '0' + n))
		write(1, &digit, 1);
	else if (n >= 10)
	{
		ft_putnbr(n / 10);
		ft_putnbr(n % 10);
	}
}
