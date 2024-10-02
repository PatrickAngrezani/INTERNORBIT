from django.shortcuts import render, get_object_or_404
from .models import Post
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


def post_list(request):
    posts = Post.objects.all().values()
    return JsonResponse(list(posts), safe=False)


def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    return JsonResponse({'id': post.id, 'title': post.title, 'content': post.content})


@csrf_exempt
def post_create(request):
    if request.method == "POST":
        data = json.loads(request.body)
        post = Post.objects.create(
            title=data['title'], content=data['content'])
        return JsonResponse({'id': post.id, 'title': post.title, 'content': post.content})


@csrf_exempt
def post_update(request, pk):
    if request.method == 'PUT':
        data = json.loads(request.body)
        post = get_object_or_404(Post, pk=pk)
        post.title = data['title']
        post.content = data['content']
        post.save()
        return JsonResponse({'id': post.id, 'title': post.title, 'content': post.content})


@csrf_exempt
def post_delete(request, pk):
    if request.method == 'DELETE':
        post = get_object_or_404(Post, pk=pk)
        post.delete()
        return JsonResponse({'message': 'Post deleted succesfully'})
