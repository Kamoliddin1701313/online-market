# =============================
# 1. Builder
# =============================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

ENV NODE_ENV=production
RUN npm run build

# =============================
# 2. Runner (production)
# =============================
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

RUN npm install --omit=dev

EXPOSE 3000

CMD ["npm", "run", "start"]
