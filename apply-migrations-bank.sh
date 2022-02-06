#!/usr/bin/env bash

pushd ./apps/bank/hasura
#bank1
echo BANK 1
hasura migrate apply --all-databases --admin-secret admin-secret --endpoint https://localhost:18099 --insecure-skip-tls-verify
hasura metadata apply --admin-secret admin-secret --endpoint https://localhost:18099 --insecure-skip-tls-verify
#bank2
echo BANK 2
hasura migrate apply --all-databases --admin-secret admin-secret --endpoint https://localhost:28099 --insecure-skip-tls-verify
hasura metadata apply --admin-secret admin-secret --endpoint https://localhost:28099 --insecure-skip-tls-verify
popd
pushd ./apps/pcc/hasura
#pcc
echo PCC
hasura migrate apply --all-databases --admin-secret admin-secret --endpoint https://localhost:30000 --insecure-skip-tls-verify
hasura metadata apply --admin-secret admin-secret --endpoint https://localhost:30000 --insecure-skip-tls-verify
popd 