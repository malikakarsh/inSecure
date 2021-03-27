
FROM php:7.4.5-apache

ARG TIMEZONE
ARG USERNAME
ARG ROOT_PASSWORD
ARG USER_PASSWORD

RUN ln -snf /usr/share/zoneinfo/$TIMEZONE /etc/localtime && \
    echo $TIMEZONE > /etc/timezone && \
    apt-get update && \
    apt-get -y install --no-install-recommends openssh-server && \
    rm /etc/ssh/sshd_config

COPY sshd_config /etc/ssh
COPY startup.sh /root

RUN chmod +x /root/startup.sh && \
    sed -i "s/username/$USERNAME/g" /etc/ssh/sshd_config && \
    useradd -m $USERNAME && \
    echo "root:$ROOT_PASSWORD" | chpasswd && \
    echo "$USERNAME:$USER_PASSWORD" | chpasswd && \
    apt-get install python3 -y


USER $USERNAME

WORKDIR /home/$USERNAME

COPY index.php /var/www/html

RUN mkdir .ssh && \
    ssh-keygen -q -t rsa -N '' -f ./.ssh/ssh_host_rsa_key && \
    ssh-keygen -q -t dsa -N '' -f ./.ssh/ssh_host_dsa_key && \
    ssh-keygen -q -t ecdsa -N '' -f ./.ssh/ssh_host_ecdsa_key && \
    ssh-keygen -q -t ed25519 -N '' -f ./.ssh/ssh_host_ed25519_key

USER root

WORKDIR /root

COPY shell.py /home

RUN sed -i "s/sshUser/$USERNAME/g" /home/shell.py && \
    chmod +x /home/shell.py && \
    usermod --shell /home/shell.py $USERNAME

ENTRYPOINT ["/bin/bash"]

EXPOSE 80

CMD ["./startup.sh"]
