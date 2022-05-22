class InvalidUserRole(Exception):
    def __init__(self, message="Invalid user-role: Please make sure it's 1, 2 or 3!"):
        self.message = message
        super().__init__(self.message)

    def __str__(self):
        return f'InvalidUserRole: {self.message}'
