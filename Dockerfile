ARG NODE_VERSION=18.18-alpine3.18

#### Base image ####
FROM node:${NODE_VERSION} AS base

WORKDIR /app

RUN apk add --no-cache \
  curl \
  python3 \
  make \
  g++

ARG USER_ID=1000
ARG USER_NAME=node

RUN chown -R ${USER_NAME}: /app

ENV TZ=Europe/Madrid
ENV NODE_ICU_DATA=node_modules/full-icu

#### Development image ####
FROM base AS development

ENV PATH="${PATH}:/usr/src/app/node_modules/.bin"
ENV PROMPT="%B%F{cyan}%n%f@%m:%F{yellow}%~%f %F{%(?.green.red[%?] )}>%f %b"

RUN apk add --no-cache zsh

RUN if [ ${USER_ID} -ne 1000 ]; then \
  apk add --no-cache shadow && \
  groupmod -g ${USER_ID} ${USER_NAME} && \
  usermod -u ${USER_ID} -g ${USER_ID} ${USER_NAME} && \
  apk del --purge shadow; \
  fi

#### Builder image ####
FROM development AS builder

USER root
RUN npm install -g pnpm
USER ${USER_NAME}

COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY prisma ./prisma/
RUN pnpm install 

COPY . .

RUN pnpm run build

#### Runtime image ####
FROM node:${NODE_VERSION} AS runtime

WORKDIR /app

USER ${USER_NAME}

USER root
RUN npm install -g pnpm
USER ${USER_NAME}

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

ENV NODE_ENV=production

EXPOSE 3124

CMD ["sh", "-c", "npx prisma db push && pnpm start:dev"]
