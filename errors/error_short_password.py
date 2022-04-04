class PasswordTooShort(Exception):
    def __init__(self, message="Password too short. Please choose a longer password!"):
        self.message = message
        super().__init__(self.message)

    def __str__(self):
        return f'PasswordTooShort: {self.message}'