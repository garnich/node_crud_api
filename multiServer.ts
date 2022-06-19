import cluster from 'cluster';
import { cpus } from 'os';
import { pid } from 'process';

const multiServer = async () => {
  if (cluster.isPrimary){
    const cpusNum = cpus().length;

    console.log(`MASTER with PID: ${pid} started.`);

    for( let i = 0; i < cpusNum; i++){
      cluster.fork();
    }

    cluster.on('exit', (worker) => {
      console.log(`Worker PID: ${pid} finished work.`);
    })
  } else {
    await import('./index');

    console.log(`Startes WORKER with PID: ${pid}.`)
  }
}

multiServer();
