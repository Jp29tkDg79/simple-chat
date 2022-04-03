from flask import Flask, jsonify, request

from models import User

app = Flask(__name__)

@app.route('/signin', methods=['POST'])
def signin():
    request_json = request.json

    required = ('name', 'email', 'password')

    if not all(k in request_json for k in required):
        return jsonify({'message': 'missing values'}), 400

    name = request_json['name']
    email = request_json['email']
    password = request_json['password']

    existingUser = User.findOne(email)
    if existingUser:
        return jsonify({'message': 'Existing user'}), 403

    user = User()
    user.name = name
    user.email = email
    user.password = User.hashedPassword(password)
    user.token = User.makeToken(email)
    user.commit()
    return jsonify({'name': user.name, 'email': user.email, 'token': user.token}), 201


@app.route('/login', methods=['POST'])
def login():
    request_json = request.json

    required = ('email', 'password')

    if not all(k in request_json for k in required):
        return jsonify({'message': 'missing values'}), 400

    email = request_json['email']
    password = request_json['password']

    user = User.findOne(email)
    if not user:
        return jsonify({'message': 'Invalid credentials'}), 403

    if not user.compare(password):
        return jsonify({'message': 'Entered password is unmatch!'}), 403

    return jsonify({'name': user.name, 'email': user.email, 'token': user.token}), 201


@app.route('/logout', methods=['POST'])
def logout():
    return jsonify({'message': 'success'}), 200


if __name__ == '__main__':
    from argparse import ArgumentParser
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5100, type=int, help='port to listen on')
    parser.add_argument('-d', '--debug', default=False, type=bool, help='debug flg')

    args = parser.parse_args()
    port = args.port
    debug = args.debug

    app.run(host='0.0.0.0', port=port, debug=debug)
