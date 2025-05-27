from django.contrib import admin
from .models import ResearchArea, Publication, Award

@admin.register(ResearchArea)
class ResearchAreaAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at')
    search_fields = ('title', 'description')
    list_filter = ('created_at', 'updated_at')

@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    list_display = ('title', 'year', 'authors', 'created_at')
    search_fields = ('title', 'abstract', 'authors')
    list_filter = ('year', 'created_at')

@admin.register(Award)
class AwardAdmin(admin.ModelAdmin):
    list_display = ('name', 'year', 'created_at')
    search_fields = ('name', 'description')
    list_filter = ('year', 'created_at')
