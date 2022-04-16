package controllers

import (
	"chat-api/models"
	"chat-api/utils"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)


func Signin (w http.ResponseWriter, req *http.Request) {
	switch req.Method {
	case http.MethodPost:
		body, err := utils.ReqBodyEncordJson(req)
		if err != nil {
			fmt.Fprintln(w, "failed to convert request body encode to json")
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		if !utils.Validation(body, "email", "password", "name") {
			fmt.Fprintln(w, "request body not found")
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		if u, _ := models.FindUserOne(body["email"]); !u.IsEmpty() {
			fmt.Fprintln(w, "existing user")
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		u := models.NewUser(body["name"], body["email"], body["password"])
		if err := u.MakeToken(); err != nil {
			fmt.Fprintln(w, "failed to create token")
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		if err := u.HashedPassword(); err != nil {
			fmt.Fprintln(w, "failed to create hash password")
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		if err := u.Insert(); err != nil {
			fmt.Fprintln(w, err.Error())
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		log.Println("create user")

		j, _ := json.Marshal(u)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		w.Write(j)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func Login(w http.ResponseWriter, req *http.Request) {
	switch req.Method {
	case http.MethodPost:
		body, err := utils.ReqBodyEncordJson(req)
		if err != nil {
			fmt.Fprintln(w, "failed to convert request body encode to json")
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		if !utils.Validation(body, "email", "password") {
			fmt.Fprintln(w, "reqest body not found")
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		u, err := models.FindUserOne(body["email"])
		if err != nil {
			fmt.Fprintln(w, "not user")
			w.WriteHeader(http.StatusNotExtended)
			return
		}

		if !u.Compare(body["password"]) {
			fmt.Fprintln(w, "password unmatch")
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		j, _ := json.Marshal(u)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(j)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func Logout(w http.ResponseWriter, req *http.Request) {
	switch req.Method {
	case http.MethodPost:
		body := map[string]string{"message": "success"}
		j, _ := json.Marshal(body)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(j)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}