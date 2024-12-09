import datetime
from typing import Optional


class PlaybookWorkflow:
    """
    This class representing a playbook workflow.
    """
    s3_file_id: Optional[str] = None
    workflow_url: Optional[str] = None
    workflow_api_url: Optional[str] = None
    public_url: Optional[str] = None

    def __init__(self,
                 workflow_id: str,
                 name: str,
                 owner_id: str,
                 team_id: str,
                 last_edited: datetime.datetime,
                 is_external: bool,
                 canvas_type: str,
                 public: bool,
                 last_form_data: dict,):
        self.workflow_id = workflow_id
        self.name = name
        self.owner_id = owner_id
        self.team_id = team_id
        self.last_edited = last_edited
        self.is_external = is_external
        self.canvas_type = canvas_type
        self.public = public
        self.last_form_data = last_form_data

