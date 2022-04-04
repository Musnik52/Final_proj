class InvalidLocation(Exception):
    def __init__(self, message="Origin and destination countries can't be the same country!"):
        self.message = message
        super().__init__(self.message)

    def __str__(self):
        return f'InvalidLocation: {self.message}'