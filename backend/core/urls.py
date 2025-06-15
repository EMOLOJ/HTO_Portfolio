from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'research-areas', views.ResearchAreaViewSet, basename='research-area')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/sign-in/', views.sign_in, name='sign-in'),
    path('auth/sign-up/', views.sign_up, name='sign-up'),
] 