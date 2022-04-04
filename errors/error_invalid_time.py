class InvalidTime(Exception):
    def __init__(self, message="Time of departure can't be later than he landing!"):
        self.message = message
        super().__init__(self.message)

    def __str__(self):
        return f'InvalidTime: {self.message}'