from ast import Str
from email.policy import default
import os

import configparser


CONFIGFILENAME = 'config.ini'
SECTION_DB = 'DB'

class configini(object):


    def __init__(self) -> None:
        config_ini = configparser.ConfigParser()
        config_file_path = os.path.join(os.path.dirname(__file__), CONFIGFILENAME)
        config_ini.read(config_file_path, encoding='utf-8')
        self.__read_db = config_ini[SECTION_DB]

    @property
    def db(self) -> Str:
        return self.__read_db.get('Database')

    @property
    def user(self) -> Str:
        return self.__read_db.get('User')

    @property
    def password(self) -> Str:
        return self.__read_db.get('Password')

    @property
    def host(self) -> Str:
        return self.__read_db.get('Host')

    @property
    def port(self) -> Str:
        return self.__read_db.get('Port')

    @property
    def dbname(self) -> Str:
        return self.__read_db.get('DbName')
