class InvalidAPITokenRequest(Exception):
    """
    API Token request is invalid
    """
    pass

class InvalidAPITokenResponse(Exception):
    """
    API Token response is invalid
    """
    pass

class APIKeyNotAvailable(Exception):
    """
    API Key is not found
    """
    pass

class AuthenticatedRequestError(Exception):
    """
    Authenticated request error
    """
    pass

class UserRequestError(Exception):
    """
    User request error
    """
    pass

class WorkflowRequestError(Exception):
    """"
    Workflow request error
    """
    pass

class TeamRequestError(Exception):
    """
    Team request error
    """
    pass