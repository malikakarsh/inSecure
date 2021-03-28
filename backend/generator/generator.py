from os.path import dirname, realpath, join, basename
from os import chdir, mkdir, walk
from datetime import datetime
from zipfile import ZipFile
from shutil import rmtree
from .modules.env_gen import EnvGen
from .modules.yaml_gen import YamlGen
from .modules.dockerfile_gen import DockerfileGen
import logging

def create_logger(log_file: str):
    logger = logging.getLogger()
    log_formatter = logging.Formatter("*"*30 + "\n%(asctime)s - %(name)s - %(levelname)s - %(message)s - %(funcName)s - line %(lineno)d\n")
    file_handler = logging.FileHandler(log_file)
    file_handler.setFormatter(log_formatter)
    logger.addHandler(file_handler)
    file_handler.setLevel(logging.DEBUG)
    logger.setLevel(logging.DEBUG)
    return logger

def assign_dir(parent_dir: str, prefix: str) -> str:
    suffix = datetime.now().strftime("%Y.%m.%d_%H.%M.%S")
    filename = prefix + '_' + suffix
    return join(parent_dir, filename)

class ZipGen:

    def __init__(self):
        self.cwd = dirname(realpath(__file__))
        self.templates = join(self.cwd, 'templates')
        self.outdir = assign_dir(join(self.cwd, 'out/generated'), 'files')
        self.logger = create_logger(join(self.cwd, 'generator.log'))
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
        try:
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
            return basename(f'{self.outdir}.zip')
        except Exception as e:
            self.logger.exception(str(e))
            return ''
