/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   parser.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: bob <fokrober@student.1337.ma>             +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/22 12:44:44 by bob               #+#    #+#             */
/*   Updated: 2020/10/17 02:37:50 by fokrober         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "lem_in.h"

int		x_isalpha(char *s, char *end)
{
	int		i;
	int		j;

	i = 0;
	if (s == NULL)
		return (FALSE);
	while (s[i])
	{
		j = -1;
		while (end[++j])
		{
			if (end[j] == s[i])
				return (i);
		}
		if (s[i] > 32 && s[i] < 127)
			i++;
		else
			return (FALSE);
	}
	return (i);
}

int		isnumber(char *s, char *end)
{
	int		i;
	int		j;

	i = 0;
	if (s == NULL)
		return (FALSE);
	i = (s[i] == '+' || s[i] == '-');
	while (s[i] && i < 20)
	{
		j = -1;
		while (end[++j])
		{
			if (end[j] == s[i])
				return (i);
		}
		if (!(s[i] >= '0' && s[i] <= '9'))
			return (FALSE);
		i++;
	}
	if (i == 20 && s[0] != '1')
		return (FALSE);
	return (i);
}

int		check_ants(t_env *env, char *line)
{
	if (isnumber(line, SPACE))
		env->ants = ft_atoi(line);
	else
		return (INVALID_DATA);
	if (!env->ants)
		return (INVALID_SIZE);
	if (env->ants < 0)
		return (INVALID_DATA);
	return (FALSE);
}

int		farmline(t_env *env, char **line, int *type)
{
	static int	pos;
	static int	jump;
	int			start;
	int			len;

	pos = jump;
	start = pos;
	if (env->farm[start] == '\0')
		return (FALSE);
	while (env->farm[pos] && env->farm[pos] != '\n')
		pos += 1;
	jump = pos + 1;
	len = pos - start;
	if (len && ft_strnequ("##start", &env->farm[start], len))
		(void)((*type < 0 ? (*type = START) : 0)
				|| farmline(env, line, type));
	else if (len && ft_strnequ("##end", &env->farm[start], len))
		(void)((*type < 0 ? (*type = END) : 1)
				&& farmline(env, line, type));
	else if (env->farm[start] == '#')
		farmline(env, line, type);
	else if (!(*line = ft_strsub(env->farm, start, len)))
		return (-1);
	return (pos);
}

int		parser(t_env *env)
{
	char	*line;
	int		ret;
	int		type;
	int		pos;

	ret = env ? OK : SYS_ERROR;
	type = -1;
	line = NULL;
	while ((!ret && (pos = farmline(env, &line, &type)) > 0) && line)
	{
		if (env->ants && (ret = get_data(env, line, type)))
		{
			env->len = (ret == INVALID_LINE) ? pos : 0;
			break ;
		}
		if (!env->ants && (ret = check_ants(env, line))
				> INVALID_SIZE)
			break ;
		type = -1;
		ft_memdel((void**)&line);
	}
	return (pos < 0 ? pos : ret);
}
