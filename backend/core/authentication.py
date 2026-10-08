from django.conf import settings
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
import jwt
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class SupabaseAuthentication(BaseAuthentication):
    """
    Custom authentication backend for Supabase JWT tokens
    """
    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if not auth_header:
            logger.warning("No Authorization header provided")
            return None

        try:
            # Check if the header starts with 'Bearer '
            if not auth_header.startswith('Bearer '):
                logger.error(f"Invalid Authorization header format: {auth_header}")
                raise AuthenticationFailed('Invalid Authorization header format. Must be "Bearer <token>"')

            # Extract the token from the header
            token = auth_header.split(' ')[1]
            if not token:
                logger.error("Empty token provided")
                raise AuthenticationFailed('Empty token provided')
            
            # Verify the token using Supabase's JWT secret
            try:
                decoded = jwt.decode(
                    token,
                    settings.SUPABASE_JWT_SECRET,
                    algorithms=['HS256'],
                    audience='authenticated'
                )
                logger.debug(f"Token decoded successfully: {decoded}")
                
                # Create a user object from the token claims
                user = type('User', (), {
                    'is_authenticated': True,
                    'id': decoded.get('sub', 'anonymous'),
                    'role': decoded.get('role', 'anonymous'),
                    'email': decoded.get('email') or decoded.get('user_email') or '',
                })
                
                return (user, token)

            except jwt.InvalidSignatureError as e:
                logger.error(f"Invalid signature: {str(e)}")
                raise AuthenticationFailed('Invalid token signature')
            except jwt.ExpiredSignatureError as e:
                logger.error(f"Token expired: {str(e)}")
                raise AuthenticationFailed('Token has expired')
            except jwt.InvalidTokenError as e:
                logger.error(f"Invalid token: {str(e)}")
                raise AuthenticationFailed(f'Invalid token: {str(e)}')

        except Exception as e:
            logger.error(f"Authentication error: {str(e)}")
            raise AuthenticationFailed(f'Authentication error: {str(e)}')

    def authenticate_header(self, request):
        return 'Bearer' 