# ツール・ライブラリの名前
 
簡単なチャットツール
 
## 簡単な説明
 
複数人とリアルタイムでチャットをするツールです。
 
## 機能
 
- ログイン・ログアウト機能
- (調整中)複数人とのリアルタイムチャット機能
- (調整中)リアルタイムで現在ログイン中のユーザ一覧(及びログアウト時に対象ユーザ削除機能)
 
## 必要要件
- gitの開発環境(git clone時のみ)
- dockerの開発環境
- (検討中)k8sの開発環境
 
## 使い方
1. docker-compose up -d
 
## インストール
 
```
$ git clone https://github.com/Jp29tkDg79/simple-chat.git
$ cd simple-chat
$ docker-compose up -d
$ ~do anything~
```
 
## その他
 
ログイン、ログアウトは動作します。
※golangのsocketIoは現在clientのv3に対応できないため、現在は動作しません。
 
## 作者
 
[Jp29tkDg79]
 
## ライセンス
 
[MIT](https://github.com/Jp29tkDg79/simple-chat.git)</blockquote>