import unittest
from playbookUser import PlaybookUser
from playbookTeam import PlaybookTeam
from playbookWorkflow import PlaybookWorkflow
from playbookNetworkClient import PlaybookClient

class TestPlaybookSDK(unittest.TestCase):
    def setUp(self):
        self.playbook_client = PlaybookClient()
        self.playbook_client.set_api_key("d668ce33-54f3-4ce0-bf39-8b762992e1ab")

    def test_create_team(self):
        team_data = {
    "id": "123456",
    "name": "Personal Team",
    "api_key": None,
    "last_login": None,
    "custom_monthly_rate": None,
    "custom_free_credit": None,
    "gpu_usage_total": None,
    "gpu_usage_billing_period": None,
    "model_urls": None,
    "modal_app_id": None,
    "created_at": "2024-11-26T21:51:22.896Z",
    "updated_at": "2024-11-26T21:51:22.896Z"
}
        new_team = PlaybookTeam.from_json(team_data)
        self.assertIsInstance(new_team, PlaybookTeam)
        self.assertEqual(new_team.name, "Personal Team")
        self.assertEqual(new_team.team_id, "123456")

    def test_get_teams(self):
        available_teams = self.playbook_client.get_user_teams()
        self.assertIsInstance(available_teams[0], PlaybookTeam)
        self.assertEqual(available_teams[0].name, "Personal Team")

    def test_create_user(self):
        user_data = {"id": "123456",
    "cognito_id": "google_123456",
    "name": None,
    "email": "user@playbook3d.com",
    "status": "Active",
    "tier_id": "123456",
    "user_type": "admin",
    "api_key": None,
    "last_login": None,
    "created_at": "2024-09-13T19:48:01.319Z",
    "updated_at": "2024-12-04T22:20:17.092Z",
    "gpu_usage_total": "0.00",
    "gpu_usage_billing_period": "0.00",
    "stripe_customer_id": "stripe",
    "stripe_subscription_id": "stripe",
    "has_active_subscription": None,}
        new_user = PlaybookUser.from_json(user_data)
        self.assertIsInstance(new_user, PlaybookUser)
        self.assertEqual(new_user.user_type, "admin")
        self.assertEqual(new_user.email, "user@playbook3d.com")

    def test_get_users(self):
        current_user = self.playbook_client.get_user_data()
        print(current_user)
        self.assertIsInstance(current_user, PlaybookUser)
        self.assertEqual(current_user.status, "Active")

    def test_create_workflow(self):
        workflow_data = {"id": "12345",
    "name": "Demo #1",
    "owner_id": "12345",
    "team_id": "12345",
    "last_edited": None,
    "workflow_url": None,
    "workflow_api_url": None,
    "is_external": None,
    "s3_file_id": "12345",
    "canvas_type": None,
    "public_url": None,
    "public": None,
    "created_at": "2024-11-30T01:11:50.295Z",
    "updated_at": "2024-12-07T23:26:45.240Z",
    "last_form_data": None}
        new_workflow = PlaybookWorkflow.from_json(workflow_data)
        self.assertIsInstance(new_workflow, PlaybookWorkflow)
        self.assertEqual(new_workflow.name, "Demo #1")
        self.assertEqual(new_workflow.owner_id, "12345")

    def test_get_workflows(self):
        available_workflows = self.playbook_client.get_user_workflows()
        self.assertIsInstance(available_workflows[0], PlaybookWorkflow)



    def tearDown(self):
        pass

    if __name__ == '__main__':
        unittest.main()