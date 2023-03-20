

const {exec} = require( "child_process" );

module.exports = function( grunt ) {
  grunt.registerTask( "version", "Commit a new version", function( version ) {
    if ( !/\d\.\d+\.\d+(?:-pre)?/.test( version ) ) {
      grunt.fatal( `Version must follow semver release format: ${  version}` );
      return;
    }

    const done = this.async();
    const files = grunt.config( "version.files" );
    const rversion = /("version":\s*")[^"]+/;

    // Update version in specified files
    files.forEach(( filename ) => {
      let text = grunt.file.read( filename );
      text = text.replace( rversion, `$1${  version}` );
      grunt.file.write( filename, text );
    });

    // Add files to git index
    exec( "git add -A", ( err ) => {
      if ( err ) {
        grunt.fatal( err );
        return;
      }
      // Commit next pre version
      grunt.config( "pkg.version", version );
      grunt.task.run([ "build", "uglify", "dist", `commit:'Update version to ${  version  }'` ]);
      done();
    });
  });
};
