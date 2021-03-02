const globby = require('globby')
const fs = require('fs');
const list = globby.sync(['**/*.md', '!*.md'], {gitignore: true})

//读取文件，并且替换文件中指定的字符串
const replaceFile = function(filePath,sourceRegx,targetStr) {
  fs.readFile(filePath,function(err,data){
    if(err){
        return err;
    }
    let str = data.toString();
    str = str.replace(sourceRegx,targetStr);
    fs.writeFile(filePath, str, function (err) {
        if (err) return err;
  });
});
}

list.forEach(path => {
  replaceFile(path, 'https://image.littl.cn', '../origin-img');
})
