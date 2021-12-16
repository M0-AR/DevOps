package db

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoConfig struct {
	Timeout  int
	Prefix   string
	DBName   string
	Username string
	Password string
	Host     string
	Port     string
}

func Connect(c MongoConfig) (*mongo.Database, error) {
	connPattern := "mongodb+srv://%v:%v@%v"
	if c.Username == "" {
		connPattern = "mongodb://%s%s%v:%v"
	}

	clientUrl := fmt.Sprintf(connPattern,
		c.Username,
		c.Password,
		c.Host,
	)
	clientOptions := options.Client().ApplyURI(clientUrl)
	client, err := mongo.NewClient(clientOptions)
	if err != nil {
		return nil, err
	}

	ctx, _ := context.WithTimeout(context.Background(), time.Duration(c.Timeout)*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		return nil, err
	}

	return client.Database(c.DBName), err
}
