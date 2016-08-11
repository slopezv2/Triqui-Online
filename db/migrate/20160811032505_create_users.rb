class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.integer :total_games
      t.integer :won_games
      t.integer :lost_games

      t.timestamps
    end
  end
end
