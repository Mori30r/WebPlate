import logging

from django.http import HttpResponse

logger = logging.getLogger(__name__)

def test_view(request):
    return HttpResponse("hi test app ")
    # Your view logic here