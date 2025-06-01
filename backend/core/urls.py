from django.urls import path
from . import views

urlpatterns = [
    # Research Area URLs
    path('research-areas/', views.research_area_list, name='research-area-list'),
    path('research-areas/<int:pk>/', views.research_area_detail, name='research-area-detail'),
    path('research-areas/create/', views.research_area_create, name='research-area-create'),
    path('research-areas/<int:pk>/update/', views.research_area_update, name='research-area-update'),
    path('research-areas/<int:pk>/delete/', views.research_area_delete, name='research-area-delete'),
] 