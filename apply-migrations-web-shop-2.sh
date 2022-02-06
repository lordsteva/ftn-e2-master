#!/usr/bin/env bash

pushd ./apps/web-shop-back2/actios/hasura
#psp
echo WS2
hasura migrate apply --all-databases --admin-secret admin-secret --endpoint https://localhost:8082 --insecure-skip-tls-verify
hasura metadata apply --admin-secret admin-secret --endpoint https://localhost:8082 --insecure-skip-tls-verify
popd