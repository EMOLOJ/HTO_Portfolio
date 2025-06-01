from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.exceptions import ObjectDoesNotExist
from .models import ResearchArea
from .serializers import ResearchAreaSerializer

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
