/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_memcpy.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: fokrober <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/04/15 16:10:32 by fokrober          #+#    #+#             */
/*   Updated: 2020/10/11 08:56:32 by fokrober         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stddef.h>

void	*ft_memcpy(void *dst, const void *src, size_t n)
{
	char		*d;
	const char	*s;

	d = (char*)dst;
	s = (const char*)src;
	if (n == 0 || dst == src)
		return (dst);
	while (n--)
		*d++ = *s++;
	return (dst);
}
