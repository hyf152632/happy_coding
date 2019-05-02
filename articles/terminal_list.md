<article class="fit-full article-content">

## Background

The command line is a text interface for your computer. It’s a program that takes in commands, which it passes on to the computer’s operating system to run.

From the command line, you can navigate through files and folders on your computer, just as you would with Windows Explorer on Windows or Finder on Mac OS. The difference is that the command line is fully text-based.

Here’s an appendix of commonly used commands.

## Commands

### >

<pre>$ cat oceans.txt > continents.txt</pre>

`>` takes the standard output of the command on the left, and redirects it to the file on the right.

### >>

<pre>$ cat glaciers.txt >> rivers.txt</pre>

`>>` takes the standard output of the command on the left and _appends_ (adds) it to the file on the right.

### <

<pre>$ cat < lakes.txt</pre>

`<` takes the standard input from the file on the right and inputs it into the program on the left.

### |

<pre>$ cat volcanoes.txt | wc</pre>

`|` is a “pipe”. The `|` takes the standard output of the command on the left, and _pipes_ it as standard input to the command on the right. You can think of this as “command to command” redirection.

### ~/.bash_profile

<pre>$ nano ~/.bash_profile</pre>

**~/.bash_profile** is the name of file used to store environment settings. It is commonly called the “bash profile”. When a session starts, it will load the contents of the bash profile before executing commands.

### alias

<pre>alias pd="pwd"</pre>

The `alias` command allows you to create keyboard shortcuts, or aliases, for commonly used commands.

### cd

<pre>cd Desktop/</pre>

`cd` takes a directory name as an argument, and switches into that directory.

<pre>$ cd jan/memory</pre>

To navigate directly to a directory, use `cd` with the directory’s path as an argument. Here, `cd jan/memory/` command navigates directly to the **jan/memory** directory.

### cd ..

<pre>$ cd ..</pre>

To move up one directory, use `cd ..`. Here, `cd ..` navigates up from **jan/memory/** to **jan/**.

### cp

<pre>$ cp ada_lovelace.txt historical/</pre>

`cp` copies files or directories. Here, we copy the file **ada_lovelace.txt** and place it in the **historical/** directory

### Wildcards (\*)

<pre>$ cp * satire/</pre>

The wildcard `*` selects all of the files in the current directory. The above example will copy all of the files in the current directory to the directory called **satire**. There are other types of wildcards, too, which are beyond the scope of this glossary.

<pre>$ cp m*.txt scifi/</pre>

Here, m\*.txt selects all files in the working directory starting with “m” and ending with “.txt”, and copies them to scifi/.

### env

<pre>env</pre>

The `env` command stands for “environment”, and returns a list of the environment variables for the current user.

### env | grep VARIABLE

<pre>env | grep PATH</pre>

`env | grep PATH` is a command that displays the value of a single environment variable.

### export

<pre>export USER="Jane Doe"</pre>

`export` makes the variable to be available to all child sessions initiated from the session you are in. This is a way to make the variable persist across programs.

### grep

<pre>$ grep "Mount" mountains.txt</pre>

`grep` stands for “global regular expression print”. It searches files for lines that match a pattern and returns the results. It is case sensitive.

### grep -i

<pre>$ grep -i "Mount" mountains.txt</pre>

`grep -i` enables the command to be case insensitive.

### grep -R

<pre>$ grep -R Arctic /home/ccuser/workspace/geography</pre>

`grep -R` searches all files in a directory and outputs filenames and lines containing matched results. `-R` stands for “recursive”.

### grep -Rl

<pre>$ grep -Rl Arctic /home/ccuser/workspace/geography</pre>

`grep -Rl` searches all files in a directory and outputs only filenames with matched results. `-R` stands for “recursive” and `l` stands for “files with matches”.

### HOME

<pre>$ echo $HOME</pre>

The `HOME` variable is an environment variable that displays the path of the home directory.

### ls

<pre>$ ls
2014  2015  hardware.txt</pre>

`ls` lists all files and directories in the working directory

#### ls -a

<pre>ls -a
.  ..  .preferences  action  drama comedy  genres.xt</pre>

`ls -a` lists all contents in the working directory, including hidden files and directories

#### ls -l

<pre>ls -l
drwxr-xr-x 5  cc  eng  4096 Jun 24 16:51  action
drwxr-xr-x 4  cc  eng  4096 Jun 24 16:51  comedy
drwxr-xr-x 6  cc  eng  4096 Jun 24 16:51  drama
-rw-r--r-- 1  cc  eng     0 Jun 24 16:51  genres.txt</pre>

`ls -l` lists all contents of a directory in long format. [Here’s what each column means](https://www.codecademy.com/courses/learn-the-command-line/lessons/command-line-manipulation/exercises/ls-l).

#### ls -t

`ls -t` orders files and directories by the time they were last modified.

### mkdir

<pre>$ mkdir media</pre>

`mkdir` takes in a directory name as an argument, and then creates a new directory in the current working directory. Here we used mkdir to create a new directory named **media/**.

### mv

<pre>$ mv superman.txt superhero/</pre>

To move a file into a directory, use mv with the source file as the first argument and the destination directory as the second argument. Here we move superman.txt into superhero/.

### nano

<pre>$ nano hello.txt</pre>

_nano_ is a command line text editor. It works just like a desktop text editor like TextEdit or Notepad, except that it is accessible from the the command line and only accepts keyboard input.

### PATH

<pre>$ echo $PATH

/home/ccuser/.gem/ruby/2.0.0/bin:/usr/local/sbin:/usr/local/bin:/usr/bin:/usr/sbin:/sbin:/bin</pre>

`PATH` is an environment variable that stores a list of directories separated by a colon. Each directory contains scripts for the command line to execute. PATH lists which directories contain scripts.

### pwd

<pre>$ pwd
/home/ccuser/workspace/blog</pre>

`pwd` prints the name of the working directory

### rm

<pre>$ rm waterboy.txt</pre>

`rm` deletes files. Here we remove the file waterboy.txt from the file system.

### rm -r

<pre>$ rm -r comedy</pre>

`rm -r` deletes a directory and all of its child directories.

### sed

<pre>$ sed 's/snow/rain/' forests.txt</pre>

`sed` stands for “stream editor”. It accepts standard input and modifies it based on an _expression_, before displaying it as output data.

In the expression `'s/snow/rain/'`:

- `s`: stands for “substitution”.
- `snow`: the search string, the text to find.
- `rain`: the replacement string, the text to add in place.

### sort

<pre>$ sort lakes.txt</pre>

`sort` takes a filename or standard input and orders each line alphabetically, printing it to standard output.

### standard error

_standard error_, abbreviated as `stderr`, is an error message outputted by a failed process.

### source

<pre>source ~/.bash_profile</pre>

`source` activates the changes in **~/.bash_profile** for the current session. Instead of closing the terminal and needing to start a new session, `source` makes the changes available right away in the session we are in.

### standard input

_standard input_, abbreviated as `stdin`, is information inputted into the terminal through the keyboard or input device.

### standard output

_standard output_, abbreviated as `stdout`, is the information outputted after a process is run.

### touch

<pre>$ touch data.txt</pre>

`touch` creates a new file inside the working directory. It takes in a file name as an argument, and then creates a new empty file in the current working directory. Here we used touch to create a new file named keyboard.txt inside the 2014/dec/ directory.

If the file exists, touch is used to update the modification time of the file

### uniq

<pre>$ uniq lakes.txt</pre>

`uniq`, short for “unique”, takes a filename or standard input and prints out every line, removing any exact duplicates.

</article>
