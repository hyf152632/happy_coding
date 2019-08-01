# title

## Domains

DNS - maps ip addresses to domains

\$ ping baidu.com

DNS Caches
Local cache
LAN(Local Area Network) DNS server
ISP(Internet Service Provider) DNS server

\$ traceroute baidu.com

## Vim

https://vimgifs.com/i/

## Server

VPS - Virtual Private Server

\$ top
Top is think of it as the equivalent of Activity Monitor on Mac.

install htop

$ adduser $USERNAME - create a new user

$ usermod -aG sudo $USERNAME - add user to sudo group

## Getting a Domain Name

Nginx(engine x)
: A HTTP and reverse proxy server, a mail proxy server, and a generic TCP/UDP proxy server

\$ mv Dev-Ops-for-Frontend/ app/ - rename directory to app/

```nginx
location / {
  proxy_pass http://127.0.0.1:3001/;
}
```

domain ----> ip -----> Nginx/Apache ----> Node

fixing-npm-permissions
https://docs.npmjs.com/getting-started/fixing-npm-permissions

Forever
Strong Loop Process Manager
PM2

forever start app.js >> /var/log/forever/forever.log - start forever and output log

cat filename - check file
head filename - check the head part of file
tail filename - check the tail part of file
