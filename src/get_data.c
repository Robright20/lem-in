/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   get_data.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: bob <fokrober@student.1337.ma>             +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/26 16:49:07 by bob               #+#    #+#             */
/*   Updated: 2020/10/17 02:37:24 by fokrober         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "lem_in.h"

static int	save_rooms(t_env *env, char *line, int type)
{
	int		i;
	char	*tmp;

	i = 0;
	while (line[i] && line[i] != ' ')
		i++;
	if (!(tmp = ft_strsub(line, 0, i)))
		return (SYS_ERROR);
	type == START ? (env->start = tmp) : 0;
	type == END ? (env->end = tmp) : 0;
	return (save_node(env, tmp));
}

static int	check_rooms(char *s)
{
	int		res[3];
	int		pos;
	int		i;

	pos = 0;
	i = -1;
	ft_bzero(res, 3 * sizeof(int));
	while (s[++i] && pos < 5)
	{
		if (!pos && s[0] != 'L')
			res[pos] = x_isalpha(s, SPACE);
		if (pos && pos % 2 == 0)
			res[pos / 2] = isnumber(&s[i], SPACE);
		if (!pos || !(pos % 2))
		{
			if (!res[pos ? pos / 2 : pos])
				return (FALSE);
			i += res[pos ? pos / 2 : pos];
			pos += 1;
		}
		if ((pos && pos % 2) && (s[i] == ' ' || s[i] == '\t'))
			pos += (s[i + 1] != ' ' && s[i + 1] != '\t');
	}
	return (res[0] && (res[1] && res[2]));
}

int			get_data(t_env *env, char *line, int type)
{
	static int	prev;
	int			ret;

	if (!env->hash && !(env->hash = create_hash(HASH_SIZE)))
		return (SYS_ERROR);
	if (!prev)
	{
		if (check_rooms(line))
			return (save_rooms(env, line, type));
		ret = save_link(env, line);
		prev = !ret;
		return (!prev ? INVALID_LINE : ret);
	}
	return (save_link(env, line));
}

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
