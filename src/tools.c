/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   queue_tools.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: bob <fokrober@student.1337.ma>             +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/08/05 17:12:40 by bob               #+#    #+#             */
/*   Updated: 2020/10/17 02:26:53 by fokrober         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "lem_in.h"

int		enqueue_node(t_queue *q, t_node *elem)
{
	t_node	*prev;

	if (!q->start)
	{
		q->start = elem;
		q->back = elem;
		q->front = elem;
	}
	else if (q->back)
	{
		prev = (t_node *)q->back;
		prev->next = elem;
		q->back = elem;
		if (!q->front)
			q->front = q->back;
	}
	return (TRUE);
}

t_node	*dequeue_node(t_queue *q)
{
	t_node	*node;

	node = q->front;
	if (q->front == q->back)
		q->front = NULL;
	else if (node)
		q->front = node->next;
	return (node);
}

int		set_flow(t_node **nodes, int from, int to, int val)
{
	t_edge	*edge;

	edge = nodes[from]->links;
	while (edge)
	{
		if (edge->to->id == to)
		{
			edge->flow = val;
			break ;
		}
		edge = edge->next;
	}
	return (TRUE);
}

int		add_edge(t_node *node, t_node *to)
{
	t_edge	*edge;
	t_edge	**prev;

	edge = node->links;
	prev = &node->links;
	while (edge)
	{
		if (edge->to == to)
			return (OK);
		prev = &edge->next;
		edge = edge->next;
	}
	edge = (t_edge*)malloc(sizeof(t_edge));
	if (!edge)
		return (SYS_ERROR);
	edge->to = to;
	edge->flow = 0;
	edge->next = NULL;
	*prev = edge;
	return (OK);
}
