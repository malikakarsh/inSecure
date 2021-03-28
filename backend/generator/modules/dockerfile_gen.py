class DockerfileGen:

    def __init__(self, template: str):
        self.dockerfile = open(template, 'r').readlines()

    def populate(self, data: dict):
        base = data['docker']['container']['base']
        for i in len(self.dockerfile):
            if not self.dockerfile[i].isspace():
                break
        self.dockerfile[i] = f"FROM {base} AS base\n"

    def write(self, outfile: str):
        with open(outfile, 'w') as file:
            file.writelines(self.dockerfile)
