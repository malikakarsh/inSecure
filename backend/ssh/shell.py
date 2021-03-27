#!/usr/bin/python3
import os
import subprocess
import shlex

# path = f"/home/zest/activity.log"
# file = open(path, 'w+')
SSH_USER = "USERNAME"


def shell_cmd(cmd):
    output = shlex.split(cmd)
    if "cd" in output:
        try:
            os.chdir(output[1])
        except Exception as e:
            print("")
    else:
        try:
            # ip = os.popen("echo $SSH_CLIENT").read()
            # file.write(f"{ip} {cmd}")
            os.system(cmd)

        except Exception as e:
            print(e)


def main():
    while True:
        try:
            x = input(f"\u001b[32m{SSH_USER}@inSecure\u001b[0m -> ")

            if x == 'exit':
                # file.close()
                break

            shell_cmd(x)

        except Exception as e:
            print(e)


if __name__ == '__main__':
    main()
