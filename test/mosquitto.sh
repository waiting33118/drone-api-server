#!/bin/bash

# mosquitto_sub -h 35.201.182.150 -t drone/message -v&\
mosquitto_sub -h 35.201.182.150 -t drone/cmd_ack -v&\
mosquitto_sub -h 35.201.182.150 -t drone/mission_ack -v&
mosquitto_sub -h 35.201.182.150 -t drone/apm_text -v

