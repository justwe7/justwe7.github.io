查看占用端口进程
```bash
❯ lsof -i:8000

COMMAND  PID     USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
ClashX   717 debugger   83u  IPv4 0x1e3974784243b283      0t0  TCP localhost:49626->localhost:irdmi (ESTABLISHED)
ClashX   717 debugger   93u  IPv4 0x1e397478423a5ec3      0t0  TCP localhost:49529->localhost:irdmi (ESTABLISHED)
node    2268 debugger   51u  IPv6 0x1e3974784205794b      0t0  TCP *:irdmi (LISTEN)
```

关闭进程的PID
```bash
❯ kill -9 2268
```