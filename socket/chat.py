import socketio

from models import ChatRoom

ROOMNAME = 'room'

class SimpleChatSocket(socketio.Namespace):


    def on_connect(self, sid, environ, rc=None):
        chat_room = ChatRoom.findOne(ROOMNAME)
        if not chat_room:
            chat_room = ChatRoom(ROOMNAME)
            chat_room.commit()


    def on_disconnect(self, sid):
        self.disconnect(sid)


    def on_request_chatroom_join(self, sid, msg):
        if not 'name' in msg:
            self.emit('response_chatroom_join', data={
                'status': False, 'message': 'not user'
            })
            return
        chat_room = ChatRoom.findOne(ROOMNAME)
        chat_room.members.append(msg)
        chat_room.commit()

        name = msg['name']
        self.emit('response_chatroom_join', data={
            'status': 'true',
            'message': f'{name}さんが参加しました。'
        })


    def on_request_member_list(self, sid, msg):
        chat_room = ChatRoom.findOne(ROOMNAME)
        self.emit('response_member_list', data={
            'list': chat_room.members,
            'status': 'true',
            'message': 'success'
        })

    def on_request_message(self, sid, msg):
        chat_room = ChatRoom.findOne(ROOMNAME)
        if 'message' in msg:
            chat_room.history.append(msg)
            chat_room.commit()

        self.emit('response_message', data={
            'history': chat_room.history,
            'status': 'true',
            'message': 'success'
        })


    def on_logout(self, sid, msg):
        if not 'name' in msg:
            return
        name = msg['name']

        chat_room = ChatRoom.findOne(ROOMNAME)
        chat_room.remove_user(name)
        chat_room.commit()
        self.emit('response_member_list', data={
            'list': chat_room.members,
            'status': 'true',
            'message': 'success',
        })

