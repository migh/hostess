const yargs = require('yargs');

const Hostess = require('./src/Hostess');

/**
  Some documentation is missing but here is the envisioned usage
  hostess -p profilename              # sets profilename as hosts
  hostess -o filename                 # saves current hosts structure as json
  hostess -i inputfile -o outputfile  # converts inputfile into outputfile
  hostess -i inputfile -s             # saves profile into config
  hostess --restore                   # restores default hosts file
  hostess map --append filename mapfile
  hostess toggle -h hostname          # toggle line based on hostname
  hostess toggle -a address           # toggle line based on address
*/

// Configuring yargs
yargs.usage('$0 <cmd> [args]')
  .command('map [domains] [mapfile] [OPTIONS]', 'Create a host -> domain map and send it to stdout.', (yargs)=> {
    yargs
      .positional('domains', {
        type: 'string',
        desc: 'the domains list file'
      })
      .positional('mapfile', {
        type: 'string',
        desc: 'the map file'
      });
  }, (args) => {
    const options = {
      replace: args.replace || false,
      append: args.append || false,
      outputfile: args.o || args.output || null,
      writeHosts: args.writeHosts || false
    };

    const hostess = new Hostess();

    if (!args.domains) {
      throw new Error('A domains file is required for mapping.');
    }

    if (!args.mapfile) {
      throw new Error('A map file is required for mapping.');
    }

    hostess.map(args.domains, args.mapfile, options);
  })
  .help()
  .argv;
