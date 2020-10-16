# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: fokrober <fokrober@student.1337.ma>        +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2020/10/11 12:14:34 by fokrober          #+#    #+#              #
#    Updated: 2020/10/16 04:17:49 by fokrober         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

NAME = test
HEADER = $(addprefix include/, test.h libft.h)
SRC = $(addprefix src/, test.c print_memory.c ft_memalloc_test.c \
      ft_putstr_test.c ft_putnbr_test.c ft_putendl_fd_test.c ft_strnequ_test.c\
      ft_atoi_test.c ft_memcpy_test.c ft_memdel_test.c ft_strsub_test.c \
	  ft_bzero_test.c)
OBJ = $(SRC:.c=.o)
CFLAGS = -Wall -Wextra -Werror -I./include -D TEST$(CASE)
LDLIBS = -lft
LDFLAGS = -L../
CC = gcc
RED = \033[31m
GREEN = \033[32m
YELLOW = \033[93m
RESET = \033[0m

# **************************************************************************** #

all: prompt $(NAME)

$(NAME): $(OBJ) $(HEADER)
	@$(CC) -o $@ $(OBJ) $(LDFLAGS) $(LDLIBS)
	@echo "\n\n$(GREEN) > $(NAME) built !\n$(RESET)"

prompt:
	@echo -n " > $(NAME) building"

%.o: %.c $(HEADER)
	@$(CC) -c $< -o $@ $(CFLAGS)
	@echo ".\c"

clean:
	@$(RM) $(OBJ)
	@echo "$(YELLOW) > specs : cleaned !\n$(RESET)"

fclean: clean
	@$(RM) $(NAME)
	@echo "$(RED) > $(NAME) deleted !\n$(RESET)"

re: fclean all

.PHONY: all clean fclean re prompt
