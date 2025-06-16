from rest_framework import serializers
from .models import ResearchArea, Publication, Award, Teaching, Education, Experience

class ResearchAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchArea
        fields = '__all__'

class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = '__all__'

class AwardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Award
        fields = '__all__'

class TeachingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teaching
        fields = '__all__'

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__' 