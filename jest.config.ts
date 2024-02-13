module.exports = {
    // 测试匹配模式，告诉 Jest 在哪里寻找测试文件
    testMatch: [
        '**/__tests__/**/*.ts', // 匹配所有 __tests__ 目录下的 .ts 文件
        '**/?(*.)+(spec|test).ts' // 匹配所有以 .spec.ts 或 .test.ts 结尾的文件
    ],
    // 其他配置...
};