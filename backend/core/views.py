from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.exceptions import ObjectDoesNotExist
from .models import ResearchArea, Publication, Award, Teaching, Education
from .serializers import (
    ResearchAreaSerializer, PublicationSerializer, AwardSerializer,
    TeachingSerializer, EducationSerializer
)

class ResearchAreaViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing ResearchArea instances.
    """
    queryset = ResearchArea.objects.all()
    serializer_class = ResearchAreaSerializer

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
