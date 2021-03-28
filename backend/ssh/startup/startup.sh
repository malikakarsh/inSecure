#!/bin/bash

dummy_ssh_login() {
    sudo sshpass -p 'abcd' ssh -o StrictHostKeyChecking=no $1@$2 1>/dev/null 2>&1
    return 0
}

find_and_replace() {
    data=$(sudo cat $3)
    sudo echo "${data//$1/$2}" > $3
}

config='/root/config.json'
username=$(jq -r ".ssh.username" $config )
bantime=$(jq -r ".fail2ban.bantime" $config)
maxretry=$(jq -r ".fail2ban.maxretry" $config)

find_and_replace username $username /etc/ssh/sshd_config
find_and_replace BANTIME $bantime /etc/fail2ban/jail.local
find_and_replace MAXRETRY $maxretry /etc/fail2ban/jail.local

sudo service ssh start
sudo service rsyslog start
# just so that rsyslog created /var/log/auth.log
dummy_ssh_login $username localhost
sudo service fail2ban start

/bin/bash
