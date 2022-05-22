class InvalidToken(Exception):
    def __init__(self, message="Invalid login token - Check with your Administrator!"):
        self.message = message
        super().__init__(self.message)

    def __str__(self):
        return f'InvalidToken: {self.message}'
