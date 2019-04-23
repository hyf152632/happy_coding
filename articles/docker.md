# docker 基础

## docker 的基本概念和常用操作指令

- docker ps 查看相关的进程
- docker run
  : docker run --name db --env MYSQL_ROOT_PASSWORD=example -d mariadb
  其中-- name 是 ps 中的 name , -d 后面的参数是 ps 中的 IMAGES
  分别对于 docker 中的两个重要的概念: 镜像(IMAGES) 和 容器 (CONTAINER)

## docker 三大基础组件

- 仓库(Repository)
- 镜像(Image)
- 容器(Container)

首先，官方给用户提个一个官方的 Docker 仓库，它就像 iphone 手机的 APP 应用商店，里面存放着各种各样已经打包好的 Docker 应用————docker 镜像。
其次， 用户可以搜索自己需要的镜像，下载到本地。Docker 镜像是为了满足特殊用途而按照 Docker 的规则制作的应用，有点儿类似于 Windows 里面的安装软件包。
最后，用户可以利用 Docker 镜像创建 Docker 容器，容器会启动预先定义好的进程与用户交互，对外提供服务。
容器都是基于镜像而创建的，基于一个镜像可以创建若干个名字不同但功能相同的容器。

docker 指令的基本用法：
\$ docker + 命令关键字(COMMAND) + 一系列的参数([arg...])

docker COMMAND --help

Docker 指令除了单条使用外，还支持赋值，解析变量，嵌套等使用

```shell
# 获取容器 ID,并根据 ID 提交到仓库
$ ID = $(docker run -d ubuntu echo hello world)
hello world
$ docker commit $ID helloworld
riw3293498dr

# 删除所有停止运行的容器(使用需谨慎)
 docker rm $(docker ps -a -q)
```

# docker 的组织结构

Docker 位于操作系统和虚拟容器之上。它会通过调用 cgropu, namesapces 和 libcontainer 等系统层面的接口来完成资源分配和相互隔离。

Docker 的内部组织结构：
在一个主机上，首先要启动一个守护进程(Docker Daemon), 所有的容器都被守护进程控制，同时守护进程监听并接收 Docker 客户端(Docker client)指令，并把执行结果返回给 Docker 客户端。

Docker 的引擎有两部分组成： Daemon 和 Client. Daemon 是 service 端的守护进程，接收 Client 端指令，管理本机上所有的镜像和容器；Client 是通过 Docker 命令和 Daemon 交互，对 Docker 的镜像和容器进行查询，添加，修改，启动，停止等操作。

查询镜像： docker search `<string>`

下载镜像： docker pull `<string: 镜像全名>`

创建并启动容器：
下载了 Docker 镜像，就可以以 Docker 镜像为模板，启动容器。
可以把容器理解为在一个相对独立环境中运行一个（组）进程，这个独立环境拥有这个（组）进程运行所需要的一切，包括文件系统，库文件，shell 脚本等。

docker run [OPTION] IMAGE [COMMAND][arg...]

修改容器：
在容器中安装一个实用工具 ping,

```shell
# 运行名为 leran/toturial 镜像的 Docker 容器，传入参数 apt-get install -y ping 是容器可以下载 Ping 实用工具
docker run learn/tutorial apt-get install -y ping

# 在上一步已经安装了 ping 程序包，现在可能想保存这个变更，以便于以后启动容器时不需要重复安装 ping 程序包。Docker 支持在原有镜像基础上，只提交增量修改部分，形成一个新镜像。以后使用这个新镜像为模板启动容器，容器中就会存在 ping 软件包，不需要重复安装。

# 首先使用 docker ps -l 找到安装过 ping 包的容器的 ID 号，然后把这个容器提交为新镜像，镜像命名为“learn/ping"
# 使用 docker commit 把容器提交为新镜像
docker ps -l
# 找到刚才执行 'apt-get install ping' command 的 容器 ID
# 把容器提交为新镜像
docker commit ID `<image name>`
#//执行会生成一个新镜像的 ID

#在基于新镜像的容器中执行 ping www.docker.com
docker run learn/ping ping www.docker.com

```

使用 docker ps 可以看到本机上所有正在运行的容器；
使用 docker inspect 可以看到单个容器详细信息

新镜像上传仓库：
docker images 显示当前主机上所有的镜像
docker push 可以推送本机的镜像到 Docker 官方仓库

