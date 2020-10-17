/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   hashmap.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: bob <fokrober@student.1337.ma>             +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/25 23:35:28 by bob               #+#    #+#             */
/*   Updated: 2020/10/17 02:31:07 by fokrober         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "lem_in.h"

t_hash		*create_hash(size_t size)
{
	t_hash	*hash;
	size_t	i;

	hash = (t_hash*)malloc(sizeof(t_hash));
	if (hash)
		hash->tab = (t_node**)malloc(sizeof(t_node*) * size);
	if (!hash || !hash->tab)
		return (NULL);
	hash->size = size;
	i = -1;
	while (++i < size)
		hash->tab[i] = NULL;
	return (hash);
}

static int	hash_calc(t_hash *hash, char *key)
{
	size_t	result;
	size_t	tmp;
	int		prev;

	if (!key)
		return (-1);
	result = 0;
	prev = 1;
	while (*key)
	{
		tmp = ((*key * 0x80200802ULL) & 0x0884422110ULL);
		result += ((tmp * (key[1] + prev)) % hash->size);
		prev += *key;
		key++;
	}
	result = result >= hash->size ? result % hash->size : result;
	return (result);
}

t_node		*get_node(t_env *env, char *name)
{
	int		pos;
	t_node	*tmp;

	pos = hash_calc(env->hash, name);
	if (pos < 0)
		return (NULL);
	tmp = env->hash->tab[pos];
	while (tmp)
	{
		if (ft_strequ(tmp->name, name))
			return (tmp);
		tmp = tmp->next;
	}
	return (NULL);
}

int			save_node(t_env *env, char *name)
{
	int		pos;
	t_node	*tmp;
	t_node	*prev;

	if ((pos = hash_calc(env->hash, name)) < 0)
		return (pos);
	prev = env->hash->tab[pos];
	tmp = prev;
	while (tmp)
	{
		if (ft_strequ(tmp->name, name))
			return (OK);
		tmp = tmp->next;
	}
	if (!(tmp = (t_node*)malloc(sizeof(t_node))))
		return (SYS_ERROR);
	tmp->id = 0;
	tmp->name = name;
	tmp->links = NULL;
	tmp->lck = 0;
	tmp->next = prev;
	env->hash->tab[pos] = tmp;
	env->size += 1;
	return (OK);
}

int			save_link(t_env *env, char *link)
{
	t_node	*node1;
	t_node	*node2;
	char	*room2;
	int		ret;

	if (!(room2 = ft_strchr(link, '-')))
		return (INVALID_LINE);
	*room2 = '\0';
	node1 = get_node(env, link);
	node2 = get_node(env, room2 + 1);
	if (!node1 || !node2)
		return (INVALID_LINE);
	ret = OK;
	ret = add_edge(node1, node2);
	ret == OK ? (ret = add_edge(node2, node1)) : ret;
	return (ret);
}
