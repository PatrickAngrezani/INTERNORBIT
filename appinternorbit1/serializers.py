from rest_framework import serializers
from .models import Post,  Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['content', 'author', 'created_at']
        read_only_fields = ['author', 'post', 'created_at']

class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'author', 'comments']
        read_only_fields = ['author']
