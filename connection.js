const subscription = require('./src/connection.js');

var ps = require('ps-node');

subscription.get().subscribe(async function(conn) {
    var res = await conn
    if (res) {
        console.log('เนตติดอยู่')

        ps.lookup({
            command: 'node',
            // arguments: '--debug',
        }, function(err, resultList) {
            if (err) {
                throw new Error(err);
            }

            resultList.forEach(function(process) {
                if (process) {
                    if (process.arguments == 'index.js') {
                        // console.log('this pid = ', process.pid)

                        // process.kill(process.pid)
                        ps.kill(process.pid, function(err) {
                            if (err) {
                                throw new Error(err);
                            } else {
                                console.log('Process %s has been killed!', process.pid);

                                console.log(555555555);

                                var cmd = require('node-cmd');

                                cmd.run(
                                    `nodemon index.js`,
                                    function(err, data, stderr) {
                                        // console.log('examples dir now contains the example file along with : ', data)
                                        console.log('success')
                                    }
                                );
                            }
                        });
                    }
                    // console.log('PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments);
                }
            });
        });

        // if (process.getgroups) {
        //     console.log(process.getgroups()); // [ 16, 21, 297 ]

    } else {
        // เนตตัด
        console.log('เนตตัดแว้ว')
    }
})