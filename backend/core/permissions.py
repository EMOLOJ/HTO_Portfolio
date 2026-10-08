from django.conf import settings
from rest_framework.permissions import BasePermission, SAFE_METHODS


def _get_allowed_professor_emails() -> set[str]:
    raw = getattr(settings, "PROFESSOR_EMAILS", []) or []
    return {e.strip().lower() for e in raw if isinstance(e, str) and e.strip()}


class IsProfessor(BasePermission):
    """
    Allows access only to authenticated users whose email is listed in
    settings.PROFESSOR_EMAILS.
    """

    message = "Professor access required."

    def has_permission(self, request, view) -> bool:
        user = getattr(request, "user", None)
        if not getattr(user, "is_authenticated", False):
            return False

        allowed = _get_allowed_professor_emails()
        if not allowed:
            # Safer default: if you haven't configured allowed emails,
            # don't allow write access.
            self.message = "Professor emails not configured on server."
            return False

        email = (getattr(user, "email", None) or "").strip().lower()
        return bool(email) and email in allowed


class IsProfessorOrReadOnly(BasePermission):
    """
    Read-only for everyone; write access only for professor.
    """

    def has_permission(self, request, view) -> bool:
        if request.method in SAFE_METHODS:
            return True
        return IsProfessor().has_permission(request, view)

