from django.urls import path, re_path

from . import views
from .views import  User

urlpatterns = [
    path('<int:user_id>/', views.getUser, name='getUser'),
    path('<int:user_id1>/messages/<int:user_id2>', views.message, name='message'),
    path('<int:user_id>/profile/', views.getUserHtml, name='getUserHtml'),
    path('',views.postUser, name='postUser'),
    path('<int:user_id>/edit/', views.editUserHtml, name='editUserHtml'),
    path('<int:user_id>/update/', views.updateUser, name='updateUserHtml'),
    path('register/', views.postUserHtml, name='registerUserHtml'),
    path('login/<name>', views.getUserFromName, name='getUserFromName'),
    re_path(r'^(?P<user_id>[0-9])/query/', views.query, name='query')
]