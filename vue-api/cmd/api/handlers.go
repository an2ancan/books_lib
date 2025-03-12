package main

import (
	"errors"
	"net/http"
	"time"
	"vue-api/internal/data"
)

type jsonResponse struct {
	Error   bool        `json:"error"`
	Message string      `json:"message"`
	Data    interface{} `json:"data, omitempty"`
}

type envelope map[string]interface{}

func (app *application) Login(w http.ResponseWriter, r *http.Request) {
	type credentials struct {
		UserName string `json:"email"`
		Password string `json:"password"`
	}

	var creds credentials
	var payload jsonResponse

	err := app.readJSON(w, r, &creds)
	if err != nil {
		app.errorLog.Println(err)
		payload.Error = false
		payload.Message = "Invalid JSON"
		_ = app.writeJSON(w, http.StatusOK, payload)

	}

	// authenticate
	app.infoLog.Println(creds.UserName, creds.Password)

	// lookup user by email

	user, err := app.models.User.GetByEmail(creds.UserName)
	if err != nil {
		app.errorJson(w, errors.New("invalid email or password"), http.StatusForbidden)
		return
	}

	// validate usesrs password
	validPassord, err := user.PasswordMatches(creds.Password)
	if err != nil || !validPassord {
		app.errorJson(w, errors.New("invalid email or password"), http.StatusForbidden)
		return
	}

	// we have a valid user, generate a token
	token, err := app.models.User.Token.GenerateToken(user.ID, 24*time.Hour)
	if err != nil {
		app.errorLog.Println(err)
		app.errorJson(w, err, http.StatusInternalServerError)
		return
	}

	// save it to the database
	err = app.models.User.Token.Insert(*token, *user)
	if err != nil {
		app.errorLog.Println(err)
		app.errorJson(w, err, http.StatusInternalServerError)
		return
	}

	//sendback response
	payload = jsonResponse{
		Error:   false,
		Message: "logged in",
		Data: envelope{
			"token": token,
			"user":  user,
		},
	}

	err = app.writeJSON(w, http.StatusOK, payload)
	if err != nil {
		app.errorLog.Println(err)
	}
}

func (app *application) Logout(w http.ResponseWriter, r *http.Request) {
	var requestPayload struct {
		Token string `json:"token"`
	}

	err := app.readJSON(w, r, &requestPayload)
	if err != nil {
		app.errorJson(w, errors.New("invalid json"), http.StatusBadRequest)
		return
	}

	err = app.models.Token.DeleteByToken(requestPayload.Token)
	if err != nil {
		app.errorJson(w, errors.New("invalid token"), http.StatusBadRequest)
		return
	}

	payload := jsonResponse{
		Error:   false,
		Message: "logged out",
	}

	err = app.writeJSON(w, http.StatusOK, payload)
	if err != nil {
		app.errorLog.Println(err)
	}
}

func (app *application) AllUsers(w http.ResponseWriter, r *http.Request) {
	var users data.User
	all, err := users.GetAll()
	if err != nil {
		app.errorLog.Println(err)
		return
	}

	payload := jsonResponse{
		Error:   false,
		Message: "success",
		Data:    envelope{"users": all},
	}

	app.writeJSON(w, http.StatusOK, payload)
}
