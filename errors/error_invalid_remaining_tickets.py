class InvalidRemainingTickets(Exception):
    def __init__(self, message="Can't input a negative number of remaining tickets!"):
        self.message = message
        super().__init__(self.message)

    def __str__(self):
        return f'InvalidRemainingTickets: {self.message}'