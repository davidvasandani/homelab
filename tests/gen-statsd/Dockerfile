FROM golang:1.18-alpine as builder

RUN apk --no-cache add --virtual build-dependencies \
  git \
  && mkdir -p /root/gocode \
  && export GOPATH=/root/gocode \
  && go install github.com/circonus-labs/gen-statsd@latest

FROM alpine:3

COPY --from=builder /root/gocode/bin/gen-statsd /usr/local/bin/

WORKDIR /

ENTRYPOINT ["/usr/local/bin/gen-statsd"]
