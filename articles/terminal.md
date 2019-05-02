# terminal commands

## commands

- ls (lists)
  The -a modifies the behavior of the ls command to also list the files and directories starting with a dot (.). Files started with a dot are hidden, and don’t appear when using ls alone.
  the command line looks at the folder you are in, and then “lists” the files and folders inside it.
  -a - lists all contents, including hidden files and directories
  -l - lists all contents of a directory **in long format**
  Access rights. These are actions that are permitted on a file or directory.
  Number of hard links. This number counts the number of child directories and files. This number includes the parent directory link (..) and current directory link (.).
  The username of the file’s owner. Here the username is cc.
  The name of the group that owns the file. Here the group name is eng.
  The size of the file in bytes.
  The date & time that the file was last modified.
  The name of the file or directory.
  -t - order files and directories **by the time** they were **last modified**.
  ls -alt
- pwd (print working directory)
  It outputs the name of the directory you are currently in, called the working directory.
  Together with ls, the pwd command is useful to show where you are in the filesystem.

- cd (change directory)
  cd stands for “change directory”. Just as you would click on a folder in Windows Explorer or Finder, cd switches you into the directory you specify. In other words, cd changes the working directory.

  - cd ..  
     To move up one directory, use cd ...
  - cd `<dirName>`

- mkdir (make directory)
  The mkdir command stands for “make directory”. It takes in a directory name as an argument, and then creates a new directory in the current working directory.

- touch
  The touch command creates a new file inside the working directory. It takes in a filename as an argument, and then creates an empty file in the current working directory.

- cat
  cat hello_cli.txt to print the contents of the hello_cli.txt file to the terminal.

### We can also use the command line to copy, move, and remove files and directories.

- cp (copies files)
  The cp command copies files or directories. Here, we copy the contents of frida.txt into lincoln.txt.
  To copy a file into a directory, use cp with the source file as the first argument and the destination directory as the second argument.
  To copy multiple files into a directory, use cp with a list of source files as the first arguments, and the destination directory as the last argument.

  - cp biopic/cleopatra.txt historical/
  - cp frida.txt lincoln.txt
  - cp biopic/ray.txt biopic/notorious.txt historical/
  - cp \* satire/
  - cp m\*.txt scifi/

    Wildcards: 通配符

- mv (moves and renames files)
  The mv command moves files.
  To move a file into a directory, use mv with the source file as the first argument and the destination directory as the second argument.
  To move multiple files into a directory, use mv with a list of source files as the first arguments, and the destination directory as the last argument.
  To rename a file, use mv with the old file as the first argument and the new file as the second argument.

- rm (removes files)
- rm -r (removes directories)
  The rm command deletes files and directories.
  rm waterboy.txt
  rm -r comedy
  The -r is an option that modifies the behavior of the rm command. The -r stands for “recursive,” and it’s used to delete a directory and all of its child directories.
  Be careful when you use rm! It deletes files and directories permanently. There isn’t an undelete command, so once you delete a file or directory with rm, it’s gone.

The commands we’ve covered so far are commonly used to view and change the filesystem.

### input and output (I/O) redirection.

Through redirection you can direct the input and output of a command to and from other files and programs, and chain commands together in a pipeline.

stdin, stdout, and stderr
The echo command accepts the string “Hello” as standard input, and echoes the string “Hello” back to the terminal as standard output.
Let’s learn more about standard input, standard output, and standard error:

standard input, abbreviated as stdin, is information inputted into the terminal through the keyboard or input device.

standard output, abbreviated as stdout, is the information outputted after a process is run.

standard error, abbreviated as stderr, is an error message outputted by a failed process.

- echo "Hello"
- echo "Hello" > hello.txt
- cat hello.txt

The > command redirects the standard output to a file.

The cat command outputs the contents of a file to the terminal. When you type cat hello.txt, the contents of hello.txt are displayed.

- cat oceans.txt > continents.txt
  Note that > overwrites all original content in continents.txt. When you view the output data by typing cat on continents.txt, you will see only the contents of oceans.txt.

