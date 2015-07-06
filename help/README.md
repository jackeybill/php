项目目录

输入过滤
永远不要相信客户端提交的数据，所以对于输入数据的过滤势在必行，我们建议：
     开启令牌验证避免数据的重复提交；
     使用自动验证和自动完成机制进行初步过滤；
     使用系统提供的I函数获取用户输入数据；
     对不同的应用需求设置不同的安全过滤函数，常见的安全过滤函数包括stripslashes、htmlentities、htmlspecialchars和strip_tags等；

防止XSS攻击
     XSS（跨站脚本攻击）可以用于窃取其他用户的Cookie信息，要避免此类问题，可以采用如下解决方案：
     直接过滤所有的JavaScript脚本；
     转义Html元字符，使用htmlentities、htmlspecialchars等函数；
     系统的扩展函数库提供了XSS安全过滤的remove_xss方法；
     新版对URL访问的一些系统变量已经做了XSS处理。