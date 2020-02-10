Shell 也可以包含外部脚本。这样可以很方便的封装一些公用的代码作为一个独立的文件。

基本语法：
```bash
. filename   # 注意点号(.)和文件名中间有一空格

或

source filename
```

示例：
创建两个sh：

- `a.sh`
```bash
#!/bin/bash

foo="a来的"
```

- `b.sh`
```bash
#!/bin/bash

source ./a.sh
# 或者使用 `. ./a.sh`

echo `文件a的变量：$foo`
```

执行`./b.sh`，输出：
`文件a的变量：a来的`

如果./b.sh不能执行，需要添加可执行权限：`chmod +x b.sh`
