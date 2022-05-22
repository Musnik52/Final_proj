class InvalidPassword(Exception):
    def __init__(self, message="Invalid password!"):
        self.message = message
        super().__init__(self.message)

    def __str__(self):
        return f'InvalidPassword: {self.message}'
