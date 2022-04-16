package main

import (
	"chat-api/controllers"
	"chat-api/models"
	"flag"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

var port string

func init() {
	flag.StringVar(&port, "p", "5100", "listion on port no")

	if err := models.Connect(); err != nil {
		log.Fatalln(err.Error())
	}
}


func main() {
	flag.Parse()
	defer models.Disconnect()

	if err := models.CreateUserTable(); err != nil {log.Fatalln(err.Error())}

	http.HandleFunc("/signin", controllers.Signin)
	http.HandleFunc("/login", controllers.Login)
	http.HandleFunc("/logout", controllers.Logout)

	log.Printf("Listen on port no %s", port)
	log.Fatalln(http.ListenAndServe(":"+port, nil))
}
