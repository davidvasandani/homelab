FROM golang:1.18-alpine as builder

RUN apk --no-cache add --virtual build-dependencies \
  git \
  && mkdir -p /root/gocode \
  && export GOPATH=/root/gocode \
  && go install github.com/mingrammer/flog@latest

FROM alpine:3

COPY --from=builder /root/gocode/bin/flog /usr/local/bin/

WORKDIR /

ENTRYPOINT ["/usr/local/bin/flog"]
