from django.shortcuts import render, get_object_or_404, redirect
from .models import Post
from django.http import JsonResponse
from .forms import PostForm
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import PostSerializer


@api_view(['GET'])
def post_list(request):
    title = request.GET.get('title')

    if title:
        posts = Post.objects.filter(title__icontains=title)
    else:
        posts = Post.objects.all().values()

    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    serializer = PostSerializer(post)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_create(request):
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(author=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def post_update(request, pk):
    post = get_object_or_404(Post, pk=pk)

    serializer = PostSerializer(post, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save(author=request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def post_delete(request, pk):
    if request.method == 'DELETE':
        post = get_object_or_404(Post, pk=pk)
        post.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
