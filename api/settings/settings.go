package settings

import (
	"fmt"
	"log"
	"os"
	"path"

	"gopkg.in/ini.v1"
)


const (
	WORK_DIR = "settings"
	INI_FILE = "config.ini"
)

type Config struct {
	username string
	password string
	address string
	port int
	dbname string
}

var cfg_path string
var config Config

func init() {
	p, _ := os.Getwd()
	cfg_path = path.Join(p, WORK_DIR, INI_FILE)
	if _, err := os.Stat(cfg_path); err != nil {
		log.Fatal(err.Error())
	}
}

func ReadiniFile() Config {
	cfg, err := ini.Load(cfg_path)
	if err != nil {
		log.Fatalln(err)
	}

	config = Config{
		username: cfg.Section("DB").Key("username").String(),
		password: cfg.Section("DB").Key("password").String(),
		address: cfg.Section("DB").Key("address").String(),
		port: cfg.Section("DB").Key("port").MustInt(),
		dbname: cfg.Section("DB").Key("dbname").String(),
	}
	return config
}

func (cfg Config) Username() string {return cfg.username}

func (cfg Config) Address() string {return cfg.address}

func (cfg Config) Port() int {return cfg.port}

func (cfg Config) Dbname() string {return cfg.dbname}

func (cfg Config) Dburi() string {
	return fmt.Sprintf("%s:%s@tcp(%s:%d)/%s", cfg.username, cfg.password, cfg.address, cfg.port, cfg.dbname)
}