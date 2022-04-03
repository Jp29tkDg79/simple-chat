# from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session

from .migrate import configini


config_ini = configini()
DB_URI = f'{config_ini.db}://{config_ini.user}:{config_ini.password}@{config_ini.host}:{config_ini.port}/{config_ini.dbname}'

engine = create_engine(DB_URI, echo=True, client_encoding='utf8')
Session = scoped_session(
    sessionmaker(
        autocommit=False,
        autoflush=False,
        expire_on_commit=False,
        bind=engine
    )
)
