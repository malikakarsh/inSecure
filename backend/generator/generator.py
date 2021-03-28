from os.path import dirname, realpath, join
from os import chdir, mkdir, walk
from datetime import datetime
from zipfile import ZipFile
from shutil import rmtree
from modules.env_gen import EnvGen
from modules.yaml_gen import YamlGen
from modules.dockerfile_gen import DockerfileGen

def assign_dir(parent_dir: str, prefix: str) -> str:
    suffix = datetime.now().strftime("%Y.%m.%d_%H.%M.%S")
    filename = '_'.join(prefix, suffix)
    return join(parent_dir, filename)

class ZipGen:

    def __init__(self):
        self.cwd = dirname(realpath(__file__))
        self.templates = join(self.cwd, 'templates')
        self.outdir = assign_dir(join(self.cwd, 'out/generated'), 'files')
        mkdir(self.outdir)

    def generate_env(self, data: dict):
        template = join(self.templates, 'template.env')
        outfile = join(self.outdir, '.env')
        EnvGen(template).generate(data, outfile)

    def generate_yaml(self, data: dict):
        template = join(self.templates, 'template.yml')
        outfile = join(self.outdir, 'docker-compose.yml')
        YamlGen(template).generate(data, outfile)

    def generate_dockerfile(self, data: dict):
        template = join(self.templates, 'template.dockerfile')
        outfile = join(self.outdir, 'Dockerfile')
        DockerfileGen(template).generate(data, outfile)

    def generate_files(self, data: dict):
        self.generate_env(data)
        self.generate_yaml(data)
        self.generate_dockerfile(data)

    def generate(self, data: dict) -> str:
        self.generate_files(data)
        with ZipFile(f'{self.outdir}.zip', 'w') as zipfile:
            chdir(self.outdir)
            for root, dirs, files in walk(self.outdir):
                for file in files:
                    zipfile.write(join(root, file), file)
            
            chdir(join(self.cwd, 'out'))
            assets = ['config', 'startup']
            for asset in assets:
                for root, dirs, files in walk(asset):
                    for file in files:
                        zipfile.write(join(root, file), f'{root}\\{file}')
        
        rmtree(self.outdir)
        return f'{self.outdir}.zip'
