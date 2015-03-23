from django.conf.urls import include, url
from rest_framework import routers

from coaching_motivation_platform.quickstart import views


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

# partial_patterns = patterns('',
#                             url(r'^dashboard.html$',
#                                 PartialGroupView.as_view(template_name='partials/../static/app/dashboard/dashboard.html'),
#                                 name='dashboard'),
#                             url(r'^contacts.html$',
#                                 PartialGroupView.as_view(template_name='partials/../static/app/contacts/contacts.html'),
#                                 name='contacts'),
#                             url(r'^messageTemplates.html$',
#                                 PartialGroupView.as_view(template_name='partials/messageTemplates.html'),
#                                 name='messageTemplates'),
# )

urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # url(r'^partials/', include(partial_patterns, namespace='partials')),
]
