module.exports = function(config) {
    config.set({

        frameworks: ["jasmine", "karma-typescript"],

        files: [
            { pattern: "test/*.ts" },
            { pattern: "src/*.ts" },
            { pattern: "node_modules/reflect-metadata/Reflect.js" },
            { pattern: "node_modules/zone.js/dist/zone.js" },
            { pattern: "node_modules/zone.js/dist/long-stack-trace-zone.js" },
            { pattern: "node_modules/zone.js/dist/proxy.js" },
            { pattern: "node_modules/zone.js/dist/sync-test.js" },
            { pattern: "node_modules/zone.js/dist/jasmine-patch.js" },
            { pattern: "node_modules/zone.js/dist/async-test.js" },
            { pattern: "node_modules/zone.js/dist/fake-async-test.js" }
        ],

        preprocessors: {
            "test/*.ts": ["karma-typescript"],
            "src/*.ts": ["karma-typescript"]
        },

        reporters: ["progress", "karma-typescript"],
        
        karmaTypescriptConfig: {
            coverageOptions: {
                instrumentation: false,
            },
            compilerOptions: {
                emitDecoratorMetadata: true,
                experimentalDecorators: true,
                module: "commonjs",
                sourceMap: true,
                target: "ES2015"
            },
            include: ["src/*.ts", "test/*.ts"],
        },

        browsers: ["Chrome"]
    });
};