## 容器的标示符

每个容器被创建后，都会分配一个 CONTAINER ID 作为容器的唯一标示，后续对容器的启动，停止，修改和删除等所有操作，都是通过 CONTAINER ID 来完成的， CONTAINER ID 有点儿像数据库的主键。
CONTAINER ID 默认是 128 位，但对于大多数主机来说，ID 的前 16 位就足够保证其在本机的唯一性。

docker ps 可以查到 CONTAINER ID 简略形式，如果需要查询完整的 CONTAINER ID，使用 docker ps --no-trunc

docker ps -a |grep `<CONTAINER ID>`

docker stop `<CONTAINER ID>`

docker start `<CONTAINER ID>`

CONTAINER ID 虽然能保证唯一性，但很难记忆。在创建容器时，可以用 --name 参数给容器起一个别名，然后通过别名来代替 CONTAINER ID 对容器运行操作。

docker inspect 命令可以查询容器的所有基本信息，包括运行情况，存储位置，配置参数，网络设置等。

docker inspect 以 JSON 的格式展示非常丰富的信息，通过”-f“ 可以使用 Golang 的模板来提取指定部分的信息：
比如提取容器的运行状态：
docker inspect -f {{.State.Status}} MyWordPress
//running
提取容器 ID：
docker inspect -f {{.NetworkSettings.IPAddress}} MyWordPress

docker logs CONTAINER 查询日志
如果需要实时打印最新的日志，可以加上”-f“ 参数

可以通过 docker stats 命令实时查看容器所占用的系统资源，如 CPU 使用率，内存，网络和磁盘开销

## 容器内部命令

经常有登入 Docker 容器内部执行命令的需求。
Docker 提供了原生的方式支持登入容器 docker exec，使用形式如下：
docker exec + 容器名 + 容器内执行的命令

docker exec MyWordPress ps aux

如果希望在容器内连续执行多条命令，可以加上 "-it" 参数，就相当于以 root 身份登入容器内，可以执行连续命令，执行完后通过'exit'退出。

docker exec -it MYWordPress /bin/bash
//...
exit

### 多容器管理

Docker 倡导的理念是”一个容器一个进程“，假如一个服务由多个进程组成，就需要创建多个容器组成一个系统，互相分工和配合来对外提供完整的服务。

比如，我们博客系统由两部分组成：

- APache Web 服务器，用于提供 Web 站点和与用户交互
- Mariadb 数据库，用于存储用户注册信息，个性化配置和博客等数据

我们通过两条 docker run 指令创建并启动了数据库容器（db)和 Apache 容器。这两个容器之间需要有数据交互，在同一台主机下，
docker run 命令提供 "--link"选项建立容器间的互联。
但是有一个前提条件，使用"--link containerA'创建容器 B 时，容器 A 必须已经创建并且启动运行。所以容器启动是按顺序的，容器 A 先于容器 B 启动。

可以同时停止多个容器：
docker stop db MyWordPress

假如有更多容器，维护就会变得比较烦琐（因为要考虑启动和停止的顺序）。所以可以使用： Docker Compose

#### Docker Compose

Docker 提供的一个容器编排工具————Docker Compose,它允许用户在一个模板(YAML 格式)中定义一组相关联的应用容器，这组容器会根据配置模板中的”--link“等参数，对启动的优先级自动排序，简单执行一条:docker-compose up'就可以把同一个服务器中的多个容器依次创建和启动

通过在项目文件夹创建一个名为: 'docker-compose.yml'的文件，然后通过'docker-compose up'命令来创建和启动服务

docker-compose start

docker-compose stop

docker-compose up 命令创建和启动一组新的容器之后，之前由 docker run 创建的容器就可以删除了（删除前确保容器内没有重要的数据)
docker ps 命令只能列出已经启动的容器。
如果想要查到已停止运行的容器，需要在 docker ps 命令后加上 '-a' 选项

通过 docker rm 命令可以删除容器。删除前确保容器内没有重要数据。
docker rm -f 可以强制把正在运行的容器删除。如果有重要数据，通过 docker exec -it ContainerName 命令登入容器内部处理，容器的数据备份在后面会提到。

##### 配置文件