- cat glaciers.txt >> rivers.txt

  > > takes the standard output of the command on the left and appends (adds) it to the file on the right. You can view the output data of the file with cat and the filename.

- cat < lakes.txt
  < takes the standard input from the file on the right and inputs it into the program on the left. Here, lakes.txt is the standard input for the cat command. The standard output appears in the terminal.

- |
  \$ cat volcanoes.txt | wc  
  | is a “pipe”. The | takes the standard output of the command on the left, and pipes it as standard input to the command on the right. You can think of this as “command to command” redirection.

- wc
  the wc command outputs the number of lines, words, and characters

\$ cat volcanoes.txt | wc | cat > islands.txt
Multiple |s can be chained together. Here the standard output of cat volcanoes.txt is “piped” to the wc command. The standard output of wc is then “piped” to cat. Finally, the standard output of cat is redirected to islands.txt.

- sort
  sort lakes.txt
  sort takes the standard input and orders it alphabetically for the standard output. Here, the lakes in sort lakes.txt are listed in alphabetical order.

- uniq
  uniq stands for “unique” and filters out adjacent, duplicate lines in a file.

- grep
  `grep Mount mountains.txt`
  grep stands for “global regular expression print”. It searches files for lines that match a pattern and returns the results. It is also case sensitive. Here, grep searches for “Mount” in mountains.txt.

  `grep -i Mount mountains.txt`
  grep -i enables the command to be case insensitive. Here, grep searches for capital or lowercase strings that match Mount in mountains.txt.

  `grep -R Arctic /home/ccuser/workspace/geography`
  grep -R searches all files in a directory and outputs filenames and lines containing matched results. -R stands for “recursive”. Here grep -R searches the /home/ccuser/workspace/geography directory for the string “Arctic” and outputs filenames and lines with matched results.

  `grep -Rl Arctic /home/ccuser/workspace/geography`
  grep -Rl searches all files in a directory and outputs only filenames with matched results. -R stands for “recursive” and l stands for “files with matches”. Here grep -Rl searches the /home/ccuser/workspace/geography directory for the string “Arctic” and outputs filenames with matched results.

- sed (stream editor)
  `sed 's/snow/rain/' forests.txt`
  sed stands for “stream editor”. It accepts standard input and modifies it based on an expression, before displaying it as output data. It is similar to “find and replace”.

  Let’s look at the expression 's/snow/rain/':

  s: stands for “substitution”. it is always used when using sed for substitution.
  snow: the search string, the text to find.
  rain: the replacement string, the text to add in place.
  In this case, sed searches forests.txt for the word “snow” and replaces it with “rain.” Importantly, the above command will only replace the first instance of “snow” on a line.

  `sed 's/snow/rain/g' forests.txt`
  The above command uses the g expression, meaning “global”. Here sed searches forests.txt for the word “snow” and replaces it with “rain”, globally. All instances of “snow” on a line will be turned to “rain”.

Redirection reroutes standard input, standard output, and standard error.

The common redirection commands are:

> redirects standard output of a command to a file, overwriting previous content.
>
> > redirects standard output of a command to a file, appending new content to old content.
> > < redirects standard input to a command.
> > | redirects standard output of a command to another command.
> > A number of other commands are powerful when combined with redirection commands:

sort: sorts lines of text alphabetically.
uniq: filters duplicate, adjacent lines of text.
grep: searches for a text pattern and outputs it.
sed : searches for a text pattern, modifies it, and outputs it.

### Environment

Bash Profile
You created a file in nano called ~/.bash_profile and added a greeting. How does this work?

\$ nano ~/.bash_profile
~/.bash_profile is the name of file used to store environment settings. It is commonly called the “bash profile”. When a session starts, it will load the contents of the bash profile before executing commands.

The ~ represents the user’s home directory.
The . indicates a hidden file.
The name ~/.bash_profile is important, since this is how the command line recognizes the bash profile.
The command nano ~/.bash_profile opens up ~/.bash_profile in nano.
The text echo "Welcome, Jane Doe" creates a greeting in the bash profile, which is saved. It tells the command line to echo the string “Welcome, Jane Doe” when a terminal session begins.
The command source ~/.bash_profile activates the changes in ~/.bash_profile for the current session. Instead of closing the terminal and needing to start a new session, source makes the changes available right away in the session we are in.

