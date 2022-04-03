from sqlalchemy import *
from migrate import *
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.dialects.postgresql import VARCHAR, TEXT, TIMESTAMP


meta = MetaData()
table = Table(
    'users', meta,
    Column('id', INTEGER, primary_key=True, autoincrement=True),
    Column('name', TEXT, nullable=False),
    Column('email', VARCHAR(255), nullable=False, primary_key=True),
    Column('password', VARCHAR(255), nullable=False),
    Column('created_at', TIMESTAMP, server_default=current_timestamp()),
    Column('updated_at', TIMESTAMP, server_default=current_timestamp()),
    Column('token', VARCHAR(255), nullable=False)
)

def upgrade(migrate_engine):
    meta.bind = migrate_engine
    table.create()

def downgrade(migrate_engine):
    meta.bind = migrate_engine
    table.drop()
