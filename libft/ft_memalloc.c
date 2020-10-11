/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_memalloc.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: fokrober <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/04/07 18:25:21 by fokrober          #+#    #+#             */
/*   Updated: 2020/10/11 08:44:47 by fokrober         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdlib.h>

void	*ft_memalloc(size_t size)
{
	void	*ptr;
	size_t	i;

	if ((ptr = malloc(size)))
	{
		i = -1;
		while (++i < size)
			((char *)ptr)[i] = 0;
	}
	return (ptr);
}
