/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   get_data.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: bob <fokrober@student.1337.ma>             +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/26 16:49:07 by bob               #+#    #+#             */
/*   Updated: 2020/10/16 05:29:49 by fokrober         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "lem_in.h"

static int	pushdata(t_env *env, char *farm, int ret)
{
	char	*tmp;
	int		i;

	tmp = (char*)malloc(ret + env->len + 1);
	if (!farm || !env || !tmp)
		return (SYS_ERROR);
	i = -1;
	while (++i < (ret + env->len))
	{
		if (i < env->len)
			tmp[i] = env->farm[i];
		else
		{
			tmp[i] = *farm;
			farm++;
		}
	}
	free(env->farm);
	env->farm = tmp;
	env->len += ret;
	tmp[env->len] = 0;
	return (OK);
}

t_env		*farmdata(void)
{
	t_env	*env;
	int		ret;
	char	*buf;

	env = (t_env*)ft_memalloc(sizeof(t_env));
	buf = (char*)malloc(BUFFER_SIZE);
	if (!env || !buf)
		return (NULL);
	while ((ret = read(STDIN, buf, BUFFER_SIZE)) > 0)
	{
		if (pushdata(env, buf, ret))
			return (NULL);
		ft_bzero(buf, BUFFER_SIZE);
	}
	ft_memdel((void**)&buf);
	return (env);
}
