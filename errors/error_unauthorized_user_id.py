class UnauthorizedUserID(Exception):
    def __init__(self, message="Unauthorized user ID! Make sure the user's role is defined properly"):
        self.message = message
        super().__init__(self.message)

    def __str__(self):
        return f'UnauthorizedUserID: {self.message}'
