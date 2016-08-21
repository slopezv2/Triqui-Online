# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class RoomChannel < ApplicationCable::Channel
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

  def turn(movement)
    ActionCable.server.broadcast "room_channel", message: data['movement']
  end
  def make_move(data)
    Game.make_move(email, data)
  end
  def message(data)
    Game.make_move(email, data)
  end
end
