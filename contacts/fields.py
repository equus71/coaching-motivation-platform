import json
from rest_framework import serializers
from rest_framework.exceptions import ValidationError


class TagListField(serializers.Field):
    """
    Field serializing list of the tags to the JSON string representation
    """

    def to_representation(self, value):
        try:
            return json.loads(value)
        except ValueError:
            return []

    def to_internal_value(self, data):
        try:
            return json.dumps(data)
        except ValueError:
            raise ValidationError('Incorrect format.')
