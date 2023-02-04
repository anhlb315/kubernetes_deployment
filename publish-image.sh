#!/bin/sh
 
    sudo docker build -t anhlb315/k8s_app ./client
    sudo docker build -t anhlb315/k8s_api ./server
    sudo docker build -t anhlb315/k8s_nginx ./nginx
    sudo docker push anhlb315/k8s_app
    sudo docker push anhlb315/k8s_api
    sudo docker push anhlb315/k8s_nginx

