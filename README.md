
# chat-space DB設計

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|
|email|string|null: false, unique: true|
### Association
- has_many :messages, dependent: :destroy
- has_many :groups, through: :group_users
- has_many :group_users, dependent: :destroy

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|
### Association
- has_many :messages, dependent: :destroy
- has_many :users, through: :group_users
- has_many :group_users, dependent: :destroy

## group_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|reference|foreign_key: true|
|group_id|reference|foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|content|string||
|image|string||
|user_id|reference|foreign_key: true|
|group_id|reference|foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group