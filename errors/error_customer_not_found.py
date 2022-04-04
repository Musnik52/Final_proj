class CustomerNotFound(Exception):
    def __init__(self, message="Customer does'nt exist. Please check again!"):
        self.message = message
        super().__init__(self.message)

    def __str__(self):
        return f'CustomerNotFound: {self.message}'