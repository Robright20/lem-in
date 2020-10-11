/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   lem_in.h                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: bob <fokrober@student.1337.ma>             +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/22 12:49:48 by bob               #+#    #+#             */
/*   Updated: 2020/10/10 19:53:13 by fokrober         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef LEM_IN_H
# define LEM_IN_H
# include <stdlib.h>
# define STDIN 0
# define STDOUT 1
# define TRUE 1
# define FALSE 0
# define INVALID_SIZE 1
# define INVALID_LINE 2
# define INVALID_DATA 3
# define SYS_ERROR -1
# define OK 0
# define KO 1
# define START 0
# define END 1
# define COMMENT 2
# define BUFFER_SIZE 100000
# define HASH_SIZE 100000
# define MAX_LLONG 18446744073709551615
# define SPACE " \t"

typedef struct s_hash	t_hash;
typedef struct s_edge	t_edge;
typedef struct s_node	t_node;
typedef struct s_bak	t_bak;
typedef struct s_queue	t_queue;
typedef struct s_env	t_env;

struct			s_edge
{
	t_node	*child;
	int	weight;
	t_edge	*next;
};

struct			s_hash
{
	size_t	size;
	t_node	**tab;
};

struct			s_node
{
	char	*name;
	int	index;
	int	lock;
	int	level;
	int	weight;
	t_edge	*neighbrs;
	t_node	*next;
};

struct			s_queue
{
	void	*start;
	void	*back;
	void	*front;
};

struct			s_env
{
	int 	*prev;
	int 	*next;
	int	*check;
	int	*dist;
	char	*farm;
	char	*start;
	char	*end;
	int 	len;
	int	sort;
	int	size;
	int	ret;
	int	ants;
	int	ant;
	int	nbpath;
	int	cost;
	t_hash	*hash;
	t_queue	*q;
};

/*
** int			parser(t_env *env);
** t_hash		*create_hash(size_t size);
** int			save_node(t_env *env, char *name);
** t_node		*get_node(t_env *env, char *name);
** int			save_link(t_env *env, char *link);
** int			get_data(t_env *env, char *line, int type);
** int			isnumber(char *s, char *end);
** int			x_isalpha(char *s, char *end);
** int			enqueue_node(t_queue *q, t_node *elem);
** t_node		*dequeue_node(t_queue *q);
** void			sort_edges(t_edge **head, t_env *env);
** int			add_edge(t_node *node, t_node *to);
** int			remove_edge(t_node *from, t_node *to);
** void			nodeinfo(t_node *node, t_env *env);
** void			pprint(t_node **nodes, t_env *env);
** void			solve(t_node **nodes, t_env *env);
** int			count_path(t_node **nodes, t_env *env);
** int			count_leafnodes(t_node **nodes);
** void			all_paths(t_node **nodes, t_env *env);
** int			set_flow(t_node **nodes, int from, int to, int val);
** int			locktree(t_node **nodes, t_env *env, int at);
** int			pathfinder(t_node **nodes, t_env *env);
** int			rmdead(t_node **nodes, t_env *env);
** void			soft_reset(t_env *env, int state);
** t_env		*farmdata(void);
** void			optimization(t_node **nodes, t_env *env);
*/
#endif
