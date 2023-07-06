FROM node:18.16.0-slim

WORKDIR /app

ENV TZ="Asia/Tokyo"
ENV LANG="ja_JP.UTF-8"

RUN chwon -R node:node /app ; \
    apt-get update -y ; \
    apt upgrade -y ; \
    apt-get install -y --no-install-recommends sudo \
    ; \
    \
    apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false;  \
    apt-get clean; \
    rm -rf /var/lib/apt/lists/* \
    ; \
    \
    usermod -aG sudo node \
    ; \
    \
    echo "" >> /etc/sudoers ; \
    echo "# Don't require password for sudo command for dev user" >> /etc/sudoers ; \
    echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER node

COPY package*.json /app/

CMD ["/bin/bash", "-c", "npm install && npm start"]
