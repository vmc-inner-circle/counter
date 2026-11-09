# Counter — zero-dependency Node server. Build context = app/
FROM node:22-alpine
WORKDIR /app
COPY . .
ENV PORT=8080 STATE_FILE=/data/state.json
EXPOSE 8080
CMD ["node", "server.mjs"]
