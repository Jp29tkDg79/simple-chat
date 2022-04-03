import hashlib

from sqlalchemy.ext.automap import automap_base

from .session import Session, engine


SALT = 'test'

Base = automap_base()

class User(Base):

    __tablename__ = 'users'


    @classmethod
    def findOne(cls, email: str):
        record = Session.query(cls).filter(cls.email == email).first()
        return record

    @classmethod
    def makeToken(cls, email: str) -> str:
        return hashlib.sha256(email.encode('utf-8')).hexdigest()

    @classmethod
    def hashedPassword(cls, password: str) -> str:
        digest = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), SALT.encode('utf-8'), 1000)
        return digest.hex()

    def compare(self, password: str) -> bool:
        return self.password == self.hashedPassword(password)

    def commit(self):
        with Session() as session:
            session.add(self)
            session.commit()


Base.prepare(engine, reflect=True)