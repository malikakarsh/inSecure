from dotenv import dotenv_values

class EnvGen:

    def __init__(self, template: str):
        self.env = dotenv_values(template)

    def populate(self, data: dict):
        self.env['SSH_IMAGE_NAME'] = data['docker']['image']['name']
        self.env['SSH_IMAGE_TAG'] = data['docker']['image']['tag']
        self.env['SSH_CONTAINER_NAME'] = data['docker']['container']['name']
        self.env['HOSTNAME'] = data['docker']['container']['hostname']
        self.env['BANTIME'] = data['ssh']['fail2ban']['bantime']
        self.env['MAXRETRY'] = data['ssh']['fail2ban']['maxretry']
        self.env['TIMEZONE'] = data['ssh']['timezone']
        self.env['USERNAME'] = data['ssh']['users'][1]['username']
        self.env['ROOT_PASSWORD'] = data['ssh']['users'][0]['password']
        self.env['USER_PASSWORD'] = data['ssh']['users'][1]['password']

    def write(self, outfile: str):
        with open(outfile, 'w') as file:
            for var in self.env.keys():
                file.write(f"{var}={self.env[var]}\n")

    def generate(self, data: dict, outfile: str):
        self.populate(data)
        self.write(outfile)
