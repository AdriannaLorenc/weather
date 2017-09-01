module.exports = { 
    entry: "./script.js",
     output: { filename: "out.js" }, 
     devServer: {
        contentBase: './',
        compress: true,
        port: 3000
     },
     watch: true, 
     module: { 
         loaders: [ 
             { 
                 test: /.js$/, 
                 exclude: /node_modules/, 
                 loader: 'babel-loader',
                  query: { presets: ['es2015'] } 
            }, 
            { 
                test: /.css$/, 
                loader: ['style-loader', 'css-loader'] 
            }
         ]
    }
}