#! /usr/bin/env bash

# Note that speaces cannot be used aroud the '=' assignment operator
whom_variable="World"

# Use printf to safely output the data
printf "Hello, %s\n" "$whom_variable"
