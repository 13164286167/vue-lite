import babel from  'rollup-plugin-babel'
import serve from  'rollup-plugin-serve'

export default {
    input:'./src/index.js',
    output:{
        file:'dist/umd/vue.js',
        name:'Vue',     //全局变量名
        format:'umd',  //统一模块规范
        sourcemap:true
    },
    plugin:[
        babel({
            exclude:'node_modules/**',
        }),
        process.env.ENV === 'development' ? serve({
            open:true,
            openPage:'/public/index.html',
            port:3000,
            contentBase:''
        }) : null
    ]
    
}

console.log(process.env.ENV)