# Build Caddy with the Mercure and Vulcain modules
# Temporary fix for https://github.com/dunglas/mercure/issues/770
ARG CADDY_VERSION=2.7
FROM public.ecr.aws/docker/library/caddy:${CADDY_VERSION}-builder AS builder

# github.com/lucaslorentz/caddy-docker-proxy/v2@v2.8.5 requires CADDY_VERSION=2.7.3
# https://github.com/lucaslorentz/caddy-docker-proxy/releases/tag/v2.8.5

# github.com/caddy-dns/cloudflare@upgrade (v0.0.0-20230807034102-74f004e1c1ab) requires
# github.com/caddyserver/caddy/v2@v2.7.3, not github.com/caddyserver/caddy/v2@v2.7.2
RUN xcaddy build \
  --with github.com/lucaslorentz/caddy-docker-proxy/v2@v2.8.4 \
  --with github.com/dunglas/mercure/caddy \
  --with github.com/dunglas/vulcain/caddy \
  --with github.com/caddy-dns/cloudflare@a9d3ae2690a1d232bc9f8fc8b15bd4e0a6960eec

FROM public.ecr.aws/docker/library/caddy:${CADDY_VERSION}

COPY --from=builder /usr/bin/caddy /usr/bin/caddy

RUN apk add curl jq

CMD ["caddy", "docker-proxy"]