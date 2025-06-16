from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'research-areas', views.ResearchAreaViewSet, basename='research-area')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/sign-in/', views.sign_in, name='sign-in'),
    path('auth/sign-up/', views.sign_up, name='sign-up'),
    
    # Experience URLs
    path('experiences/', views.experience_list, name='experience-list'),
    path('experiences/<int:pk>/', views.experience_detail, name='experience-detail'),
    path('experiences/create/', views.experience_create, name='experience-create'),
    path('experiences/<int:pk>/update/', views.experience_update, name='experience-update'),
    path('experiences/<int:pk>/delete/', views.experience_delete, name='experience-delete'),

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