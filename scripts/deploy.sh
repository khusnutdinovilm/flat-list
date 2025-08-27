#!/bin/bash

$ACTIVE_BRANCH=$(git branch --show-current)

if [[ $ACTIVE_BRANCH != "master" ]]; then
  git checkout master
fi

git pull origin master
docker-compose down
docker-compose up --build -d
echo "Деплой завершен!"