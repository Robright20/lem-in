# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: bob <fokrober@student.1337.ma>             +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2020/04/15 22:00:03 by bob               #+#    #+#              #
#    Updated: 2020/10/16 03:50:00 by fokrober         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

NAME = libft.a
SRC = ft_putstr.c ft_putnbr.c ft_putendl_fd.c ft_strnequ.c ft_strsub.c \
      ft_memcpy.c ft_memalloc.c ft_memdel.c ft_atoi.c ft_bzero.c 
HEADER = libft.h
OBJ = $(SRC:.c=.o)
ARFLAGS = rcsu
CFLAGS = -Wall -Wextra -Werror -c
CC = gcc
RED = \033[31m
GREEN = \033[32m
YELLOW = \033[93m
RESET = \033[0m

# **************************************************************************** #

all: $(NAME)

$(NAME): prompt $(OBJ) $(HEADER)
	@echo "\n\n$(GREEN) > $(NAME) built !\n$(RESET)"

prompt:
	@echo -n " > $(NAME) building"

%.o: %.c $(HEADER)
	@$(CC) $(CFLAGS) $< -o $@
	@ar $(ARFLAGS) $(NAME) $@
	@echo ".\c"

clean:
	@$(RM) $(OBJ)
	@echo "$(YELLOW) > libft: cleaned !\n$(RESET)"

fclean: clean
	@$(RM) $(NAME)
	@echo "$(RED) > $(NAME) deleted !\n$(RESET)"

re: fclean all
