FROM php:7.4.5-apache

ARG TIMEZONE
ARG USERNAME
ARG ROOT_PASSWORD
ARG USER_PASSWORD
ARG BANTIME
ARG MAXRETRY

RUN ln -snf /usr/share/zoneinfo/${TIMEZONE} /etc/localtime && \
    echo $TIMEZONE > /etc/timezone && \
    useradd -m ${USERNAME} && \
    apt-get update && \
    apt-get -y install --no-install-recommends sudo openssh-server iptables fail2ban rsyslog sshpass python3 && \
    rm /etc/ssh/sshd_config

COPY config/sshd_config /etc/ssh
COPY config/jail.local /etc/fail2ban
COPY startup.sh /home/${USERNAME}
COPY index.php /var/www/html

RUN chmod +x /home/${USERNAME}/startup.sh && \
    sed -i "s/username/${USERNAME}/g" /etc/ssh/sshd_config && \
    sed -i "s/username/${USERNAME}/g" /home/${USERNAME}/startup.sh && \
    sed -i "s/BANTIME/${BANTIME}/g" /etc/fail2ban/jail.local && \
    sed -i "s/MAXRETRY/${MAXRETRY}/g" /etc/fail2ban/jail.local && \
    echo "root:${ROOT_PASSWORD}" | chpasswd && \
    echo "${USERNAME}:${USER_PASSWORD}" | chpasswd && \
    echo "${USERNAME} ALL = NOPASSWD: $(which service)" >> /etc/sudoers && \
    chown -R ${USERNAME}: /home/${USERNAME}

USER $USERNAME

WORKDIR /home/$USERNAME

RUN mkdir .ssh && \
    ssh-keygen -q -t rsa -N '' -f ./.ssh/ssh_host_rsa_key && \
    ssh-keygen -q -t dsa -N '' -f ./.ssh/ssh_host_dsa_key && \
    ssh-keygen -q -t ecdsa -N '' -f ./.ssh/ssh_host_ecdsa_key && \
    ssh-keygen -q -t ed25519 -N '' -f ./.ssh/ssh_host_ed25519_key
