# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: bob <fokrober@student.1337.ma>             +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2020/04/15 15:46:07 by bob               #+#    #+#              #
#    Updated: 2020/10/11 09:12:37 by fokrober         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

NAME = lem-in
SRC = $(addprefix src/, lem_in.c)
HEADER = $(addprefix include/, lem_in.h)
OBJ = $(SRC:.c=.o)
LFTDIR = ./libft
LFT = ./libft/libft.a
LDLIBS = -lft
LDFLAGS = -L$(LFTDIR)
CFLAGS = -Wall -Wextra -Werror -I./include
CC = gcc
RED = \033[31m
GREEN = \033[32m
YELLOW = \033[93m
RESET = \033[0m

all: $(LFT) $(NAME)

$(NAME): $(OBJ) $(HEADER)
	$(CC) $(CFLAGS) -o $(NAME) $(OBJ) $(LDFLAGS) $(LDLIBS) 
	@echo "⇾ building $(GREEN)lem-in$(RESET)"

$(LFT):
	@make -sC $(LFTDIR)

clean:
	@$(RM) $(OBJ)
	@echo "⇾ $(NAME) directory $(RED)cleaned$(RESET)"

fclean: clean
	@$(RM) $(NAME)
	@echo "⇾ $(NAME) executable $(RED)deleted$(RESET)"

re: fclean all

.PHONY: all clean fclean re
