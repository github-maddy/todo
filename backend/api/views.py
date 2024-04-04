from rest_framework import viewsets
from .models import TodoModel
from .serializers import TodoSerializer

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = TodoModel.objects.all()