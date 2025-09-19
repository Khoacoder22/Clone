# Stage 1: Build dependencies and source
FROM node:20-alpine AS builder

RUN apk add --no-cache curl

WORKDIR /server

RUN npm install -g yarn@3.2.1
RUN corepack enable
COPY package.json yarn.lock .yarnrc.yml ./

RUN yarn install --frozen-lockfile

COPY . .

# Stage 2: Final runtime image
FROM node:20-alpine

RUN apk add --no-cache curl

WORKDIR /server

COPY --from=builder /server/node_modules ./node_modules
COPY --from=builder /server/package.json ./package.json
COPY --from=builder /server/yarn.lock ./yarn.lock
COPY --from=builder /server/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /server ./

COPY start.sh ./start.sh
RUN chmod +x ./start.sh

COPY .env ./

EXPOSE 9000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:9000/health || exit 1

CMD ["./start.sh"]