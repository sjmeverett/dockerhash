

function dockerfile(options) {
  var lines = [];
  var k;

  // FROM image
  // image: name:tag
  if (options.image) {
    lines.push('FROM ' + options.image);
  }

  // MAINTAINER maintainer
  // maintainer: maintainer
  if (options.maintainer) {
    lines.push('MAINTAINER ' + options.maintainer);
  }

  // LABEL key=value
  // labels:
  //   key: value
  if (options.labels) {
    for (k in options.labels) {
      lines.push('LABEL ' + k + '=' + options.labels[k]);
    }
  }

  // ENV key value
  // env:
  //   key: value
  if (options.env) {
    for (k in options.env) {
      lines.push('ENV ' + k + ' ' + options.env[k]);
    }
  }

  // WORKDIR command
  // workdir: workdir
  if (options.workdir) {
    lines.push('WORKDIR ' + options.workdir);
  }

  // RUN command
  // run:
  //   - command
  if (options.run) {
    pushMap(lines, 'RUN', options.run);
  }

  // EXPOSE port
  // ports:
  //   - port
  if (options.ports) {
    pushMap(lines, 'EXPOSE', options.ports);
  }

  // VOLUME volume
  // volumes:
  //   - volume
  if (options.volumes) {
    pushMap(lines, 'VOLUME', options.volumes);
  }

  // ADD src dest
  // add:
  //   src: dest
  if (options.add) {
    for (k in options.add) {
      lines.push('ADD ' + src + ' ' + dest);
    }
  }

  // ENTRYPOINT cmd
  // entrypoint: cmd
  // ENTRYPOINT ["cmd", "arg1", "arg2", ...]
  // entrypoint: [cmd, arg1, arg2, ...]
  if (options.entrypoint) {
    strOrArr(lines, 'ENTRYPOINT', options.entrypoint);
  }

  // CMD cmd
  // command: cmd
  // CMD ["cmd", "arg1", "arg2", ...]
  // command: [cmd, arg1, arg2, ...]
  if (options.command) {
    strOrArr(lines, 'CMD', options.command);
  }

  return lines.join('\n');
}

function pushMap(lines, prefix, xs) {
  [].push.apply(lines, xs.map(function (x) { return prefix + ' ' + x; }));
}

function strOrArr(lines, prefix, options) {
  if (Array.isArray(options)) {
    lines.push(prefix + ' ' + JSON.stringify(options));
  } else {
    lines.push(prefix + ' ' + options);
  }
}


module.exports.dockerfile = dockerfile;
