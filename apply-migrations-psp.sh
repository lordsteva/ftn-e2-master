#!/usr/bin/env bash

pushd ./apps/psp/hasura
#psp
echo PSP
hasura migrate apply --all-databases --admin-secret admin-secret --endpoint http://localhost:8080
hasura metadata apply --admin-secret admin-secret --endpoint http://localhost:8080
popd