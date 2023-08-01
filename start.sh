#!/bin/bash

# Get the Doppler token and assign it to the DOPPLER_TOKEN variable
export DOPPLER_TOKEN="$(doppler configs tokens create --project author --config dev docker-dev-token --plain)"
echo "done exporting doppler token"