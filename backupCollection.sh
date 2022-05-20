#!/usr/bin/env bash
gcloud config set project tdd-prod
gcloud beta firestore export gs://tdd-prod.appspot.com/19May2022v1 --collection-ids='users'
