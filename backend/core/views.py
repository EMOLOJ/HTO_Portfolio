from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.core.exceptions import ObjectDoesNotExist
from .models import ResearchArea, Publication, Award, Teaching, Education, Experience
from .serializers import (
    ResearchAreaSerializer, PublicationSerializer, AwardSerializer,
    TeachingSerializer, EducationSerializer, ExperienceSerializer
)
import requests
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

class ResearchAreaViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing ResearchArea instances.
    """
    queryset = ResearchArea.objects.all()
    serializer_class = ResearchAreaSerializer

    def list(self, request):
        """List all research areas"""
        research_areas = self.get_queryset()
        serializer = self.get_serializer(research_areas, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        """Get a single research area by ID"""
        research_area = get_object_or_404(self.get_queryset(), pk=pk)
        serializer = self.get_serializer(research_area)
        return Response(serializer.data)

    def update(self, request, pk=None):
        """Update a research area"""
        research_area = get_object_or_404(self.get_queryset(), pk=pk)
        serializer = self.get_serializer(research_area, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        """Delete a research area"""
        research_area = get_object_or_404(self.get_queryset(), pk=pk)
        research_area.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def create(self, request):
        """Create a new research area"""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def create_response(data=None, message=None, status_code=status.HTTP_200_OK):
    """
    Helper function to create consistent response format
    """
    response = {
        'status': 'success' if status_code < 400 else 'error',
        'message': message,
        'data': data
    }
    return Response(response, status=status_code)

@api_view(['GET'])
@permission_classes([AllowAny])
def research_area_list(request):
    """
    List all research areas.
    """
    try:
        research_areas = ResearchArea.objects.all()
        serializer = ResearchAreaSerializer(research_areas, many=True)
        return create_response(
            data=serializer.data,
            message="Research areas retrieved successfully"
        )
    except Exception as e:
        return create_response(
            message=f"Error retrieving research areas: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([AllowAny])
def research_area_detail(request, pk):
    """
    Retrieve a single research area.
    """
    try:
        research_area = ResearchArea.objects.get(pk=pk)
        serializer = ResearchAreaSerializer(research_area)
        return create_response(
            data=serializer.data,
            message="Research area retrieved successfully"
        )
    except ObjectDoesNotExist:
        return create_response(
            message=f"Research area with id {pk} not found",
            status_code=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return create_response(
            message=f"Error retrieving research area: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def research_area_create(request):
    """
    Create a new research area.
    """
    try:
        serializer = ResearchAreaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return create_response(
                data=serializer.data,
                message="Research area created successfully",
                status_code=status.HTTP_201_CREATED
            )
        return create_response(
            message="Invalid data provided",
            data=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return create_response(
            message=f"Error creating research area: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def research_area_update(request, pk):
    """
    Update a research area.
    """
    try:
        research_area = ResearchArea.objects.get(pk=pk)
        serializer = ResearchAreaSerializer(research_area, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return create_response(
                data=serializer.data,
                message="Research area updated successfully"
            )
        return create_response(
            message="Invalid data provided",
            data=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST
        )
    except ObjectDoesNotExist:
        return create_response(
            message=f"Research area with id {pk} not found",
            status_code=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return create_response(
            message=f"Error updating research area: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def research_area_delete(request, pk):
    """
    Delete a research area.
    """
    try:
        research_area = ResearchArea.objects.get(pk=pk)
        research_area.delete()
        return create_response(
            message="Research area deleted successfully",
            status_code=status.HTTP_204_NO_CONTENT
        )
    except ObjectDoesNotExist:
        return create_response(
            message=f"Research area with id {pk} not found",
            status_code=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return create_response(
            message=f"Error deleting research area: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

# Publication Views
@api_view(['GET'])
def publication_list(request):
    """
    List all publications.
    """
    try:
        publications = Publication.objects.all()
        serializer = PublicationSerializer(publications, many=True)
        return create_response(
            data=serializer.data,
            message="Publications retrieved successfully"
        )
    except Exception as e:
        return create_response(
            message=f"Error retrieving publications: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def publication_detail(request, pk):
    """
    Retrieve a single publication.
    """
    try:
        publication = Publication.objects.get(pk=pk)
        serializer = PublicationSerializer(publication)
        return create_response(
            data=serializer.data,
            message="Publication retrieved successfully"
        )
    except ObjectDoesNotExist:
        return create_response(
            message=f"Publication with id {pk} not found",
            status_code=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return create_response(
            message=f"Error retrieving publication: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
def publication_create(request):
    """
    Create a new publication.
    """
    try:
        serializer = PublicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return create_response(
                data=serializer.data,
                message="Publication created successfully",
                status_code=status.HTTP_201_CREATED
            )
        return create_response(
            message="Invalid data provided",
            data=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return create_response(
            message=f"Error creating publication: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['PUT'])
def publication_update(request, pk):
    """
    Update a publication.
    """
    try:
        publication = Publication.objects.get(pk=pk)
        serializer = PublicationSerializer(publication, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return create_response(
                data=serializer.data,
                message="Publication updated successfully"
            )
        return create_response(
            message="Invalid data provided",
            data=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST
        )
    except ObjectDoesNotExist:
        return create_response(
            message=f"Publication with id {pk} not found",
            status_code=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return create_response(
            message=f"Error updating publication: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['DELETE'])
def publication_delete(request, pk):
    """
    Delete a publication.
    """
    try:
        publication = Publication.objects.get(pk=pk)
        publication.delete()
        return create_response(
            message="Publication deleted successfully",
            status_code=status.HTTP_204_NO_CONTENT
        )
    except ObjectDoesNotExist:
        return create_response(
            message=f"Publication with id {pk} not found",
            status_code=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return create_response(
            message=f"Error deleting publication: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

# Award Views
@api_view(['GET'])
def award_list(request):
    """
    List all awards.
    """
    try:
        awards = Award.objects.all()
        serializer = AwardSerializer(awards, many=True)
        return create_response(
            data=serializer.data,
            message="Awards retrieved successfully"
        )
    except Exception as e:
        return create_response(
            message=f"Error retrieving awards: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def award_detail(request, pk):
    """
    Retrieve a single award.
    """
    try:
        award = Award.objects.get(pk=pk)
        serializer = AwardSerializer(award)
        return create_response(
            data=serializer.data,
            message="Award retrieved successfully"
        )
    except ObjectDoesNotExist:
        return create_response(
            message=f"Award with id {pk} not found",
            status_code=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return create_response(
            message=f"Error retrieving award: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
def award_create(request):
    """
    Create a new award.
    """
    try:
        serializer = AwardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return create_response(
                data=serializer.data,
                message="Award created successfully",
                status_code=status.HTTP_201_CREATED
            )
        return create_response(
            message="Invalid data provided",
            data=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return create_response(
            message=f"Error creating award: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['PUT'])
def award_update(request, pk):
    """
    Update an award.
    """
    try:
        award = Award.objects.get(pk=pk)
        serializer = AwardSerializer(award, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return create_response(
                data=serializer.data,
                message="Award updated successfully"
            )
        return create_response(
            message="Invalid data provided",
            data=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST
        )
    except ObjectDoesNotExist:
        return create_response(
            message=f"Award with id {pk} not found",
            status_code=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return create_response(
            message=f"Error updating award: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['DELETE'])
def award_delete(request, pk):
    """
    Delete an award.
    """
    try:
        award = Award.objects.get(pk=pk)
        award.delete()
        return create_response(
            message="Award deleted successfully",
            status_code=status.HTTP_204_NO_CONTENT
        )
    except ObjectDoesNotExist:
        return create_response(
            message=f"Award with id {pk} not found",
            status_code=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return create_response(
            message=f"Error deleting award: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

# Teaching Views
@api_view(['GET'])
def teaching_list(request):
    """
    List all teaching records.
    """
    try:
        teachings = Teaching.objects.all()
        serializer = TeachingSerializer(teachings, many=True)
        return create_response(
            data=serializer.data,
            message="Teaching records retrieved successfully"
        )
    except Exception as e:
        return create_response(
            message=f"Error retrieving teaching records: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def teaching_detail(request, pk):
    """
    Retrieve a single teaching record.
    """
    try:
        teaching = Teaching.objects.get(pk=pk)
        serializer = TeachingSerializer(teaching)
        return create_response(
            data=serializer.data,
            message="Teaching record retrieved successfully"
        )
    except ObjectDoesNotExist:
        return create_response(
            message=f"Teaching record with id {pk} not found",
            status_code=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return create_response(
            message=f"Error retrieving teaching record: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
def teaching_create(request):
    """
    Create a new teaching record.
    """
    try:
        serializer = TeachingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return create_response(
                data=serializer.data,
                message="Teaching record created successfully",
                status_code=status.HTTP_201_CREATED
            )
        return create_response(
            message="Invalid data provided",
            data=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return create_response(
            message=f"Error creating teaching record: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['PUT'])
def teaching_update(request, pk):
    """
    Update a teaching record.
    """
    try:
        teaching = Teaching.objects.get(pk=pk)
        serializer = TeachingSerializer(teaching, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return create_response(
                data=serializer.data,
                message="Teaching record updated successfully"
            )
        return create_response(
            message="Invalid data provided",
            data=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST
        )
    except ObjectDoesNotExist:
        return create_response(
            message=f"Teaching record with id {pk} not found",
            status_code=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return create_response(
            message=f"Error updating teaching record: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['DELETE'])
def teaching_delete(request, pk):
    """
    Delete a teaching record.
    """
    try:
        teaching = Teaching.objects.get(pk=pk)
        teaching.delete()
        return create_response(
            message="Teaching record deleted successfully",
            status_code=status.HTTP_204_NO_CONTENT
        )
    except ObjectDoesNotExist:
        return create_response(
            message=f"Teaching record with id {pk} not found",
            status_code=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return create_response(
            message=f"Error deleting teaching record: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

# Education Views
@api_view(['GET'])
def education_list(request):
    """
    List all education records.
    """
    try:
        educations = Education.objects.all()
        serializer = EducationSerializer(educations, many=True)
        return create_response(
            data=serializer.data,
            message="Education records retrieved successfully"
        )
    except Exception as e:
        return create_response(
            message=f"Error retrieving education records: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def education_detail(request, pk):
    """
    Retrieve a single education record.
    """
    try:
        education = Education.objects.get(pk=pk)
        serializer = EducationSerializer(education)
        return create_response(
            data=serializer.data,
            message="Education record retrieved successfully"
        )
    except ObjectDoesNotExist:
        return create_response(
            message=f"Education record with id {pk} not found",
            status_code=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return create_response(
            message=f"Error retrieving education record: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
def education_create(request):
    """
    Create a new education record.
    """
    try:
        serializer = EducationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return create_response(
                data=serializer.data,
                message="Education record created successfully",
                status_code=status.HTTP_201_CREATED
            )
        return create_response(
            message="Invalid data provided",
            data=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return create_response(
            message=f"Error creating education record: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['PUT'])
def education_update(request, pk):
    """
    Update an education record.
    """
    try:
        education = Education.objects.get(pk=pk)
        serializer = EducationSerializer(education, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return create_response(
                data=serializer.data,
                message="Education record updated successfully"
            )
        return create_response(
            message="Invalid data provided",
            data=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST
        )
    except ObjectDoesNotExist:
        return create_response(
            message=f"Education record with id {pk} not found",
            status_code=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return create_response(
            message=f"Error updating education record: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['DELETE'])
def education_delete(request, pk):
    """
    Delete an education record.
    """
    try:
        education = Education.objects.get(pk=pk)
        education.delete()
        return create_response(
            message="Education record deleted successfully",
            status_code=status.HTTP_204_NO_CONTENT
        )
    except ObjectDoesNotExist:
        return create_response(
            message=f"Education record with id {pk} not found",
            status_code=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return create_response(
            message=f"Error deleting education record: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

# Experience Views
@api_view(['GET'])
@permission_classes([AllowAny])
def experience_list(request):
    """
    List all experiences.
    """
    try:
        experiences = Experience.objects.all()
        serializer = ExperienceSerializer(experiences, many=True)
        return create_response(
            data=serializer.data,
            message="Experiences retrieved successfully"
        )
    except Exception as e:
        return create_response(
            message=f"Error retrieving experiences: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([AllowAny])
def experience_detail(request, pk):
    """
    Retrieve a single experience.
    """
    try:
        experience = Experience.objects.get(pk=pk)
        serializer = ExperienceSerializer(experience)
        return create_response(
            data=serializer.data,
            message="Experience retrieved successfully"
        )
    except ObjectDoesNotExist:
        return create_response(
            message=f"Experience with id {pk} not found",
            status_code=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return create_response(
            message=f"Error retrieving experience: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def experience_create(request):
    """
    Create a new experience.
    """
    try:
        serializer = ExperienceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return create_response(
                data=serializer.data,
                message="Experience created successfully",
                status_code=status.HTTP_201_CREATED
            )
        return create_response(
            message="Invalid data provided",
            data=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return create_response(
            message=f"Error creating experience: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def experience_update(request, pk):
    """
    Update an experience.
    """
    try:
        experience = Experience.objects.get(pk=pk)
        serializer = ExperienceSerializer(experience, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return create_response(
                data=serializer.data,
                message="Experience updated successfully"
            )
        return create_response(
            message="Invalid data provided",
            data=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST
        )
    except ObjectDoesNotExist:
        return create_response(
            message=f"Experience with id {pk} not found",
            status_code=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return create_response(
            message=f"Error updating experience: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def experience_delete(request, pk):
    """
    Delete an experience.
    """
    try:
        experience = Experience.objects.get(pk=pk)
        experience.delete()
        return create_response(
            message="Experience deleted successfully",
            status_code=status.HTTP_204_NO_CONTENT
        )
    except ObjectDoesNotExist:
        return create_response(
            message=f"Experience with id {pk} not found",
            status_code=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return create_response(
            message=f"Error deleting experience: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
@permission_classes([AllowAny])
def sign_in(request):
    """
    Sign in with Supabase and get a JWT token
    """
    try:
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response(
                {'error': 'Email and password are required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Call Supabase auth endpoint
        response = requests.post(
            f"{settings.SUPABASE_URL}/auth/v1/token?grant_type=password",
            json={
                'email': email,
                'password': password
            },
            headers={
                'apikey': settings.SUPABASE_KEY,
                'Content-Type': 'application/json'
            }
        )

        if response.status_code == 200:
            return Response(response.json())
        else:
            logger.error(f"Supabase auth error: {response.text}")
            return Response(
                {'error': 'Authentication failed'},
                status=status.HTTP_401_UNAUTHORIZED
            )

    except Exception as e:
        logger.error(f"Sign in error: {str(e)}")
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
@permission_classes([AllowAny])
def sign_up(request):
    """
    Sign up a new user with Supabase
    """
    try:
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response(
                {'error': 'Email and password are required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Call Supabase signup endpoint
        response = requests.post(
            f"{settings.SUPABASE_URL}/auth/v1/signup",
            json={
                'email': email,
                'password': password
            },
            headers={
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0dG5ja2JnZHBxbWFyam1idHZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5OTA5MjksImV4cCI6MjA2NDU2NjkyOX0.NX_s2eMIbmIGR2ABHQe0-wL5WxE6vz6O275p4LODGW4',  # Use anon key
                'Content-Type': 'application/json'
            }
        )

        if response.status_code == 200:
            return Response(response.json())
        else:
            logger.error(f"Supabase signup error: {response.text}")
            return Response(
                {'error': 'Signup failed'},
                status=status.HTTP_400_BAD_REQUEST
            )

    except Exception as e:
        logger.error(f"Signup error: {str(e)}")
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
