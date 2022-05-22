class UsernameNotFound(Exception):
    def __init__(self, message="Username does'nt exist. Please check again!"):
        self.message = message
        super().__init__(self.message)

    def __str__(self):
        return f'UsernameNotFound: {self.message}'
