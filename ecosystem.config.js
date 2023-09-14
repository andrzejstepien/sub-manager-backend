module.exports = {
  apps : [{
    name   : "subman",
    script : "./server.mjs",
    ignore_watch:["submissions","submissions-journal","test.db"]
  }]
}
