FROM node

RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install zsh -y
RUN npm install -g ws && echo 'export NODE_PATH=$(npm root -g)' >> .profile

ENTRYPOINT ["/bin/zsh", "-l"]
