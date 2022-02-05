#!/usr/bin/env bash

pushd ./apps/psp/hasura
#psp
echo PSP
hasura migrate apply --all-databases --admin-secret admin-secret --endpoint https://localhost:8080 --insecure-skip-tls-verify
hasura metadata apply --admin-secret admin-secret --endpoint https://localhost:8080 --insecure-skip-tls-verify
popd