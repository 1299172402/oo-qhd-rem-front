

module.exports = function( grunt ) {
  grunt.registerMultiTask(
    "compile",
    "Compile sizzle.js to the dist directory. Embed date/version.",
    function() {
      const {data} = this;
      const {dest} = data;
      const {src} = data;
      const version = grunt.config( "pkg.version" );
      let compiled = grunt.file.read( src );

      // Embed version and date
      compiled = compiled
        .replace( /@VERSION/g, version )
        .replace( "@DATE", () => {
          const date = new Date();

          // YYYY-MM-DD
          return [
            date.getFullYear(),
            ( `0${   date.getMonth() + 1}` ).slice( -2 ),
            ( `0${  date.getDate()}` ).slice( -2 )
          ].join( "-" );
        });

      // Write source to file
      grunt.file.write( dest, compiled );

      grunt.log.ok( `File written to ${  dest}` );
    }
  );
};
