#!/usr/bin/env bash

pushd ./apps/web-shop-back/actios/hasura
#psp
echo WS1
hasura migrate apply --all-databases --admin-secret admin-secret --endpoint http://localhost:8081
hasura metadata apply --admin-secret admin-secret --endpoint http://localhost:8081
popd