class TicketNotFound(Exception):
    def __init__(self, message="Your requested ticket was not found. Please check again!"):
        self.message = message
        super().__init__(self.message)

    def __str__(self):
        return f'TicketNotFound: {self.message}'