`source ~/.bash_profile`

- history

`export PS1=">> "`
PS1 is a variable that defines the makeup and style of the command prompt.

`export PS1=">> "` sets the command prompt variable and exports the variable. Here we change the default command prompt from \$ to >>.
After using the source command, the command line displays the new command prompt.

`echo $HOME`
The HOME variable is an environment variable that displays the path of the home directory. Here by typing echo \$HOME, the terminal displays the path /home/ccuser as output.

`$ echo $PATH`

/home/ccuser/.gem/ruby/2.0.0/bin:/usr/local/sbin:/usr/local/bin:/usr/bin:/usr/sbin:/sbin:/bin
PATH is an environment variable that stores a list of directories separated by a colon. Looking carefully, echo \$PATH lists the following directories:

`env`

`env | grep PATH`

env
The env command stands for “environment”, and returns a list of the environment variables for the current user. Here, the env command returns a number of variables, including PATH, PWD, PS1, and HOME.

to use the bash profile to configure the environment. What can we generalize so far?

The environment refers to the preferences and settings of the current user.

The nano editor is a command line text editor used to configure the environment.

~/.bash_profile is where environment settings are stored. You can edit this file with nano.

environment variables are variables that can be used across commands and programs and hold information about the environment.

export VARIABLE="Value" sets and exports an environment variable.
USER is the name of the current user.
PS1 is the command prompt.
HOME is the home directory. It is usually not customized.
PATH returns a colon separated list of file paths. It is customized in advanced cases.
env returns a list of environment variables.

### Bash Scripting

```sh
#!/bin/bash
first_greeting="Nice to meet you!"
later_greeting="How are you?"
greeting_occasion=1

if [ $greeting_occasion -lt 1 ]
then
    echo $first_greeting
else
    echo $later_greeting
fi
```

```sh
#!/bin/bash
first_greeting="Nice to meet you!"
later_greeting="How are you?"
greeting_occasion=0

while [ $greeting_occasion -lt 3 ]
do
  if [ $greeting_occasion -lt 1 ]
  then
    echo $first_greeting
  else
    echo $later_greeting
  fi
  greeting_occasion=$((greeting_occasion + 1))
done
```

```sh
echo "Guess a number"
read number
echo "You guessed $number"
```

Aliases
You can set up aliases for your bash scripts within your .bashrc or .bash_profile file to allow calling your scripts without the full filename. For example, if we have our saycolors.sh script, we can alias it to the word saycolors using the following syntax:

alias saycolors='./saycolors.sh'
You can even add standard input arguments to your alias. For example, if we always want “green” to be included as the first input to saycolors, we could modify our alias to:

alias saycolors='./saycolors.sh "green"'

```sh
#!/bin/bash
first_greeting="Nice to meet you!"
later_greeting="How are you?"
greeting_occasion=0
greeting_limit=$1
while [ $greeting_occasion -lt $greeting_limit ]
do
  if [ $greeting_occasion -lt 1 ]
  then
    echo $first_greeting
  else
    echo $later_greeting
  fi
  greeting_occasion=$((greeting_occasion + 1))
done
```

Review
Take a minute to review what you’ve learned about bash scripting.

Any command that can be run in the terminal can be run in a bash script.
Variables are assigned using an equals sign with no space (greeting="hello").
Variables are accessed using a dollar sign (echo \$greeting).
Conditionals use if, then, else, fi syntax.
Three types of loops can be used: for, while, and until.
Bash scripts use a unique set of comparison operators:
Equal: -eq
Not equal: -ne
Less than or equal: -le
Less than: -lt
Greater than or equal: -ge
Greater than: -gt
Is null: -z
Input arguments can be passed to a bash script after the script name, separated by spaces (myScript.sh “hello” “how are you”).
Input can be requested from the script user with the read keyword.
Aliases can be created in the .bashrc or .bash_profile using the alias keyword