使用 Docker Compose 管理多个容器，首先需要把多容器写到它的配置文件中，默认配置文件名为 docker-compose.yml.我们可以通过"-f"选项指定配置文件

当有多个环境变量需要设置时，用 docker run 命令需要多次重复 '--env'选项，非常烦琐。
由于 Docker Compose 的配置文件使用 YAML 格式的语法，支持数组格式，所以这条命令转换为 Docker Compose 的配置文件就会很简洁，

进入项目目录，然后执行：
docker-compose up -d

通过 docker-compose 配置文件管理多容器。
通过配置文件（用‘-f’选项指定），就可以对该项目中的容器进行查询，启动，停止等操作
docker-compose -f gitlab/docker-compose.yml ps

docker-compose -f gitlab/docker-compose.yml stop

docker-compose -f gitlab/docker-compose.yml start

删除项目：
docker-compose -f gitlab/docker-compose.yml down

## Docker 镜像管理

镜像是 Docker 的精髓，只有了解 Docker 镜像，才算真正理解 Docker 的内涵。

我们创建容器时需要指定使用哪个镜像。
Docker 会首先在本机中找用到的镜像，如果没有找到就会去官方的 Docker Hub 仓库查找并下载到本机，然后基于该镜像创建容器。

新容器创建后，不依赖镜像就可以运行，如果为了节省存储空间，可以手工删掉，默认不会自动删除，因为该镜像还有可能用于创建其他新镜像。

通过 docker images 命令可以查到本机已有的所有镜像

### 镜像的分层

通过 docker images 可以看到每个镜像的大小都很大，但是这些镜像所占磁盘的存储空间并不是这些大小之和，原因是 Docker 镜像采用分层机制，相同部分独立成层，只需要存储一份就可以了，大大节省了镜像空间。
Docker 的镜像通过联合文件系统(union filesystem) 将各层文件系统叠加在一起，在用户看来就像一个完整的文件系统。
假如，某个镜像有两层，第一层有三个文件夹，第二层有两个文件夹，使用联合文件系统叠加后，用户可以看到五个文件夹，感觉不到分层的存在。

通过 docker history 命令可以查询镜像分了多少层，每一层具体做了什么操作。
如果操作的内容显示不全，可以在 docker history 后面加上 --tree 选项，打印出完整的内容。

对于分层的 Docker 镜像有两个特性：一个是已有的分层只能读不能修改，另外一个是上层镜像的优先级高于底层镜像。

用分层的概念描述 Docker 容器：
我们知道，容器是在镜像的基础上创建的，从文件系统的角度来讲，它是在分层镜像的基础上增加一个新的空白分层，这个新分层是可读写的。
新创建的容器启动后是可写的。所有的写操作都会存储在最上面的可读写层。
Docker 容器可以通过 docker commit 命令提交生成新镜像。

通过对容器的可写层修改，来创建新镜像。
但是如果底层镜像的某个库有安全漏洞，基于它之上的很多镜像如果都通过容器的方式生成新的镜像，那么维护工作量太大了。
那么更好的维护更新 Docker 镜像的方式是什么？
答案是 Dockerfile

#### Dockerfile

语法：
每行都以一个关键字为行首，如果一行内容过长，使用'\'把多行连接到一起。
FROM: 指定新镜像的底层镜像
MAINTAINER：指定该镜像的创建者
ENV：设置环境变量
RUN：运行 shell 命令，如果有多条命令可以用”&&“连接
COPY：将编译机本地文件拷贝到镜像文件系统中
EXPOSE：指定监听的端口
ENTRYPOINT：这个关键字是欲执行命令，在创建镜像时不执行，要等到使用该镜像创建容器，容器启动后才执行的命令。

创建 entrypoint.sh 文件
然后，用 docker build 命令编译 Dockerfile, 通过 ”-t" 选项给镜像起一个名字(带版本号)
docker build -t image_redis:v1.0
有了新镜像，就可以通过 docker run 命令创建和使用新容器了。但该镜像只存在于编译主机，如何把编译好的镜像分发给其他机器使用呢？这就需要用到 Docker 仓库中转。
有了 Dockerfile 文件，维护镜像就很简单了。只需要修改 Dockerfile 的某条语句，通过 docker build 重新构建即可，另外还可以通过'-t'选项指定一个新版本，可以很方便的在新旧两个版本间快速切换。
