#!/bin/bash

docker build . -t europe-central2-docker.pkg.dev/dash-demo-f1846/dashboard-backend/api -f apps/api/Dockerfile

docker push europe-central2-docker.pkg.dev/dash-demo-f1846/dashboard-backend/api