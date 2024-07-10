terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = var.aws_region
}

resource "aws_instance" "app_server" {
  count = var.aws_instance_number
  ami           = "ami-00ac45f3035ff009e"
  instance_type = "t2.micro"
  key_name      = "myKey"

  vpc_security_group_ids = [aws_security_group.app_server_sg.id]

  tags = {
    Name = "FinalWebM1"
  }

}

resource "aws_security_group" "app_server_sg" {
  name        = "app_server_sg"
  description = "Allow necessary inbound traffic for app servers"
  
  #SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

#HTTP
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

#Grafana
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

variable "aws_instance_number" {
  type = number
  default = 1
  validation {
    condition = var.aws_instance_number > 0
    error_message = "The number of instances must be greater than 0"
  }
}

variable "aws_region" {
  type = string
  default = "eu-west-3"
}

output "app_server_public_dns" {
  value = aws_instance.app_server[*].public_dns
}

output "app_server_public_ip" {
  value = aws_instance.app_server[*].public_ip
}