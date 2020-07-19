class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :group_users
  has_many :groups, through: :group_users

  def self.search(input, current_user_id, addUserIds)
    return nil if input == ""
    User.where(['name LIKE ?', "%#{input}%"] ).where.not(id: current_user_id, id: addUserIds.map(&:to_i)).limit(10)
  end

end
