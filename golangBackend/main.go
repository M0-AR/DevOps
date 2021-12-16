package main

import (
	"fmt"

	"github.com/B1gDaddyKane/golangBackend/lib/config"
	"github.com/B1gDaddyKane/golangBackend/lib/db"
	"github.com/B1gDaddyKane/golangBackend/lib/logging"
	"github.com/B1gDaddyKane/golangBackend/src/dao/dashboard"
	"github.com/B1gDaddyKane/golangBackend/src/dao/signup"
	httpDelivery "github.com/B1gDaddyKane/golangBackend/src/delivery/http"
	"github.com/B1gDaddyKane/golangBackend/src/models"
	dashboard2 "github.com/B1gDaddyKane/golangBackend/src/usecase/dashboard"
	signup2 "github.com/B1gDaddyKane/golangBackend/src/usecase/signup"

	"net/http"

	"log"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// To initialize viper config
func init() {
	config.SetConfigFile("config", "lib/config", "json")
}

func main() {

	err := run()

	if err != nil {
		log.Fatal(err)
		panic(err)

	}

}

func getConfig() models.EnvConfig {

	return models.EnvConfig{
		Host: config.GetString("host.address"),
		Port: config.GetInt("host.port"),
		Mongo: db.MongoConfig{
			Timeout:  config.GetInt("database.mongodb.timeout"),
			DBName:   config.GetString("database.mongodb.dbname"),
			Username: config.GetString("database.mongodb.user"),
			Password: config.GetString("database.mongodb.password"),
			Host:     config.GetString("database.mongodb.host"),
			Port:     config.GetString("database.mongodb.port"),
		},
	}
}

// Testing main function

func run() error {

	envConfig := getConfig()

	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowHeaders:     []string{"*"},
		AllowCredentials: true,
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{http.MethodGet, http.MethodHead, http.MethodPut, http.MethodPatch, http.MethodPost, http.MethodDelete},
	}))

	e.Use(logging.MiddlewareLogging)

	// Mongo
	mongo, err := db.Connect(envConfig.Mongo)
	if err != nil {
		log.Println(err)
		return err
	}

	// Signup
	signupDAO := signup.NewSignUpDAO(mongo)
	signupUseCase := signup2.NewSignUpUseCase(&envConfig, signupDAO)
	// Router
	httpDelivery.NewRouterSignUp(e, signupUseCase)

	// Dashboard
	serviceDAO := dashboard.NewServiceDAO(mongo)
	serviceUseCase := dashboard2.NewServiceUseCase(&envConfig, serviceDAO)
	// Router
	httpDelivery.NewRouterDashboard(e, serviceUseCase)

	e.Logger.Fatal(e.Start(fmt.Sprintf("%s%s%v", envConfig.Host, ":", envConfig.Port)))

	return nil

}
