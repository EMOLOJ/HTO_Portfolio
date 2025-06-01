from django.urls import path
from . import views

urlpatterns = [
    # Research Area URLs
    path('research-areas/', views.research_area_list, name='research-area-list'),
    path('research-areas/<int:pk>/', views.research_area_detail, name='research-area-detail'),
    path('research-areas/create/', views.research_area_create, name='research-area-create'),
    path('research-areas/<int:pk>/update/', views.research_area_update, name='research-area-update'),
    path('research-areas/<int:pk>/delete/', views.research_area_delete, name='research-area-delete'),

    # Publication URLs
    path('publications/', views.publication_list, name='publication-list'),
    path('publications/<int:pk>/', views.publication_detail, name='publication-detail'),
    path('publications/create/', views.publication_create, name='publication-create'),
    path('publications/<int:pk>/update/', views.publication_update, name='publication-update'),
    path('publications/<int:pk>/delete/', views.publication_delete, name='publication-delete'),

    # Award URLs
    path('awards/', views.award_list, name='award-list'),
    path('awards/<int:pk>/', views.award_detail, name='award-detail'),
    path('awards/create/', views.award_create, name='award-create'),
    path('awards/<int:pk>/update/', views.award_update, name='award-update'),
    path('awards/<int:pk>/delete/', views.award_delete, name='award-delete'),

    # Teaching URLs
    path('teaching/', views.teaching_list, name='teaching-list'),
    path('teaching/<int:pk>/', views.teaching_detail, name='teaching-detail'),
    path('teaching/create/', views.teaching_create, name='teaching-create'),
    path('teaching/<int:pk>/update/', views.teaching_update, name='teaching-update'),
    path('teaching/<int:pk>/delete/', views.teaching_delete, name='teaching-delete'),

    # Education URLs
    path('education/', views.education_list, name='education-list'),
    path('education/<int:pk>/', views.education_detail, name='education-detail'),
    path('education/create/', views.education_create, name='education-create'),
    path('education/<int:pk>/update/', views.education_update, name='education-update'),
    path('education/<int:pk>/delete/', views.education_delete, name='education-delete'),
] 