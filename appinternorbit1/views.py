from django.shortcuts import render, get_object_or_404, redirect
from .models import Post
from django.http import JsonResponse
from .forms import PostForm
from django.contrib.auth.decorators import login_required


def post_list(request):
    posts = Post.objects.all().values()
    return JsonResponse(list(posts), safe=False)


def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    return JsonResponse({'id': post.id, 'title': post.title, 'content': post.content})


@login_required
def post_create(request):
    if request.method == "POST":
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.save()
            return redirect('post_list')
        else:
            print(form.errors)
    else:
        form = PostForm()

    return render(request, 'post_form.html', {
        'form': form,
        'form_title': 'Create New Post',
        'button_text': 'Create Post'
    })


@login_required
def post_update(request, pk):
    post = get_object_or_404(Post, pk=pk)

    if request.method == 'POST':
        form = PostForm(request.POST, instance=post)
        if form.is_valid():
            form.save()
            return redirect('post_detail', pk=post.pk)
        else:
            form = PostForm(instance=post)

        return render(request, 'post_form.html', {
            'form': form,
            'post': post,
            'form_title': 'Update Post',
            'button_text': 'Save Changes'
        })


@login_required
def post_delete(request, pk):
    if request.method == 'DELETE':
        post = get_object_or_404(Post, pk=pk)
        post.delete()
        return JsonResponse({'message': 'Post deleted succesfully'})
