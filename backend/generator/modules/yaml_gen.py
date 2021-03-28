import yaml

class YamlGen:

    def __init__(self, template: str):
        with open(template, 'r') as file:
            self.yml = yaml.load(file)

    def populate(self, data: dict) -> dict:
        ports = data['docker']['container']['ports']
        mappings = []
        for mapped, exposed in zip(ports['mapped'], ports['exposed']):
            mappings.append(f"{mapped}:{exposed}")
        self.yml['services']['ssh']['ports'] = mappings
        return self.yml

    def write(self, outfile: str):
        with open(outfile, 'w') as file:
            yaml.dump(self.yml, file)

    def generate(self, data: dict, outfile: str):
        self.populate(data)
        self.write(outfile)
