A project from Vue - [The Complete Guide, Section 4](https://www.udemy.com/course/vuejs-2-the-complete-guide/)

## What I learned & Reference

1. 优先级，`!`>`%`. 参考 [MDN-Operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#table). `!!(currentRound%3)` 与 `currentRound%3!==0` 相同，括号是必须。
2. 待解决：加载页面时，在 vue 框架下载完成前，能短暂地看到所有内容（包括未符合条件的条件渲染）
