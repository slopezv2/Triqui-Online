class Seek
  def self.create(email)
    if opponent = REDIS.spop("seeks")
      Game.start(email, opponent)
    else
      REDIS.sadd("seeks", email)
    end
  end

  def self.remove(email)
    REDIS.srem("seeks", email)
  end

  def self.clear_all
    REDIS.del("seeks")
  end
end