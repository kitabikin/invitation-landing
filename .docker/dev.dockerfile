FROM node:14-alpine as builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM node:14-alpine
WORKDIR /app
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
RUN npm ci --production
RUN ./node_modules/.bin/next telemetry disable
USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["npm", "run", "start"]