const {when,whenDev,whenProd,whenTest,ESLINT_MODES,POSTCSS_MODES}=require("@craco/craco");
const UglifyJsPlugin=require('uglifyjs-webpack-plugin');
const webpack=require('webpack');
const path=require('path');
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CompressionWebpackPlugin=require("compression-webpack-plugin");

module.exports={
    reactScriptsVersion:"react-scripts",
    style:{
        modules:{
            localIdentName:""
        },
        css:{
            loaderOptions:(cssLoaderOptions,{event,paths})=>{return cssLoaderOptions;}
        },
        sass:{
            loaderOptions:(sassLoaderOptions,{event,paths})=>{return sassLoaderOptions;}
        },
        postcss:{
            mode:"extends"||"file",
            plugins:[],
            env:{
                autoprefixer:{options: 'https://github.com/postcss/autoprefixer#options'},
                stage:3,
                features:{features: 'https://preset-env.cssdb.org/features'}
            },
            // loaderOptions:{},
            loaderOptions:(postcssLoaderOptions,{env,paths})=>{return postcssLoaderOptions;}
        },
    },
    eslint:{
        enable:true,
        mode:"extends"||"mode",
        configure:(eslintConfig,{env,paths})=>{return eslintConfig;},
        // pluginOptions:{},
        pluginOptions:(eslintOptions,{env,paths})=>{return eslintOptions;}
    },
    babel:{
        presets:[],
        plugins:[
            ['import',{libraryName:'antd',libraryDirectory:'es',style:'css'}],
            ['@babel/plugin-proposal-decorators',{legacy:true}]
        ],
        // loaderOptions:{},
        loaderOptions:(babelLoaderOptions,{env,paths})=>{return babelLoaderOptions;}
    },
    typescript:{
        enableTypeChecking:true,
    },
    webpack:{
        alias:{
            "@":path.resolve("src"),
        },
        plugins:[
            //打压缩包
            new CompressionWebpackPlugin({
                algorithm:'gzip',
                test:new RegExp(
                    '\\.('+
                    ['js','css'].join('|')+
                    ')$'
                ),
            }),
            new UglifyJsPlugin({
                uglifyOptions:{
                    compress:{
                        warnings:false,
                        drop_debugger:true,
                        drop_console:true
                    }
                },
                sourceMap:false,
                parallel:true
            }),
            new BundleAnalyzerPlugin(),
        ],
        configure:(webpackConfig,{env,paths})=>{return webpackConfig;}
    },
    jest:{
        babel:{
            addPresets:true,
            addPlugins:true
        },
        configure:(jestConfig,{env,paths,resolve,rootDir})=>{return jestConfig;}
    },
    devServer:(devServerConfig,{env,paths,Proxy,allowedHost})=>{return devServerConfig;},
    plogins:[
        {
            plugins:{
                overrideCracoConfig:({cracoConfig,pluginOptions,context:{env,paths}})=>{return cracoConfig;},
                overrideWebpackConfig:({webpackConfig,cracoConfig,pluginOptions,context:{env,paths}})=>{return webpackConfig;},
                overrideDevServerConfig:({devServerConfig,cracoConfig,pluginOptions,context:{env,paths}})=>{return devServerConfig;},
                overrideJestConfig:({jestConfig,cracoConfig,pluginOptions,context:{env,paths}})=>{return jestConfig;}
            },
            options:{}
        }
    ],
    optimization:{
        splitChunks:{
            cacheGroups:{
                default:{
                    name:'common',
                    chunks:'',
                    minChunks:2 //模块被引用2次以上的才抽离
                }, 
                vendors:{//第三方库
                    test: /[\\/]node_modules[\\/]/,
                    name:'vendor',
                    chunks:'initial',
                    priority:-10  //决定拆分规则的优先级
                },
                // locallib: {  //拆分指定文件
                //     test: /(src\/locallib\.js)$/,
                //     name: 'locallib',
                //     chunks: 'initial',
                //     priority: -9
                // }
            }
        }
    }
}