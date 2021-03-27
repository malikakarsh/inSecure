#!/usr/bin/python3
import os
import subprocess,shlex


def main():
    username = "sshUser"
    while True:
        try:
            x = input(f"\u001b[32m{username}@enSecure\u001b[0m -> ")

            if x == 'exit':
                break

            print("Hello")
            os.system(x)

        except Exception as e:
            print(e)

if __name__ == '__main__':
    main()
