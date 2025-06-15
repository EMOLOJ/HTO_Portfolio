import jwt
from django.conf import settings
from django.contrib.auth.models import User, AnonymousUser
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
import logging

logger = logging.getLogger(__name__)

class SupabaseJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            logger.warning("No Authorization header found")
            return None

        try:
            # Extract the token from the Authorization header
            parts = auth_header.split()
            if len(parts) != 2 or parts[0].lower() != 'bearer':
                logger.error(f"Invalid Authorization header format: {auth_header}")
                raise AuthenticationFailed('Invalid Authorization header format. Must be "Bearer <token>"')

            token = parts[1]
            logger.info(f"Attempting to verify token: {token[:10]}...")

            # Decode and verify the JWT token
            try:
                payload = jwt.decode(
                    token,
                    settings.SUPABASE_JWT_SECRET,
                    algorithms=['HS256'],
                    audience='authenticated'
                )
                logger.info(f"Token verified successfully. Payload: {payload}")
            except jwt.ExpiredSignatureError:
                logger.error("Token has expired")
                raise AuthenticationFailed('Token has expired')
            except jwt.InvalidTokenError as e:
                logger.error(f"Token validation error: {str(e)}")
                raise AuthenticationFailed('Invalid token')

            # Create a simple User object for the request
            # We don't save this to Django's DB, it's just for the request context
            user = User(username=payload.get('email'), email=payload.get('email'))
            user.is_authenticated = True
            user.supabase_id = payload.get('sub') # Attach supabase_id if needed elsewhere
            logger.info(f"Created user object with username: {user.username} and supabase_id: {user.supabase_id}")

            return (user, None)

        except Exception as e:
            logger.error(f"Authentication error: {str(e)}")
            raise AuthenticationFailed(str(e)) 