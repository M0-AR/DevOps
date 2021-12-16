package logging

import (
	"github.com/labstack/echo/v4"
	log "github.com/sirupsen/logrus"
	"time"
)

func Info(args ...interface{}) {
	logEntry := makeLogEntry(nil)
	logEntry.Info(args...)
}

func MiddlewareLogging(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		makeLogEntry(c).Info("incoming request")
		return next(c)
	}
}

func makeLogEntry(c echo.Context) *log.Entry {
	if c == nil {
		return log.WithFields(log.Fields{
			"at": time.Now().Format("2006-01-02 15:04:05"),
		})
	}

	return log.WithFields(log.Fields{
		"at":     time.Now().Format("2021-01-01 15:05:01"),
		"method": c.Request().Method,
		"uri":    c.Request().URL.String(),
		"ip":     c.Request().RemoteAddr,
	})
}
