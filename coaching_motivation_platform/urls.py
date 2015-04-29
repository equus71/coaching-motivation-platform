from django.conf.urls import include, url
from rest_framework import routers

from contacts import views


router = routers.DefaultRouter()
router.register(r'contacts', views.ContactViewSet)
router.register(r'messages', views.MessageViewSet)
router.register(r'messageTemplates', views.MessageTemplatesViewSet)
router.register(r'tags', views.TagViewSet)
router.register(r'contacts/(?P<contact_id>[0-9]+)/messages', views.ContactMessagesViewSet, 'message-list')
# router.register(r'stats', views.StatsView.as_view(), 'stats')

urlpatterns = [
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/stats/', views.StatsView.as_view(), name='stats'),
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
