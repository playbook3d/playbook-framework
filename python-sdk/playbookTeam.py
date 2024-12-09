import json


class PlaybookTeam:
    """
    This class represents a playbook team.
    """

    def __init__(self,
                 team_id: str,
                 name: str,
                 last_login: str,
                 gpu_usage_total: float,
                 gpu_usage_billing_period: float,
                 custom_monthly_rate: float,
                 custom_free_credit: float,
                 modal_app_id: str,
                 model_urls: dict,
                 ):
        self.team_id = team_id
        self.name = name
        self.last_login = last_login
        self.gpu_usage_total = gpu_usage_total
        self.gpu_usage_billing_period = gpu_usage_billing_period
        self.custom_monthly_rate = custom_monthly_rate
        self.custom_free_credit = custom_free_credit
        self.modal_app_id = modal_app_id
        self.model_urls = model_urls


    @classmethod
    def from_json(cls, json_data: dict) -> 'PlaybookTeam':
        """
        Creates a PlaybookTeam object from JSON data.
        :param json_data: JSON data to decode
        :return: A PlaybookTeam object
        """

        return cls(
            team_id=json_data["id"],
            name=json_data["name"],
            last_login=json_data["last_login"],
            gpu_usage_total=json_data["gpu_usage_total"],
            gpu_usage_billing_period=json_data["gpu_usage_billing_period"],
            custom_monthly_rate=json_data.get("custom_monthly_rate"),
            custom_free_credit=json_data.get("custom_free_credit"),
            modal_app_id=json_data.get("modal_app_id"),
            model_urls=json_data.get("model_urls"),
        )

    def to_json(self) -> str:
        """
        Serializes PlaybookTeam object to JSON string.
        :return: JSON data
        """

        return json.dumps({
            "id": self.team_id,
            "name": self.name,
            "last_login": self.last_login.isoformat(),
            "gpu_usage_total": self.gpu_usage_total,
            "gpu_usage_billing_period": self.gpu_usage_billing_period,
            "custom_monthly_rate": self.custom_monthly_rate,
            "custom_free_credit": self.custom_free_credit,
            "modal_app_id": self.modal_app_id,
            "model_urls": self.model_urls,
        })
