FROM python:3.11

RUN apt-get update && \
    apt-get install -y openssh-client && \
    apt-get clean

RUN pip install --upgrade pip

RUN pip install ansible

RUN pip install boto3 boto jsondiff

WORKDIR /playbooks

COPY playbook/* ./

RUN chmod 400 myKey.pem