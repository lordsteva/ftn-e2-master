#!/usr/bin/env bash

pushd ./apps/web-shop-back2/actios/hasura
#psp
echo WS2
hasura migrate apply --all-databases --admin-secret admin-secret --endpoint http://localhost:8082
hasura metadata apply --admin-secret admin-secret --endpoint http://localhost:8082
popd