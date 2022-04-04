class UserAlreadyExists(Exception):
    def __init__(self, message="This user ID is already registered!"):
        self.message = message
        super().__init__(self.message)

    def __str__(self):
        return f'UserAlreadyExists: {self.message}'