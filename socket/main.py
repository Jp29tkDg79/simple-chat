import eventlet
import socketio

from chat import SimpleChatSocket


def main(port: int):
    socket = socketio.Server(cors_allowed_origins='*')
    socket.register_namespace(SimpleChatSocket('/'))
    app = socketio.WSGIApp(socket)
    eventlet.wsgi.server(eventlet.listen(('', port)), app)

if __name__ == '__main__':
    from argparse import ArgumentParser
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')

    args = parser.parse_args()
    port = args.port

    main(port)