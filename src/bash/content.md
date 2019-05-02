# title

`echo "Hello World"`

many unix-based and unix-like operating systems use Bash as their defualt shell (notably Linux and macOS).

`echo` is a Bash builtin command that writes the argumets it receives to the stadard output.

anything that can be done at the command line can be put in a script file for reuse.

Make a .sh script executable by running chmod +x [name].sh

a common shebang line to use in order to make your script more portable is to use `#!/usr/bin/env bash` instead of hard-coding a path to Bash. That way, `/usr/bin/env` hs to exist, but beyond that point, bash just need to be on your PATH. on many systems, `/bin/bash` doesn't exist, and you should use `/usr/local/bin/bash` or somet other absolute path; this change avoids having to figure out the details of that.

the importance of placing the variable text within double quotes.

## importance of quoting in String.

## Viewing information for Bash built-ins

`help <command>`

## Hello World in 'Debug' mode

`bash -x <name>.sh`

## Env shebang

1. .sh 文件中必须指定`#!/usr/bin/env bash`,(the first line of a script file must indicate the absolute path to the env executable with the argument bash.)
2. 只有当直接运行文件的时候(`script.sh`), env path 才会生效
3. script.sh 必须有运行权限
4. 当以`bash script.sh`运行文件的时候 env shebang 会被忽略

## Navigating directories

- cd
  - cd /home/username/project/abc
  - cd abc
  - cd ..
  - cd - (change to the last directory)
  - cd (change to the home directory)
  - cd \$HOME
  - cd ~ (change to the home directory)
  - cd "$(dirname "$(readlink -f "\$0")")" (change to the directory of the script)

## Listing files

- ls
  - ls -l (List Files in a Long Listing Format)
  - ls -lt | head (list the Ten Most Recently Modified Files)
  - ls -a
  - ls -l -S (sorted by Size)
  - ls -l -S -r (sorted by Size reversed.)

## Using cat

concatenate files
This is the primary purpose of cat:
`cat file1 file2 file3 > file_all`
`cat file.txt`
`less file.txt`
`more file.txt`
`cat -n file.txt` print the contents with line numbers
`cat --number-nonblank file` or
`cat -b file` to skip empty lines when counting lines.
`printf '<string>' | xxd` to display the contents byte-by-byte.

`cat ><filename>` let you write the text on terminal which will be saved in a file named filename.
Ctrl + D, to end writing text on terminal
`cat >>file` to append the text to the end of the file.

### Concatenate gzipped files

`cat file1.gz file2.gz file3.gz > combined.gz`
`cat file1 file2 file3 | gzip > combined.gz`
`echo "Hello world!" > hello.txt`
`echo "Howdy world!" > howdy.txt`
`gzip hello.txt`
`gzip howdy.txt`
`cat hello.txt.gz howdy.txt.gz > greeting.txt.gz`
`gunzip greetings.txt.gz`
`cat greetings.txt`

## Grep

How to search a file for a pattern
`grep foo ~/Desktop/bar` to find the word foo in the file bar.
`grep -v foo ~/Desktop/bar` to find all lines that do not contain foo in the file bar.
`grep "*.foo" ~/Desktop/bar` to use find all words containing foo in the end (Wildcard Expansion)

## Aliasing

Shell aliases are a simple way to create new commands or to wrap existing commands with code of your own.

`alias ls='ls --color=auto'`
`alias word='command'`
`alias now='date'`
`unalias now`
`alias -p` will list all the current aliases.

## Jobs and Processes

`lsof -i :8080` check which process running on specific port.

`jobs` list current jobs
`sleep 10` sleep 10s

`ps aux | grep <search-term>` shows processes matching search-term
`ps aux | grep nginx`
second column is the process id.
if you want to kill the process, you can use the command `kill id`

`ps -ef` list all processes
`ps aux` lists all processes in alternative format(BSD)

This can be used to check if a given application is running.
For example, to check if the SSH server(sshd) is runnind:
`ps -ef | grep sshd`

## Redirection

### Redirecting standard output

`ls >file.txt`
`ls 1>file.txt`

`echo "first line" > /tmp/lines`
`echo "first line" >> /tmp/lines` append a second line

Using named pipes:

- this dont work
  `mkfifo myPipe`
  `ls -l > myPipe`
  `grep ".log" < myPipe`

Redirection to network addresses
Bash cannot setup a listening server, but can initiate a connection, and fro TCP can read the results at least.

`exec 3</dev/tcp/www.google.com/80`
`printf 'GET / HTTP/1.0\r\n\r\n' >&3`
`cat <&3`

Redirecting multiple commands to the same file
`{ echo "contents of home directory" ls ~ } > output.txt`

STDIN, STDOUT and STDERR explained
Commands have one input(STDIN) and two kinds of outputs, standard outputs (STDOUT) and standard error(STDERR)

## Control Structures

Conditional execution of command lists
`cd my_directory && pwd`
only print the current directory if the cd command was successful
`cd my_directory || exit`
this will exit if the cd command fails, preventing catastrophe

When combining multiple statements in this manner, it's important to remember that(unlike many C-style languages) these operators have no precedence and are left-associative.
`cd my_directory && pwd || echo "No such directory"`

```sh
my_function() {
    ### always check the return code

    # one argument required, "" evaluates to false(1)
    [["$1"]] || return 1

    # work with the arguments. exit on failure
    do_something_with "$1" || return 1
    do_something_else || return 1

    # Success! no failures detected, or we wouldn't be here.
    return 0
}
```

If statement:

```sh
if [[ $1 -eq 1 ]]; then
    echo "1 was passed in the first parameter"
elif [[ $1 -gt 2 ]]; then
    echo "2 was not passed in the first parameter"
else
    echo "The first parameter was not 1 and is not more than 2."
fi
```

The closing `fi` is necessary, but the `elif` and/or the `else` clauses can be omitted.
The semicolons before `then` are standard syntax for combining two commands on a single line; they can be omitted only if `then` is moved to the next line.

it's important to understand that the brackets [[ are not part of the syntax, but are treated as a command; it is the exit code from this command that is being tested. Therefore, you must always include spaces around the brackets.
This also means that the result of any command can be tested. if the exit code from the command is a zero, the statement is considered true.

```sh
if grep "foo" bar.txt; then
    echo "foo was found"
else
    echo "foo was not found"
fi
```
