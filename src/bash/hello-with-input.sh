#!/usr/bin/env bash

echo "Who are you"
read name
echo "Hello, $name."

echo "What are you doing?"
read action
# if you want to append somenting to the variable value while printing it,
# use curly brackets around the variablename.
echo "You are ${action}ing."
