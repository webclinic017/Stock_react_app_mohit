from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from kiteconnectapp import routing as kiteconnectapp_routes

application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter(
            kiteconnectapp_routes.ws_urlpatterns
        )
    ),
})



# from channels.security.websocket import AllowedHostsOriginValidator
# application = ProtocolTypeRouter({
#
#     'websocket':AllowedHostsOriginValidator(
#         AuthMiddlewareStack(
#             URLRouter(
#                 [
#                 kiteconnectapp_routes.websocket_urlpatterns
#                 ]
#             )
#         )
#     )
# })
