FROM golang:latest

ADD . /app

WORKDIR /app

RUN go build -o api

RUN chmod +x ./api

EXPOSE 10000

CMD ./api

