class Message(object):
  """describes a news message"""
  def __init__(self,title="",sender="",date="",body="",expiration=""):
    self.title, self.sender, self.date, self.body, self.expiration = title, sender, date, body, expiration

