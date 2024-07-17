# views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from DemoApp.models import Task  # Adjusted model name to start with uppercase
from DemoApp.serializers import TaskSerializer  # Adjusted serializer name to follow conventions


@api_view(['POST'])
def api_add(request):
    try:
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors['description'])
            input()
            return Response({'error': serializer.errors} ,  status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def api_get(request):
    try:
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def api_update(request, pk):
    print(request.data)
    try:
        task_instance = Task.objects.get(pk=pk)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

    serializer = TaskSerializer(instance=task_instance, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def api_delete(request, pk):

    try:
        task_instance = Task.objects.get(pk=pk)
    # except Task.DoesNotExist:
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
    task_instance.delete()
    return Response('Task deleted successfully', status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def api_get_task_by_id(request, pk=None):
    print(pk)  # Print the task ID for debugging
    if pk is None:
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
    else:
        try:
            task_instance = Task.objects.get(pk=int(pk))
            serializer = TaskSerializer(task_instance)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

    return Response(serializer.data)
