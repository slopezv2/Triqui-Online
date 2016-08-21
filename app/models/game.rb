class Game
  def self.start(email1, email2)
    white, black = [email1, email2].shuffle

    ActionCable.server.broadcast "player_#{white}", {action: "game_start", msg: true}
    ActionCable.server.broadcast "player_#{black}", {action: "game_start", msg: false}

    REDIS.set("opponent_for:#{white}", black)
    REDIS.set("opponent_for:#{black}", white)
  end

  def self.forfeit(email)
    if winner = opponent_for(email)
      ActionCable.server.broadcast "player_#{winner}", {action: "opponent_forfeits"}
    end
  end

  def self.opponent_for(email)
    REDIS.get("opponent_for:#{email}")
  end

  def self.make_move(email, data)
    opponent = opponent_for(email)
    move_string = data

    ActionCable.server.broadcast "player_#{opponent}", {action: "make_move", msg: move_string}
  end

  def self.reset(email)
    opponent = opponent_for(email)
    ActionCable.server.broadcast "player_#{opponent}", {action: "reset"}
  end
end