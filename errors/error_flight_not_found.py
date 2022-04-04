class FlightNotFound(Exception):
    def __init__(self, message="Flight not found. Please check again!"):
        self.message = message
        super().__init__(self.message)

    def __str__(self):
        return f'FlightNotFound: {self.message}'