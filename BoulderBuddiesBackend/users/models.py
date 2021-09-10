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
