package models

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

type User struct {
	Name string `json:"name" db:"name"`
	Email string `json:"email" db:"email"`
	password string `json:"-" db:"password"`
	Token string `json:"token" db:"token"`
}

var schema = fmt.Sprintf(`
	CREATE TABLE IF NOT EXISTS %s (
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	token VARCHAR(255) NOT NULL,
	PRIMARY KEY (email));
`, TABLE_NAME)

const TABLE_NAME = "users"
const SALT = "test"

func NewUser(name string, email string, password string) *User {
	return &User{
		Name: name,
		Email: email,
		password: password,
		Token: "",
	}
}

func (u User) hash(t string) (string, error) {
	s := sha256.Sum256([]byte(SALT))
	h := hmac.New(sha256.New, s[:])
	if _, err := h.Write([]byte(t)); err != nil {return "", err}
	b := h.Sum(nil)
	return hex.EncodeToString(b), nil
}

func (u *User) HashedPassword() error {
	hash, err := u.hash(u.password)
	if err == nil { u.password = hash }
	return err
}

func (u *User) MakeToken() error {
	hash, err := u.hash(u.Email)
	if err == nil {u.Token = hash}
	return err
}

func (u User) IsEmpty() bool {
	return (User{}) == u
}

func (u User) Compare(pw string) bool {
	h, _ := u.hash(pw)
	return u.password == h
}

func (u User) Insert() error {
	q := fmt.Sprintf("INSERT INTO %s VALUES (?,?,?,?)", TABLE_NAME)
	_, err := db.Exec(q, u.Name, u.Email, u.password, u.Token)
	return err
}

func CreateUserTable() error {
	_, err := db.Exec(schema)
	return err
}


func FindUserOne(email string) (*User, error) {
	q := fmt.Sprintf("SELECT * FROM %s WHERE email = ?", TABLE_NAME)
	row := db.QueryRow(q, email)
	if row.Err() != nil { return nil, row.Err() }
	u := &User{}
	err := row.Scan(&u.Name, &u.Email, &u.password, &u.Token)
	return u, err
}
