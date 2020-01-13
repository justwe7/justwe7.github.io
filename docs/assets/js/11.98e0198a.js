(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{238:function(t,a,e){"use strict";e.r(a);var s=e(0),n=Object(s.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h3",{attrs:{id:"与远端代码同步"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#与远端代码同步"}},[t._v("#")]),t._v(" 与远端代码同步")]),t._v(" "),e("ol",[e("li",[t._v("执行"),e("code",[t._v("git status")]),t._v("查看本地仓库状态，确认：")])]),t._v(" "),e("ul",[e("li",[t._v("是否有未提交内容？")]),t._v(" "),e("li",[t._v("是否有未添加内容？")])]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("红色：未添加 \n黄色：未提交本地分支 \n出现：nothing to commit, working tree clean 视为可操作环境 \n")])])]),e("ol",{attrs:{start:"2"}},[e("li",[t._v("确认是否有远端同名分支，如有"),e("code",[t._v("origin/feat-a")]),t._v("：")])]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("※本地代码有更改(git status)\ngit add .\ngit commit -m 'feat: 新增xx功能' // 提交至本地版本库\ngit pull origin feat-a // 基于远端同名分支更新代码\ngit push origin feat-a // 推送至远端\n\n※本地代码无更改(git status)\n// 那没事了\n")])])]),e("h3",{attrs:{id:"保持commit信息整洁"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#保持commit信息整洁"}},[t._v("#")]),t._v(" 保持commit信息整洁")]),t._v(" "),e("p",[e("strong",[t._v("在git push之前，对commit信息进行整理")])]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("业务并行开发，周期较长，切换分支也频繁。可能为了存代码，不想用git stash(万一丢代码)，同样的功能commit了多次，且信息相同：   \ngit commit -a -m 'feat: 新增xx用户' \ngit commit -a -m 'feat: 新增xx用户' \ngit commit -a -m 'feat: 新增xx用户' \n\n能够合并为\ngit commit -m 'feat: 新增xx用户' \n\n之后再\ngit push  \ngit的线会简洁很多\n")])])]),e("p",[e("strong",[t._v("实现方式")])]),t._v(" "),e("p",[e("strong",[t._v("(一)第1+n次commit时候使用 --amend")])]),t._v(" "),e("blockquote",[e("p",[t._v("此操作适用commit一次，第二(+n)次的情况，如已经连续commit两条信息，只能修改最近一次的信息")])]),t._v(" "),e("p",[t._v("amend会使用一个新的commit去替换最近的一次commit，如先改了A.js，已经commit，但是同一个需求B.js也需要修改push，此时可以修改完：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("git add B.js\n\ngit commit --amend -C HEAD // 直接使用上一个commit描述\n或者\ngit commit --amend //弹出编辑窗口，修改commit信息，重新提交新commit。(i编辑，wq保存)\n\ngit push origin feat // 此时再去提交至远端\n")])])]),e("p",[e("strong",[t._v("(二)使用reset来修改信息")])]),t._v(" "),e("blockquote",[e("p",[t._v("amend仅能替换最近一次commit。想要快速的将working tree的修改和最近的两次commit合并得到一个新的commit则需要用到reset啦")])]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("// 提交了多次\ngit commit -a -m 'add: line1' \ngit commit -a -m 'add: line2' \ngit commit -a -m 'add: line3' \n\n// 整合一下\ngit reset --soft HEAD~3 // 删除前3次commit信息,保留文件更改\ngit commit -a -m 'add: line-3次一起add'\ngit push\n")])])]),e("blockquote",[e("p",[t._v("reset适用于需要修改多个commit的情况，但也受限于修改从HEAD~开始连续的多个commit")])]),t._v(" "),e("p",[t._v("可以完全的删除前几个commit，万一如果需要修改的commit已经push出去了（不要reset!!!）。那就需要使用revert命令，revert命令会接着重新提交一个新的commit，用以回滚上一个commit的修改。")]),t._v(" "),e("p",[e("strong",[t._v("(三)使用rebase")])]),t._v(" "),e("p",[t._v("依次添加代码，并依次提交4次：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("git commit -a -m 'add: 0'\ngit commit -a -m 'add: 1'\ngit commit -a -m 'add: 2'\ngit commit -a -m 'add: 3'\n")])])]),e("p",[e("code",[t._v("git log")]),t._v(" 查看到历史：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("commit 3cd74a4219f5501166f6a73f0eb6d175a87f7148 (HEAD -> master)\nAuthor: justwe7 <x13133053566@163.com>\nDate:   Thu Oct 10 17:39:06 2019 +0800\n\n    add: 3\n\ncommit d55cc2d2258b20e1c7d83ee67c1c981b1f852fde\nAuthor: justwe7 <x13133053566@163.com>\nDate:   Thu Oct 10 17:39:00 2019 +0800\n\n    add: 2\n\ncommit 3f7dba6d03e47a077fd12f2d8be3b0cf57b09019\nAuthor: justwe7 <x13133053566@163.com>\nDate:   Thu Oct 10 17:38:53 2019 +0800\n\n    add: 1\n\ncommit 6a965e149f55cc01c64da0cd9e3d45518b067111\nAuthor: justwe7 <x13133053566@163.com>\nDate:   Thu Oct 10 17:38:37 2019 +0800\n\n    add: 0\n")])])]),e("p",[t._v("合并代码：")]),t._v(" "),e("ol",[e("li",[t._v("使用"),e("code",[t._v("git rebase -i HEAD~3")]),t._v("(就看最近的3条)，数字3代表压缩最后3次提交。")])]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("该命令执行后，会弹出vim的编辑窗口，3次提交的信息会倒序排列，最上面的是倒数第3次提交，最下面的是最新提交。(因为查看的是最近3条，少了add: 0的信息)\n\npick 3f7dba6 add: 1\npick d55cc2d add: 2\npick 3cd74a4 add: 3\n")])])]),e("ol",{attrs:{start:"2"}},[e("li",[t._v("将第2和第3的add行， pick 改为 squash")])]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("pick 3f7dba6 add: 1\nsquash d55cc2d add: 2\nsquash 3cd74a4 add: 3\n\n这个意义为将最后两次的提交压缩到倒数第3次的提交，效果就是我们在pick所在的提交就已经做了4次动作，但是看起来commit就是2次(rebase了最近3条，还有add: 0的信息，保留了add: 1信息)而已。\n")])])]),e("ol",{attrs:{start:"3"}},[e("li",[t._v("然后保存退出。如果有冲突(没冲突就不用啦！！！执行第4步)")])]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("解决\ngit add .\ngit rebase --continue //如果有冲突，需要修改，修改的时候要注意，保留最新的历史\n或者放弃\ngit rebase --abort //如果你要放弃这次压缩的话\n")])])]),e("ol",{attrs:{start:"4"}},[e("li",[t._v("之后会弹出这样的窗口")])]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("# This is the 1st commit message:\n\nadd: 1\n\n# This is the commit message #1:\n\nadd: 2\n\nadd: 3\n")])])]),e("p",[t._v("可以再修改这次合并后的信息")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("add: 1 => 我是新改的123合并\n\n然后wq保存\ngit push\n")])])]),e("p",[e("code",[t._v("git log")]),t._v(" 查看，会发现记录合并为：\nadd: 1 => 我是新改的123合并")]),t._v(" "),e("p",[e("a",{attrs:{href:"https://blog.csdn.net/itfootball/article/details/44154121",target:"_blank",rel:"noopener noreferrer"}},[t._v("参考"),e("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=n.exports}}]);