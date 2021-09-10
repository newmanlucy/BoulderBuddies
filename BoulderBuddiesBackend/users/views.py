from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest, HttpResponseRedirect
from .models import User
from django.shortcuts import get_object_or_404
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.template import loader
from django.shortcuts import render
import requests


# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at the users index.")

# GET /users/<user_id> : view user details
def getUser(request, user_id):
    user = get_object_or_404(User, id=user_id)
    return JsonResponse(user.getJson())

def getUserFromName(request, name):
    user = get_object_or_404(User, name=name)
    return JsonResponse(user.getJson())

def getUserHtml(request, user_id):
    user = get_object_or_404(User, id=user_id)
    context = {
        'user': user,
    }
    return render(request, 'profile.html', context)

def updateUser(request, user_id):
    user = get_object_or_404(User, id=user_id)
    if 'name' in request.POST:
        name = request.POST['name']
        user.name = name
    if 'location' in request.POST:
        location = request.POST['location']
        user.location = location
    if 'level' in request.POST:
        level = request.POST['level']
        user.level = level
    if 'bio' in request.POST:
        bio = request.POST['bio']
        user.bio = bio
    user.save()
    return HttpResponseRedirect(reverse('getUser', args=(user.id,)))

def postUserHtml(request):
    return render(request, 'register.html', {})

def editUserHtml(request, user_id):
    user = get_object_or_404(User, id=user_id)
    context = {
        'user': user
    }
    return render(request, 'edit.html', context)

# POST /users : create user
@csrf_exempt
def postUser(request):
    print(request.POST)
    try:
        name = request.POST['name']
        location = request.POST['location']
        level = request.POST['level']
        bio = request.POST['bio']
    except KeyError:
        return HttpResponseBadRequest("You must specify name, location, level, and bio")
    u = User(name=name, location=location, level=level, bio=bio)
    print(u.getJson())
    u.save()

    return JsonResponse(u.getJson())

def getDistanceBetweenUsers(user1, user2):
    if user1.location == user2.location:
        return 0
    url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=%s&destinations=%s&key=%s" % \
        (user1.location, user2.location, settings.GOOGLE_MAPS_API_KEY)
    r = requests.get(url)
    print(r.json())
    if "distance" not in r.json()["rows"][0]["elements"][0]:
        return -1
    meters = r.json()["rows"][0]["elements"][0]["distance"]["value"]
    miles = int(meters * 0.000621371)
    return miles

# GET /users?radius={}&sports={} : get list of users fulfilling the specified filter criteria
def query(request, user_id):
    user = get_object_or_404(User, id=user_id)
    min_level = request.GET.get('min_level')
    max_level = request.GET.get('max_level')
    if min_level is None:
        min_level = "-1"
    if max_level is None:
        max_level = "20"
    radius = request.GET.get('radius')
    if radius is None:
        radius = 1000000000000000
    radius = int(radius)
    users = User.objects.filter(level__gte=min_level, level__lte=max_level)
    res = []
    for u in users:
        if u.id != user.id and getDistanceBetweenUsers(user, u) < radius:
            res.append(u.getJson())
    return JsonResponse({"results": res})