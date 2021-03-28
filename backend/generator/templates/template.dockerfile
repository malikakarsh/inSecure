FROM image:tag AS base

ARG TIMEZONE
ARG USERNAME
ARG ROOT_PASSWORD
ARG USER_PASSWORD
ARG BANTIME
ARG MAXRETRY

RUN ln -snf /usr/share/zoneinfo/${TIMEZONE} /etc/localtime && \
    echo $TIMEZONE > /etc/timezone && \
    useradd -m ${USERNAME} && \
    mkdir /root/startup && \
    apt-get update && \
    apt-get -y install --no-install-recommends sudo openssh-server iptables fail2ban rsyslog sshpass python3 jq moreutils && \
    rm /etc/ssh/sshd_config /home/${USERNAME}/.bashrc && \
    usermod -aG sudo root && \
    usermod -aG sudo ${USERNAME} && \
    chmod +s $(which sudo)

COPY startup/config.json /root/startup

WORKDIR /root/startup

RUN jq ".ssh.username = \"${USERNAME}\"" config.json | sponge config.json && \
    jq ".fail2ban.bantime = \"${BANTIME}\"" config.json | sponge config.json && \
    jq ".fail2ban.maxretry = \"${MAXRETRY}\"" config.json | sponge config.json && \
    echo "root:${ROOT_PASSWORD}" | chpasswd && \
    echo "${USERNAME}:${USER_PASSWORD}" | chpasswd && \
    echo "${USERNAME} ALL = NOPASSWD: /root/startup.sh" >> /etc/sudoers && \
    usermod --shell /bin/bash ${USERNAME}

USER $USERNAME

WORKDIR /home/${USERNAME}

RUN mkdir .ssh && \
    ssh-keygen -q -t rsa -N "" -f ./.ssh/ssh_host_rsa_key && \
    ssh-keygen -q -t dsa -N "" -f ./.ssh/ssh_host_dsa_key && \
    ssh-keygen -q -t ecdsa -N "" -f ./.ssh/ssh_host_ecdsa_key && \
    ssh-keygen -q -t ed25519 -N "" -f ./.ssh/ssh_host_ed25519_key
