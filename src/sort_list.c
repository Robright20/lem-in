/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   sort_list.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: bob <fokrober@student.1337.ma>             +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/07/06 09:36:15 by bob               #+#    #+#             */
/*   Updated: 2020/10/17 01:56:11 by fokrober         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "lem_in.h"

static t_edge	*get_tail(t_edge *head)
{
	t_edge	*tmp;

	tmp = head;
	while (head)
	{
		tmp = head;
		head = head->next;
	}
	return (tmp);
}

static t_edge	*pivot(t_env *env, t_edge *head, t_edge *end, t_edge **tail)
{
	t_edge	**tmp;
	t_edge	*cur;

	tmp = &head;
	cur = head;
	*tail = end;
	while (cur != end)
	{
		if (env->dist[cur->to->id] > env->dist[end->to->id])
		{
			*tmp = cur->next;
			(*tail)->next = cur;
			*tail = cur;
			(*tail)->next = NULL;
			cur = *tmp;
			continue ;
		}
		tmp = &cur->next;
		cur = cur->next;
	}
	return (head);
}

static t_edge	*sort_recur(t_edge *head, t_edge *end, t_env *env)
{
	t_edge	*tail;
	t_edge	*tmp;

	if (!head || head == end)
		return (head);
	head = pivot(env, head, end, &tail);
	if (head == end)
		head->next = sort_recur(head->next, tail, env);
	else
	{
		tmp = head;
		while (tmp->next != end)
			tmp = tmp->next;
		tmp->next = NULL;
		head = sort_recur(head, tmp, env);
		end->next = sort_recur(end->next, tail, env);
		tmp = get_tail(head);
		tmp->next = end;
	}
	return (head);
}

void			sort_edges(t_edge **head, t_env *env)
{
	if (!head || !*head)
		return ;
	*head = sort_recur(*head, get_tail(*head), env);
}
