package models

import (
	"chat-api/settings"
	"database/sql"
)


var db *sql.DB


func Connect() error {
	cfg := settings.ReadiniFile()

	d, err := sql.Open("mysql", cfg.Dburi())
	if err != nil { return err }
	if err := d.Ping(); err != nil { return err }
	db = d
	return nil
}

func Disconnect() {
	db.Close()
}