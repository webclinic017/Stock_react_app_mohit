"""
ASGI config for demo1 project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'demo1.settings')

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    # 'websocket': AuthMiddlewareStack(URLRouter(ws_urlpatterns))
})


