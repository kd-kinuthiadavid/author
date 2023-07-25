#!/bin/bash

# Get the Doppler token and assign it to the DOPPLER_TOKEN variable
DOPPLER_TOKEN="$(doppler configs tokens create --project author --config dev docker-dev-token --plain)"

# Start the Docker services using docker-compose with the obtained token
DOPPLER_TOKEN="$DOPPLER_TOKEN" docker-compose -f docker-compose.yml up --build
