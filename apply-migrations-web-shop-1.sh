#!/usr/bin/env bash

pushd ./apps/web-shop-back/hasura
#psp
echo WS1
hasura migrate apply --all-databases --admin-secret admin-secret --endpoint https://localhost:8081 --insecure-skip-tls-verify
hasura metadata apply --admin-secret admin-secret --endpoint https://localhost:8081 --insecure-skip-tls-verify
popd