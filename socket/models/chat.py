from typing_extensions import Self

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm.attributes import flag_modified

from .session import Session, engine


Base = automap_base()


class ChatRoom(Base):


    __tablename__ = 'chats'


    def __init__(self, room_name: str, history=[], members=[]) -> None:
        super().__init__()
        self.room = room_name
        self.history = history
        self.members = members

    @classmethod
    def findOne(cls, room: str) -> Self:
        record = Session.query(cls).filter(cls.room == room).first()
        if not record:
            return None
        return record

    def remove_user(self, name: str) -> None:
        new_members = []
        for members in self.members:
            for k, v in members.items():
                if v != name:
                    new_members.append({k: v})
        self.members.clear()
        self.members = new_members


    def commit(self):
        flag_modified(self, 'history')
        flag_modified(self, 'members')
        with Session() as session:
            session.add(self)
            session.commit()


Base.prepare(engine, reflect=True)
