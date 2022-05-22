class AdminNotFound(Exception):
    def __init__(self, message="Administrator does'nt exist. Please check again!"):
        self.message = message
        super().__init__(self.message)

    def __str__(self):
        return f'AdminNotFound: {self.message}'
