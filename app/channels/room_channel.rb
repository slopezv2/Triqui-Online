# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class RoomChannel < ApplicationCable::Channel
require 'user'
  def subscribed
    # stream_from "some_channel"
    stream_from "player_#{email}"
    Seek.create(email)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    Seek.remove(email)
    Game.forfeit(email)
  end

  def result(end_game)
    case end_game["message"]
      when "win"
        email.win       
      when "lose"
        email.lose
      when "draw"
        email.draw
    end
  end

  def make_move(data)
    Game.make_move(email, data)
  end
  def reset
    Game.reset
  end
end
