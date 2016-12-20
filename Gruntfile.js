"use strict";

module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-browser-sync");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-postcss");
    grunt.loadNpmTasks("grunt-sass");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-csso");
    grunt.loadNpmTasks("grunt-contrib-imagemin");
    grunt.loadNpmTasks("grunt-svgstore");
    grunt.loadNpmTasks("grunt-svgmin");

  grunt.initConfig({
    sass: {
      style: {
        files: {
          "css/style.css": ["sass/style.scss"]
        }
      }
    },
      
    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")({browsers: [
              "last 1 version",
              "last 2 Chrome versions",
              "last 2 Firefox versions",
              "last 2 Opera versions",
              "last 2 Edge versions"
            ]})
          ]
        },
        style: {src: "build/css/*.css"}
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            "build/*.html",
            "build/css/*.css"
          ]
        },
        options: {
          server: "build",
          watchTask: true,
          notify: false,
          open: true,
          ui: false
        }
      }
    },

    watch: {
      html: {
        files: ["*.html"],
        tasks: ["copy:html"]
      },
      style: {
        files: ["sass/**/*.{scss,sass}"],
        tasks: ["sass", "postcss", "csso"],
        options: {
          spawn: false
        }
      }
    },
      
    
    csso: {
          style: {
              options: {
                  report: "gzip"
              },
              files: {
                  "build/css/style.min.css":["build/css/style.css"]
              }
          }
      },
      
    imagemin: {
          images: {
              options: {
                  optimizationLevel: 3
              },
              files: [{
                  expand: true,
                  src: ["build/img/**/*.{png,jpg,gif}"]
              }]
          }
      },
      
      svgstore: {
          options: {
              svg: {
                  style: "display:none"
              }
          },
          symbols: {
              files: {
                  "build/img/symbols.svg": ["img/icons/*.svg"]
              }
          }
      },
      
      svgmin: {
          symbols: {
              files: [{
                  expand: true,
                  src: ["build/img/icons/*.svg"]
              }]
          }
      }, 
      
     copy: {
         build: {
             files: [{
                 expand: true,
                 src: [
                     "fonts/**/*.{woff,woff2}",
                     "img/**",
                     "js/**",
                     "*.html"
                 ],
                 dest: "build"
             }]
         },
         html: {
             files: [{
                 expand: true,
                 src: ["*.html"],
                 dest: "build"
             }]
        }
     },
      
     clean: {
         build: ["build"]
     }
  });

  grunt.registerTask("serve", ["browserSync", "watch"]);
  grunt.registerTask("symbols", ["svgmin", "svgstore"]);
  grunt.registerTask("build", [
      "clean",
      "copy",
      "sass",
      "postcss",
      "csso",
      "symbols",
      "imagemin"
  ]);

};
