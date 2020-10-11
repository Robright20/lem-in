/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strsub.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: fokrober <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/04/12 00:37:46 by fokrober          #+#    #+#             */
/*   Updated: 2020/10/11 08:48:39 by fokrober         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdlib.h>

char	*ft_strsub(char const *s, unsigned int start, size_t len)
{
	char	*str;
	size_t	i;

	if (!s || !(str = (char *)malloc(len + 1)))
		return (NULL);
	i = 0;
	while (i < len)
	{
		str[i] = s[start];
		start++;
		i++;
	}
	str[len] = 0;
	return (str);
}
