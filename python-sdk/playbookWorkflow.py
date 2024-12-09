import json


class PlaybookWorkflow:
    """
    This class representing a playbook workflow.
    """

    def __init__(self,
                 workflow_id: str,
                 name: str,
                 owner_id: str,
                 team_id: str,
                 last_edited: str,
                 is_external: bool,
                 canvas_type: str,
                 public: bool,
                 last_form_data: dict,
                 s3_file_id: str,
                 workflow_url: str,
                 workflow_api_url: str,
                 public_url: str,):
        self.workflow_id = workflow_id
        self.name = name
        self.owner_id = owner_id
        self.team_id = team_id
        self.last_edited = last_edited
        self.is_external = is_external
        self.canvas_type = canvas_type
        self.public = public
        self.last_form_data = last_form_data,
        self.s3_file_id = s3_file_id,
        self.workflow_url = workflow_url,
        self.workflow_api_url = workflow_api_url,
        self.public_url = public_url,

    @classmethod
    def from_json(cls, json_data: dict) -> "PlaybookWorkflow":
        """
        Creates a PlaybookWorkflow object from a JSON payload.
        :param json_data: JSON data to decode
        :return: a PlaybookWorkflow object
        """

        return cls(
            workflow_id=json_data.get("id"),
            name=json_data.get("name"),
            owner_id=json_data.get("owner_id"),
            team_id=json_data.get("team_id"),
            last_edited=json_data.get("last_edited"),
            is_external=json_data.get("is_external"),
            canvas_type=json_data.get("canvas_type"),
            public=json_data.get("public"),
            last_form_data=json_data.get("last_form_data"),
            s3_file_id=json_data.get("s3_file_id"),
            workflow_url=json_data.get("workflow_url"),
            workflow_api_url=json_data.get("workflow_api_url"),
            public_url=json_data.get("public_url"),
        )

    def to_json(self) -> str:
        return json.dumps({
            "id": self.workflow_id,
            "name": self.name,
            "owner_id": self.owner_id,
            "team_id": self.team_id,
            "last_edited": self.last_edited,
            "is_external": self.is_external,
            "canvas_type": self.canvas_type,
            "public": self.public,
            "last_form_data": self.last_form_data,
            "s3_file_id": self.s3_file_id,
            "workflow_url": self.workflow_url,
            "workflow_api_url": self.workflow_api_url,
            "public_url": self.public_url,
        })

