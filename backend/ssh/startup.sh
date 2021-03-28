#!/bin/bash

dummy_ssh_login() {
    sshpass -p 'abcd' ssh -o StrictHostKeyChecking=no username@localhost 1>/dev/null 2>&1
    return 0
}

sudo service ssh start

sudo service rsyslog start

# just so that rsyslog created /var/log/auth.log
dummy_ssh_login

sudo service fail2ban start

/bin/bash
