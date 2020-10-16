/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   lem_in.h                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: bob <fokrober@student.1337.ma>             +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/22 12:49:48 by bob               #+#    #+#             */
/*   Updated: 2020/10/16 05:28:17 by fokrober         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef LEM_IN_H
# define LEM_IN_H
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
# include <stdlib.h>
# include <libft.h>
# include <stdio.h>
# include <unistd.h>

typedef struct s_hash	t_hash;
typedef struct s_edge	t_edge;
typedef struct s_node	t_node;
typedef struct s_queue	t_queue;
typedef struct s_env	t_env;

struct			s_edge
{
	t_node	*child;
	int		flow;
	t_edge	*next;
};

struct			s_hash
{
	size_t	size;
	t_node	**tab;
};

struct			s_node
{
	int		id;
	char	*name;
	int		lck;
	t_edge	*links;
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
	int		*check;
	int		*dist;
	char	*farm;
	char	*start;
	char	*end;
	int 	len;
	int		sort;
	int		size;
	int		ret;
	int		ants;
	int		ant;
	int		nbpath;
	int		cost;
	t_hash	*hash;
	t_queue	*q;
};

t_env			*farmdata(void);
int				parser(t_env *env);
t_hash			*create_hash(size_t size);
int				save_node(t_env *env, char *name);
t_node			*get_node(t_env *env, char *name);
int				save_link(t_env *env, char *link);
int				get_data(t_env *env, char *line, int type);
#endif
