FROM node

RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install zsh -y

ENTRYPOINT ["/bin/zsh", "-l"]
