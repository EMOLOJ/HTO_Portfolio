from rest_framework import serializers
from .models import ResearchArea, Publication, Award, Teaching, Education

class ResearchAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchArea
        fields = ['id', 'title', 'description', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = ['id', 'title', 'abstract', 'year', 'authors', 'pdf_url', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

class AwardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Award
        fields = ['id', 'name', 'year', 'description', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

class TeachingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teaching
        fields = ['id', 'course_name', 'semester', 'year', 'notes', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['id', 'degree', 'institution', 'field_of_study', 'start_date', 'end_date', 'description', 'location', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at'] 