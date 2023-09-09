```json
	"editor.tokenColorCustomizations": {
        // "comments": "#82e0aa", // 配置注释颜色和样式，包括单行注释、多行注释等。
        // "keywords": "#03C988", // 配置关键字（如 if、else、for、while 等）的颜色和样式。
        // "variables": "#439A97", // 配置变量名的颜色和样式。
        // "constants": "#BFDB38", // 配置常量名的颜色和样式。
        // "strings": "#E5BA73", // 配置字符串（包括单引号和双引号）的颜色和样式。
        // "numbers": "#C58940", // 配置数字的颜色和样式。
        // "types": "#C58940", // 配置类型（如 class、interface、enum 等）的颜色和样式。
        // "functions": "#5b99fcc9", // 配置函数名的颜色和样式。
        "textMateRules": [
            {
                "name": "Tag brackets",
                "scope": [
                    "punctuation.definition.tag",
                ],
                "settings": {
                    "foreground": "#a4c6f0"
                }
            },
            {
                "name": "Tag attributes",
                "scope": "entity.other.attribute-name",
                "settings": {
                    "foreground": "#f0dc83db"
                }
            },
            {
                "name": "Tags",
                "scope": "entity.name.tag",
                "settings": {
                    "foreground": "#BE5A83",
                }
            },
            {
                "name": "Markup list punctuation",
                "scope": "punctuation.definition.list",
                "settings": {
                    "foreground": "#fba292e6"
                }
            },
            {
                "name": "Provided functions",
                "scope": "support.function",
                "settings": {
                    "foreground": "#25bca5e6"
                }
            },
            {
                "name": "Function names",
                "scope": "entity.name.function",
                "settings": {
                    "foreground": "#25bca5e6"
                }
            }
        ]
    },
```