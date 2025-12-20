# 1. Base image
FROM node:20-alpine AS builder

WORKDIR /app

# 2. Dependencies
COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile

# 3. Source
COPY . .

# 4. Build
ENV NODE_ENV=production
RUN npm run build

# =============================

# 5. Production image
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Only needed files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.env.production ./

EXPOSE 3000

CMD ["npm", "run", "start"]
