from django.test import TestCase
from .models import User
from django.test import Client
from django.urls import reverse
from django.test.utils import setup_test_environment

class UserModelTests(TestCase):
    user = User(name='Kyra', location='Salt Lake City', level=13, bio='hello')

    def test_create_user_name(self):
        self.assertEqual(self.user.name, "Kyra")

    def test_create_user_location(self):
        self.assertEqual(self.user.location, "Salt Lake City")

    def test_create_user_level(self):
        self.assertEqual(self.user.level, 13)

    def test_user_location_from_google(self):
        location = self.user.getLocationFromGoogle()
        self.assertAlmostEqual(40.76, location['lat'], places=2)
        self.assertAlmostEqual(-111.89, location['lng'], places=2)

    def test_get_Google_place_id_from_location(self):
        place_id = self.user.getGooglePlaceIDFromLocation()
        self.assertEqual("ChIJ7THRiJQ9UocRyjFNSKC3U1s", place_id)

class UserViewTests(TestCase):

    def setUp(self):
        self.client = Client()
        self.user = User(name="Alex", location="Salt Lake City", level=12, bio="Hello")
        self.user.save()


    def test_get_user(self):
        url = reverse('getUser', kwargs={'user_id': self.user.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)