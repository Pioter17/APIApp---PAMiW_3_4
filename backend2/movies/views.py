from django.shortcuts import render
from rest_framework import viewsets

from movies.models import Movie
from movies.serializers import MovieSerializer


# Create your views here.
class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        name_query = self.request.query_params.get('name')

        if name_query:
            qs = qs.filter(name__icontains=name_query)

        return qs