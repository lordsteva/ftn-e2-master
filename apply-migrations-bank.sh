#!/usr/bin/env bash

pushd ./apps/bank/hasura
#bank1
echo BANK 1
hasura migrate apply --all-databases --admin-secret admin-secret --endpoint http://localhost:18099
hasura metadata apply --admin-secret admin-secret --endpoint http://localhost:18099
#bank2
echo BANK 2
hasura migrate apply --all-databases --admin-secret admin-secret --endpoint http://localhost:28099
hasura metadata apply --admin-secret admin-secret --endpoint http://localhost:28099
popd
pushd ./apps/pcc/hasura
#pcc
echo PCC
hasura migrate apply --all-databases --admin-secret admin-secret --endpoint http://localhost:30000
hasura metadata apply --admin-secret admin-secret --endpoint http://localhost:30000
popd 