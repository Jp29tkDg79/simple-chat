#!/usr/bin/env python
from migrate.versioning.shell import main

from settings import configini

if __name__ == '__main__':
    config_ini = configini()
    db_uri = f'{config_ini.db}://{config_ini.user}:{config_ini.password}@{config_ini.host}:{config_ini.port}/{config_ini.dbname}'
    main(debug='False', url=db_uri, repository='.')
