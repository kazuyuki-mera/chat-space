# README

# ChatSpace DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|
|email|string|null: false, unique: true|
### Association
- has_many :messages
- has_many :groups, through: :group_users
- has_many :group_users

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|
### Association
- has_many :messages
- has_many :users,  through: :group_users
- has_many :group_users

## group_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|reference|index: true, foreign_key: true, null: false|
|group_id|reference|index: true, foreign_key: true, null: false|
### Association
- belongs_to :user
- belongs_to :group

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|content|string||
|image|string||
|user_id|reference|foreign_key: true, null: false|
|group_id|reference|foreign_key: true, null: false|
### Association
- belongs_to :user
- belongs_to :group