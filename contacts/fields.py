import json
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from contacts.models import Tag


class TagListField(serializers.Field):
    """
    Field serializing list of the Tags to the list of their names and serializing back names
    to the ids of the Tags.
    """

    def to_representation(self, value):
        all_tags = value.all()
        all_tags_list = []
        for tag in all_tags:
            all_tags_list.append(tag.name)
        return all_tags_list

    def to_internal_value(self, data):
        tags = []
        for tag_name in data:
            tag, created = Tag.objects.get_or_create(name=tag_name)
            tags.append(tag.id)
        return tags
