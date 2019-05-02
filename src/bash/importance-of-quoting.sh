#!usr/bin/env bash
world="World"
# there are two types of quoting:
# Weak: uses double quotes: "
# Strong: uses single quotes: '
echo "Hello $world"

# if you don't want to bash to expand your argument, you can use Strong Quoting.
echo 'Hello $world'

# or you can use escape to prevent expansion:
echo "Hello \$world"