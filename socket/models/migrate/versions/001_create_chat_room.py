from email.policy import default
from sqlalchemy import *
from migrate import *
from sqlalchemy.dialects.postgresql import VARCHAR, JSON


meta = MetaData()
table = Table(
    'chats', meta,
    Column('room', VARCHAR(255), primary_key=True, nullable=False),
    Column('history', JSON, default=''),
    Column('members', JSON, default=''),
)


def upgrade(migrate_engine):
    meta.bind = migrate_engine
    table.create()


def downgrade(migrate_engine):
    meta.bind = migrate_engine
    table.drop()
