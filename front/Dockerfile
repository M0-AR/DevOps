FROM node:14 AS builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn run build

FROM golang:latest
WORKDIR /app
COPY --from=builder /app/fileserver .
COPY --from=builder /app/build .
RUN go build .
CMD ["./fileserver"]
