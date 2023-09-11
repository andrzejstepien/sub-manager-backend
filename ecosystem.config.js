module.exports = {
  apps : [{
    name   : "sub-manager-backend",
    script : "./server.mjs",
    ignore_watch:["submissions","submissions-journal","test.db"]
  }]
}
