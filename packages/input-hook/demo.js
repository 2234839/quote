// const addon = require('./build/Debug/hello.node'); // 如果 VS 编译模式是 Debug
const addon = require('./build/Release/hello.node'); // 如果 VS 编译模式是 Release




const id = setInterval(() => {
    addon.hello('');
}, 1000);

// setTimeout(() => clearInterval(id), 5000);