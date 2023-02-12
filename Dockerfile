# Base Layer (to Development)
FROM node:18-alpine as base

# Dev layer
FROM base as dev
RUN apk update && apk upgrade
RUN apk add --no-cache iputils

# CI layer
FROM dev as ci
WORKDIR /app
COPY . .

# Build layer
FROM ci as build
WORKDIR /app
RUN npm install -y