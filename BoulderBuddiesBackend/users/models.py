from django.db import models
from django.conf import settings
import requests

# Create your models here.

class User(models.Model):
    name = models.CharField(max_length=50)
    location = models.CharField(max_length=1000)
    level = models.IntegerField()
    bio = models.CharField(max_length=1000)

    def getLocationFromGoogle(self):
        url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=%s&key=%s" % \
              (self.location, settings.GOOGLE_MAPS_API_KEY )
        r = requests.get(url)
        res = r.json()["results"][0]["geometry"]["location"]
        return res

    def getGooglePlaceIDFromLocation(self):
        url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=%s&key=%s" % \
              (self.location, settings.GOOGLE_MAPS_API_KEY )
        r = requests.get(url)
        res = r.json()["results"][0]["place_id"]
        return res

    def __str__(self):
        return "%s: %s, V%d" % (self.name, self.location, self.level)

    def getJson(self):
        return {"name": self.name,
                "id": self.id,
                "location": self.location,
                "level": self.level,
                "bio": self.bio,
                "position": self.getLocationFromGoogle()}

class Message(models.Model):
     sender = models.ForeignKey(User, related_name="sender", on_delete=models.CASCADE)
     recipient =  models.ForeignKey(User, related_name="recipient", on_delete=models.CASCADE)
     text = models.CharField(max_length=2000)
     timeStamp = models.DateTimeField(auto_now_add=True)

     def getJson(self):
         return {
             "id": self.id,
             "senderName": self.sender.name,
             "recipientName": self.recipient.name,
             "senderUID": self.sender.id,
             "recipientUID": self.recipient.name,
             "text": self.text,
             "timeStamp": self.timeStamp.strftime('%m-%d-%Y %H:%M')
         }
