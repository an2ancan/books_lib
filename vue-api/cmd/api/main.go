package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"vue-api/internal/data"
	"vue-api/internal/driver"
)

// config app struct
type config struct {
	port int
}

// application struct
type application struct {
	config     config
	infoLog    *log.Logger
	errorLog   *log.Logger
	models     data.Models
	enviroment string
}

func main() {
	var cfg config
	cfg.port = 8081

	infoLog := log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)
	errorLog := log.New(os.Stdout, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile)

	dsn := os.Getenv("DSN")
	enviroment := os.Getenv("ENV")

	db, err := driver.ConnectPostgres(dsn)
	if err != nil {
		errorLog.Fatal("Error connecting to database")
	}

	defer db.SQL.Close()

	app := &application{
		config:     cfg,
		infoLog:    infoLog,
		errorLog:   errorLog,
		models:     data.New(db.SQL),
		enviroment: enviroment,
	}

	err = app.serve()
	if err != nil {
		errorLog.Fatal(err)
	}
}

func (app *application) serve() error {
	app.infoLog.Println("API listening on port", app.config.port)
	srv := &http.Server{
		Addr:    fmt.Sprintf(":%d", app.config.port),
		Handler: app.routes(),
	}

	return srv.ListenAndServe()
}
