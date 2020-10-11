/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_atoi.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mzaboub <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/04/01 02:03:42 by mzaboub           #+#    #+#             */
/*   Updated: 2020/10/11 08:44:06 by fokrober         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

int	ft_atoi(const char *str)
{
	long long	nbr;
	int		signe;
	int		i;

	i = 0;
	signe = 1;
	nbr = 0;
	while ((str[i] < 14 && str[i] > 8) || str[i] == 32)
		i++;
	if (str[i] == '-')
		signe = -1;
	if (str[i] == '-' || str[i] == '+')
		i++;
	while (str[i] > 47 && str[i] < 58)
	{
		if (nbr > (nbr * 10 + (str[i] - '0')))
			return (signe > 0 ? -1 : 0);
		nbr = nbr * 10 + (str[i++] - '0');
	}
	return (nbr * signe);
}
