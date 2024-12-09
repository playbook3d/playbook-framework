import base64
import os

import requests
import jwt.utils
import json

from requests import exceptions, Response
from playbookErrorHandler import *
from playbookUser import PlaybookUser
from playbookWorkflow import PlaybookWorkflow
from playbookTeam import PlaybookTeam
from typing import List
from dotenv import load_dotenv

load_dotenv()

class PlaybookClient :
    """
    This class implements functionality to use the Playbook API.
    """
    api_key: str = None

    def __init__(self) -> None:
        pass

    def set_api_key(self, api_key: str) -> None:
        """
        Sets the current user API key for the playbook client.
        :param api_key: UUID
        """
        self.api_key = api_key

    def __get_user_jwt__(self) -> str:
        """
        Internal method used to get a user's token
        :return: User's JWT
        """
        base_url = os.environ.get("BASE_ACCOUNTS_URL")
        try:
            if self.api_key is None:
                raise APIKeyNotAvailable("API key not set")
            token_request = requests.get(url=f"{base_url}/token-wrapper/get-tokens/{self.api_key}")
            return token_request.json()["access_token"]
        except exceptions.HTTPError as err:
            raise InvalidAPITokenRequest(err)

    def get_authenticated_request(self, request: str) -> Response | None:
        """
        Sends an authenticated request for playbook API usage
        :param request: url for request
        :return: Authenticated Response
        """

        token = self.__get_user_jwt__()
        if token is not None:
            headers = {"Authorization": f"Bearer {token}", "x-api-key": os.environ["API_KEY"]}
            authenticated_request = requests.get(request, headers=headers)
            if authenticated_request.status_code != 200:
                raise AuthenticatedRequestError(authenticated_request.status_code)
            return authenticated_request
        else:
            raise InvalidAPITokenRequest()

    def __parse_jwt_data__(self, token: str) -> dict | None:
        try:
            payload_segment = token.split(".")[1]
            payload_bytes = payload_segment.encode("ascii")
            payload_json = jwt.utils.base64url_decode(payload_bytes)
            payload = json.loads(payload_json)
            return payload
        except(IndexError, UnicodeDecodeError, ValueError) as e:
            print(e)
            raise ValueError

    def get_user_data(self) -> PlaybookUser | None:
        """
        Returns current user data
        :return: PlaybookUser
        """

        current_user_token = self.__get_user_jwt__()
        if current_user_token is None:
            raise InvalidAPITokenRequest()
        decoded_jwt = self.__parse_jwt_data__(current_user_token)
        current_user_token = decoded_jwt["username"]
        user_base_url = os.environ["BASE_ACCOUNTS_URL"]
        user_request = self.get_authenticated_request(f"{user_base_url}/users/cognito/{current_user_token}/info")
        if user_request.status_code != 200:
            raise UserRequestError(user_request.status_code)
        response = user_request.json()
        current_user = PlaybookUser.from_json(response)
        return current_user


    def get_user_workflows(self) -> List[PlaybookWorkflow] | None:
        """
        Returns available workflows based on current user
        :return: List of [PlaybookWorkflow]
        """

        workflow_url = os.environ["BASE_ACCOUNTS_URL"]
        workflows_request = self.get_authenticated_request(f"{workflow_url}/workflows")
        if workflows_request.status_code != 200:
            raise WorkflowRequestError(workflows_request.status_code)
        workflow_response = workflows_request.json()
        available_workflows = []
        for workflow in workflow_response:
            internal_workflow = PlaybookWorkflow.from_json(workflow)
            available_workflows.append(internal_workflow)
        return available_workflows

    def get_user_teams(self) -> List[PlaybookTeam] | None:
        """
        Returns available teams for current user
        :return: list of [PlaybookTeam]
        """

        team_url = os.environ.get("BASE_ACCOUNTS_URL")
        team_request = self.get_authenticated_request(f'{team_url}/teams')
        if team_request.status_code != 200:
            raise TeamRequestError(team_request.status_code)
        response = team_request.json()
        available_teams = []
        for team in response:
            current_team = PlaybookTeam.from_json(team)
            available_teams.append(current_team)
        return available_teams

    def run_workflow(self, workflow: PlaybookWorkflow) -> str | None:
        """
        Runs a workflow on cloud GPU
        :param workflow: PlaybookWorkflow
        :return: run_id
        """

        team = workflow.team_id
        workflow_id = workflow.workflow_id




