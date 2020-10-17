/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   lem_in.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: bob <fokrober@student.1337.ma>             +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/22 12:40:55 by bob               #+#    #+#             */
/*   Updated: 2020/10/17 02:43:47 by fokrober         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "lem_in.h"

static t_node	**chrooms_to_nodes(t_env *env)
{
	t_node	**nodes;
	t_node	*node;
	int		at;
	size_t	i;

	if (!(nodes = (t_node**)malloc(env->size * sizeof(t_node*))))
		return (NULL);
	nodes[START] = get_node(env, env->start);
	nodes[END] = get_node(env, env->end);
	i = -1;
	at = END;
	while (++i < env->hash->size)
	{
		node = env->hash->tab[i];
		while (node)
		{
			if (node != nodes[END] && node != nodes[START])
			{
				nodes[++at] = node;
				node->id = at;
			}
			node = node->next;
		}
	}
	return (nodes);
}

static void		begin_with_end(t_node **nodes, t_env *env)
{
	t_edge	*tmp;

	env->sort = 1;
	tmp = nodes[END]->links;
	while (tmp)
	{
		sort_edges(&tmp->to->links, env);
		tmp = tmp->next;
	}
}

static t_node	**init(t_node **nodes, t_env *env)
{
	int		i;

	nodes = chrooms_to_nodes(env);
	ft_memdel((void**)&env->hash->tab);
	ft_memdel((void**)&env->hash);
	if (!env || !nodes)
		exit(EXIT_FAILURE);
	env->next = (int *)malloc(env->size * sizeof(int));
	env->check = (int *)malloc(env->size * sizeof(int));
	env->dist = (int*)malloc(env->size * sizeof(int));
	env->prev = (int*)malloc(env->size * sizeof(int));
	if (!env->next || !env->prev || !env->dist || !env->check)
		exit(EXIT_FAILURE);
	i = -1;
	nodes[END]->id = END;
	env->q = ft_memalloc(sizeof(t_queue));
	while (++i < env->size)
	{
		env->dist[i] = i == 1 ? 0 : INT_MAX;
		env->next[i] = FALSE;
		env->check[i] = FALSE;
		env->prev[i] = -1;
	}
	begin_with_end(nodes, env);
	return (nodes);
}

int				main(void)
{
	t_node	**nodes;
	t_env	*env;
	int		ret;

	env = farmdata();
	if ((ret = parser(env)))
	{
		(ret == INVALID_DATA) ? write(STDOUT, "ERROR", 5) :
			write(STDOUT, env->farm, env->len);
		write(STDOUT, "\n", 1);
		return (ret);
	}
	if (!env->start || !env->end)
		return (write(STDOUT, "ERROR\n", 6));
	nodes = init(NULL, env);
	return (ret);
}
